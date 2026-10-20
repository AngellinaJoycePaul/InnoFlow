from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    problem_statement = Column(Text, nullable=True)
    refined_problem = Column(Text, nullable=True)
    current_stage = Column(String(50), default="problem_definition")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    toolkits = relationship("ToolkitData", back_populates="project")

class ToolkitData(Base):
    __tablename__ = "toolkit_data"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    tool_name = Column(String(50), index=True)
    data = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="toolkits")

# --- NEW MODELS FOR THE AGGREGATOR ---

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    skills = Column(Text)
    interest = Column(String(100))

class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    company = Column(String(100))
    type = Column(String(50))
    required_skills = Column(Text)
    source = Column(String(100))
    url = Column(String(500)) # ADDED: Real link column