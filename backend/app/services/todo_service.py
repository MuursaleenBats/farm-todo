from app.models.user_model import User
from app.models.todo_model import Todo
from app.schemas.todo_schema import TodoCreate, TodoUpdate
from typing import List
from uuid import UUID

class TodoService:
    @staticmethod
    async def list_todos(user: User) -> List[Todo]:
        todo = await Todo.find(Todo.owner.id == user.id).to_list()
        return todo
    
    @staticmethod
    async def create_todo(data: TodoCreate, user: User) -> Todo:
        todo = Todo(**data.dict(), owner=user)
        return await todo.insert()

    @staticmethod
    async def retrieve_todo(todo_id: UUID, user: User) -> Todo:
        todo = await Todo.find_one(Todo.todo_id == todo_id, Todo.owner.id == user.id)
        return todo
    
    @staticmethod
    async def update_todo(current_user: User, todo_id: UUID, data: TodoUpdate):
        todo = await TodoService.retrieve_todo(todo_id, current_user)
        await todo.update({"$set": data.dict(exclude_unset=True)})

        await todo.save()
        return todo
    
    @staticmethod
    async def delete_todo(current_user: User, todo_id: UUID):
        todo = await TodoService.retrieve_todo(todo_id, current_user)
        if todo:
            await todo.delete()
        
        return None