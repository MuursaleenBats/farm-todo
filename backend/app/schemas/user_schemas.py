from pydantic import BaseModel,EmailStr, Field


class UserAuth(BaseModel):
    email: EmailStr = Field(..., description = "user email")
    username: str = Field(..., descriptiion = "user username")
    password: str = Field(..., descriptiion = "user password")
