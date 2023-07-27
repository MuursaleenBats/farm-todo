from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from app.services.user_service import UserService
from app.schemas.auth_schema import TokenSchema, TokenPayload
from pydantic import ValidationError
from datetime import datetime
from app.core.security import create_access_token, create_refresh_token
from app.schemas.user_schemas import UserOut
from app.models.user_model import User
from app.api.dependencies.user_deps import get_current_user
from jose import jwt
from app.core.config import settings

auth_router = APIRouter()

@auth_router.post('/login',summary='Create access and refresh tokens for user',response_model=TokenSchema)
async def login(formData: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = await UserService.authenticate(email = formData.username, password = formData.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Incorrect email or password'
        )

    #create access and refresh token
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id)
    }

@auth_router.post('/test-token',summary="Test to see if the token is valid or not", response_model=UserOut)
async def test_token(user: User = Depends(get_current_user)):
    return user

@auth_router.post('/refresh', summary="Refresh Token", response_model=TokenSchema)
async def refresh_token(refresh_token: str = Body(...)):
    try:
        payload = jwt.decode(
            refresh_token, settings.JWT_REFRESH_SECRET_KEY, algorithms= [settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token Expired",
                headers={"WWW-Authenticate":"Bearer"},
            )
    except(jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate":"Bearer"}
        )
    
    user = await UserService.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user"
        )
    
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id)
    }