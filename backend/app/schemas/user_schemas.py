from pydantic import BaseModel,EmailStr, Field
from uuid import UUID
from typing import Optional
class UserAuth(BaseModel):
    email: EmailStr = Field(..., description = "user email")
    username: str = Field(..., descriptiion = "user username")
    password: str = Field(..., descriptiion = "user password")

class UserOut(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    disabled: Optional[bool]

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
