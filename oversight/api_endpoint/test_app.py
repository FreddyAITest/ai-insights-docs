"""
Comprehensive Test Suite for API Endpoint
Covers unit tests, integration tests, and error handling scenarios.
"""

import pytest
from fastapi.testclient import TestClient
from datetime import datetime
from app import app, users_db, user_id_counter

# Create test client
client = TestClient(app)


class TestHealthEndpoint:
    """Test health check endpoint"""
    
    def test_health_check(self):
        """Verify health endpoint returns healthy status"""
        response = client.get("/health")
        
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        assert "version" in data


class TestUserCreation:
    """Test user creation endpoint"""
    
    def setup_method(self):
        """Reset database before each test"""
        users_db.clear()
    
    def test_create_user_valid(self):
        """Create user with valid data"""
        user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "age": 25
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == user_data["email"]
        assert data["username"] == user_data["username"]
        assert data["age"] == user_data["age"]
        assert "id" in data
        assert "created_at" in data
    
    def test_create_user_minimal(self):
        """Create user with minimal required fields"""
        user_data = {
            "email": "minimal@example.com",
            "username": "minimal"
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 201
        data = response.json()
        assert data["age"] is None
    
    def test_create_user_duplicate_email(self):
        """Attempt to create user with duplicate email"""
        user_data = {
            "email": "duplicate@example.com",
            "username": "user1"
        }
        
        # Create first user
        client.post("/users", json=user_data)
        
        # Attempt duplicate
        response = client.post("/users", json={
            "email": "duplicate@example.com",
            "username": "user2"
        })
        
        assert response.status_code == 422
        data = response.json()
        assert "Email already registered" in data["message"]
    
    def test_create_user_duplicate_username(self):
        """Attempt to create user with duplicate username"""
        user_data = {
            "email": "user1@example.com",
            "username": "duplicate"
        }
        
        # Create first user
        client.post("/users", json=user_data)
        
        # Attempt duplicate
        response = client.post("/users", json={
            "email": "user2@example.com",
            "username": "duplicate"
        })
        
        assert response.status_code == 422
        data = response.json()
        assert "Username already taken" in data["message"]
    
    def test_create_user_invalid_email(self):
        """Attempt to create user with invalid email"""
        user_data = {
            "email": "invalid-email",
            "username": "testuser"
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 422
        data = response.json()
        assert "validation_error" == data["error"]
    
    def test_create_user_invalid_username_length(self):
        """Attempt to create user with username too short"""
        user_data = {
            "email": "test@example.com",
            "username": "ab"  # Too short (min 3)
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 422
    
    def test_create_user_invalid_age(self):
        """Attempt to create user with invalid age"""
        user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "age": 200  # Too high (max 150)
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 422
    
    def test_create_user_invalid_username_chars(self):
        """Attempt to create user with invalid username characters"""
        user_data = {
            "email": "test@example.com",
            "username": "user@name!"  # Invalid characters
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 422


class TestUserRetrieval:
    """Test user retrieval endpoints"""
    
    def setup_method(self):
        """Setup test data"""
        users_db.clear()
        # Create test users
        for i in range(5):
            users_db[i + 1] = {
                "id": i + 1,
                "email": f"user{i}@example.com",
                "username": f"user{i}",
                "age": 20 + i,
                "created_at": datetime.utcnow()
            }
    
    def test_get_user_exists(self):
        """Get existing user"""
        response = client.get("/users/1")
        
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == 1
        assert data["username"] == "user0"
    
    def test_get_user_not_found(self):
        """Get non-existent user"""
        response = client.get("/users/999")
        
        assert response.status_code == 404
        data = response.json()
        assert "not found" in data["message"]
        assert data["error"] == "api_error"
    
    def test_list_users(self):
        """List all users"""
        response = client.get("/users")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 5
    
    def test_list_users_pagination(self):
        """List users with pagination"""
        response = client.get("/users?skip=2&limit=2")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        assert data[0]["id"] == 3
    
    def test_list_users_limit_exceeded(self):
        """List users with limit > 1000"""
        response = client.get("/users?limit=1001")
        
        assert response.status_code == 422


class TestUserUpdate:
    """Test user update endpoint"""
    
    def setup_method(self):
        """Setup test data"""
        users_db.clear()
        users_db[1] = {
            "id": 1,
            "email": "original@example.com",
            "username": "original",
            "age": 25,
            "created_at": datetime.utcnow()
        }
    
    def test_update_user_valid(self):
        """Update user with valid data"""
        update_data = {
            "email": "updated@example.com",
            "username": "updated",
            "age": 30
        }
        
        response = client.put("/users/1", json=update_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == update_data["email"]
        assert data["username"] == update_data["username"]
        assert data["age"] == update_data["age"]
    
    def test_update_user_not_found(self):
        """Update non-existent user"""
        update_data = {
            "email": "test@example.com",
            "username": "test"
        }
        
        response = client.put("/users/999", json=update_data)
        
        assert response.status_code == 404
    
    def test_update_user_duplicate_email(self):
        """Update user to use another user's email"""
        # Create second user
        users_db[2] = {
            "id": 2,
            "email": "other@example.com",
            "username": "other",
            "age": 25,
            "created_at": datetime.utcnow()
        }
        
        update_data = {
            "email": "other@example.com",
            "username": "updated"
        }
        
        response = client.put("/users/1", json=update_data)
        
        assert response.status_code == 422


class TestUserDeletion:
    """Test user deletion endpoint"""
    
    def setup_method(self):
        """Setup test data"""
        users_db.clear()
        users_db[1] = {
            "id": 1,
            "email": "delete@example.com",
            "username": "deletable",
            "age": 25,
            "created_at": datetime.utcnow()
        }
    
    def test_delete_user_valid(self):
        """Delete existing user"""
        response = client.delete("/users/1")
        
        assert response.status_code == 204
        # Verify user is deleted
        get_response = client.get("/users/1")
        assert get_response.status_code == 404
    
    def test_delete_user_not_found(self):
        """Delete non-existent user"""
        response = client.delete("/users/999")
        
        assert response.status_code == 404


class TestErrorHandling:
    """Test error handling and response format"""
    
    def test_error_response_format(self):
        """Verify error response has correct structure"""
        response = client.get("/users/999")
        
        assert response.status_code == 404
        data = response.json()
        
        # Check required fields
        assert "error" in data
        assert "message" in data
        assert "status_code" in data
        assert "timestamp" in data
        assert "details" in data
    
    def test_error_status_codes(self):
        """Verify correct status codes for different errors"""
        # 404 - Not Found
        response = client.get("/users/999")
        assert response.status_code == 404
        
        # 422 - Validation Error
        response = client.post("/users", json={"email": "invalid", "username": "ab"})
        assert response.status_code == 422


class TestEdgeCases:
    """Test edge cases and boundary conditions"""
    
    def setup_method(self):
        """Reset database"""
        users_db.clear()
    
    def test_empty_database(self):
        """List users when database is empty"""
        response = client.get("/users")
        
        assert response.status_code == 200
        data = response.json()
        assert data == []
    
    def test_special_characters_in_username(self):
        """Test username with allowed special characters"""
        user_data = {
            "email": "test@example.com",
            "username": "test_user-123"
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 201
    
    def test_age_boundary_zero(self):
        """Test age at lower boundary (0)"""
        user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "age": 0
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 201
    
    def test_age_boundary_150(self):
        """Test age at upper boundary (150)"""
        user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "age": 150
        }
        
        response = client.post("/users", json=user_data)
        
        assert response.status_code == 201


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
