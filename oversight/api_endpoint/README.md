# Professional Python API Endpoint

A production-ready FastAPI application demonstrating comprehensive error handling, input validation, and best practices.

## Features

✅ **Comprehensive Error Handling**
- Custom exception classes for different error types
- Standardized error response format
- Proper HTTP status codes
- Detailed error messages with context

✅ **Input Validation**
- Pydantic models for request/response validation
- Email validation
- Field constraints (length, range, pattern)
- Custom validators

✅ **Logging**
- Structured logging to file and console
- Request/response logging
- Error tracking

✅ **Testing**
- Full test coverage (unit + integration)
- Edge case testing
- Error scenario testing

## Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Running the API

```bash
# Development
python app.py

# Or with uvicorn directly
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Production
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker
```

## API Endpoints

### Health Check
```bash
GET /health
```

### Users
```bash
# Create user
POST /users
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "age": 25
}

# List users (with pagination)
GET /users?skip=0&limit=100

# Get user
GET /users/{user_id}

# Update user
PUT /users/{user_id}
Content-Type: application/json

{
  "email": "updated@example.com",
  "username": "updated",
  "age": 30
}

# Delete user
DELETE /users/{user_id}
```

## Error Handling

### Custom Exceptions

```python
# Resource not found
ResourceNotFoundException(resource, resource_id)
# Returns: 404

# Business logic validation failed
ValidationException(message, field)
# Returns: 422

# Authentication failed
AuthenticationException(message)
# Returns: 401

# Rate limit exceeded
RateLimitException(retry_after)
# Returns: 429
```

### Error Response Format

```json
{
  "error": "api_error",
  "message": "User with ID '999' not found",
  "status_code": 404,
  "details": {
    "resource": "User",
    "resource_id": "999"
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Running Tests

```bash
# Run all tests
pytest test_app.py -v

# Run with coverage
pytest test_app.py -v --cov=app

# Run specific test class
pytest test_app.py::TestUserCreation -v
```

## Example Usage

```python
import requests

# Create a user
response = requests.post(
    "http://localhost:8000/users",
    json={
        "email": "john@example.com",
        "username": "john_doe",
        "age": 30
    }
)

if response.status_code == 201:
    user = response.json()
    print(f"Created user: {user['username']} (ID: {user['id']})")
else:
    error = response.json()
    print(f"Error: {error['message']}")

# Get the user
response = requests.get(f"http://localhost:8000/users/{user['id']}")
if response.status_code == 200:
    print(response.json())

# Handle errors gracefully
try:
    response = requests.get("http://localhost:8000/users/999")
    response.raise_for_status()
except requests.exceptions.HTTPError as e:
    error_data = e.response.json()
    print(f"Error {error_data['status_code']}: {error_data['message']}")
```

## Best Practices Implemented

1. **RESTful Design**: Proper HTTP methods and status codes
2. **Validation**: Input validation at the boundary
3. **Error Handling**: Centralized exception handling
4. **Logging**: Comprehensive logging for debugging
5. **Testing**: Full test coverage including edge cases
6. **Documentation**: Clear API documentation via FastAPI
7. **Type Safety**: Pydantic models for type checking
8. **Security**: Email validation, input sanitization

## Project Structure

```
api_endpoint/
├── app.py              # Main application
├── test_app.py         # Test suite
├── requirements.txt    # Dependencies
├── README.md          # This file
└── api.log            # Application logs (generated)
```

## License

MIT License
