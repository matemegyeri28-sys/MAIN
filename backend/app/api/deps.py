from fastapi import HTTPException, status
from sqlmodel import select

from app.core.database import session_scope
from app.models.models import User


def get_current_user() -> User:
    with session_scope() as session:
        user = session.exec(select(User)).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Seed user not found")
        return user
