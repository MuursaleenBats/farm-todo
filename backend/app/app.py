from fastapi import FastAPI
from typing import List
from pydantic import AnyHttpUrl
from decouple import config
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient  
from app.core.config import settings


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
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
            
        ]
    )