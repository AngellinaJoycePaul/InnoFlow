from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectCreate(BaseModel):
    title: str
    problem_statement: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    problem_statement: Optional[str] = None
    refined_problem: Optional[str] = None
    current_stage: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    title: str
    problem_statement: Optional[str]
    refined_problem: Optional[str]
    current_stage: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True