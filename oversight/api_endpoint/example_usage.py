"""
Example Usage Script for the API
Demonstrates how to interact with the API client-side with proper error handling.
"""

import requests
from typing import Optional, Dict, Any


class APIClient:
    """Client for interacting with the API"""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.session = requests.Session()
    
    def _handle_response(self, response: requests.Response) -> Dict[str, Any]:
        """Handle API response with error handling"""
        try:
            response.raise_for_status()
            
            # 204 No Content
            if response.status_code == 204:
                return {"success": True}
            
            return response.json()
            
        except requests.exceptions.HTTPError as e:
            # Parse error response
            try:
                error_data = response.json()
                raise APIError(
                    message=error_data.get("message", str(e)),
                    status_code=error_data.get("status_code", response.status_code),
                    error_type=error_data.get("error", "unknown"),
                    details=error_data.get("details")
                )
            except ValueError:
                raise APIError(
                    message=str(e),
                    status_code=response.status_code,
                    error_type="http_error"
                )
    
    def health_check(self) -> Dict[str, Any]:
        """Check API health"""
        response = self.session.get(f"{self.base_url}/health")
        return self._handle_response(response)
    
    def create_user(self, email: str, username: str, age: Optional[int] = None) -> Dict[str, Any]:
        """Create a new user"""
        payload = {
            "email": email,
            "username": username
        }
        if age is not None:
            payload["age"] = age
        
        response = self.session.post(f"{self.base_url}/users", json=payload)
        return self._handle_response(response)
    
    def get_user(self, user_id: int) -> Dict[str, Any]:
        """Get a specific user"""
        response = self.session.get(f"{self.base_url}/users/{user_id}")
        return self._handle_response(response)
    
    def list_users(self, skip: int = 0, limit: int = 100) -> Dict[str, Any]:
        """List users with pagination"""
        response = self.session.get(
            f"{self.base_url}/users",
            params={"skip": skip, "limit": limit}
        )
        return self._handle_response(response)
    
    def update_user(self, user_id: int, email: str, username: str, age: Optional[int] = None) -> Dict[str, Any]:
        """Update an existing user"""
        payload = {
            "email": email,
            "username": username
        }
        if age is not None:
            payload["age"] = age
        
        response = self.session.put(f"{self.base_url}/users/{user_id}", json=payload)
        return self._handle_response(response)
    
    def delete_user(self, user_id: int) -> Dict[str, Any]:
        """Delete a user"""
        response = self.session.delete(f"{self.base_url}/users/{user_id}")
        return self._handle_response(response)


class APIError(Exception):
    """Custom exception for API errors"""
    
    def __init__(self, message: str, status_code: int, error_type: str, details: Optional[Dict] = None):
        self.message = message
        self.status_code = status_code
        self.error_type = error_type
        self.details = details or {}
        super().__init__(self.message)
    
    def __str__(self):
        return f"[{self.error_type}] {self.message} (Status: {self.status_code})"


def main():
    """Example usage demonstration"""
    client = APIClient()
    
    print("=" * 60)
    print("API Client Example")
    print("=" * 60)
    
    try:
        # Health check
        print("\n1. Checking API health...")
        health = client.health_check()
        print(f"   Status: {health['status']}")
        print(f"   Version: {health['version']}")
        
        # Create a user
        print("\n2. Creating a new user...")
        user = client.create_user(
            email="alice@example.com",
            username="alice_wonder",
            age=28
        )
        print(f"   Created user: {user['username']} (ID: {user['id']})")
        user_id = user['id']
        
        # Get the user
        print("\n3. Retrieving the user...")
        user = client.get_user(user_id)
        print(f"   Email: {user['email']}")
        print(f"   Age: {user['age']}")
        
        # Update the user
        print("\n4. Updating the user...")
        user = client.update_user(
            user_id=user_id,
            email="alice.updated@example.com",
            username="alice_updated",
            age=29
        )
        print(f"   Updated email: {user['email']}")
        print(f"   Updated age: {user['age']}")
        
        # List all users
        print("\n5. Listing all users...")
        users = client.list_users()
        print(f"   Total users: {len(users)}")
        for u in users:
            print(f"   - {u['username']} ({u['email']})")
        
        # Handle error: try to get non-existent user
        print("\n6. Testing error handling (non-existent user)...")
        try:
            client.get_user(999)
        except APIError as e:
            print(f"   ✓ Caught expected error: {e}")
            print(f"   Error type: {e.error_type}")
            print(f"   Details: {e.details}")
        
        # Handle error: duplicate email
        print("\n7. Testing error handling (duplicate email)...")
        try:
            client.create_user(
                email="alice.updated@example.com",
                username="another_user"
            )
        except APIError as e:
            print(f"   ✓ Caught expected error: {e}")
        
        # Delete the user
        print("\n8. Deleting the user...")
        result = client.delete_user(user_id)
        print(f"   {result}")
        
        # Verify deletion
        print("\n9. Verifying deletion...")
        try:
            client.get_user(user_id)
        except APIError as e:
            print(f"   ✓ User successfully deleted (404 as expected)")
        
        print("\n" + "=" * 60)
        print("All examples completed successfully!")
        print("=" * 60)
        
    except APIError as e:
        print(f"\n❌ API Error: {e}")
        print(f"   Details: {e.details}")
    except requests.exceptions.ConnectionError:
        print("\n❌ Connection Error: Could not connect to API")
        print("   Make sure the API is running: python app.py")
    except Exception as e:
        print(f"\n❌ Unexpected Error: {e}")


if __name__ == "__main__":
    main()
