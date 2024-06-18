from pydantic import BaseModel
from typing import Optional

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    done: Optional[bool] = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    pass

class TodoInDBBase(TodoBase):
    id: int

    class Config:
        from_attribute = True
        
class Todo(TodoInDBBase):
    pass

class TodoInDB(TodoInDBBase):
    pass