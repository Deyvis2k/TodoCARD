from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    done = Column(Boolean, default=False)

    def __str__(self):
        return f'{self.id} ({self.title})'

    def __repr__(self):
        return self.__str__()