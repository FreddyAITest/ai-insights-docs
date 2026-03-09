"""
FastAPI Application with Comprehensive Error Handling
Demonstrates best practices for API design, validation, and error management.
"""

from fastapi import FastAPI, HTTPException, status, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, Field, validator, EmailStr
from typing import Optional, List
from datetime import datetime
import logging
from contextlib import asynccontextmanager

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('api.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


# Custom Exceptions
class APIException(Exception):
    """Base custom exception for API errors"""
    def __init__(self, message: str, status_code: int = 500, details: Optional[dict] = None):
        self.message = message
        self.status_code = status_code
        self.details = details or {}
        super().__init__(self.message)


class ResourceNotFoundException(APIException):
    """Raised when a requested resource is not found"""
    def __init__(self, resource: str, resource_id: str):
        super().__init__(
            message=f"{resource} with ID '{resource_id}' not found",
            status_code=status.HTTP_404_NOT_FOUND,
            details={"resource": resource, "resource_id": resource_id}
        )


class ValidationException(APIException):
    """Raised when business logic validation fails"""
    def __init__(self, message: str, field: Optional[str] = None):
        details = {"field": field} if field else {}
        super().__init__(
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            details=details
        )


class AuthenticationException(APIException):
    """Raised when authentication fails"""
    def __init__(self, message: str = "Invalid credentials"):
        super().__init__(
            message=message,
            status_code=status.HTTP_401_UNAUTHORIZED,
            details={"error": "authentication_failed"}
        )


class RateLimitException(APIException):
    """Raised when rate limit is exceeded"""
    def __init__(self, retry_after: int = 60):
        super().__init__(
            message="Rate limit exceeded",
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            details={"retry_after": retry_after}
        )


# Pydantic Models for Request/Response Validation
class UserCreate(BaseModel):
    """Model for creating a new user"""
    email: EmailStr = Field(..., description="User email address", example="user@example.com")
    username: str = Field(..., min_length=3, max_length=50, description="Username")
    age: Optional[int] = Field(None, ge=0, le=150, description="User age")
    
    @validator('username')
    def username_alphanumeric(cls, v):
        if not v.replace('_', '').replace('-', '').isalnum():
            raise ValueError('Username must be alphanumeric (underscores and hyphens allowed)')
        return v


class UserResponse(BaseModel):
    """Model for user response"""
    id: int
    email: str
    username: str
    age: Optional[int]
    created_at: datetime
    
    class Config:
        from_attributes = True


class APIError(BaseModel):
    """Standard error response model"""
    error: str
    message: str
    status_code: int
    details: Optional[dict] = None
    timestamp: datetime


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    timestamp: datetime
    version: str


# In-memory database (replace with actual DB in production)
users_db = {}
user_id_counter = 0


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    logger.info("Starting API application")
    yield
    logger.info("Shutting down API application")


# Create FastAPI application
app = FastAPI(
    title="Professional API",
    description="Demonstration of best practices for API error handling",
    version="1.0.0",
    lifespan=lifespan
)


# Exception Handlers
@app.exception_handler(APIException)
async def api_exception_handler(request: Request, exc: APIException):
    """Handle custom API exceptions"""
    logger.warning(f"API Exception: {exc.message} (Status: {exc.status_code})")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "api_error",
            "message": exc.message,
            "status_code": exc.status_code,
            "details": exc.details,
            "timestamp": datetime.utcnow()
        }
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle Pydantic validation errors"""
    logger.warning(f"Validation Error: {exc.errors()}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "validation_error",
            "message": "Request validation failed",
            "status_code": status.HTTP_422_UNPROCESSABLE_ENTITY,
            "details": {"errors": exc.errors()},
            "timestamp": datetime.utcnow()
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions"""
    logger.error(f"Unexpected Error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "internal_error",
            "message": "An unexpected error occurred",
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "timestamp": datetime.utcnow()
        }
    )


# API Endpoints
@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint"""
    logger.info("Health check requested")
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow(),
        version="1.0.0"
    )


@app.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED, tags=["Users"])
async def create_user(user: UserCreate):
    """
    Create a new user
    
    - **email**: Valid email address (required)
    - **username**: 3-50 characters, alphanumeric (required)
    - **age**: Optional, must be between 0 and 150
    """
    global user_id_counter
    
    logger.info(f"Creating user: {user.username}")
    
    try:
        # Check for duplicate email
        for existing_user in users_db.values():
            if existing_user["email"] == user.email:
                raise ValidationException(
                    "Email already registered",
                    field="email"
                )
        
        # Check for duplicate username
        for existing_user in users_db.values():
            if existing_user["username"] == user.username:
                raise ValidationException(
                    "Username already taken",
                    field="username"
                )
        
        # Create user
        user_id_counter += 1
        user_data = {
            "id": user_id_counter,
            "email": user.email,
            "username": user.username,
            "age": user.age,
            "created_at": datetime.utcnow()
        }
        users_db[user_id_counter] = user_data
        
        logger.info(f"User created successfully: ID {user_id_counter}")
        return user_data
        
    except ValidationException:
        raise
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}")
        raise APIException(
            "Failed to create user",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@app.get("/users", response_model=List[UserResponse], tags=["Users"])
async def list_users(skip: int = 0, limit: int = 100):
    """
    List all users with pagination
    
    - **skip**: Number of records to skip (default: 0)
    - **limit**: Maximum number of records to return (default: 100, max: 1000)
    """
    logger.info(f"Listing users: skip={skip}, limit={limit}")
    
    if limit > 1000:
        raise ValidationException("Limit cannot exceed 1000", field="limit")
    
    users = list(users_db.values())[skip:skip + limit]
    return users


@app.get("/users/{user_id}", response_model=UserResponse, tags=["Users"])
async def get_user(user_id: int):
    """
    Get a specific user by ID
    
    - **user_id**: User's unique identifier
    """
    logger.info(f"Getting user: ID {user_id}")
    
    if user_id not in users_db:
        raise ResourceNotFoundException("User", str(user_id))
    
    return users_db[user_id]


@app.put("/users/{user_id}", response_model=UserResponse, tags=["Users"])
async def update_user(user_id: int, user: UserCreate):
    """
    Update an existing user
    
    - **user_id**: User's unique identifier
    - **email**: Valid email address
    - **username**: 3-50 characters, alphanumeric
    - **age**: Optional, must be between 0 and 150
    """
    logger.info(f"Updating user: ID {user_id}")
    
    if user_id not in users_db:
        raise ResourceNotFoundException("User", str(user_id))
    
    # Check for duplicate email (excluding current user)
    for uid, existing_user in users_db.items():
        if uid != user_id and existing_user["email"] == user.email:
            raise ValidationException(
                "Email already registered",
                field="email"
            )
    
    # Check for duplicate username (excluding current user)
    for uid, existing_user in users_db.items():
        if uid != user_id and existing_user["username"] == user.username:
            raise ValidationException(
                "Username already taken",
                field="username"
            )
    
    # Update user
    users_db[user_id]["email"] = user.email
    users_db[user_id]["username"] = user.username
    users_db[user_id]["age"] = user.age
    
    logger.info(f"User updated successfully: ID {user_id}")
    return users_db[user_id]


@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Users"])
async def delete_user(user_id: int):
    """
    Delete a user
    
    - **user_id**: User's unique identifier
    """
    logger.info(f"Deleting user: ID {user_id}")
    
    if user_id not in users_db:
        raise ResourceNotFoundException("User", str(user_id))
    
    del users_db[user_id]
    logger.info(f"User deleted successfully: ID {user_id}")
    return None


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
