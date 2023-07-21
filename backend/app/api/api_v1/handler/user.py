from fastapi import APIRouter, HTTPException, status
from app.schemas.user_schemas import UserAuth
from app.services.user_service import UserService
import beanie
import pymongo

user_router = APIRouter()

@user_router.post('/create', summary="Create a new user")
async def create_user(data: UserAuth):
    try:
        return await UserService.create_user(data)
    except pymongo.errors.DuplicateKeyError and beanie.exceptions.RevisionIdWasChanged:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or username already exists"
        )