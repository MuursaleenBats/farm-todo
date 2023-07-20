from typing import List
from pydantic import AnyHttpUrl
from decouple import config
class Settings:
    API_V1_STR: str = "/api/v1"
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str)
    JWT_REFRESH_SECRET_KEY: str = config("JWT_REFRESH_SECRET_KEY", cast=str)
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60*24*7 #7 DAYS
    BACKEND_CORS_ORIGIN: List[AnyHttpUrl] = []
    PROJECT_NAME: str = "TODOLIST"

    #Database Settings
    MONGO_CONN: str = config("MONGO_CONN",cast=str)

    class Config:
        case_sensitive = True

settings = Settings()

