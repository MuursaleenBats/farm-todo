from fastapi import APIRouter
from app.api.api_v1.handler import user
from app.api.auth.jwt import auth_router

router = APIRouter()
router.include_router(user.user_router,prefix = "/user", tags= ["user"])
router.include_router(auth_router, prefix='/auth', tags = ['auth'])