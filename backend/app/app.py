from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient  

from app.core.config import settings
from app.models.user_model import User
from app.api.api_v1.router import router
from app.models.todo_model import Todo
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = settings.FRONTEND_CORS_ORIGIN,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.on_event("startup")

async def app_init():
    """
        initialize crucial service applications
    """

    db_client = AsyncIOMotorClient(settings.MONGO_CONN).todolist

    await init_beanie(
        database=db_client,
        document_models=[
            User,
            Todo
        ]
    )

app.include_router(router, prefix=settings.API_V1_STR)