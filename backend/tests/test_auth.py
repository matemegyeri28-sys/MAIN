from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import create_app


def test_register_and_login_flow():
    app = create_app()
    client = TestClient(app)

    unique_email = f"user-{uuid4().hex}@example.com"
    password = "SecurePass123!"

    register_response = client.post(
        "/api/auth/register",
        json={
            "email": unique_email,
            "full_name": "Test User",
            "password": password,
            "company": "QA Labs",
        },
    )

    assert register_response.status_code == 201
    assert register_response.json()["email"] == unique_email

    login_response = client.post(
        "/api/auth/login",
        data={"username": unique_email, "password": password},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    assert login_response.status_code == 200
    token_payload = login_response.json()
    assert "access_token" in token_payload
    assert token_payload["user"]["email"] == unique_email

    me_response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token_payload['access_token']}"},
    )

    assert me_response.status_code == 200
    assert me_response.json()["email"] == unique_email
