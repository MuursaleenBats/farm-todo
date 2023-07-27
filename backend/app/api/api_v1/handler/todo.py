from fastapi import APIRouter, Depends
from app.schemas.todo_schema import TodoCreate, TodoOut, TodoUpdate
from app.models.user_model import User
from app.api.dependencies.user_deps import get_current_user
from app.services.todo_service import TodoService
from app.models.todo_model import Todo
from uuid import UUID, uuid4
from typing import List

todo_router = APIRouter()

@todo_router.get('/', summary="Get all the todos of the user", response_model=List[TodoOut])
async def list(current_user: User = Depends(get_current_user)):    
    return await TodoService.list_todos(current_user)


@todo_router.post('/create', summary="Create Todo", response_model=Todo)
async def create_todo(data: TodoCreate, current_user: User = Depends(get_current_user)):
    return await TodoService.create_todo(data, current_user)

@todo_router.get('/{todo_id}', summary="Get todo by its id", response_model=TodoOut)
async def retrieve(todo_id: UUID, current_user: User = Depends(get_current_user)):
    return await TodoService.retrieve_todo(todo_id, current_user)

@todo_router.put('/{todo_id}', summary="Update todo by its id", response_model=TodoOut)
async def update(todo_id: UUID, data: TodoUpdate, current_user: User = Depends(get_current_user)):
    return await TodoService.update_todo(current_user, todo_id, data)

@todo_router.delete('/{todo_id}', summary="Delete a todo by its id")
async def delete(todo_id: UUID, current_user: User = Depends(get_current_user)):
    return await TodoService.delete_todo(current_user, todo_id)