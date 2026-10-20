from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.project import ToolkitData
from app.schemas.project import ToolkitDataCreate, ToolkitDataResponse

router = APIRouter(prefix="/api/toolkits", tags=["Toolkits"])

@router.post("/save", response_model=ToolkitDataResponse)
def save_toolkit_data(payload: ToolkitDataCreate, db: Session = Depends(get_db)):
    existing = db.query(ToolkitData).filter(
        ToolkitData.project_id == payload.project_id,
        ToolkitData.tool_name == payload.tool_name
    ).first()

    if existing:
        existing.data = payload.data
        db.commit()
        db.refresh(existing)
        return existing
    
    new_data = ToolkitData(**payload.model_dump())
    db.add(new_data)
    db.commit()
    db.refresh(new_data)
    return new_data

@router.get("/{project_id}/{tool_name}", response_model=ToolkitDataResponse)
def get_toolkit_data(project_id: int, tool_name: str, db: Session = Depends(get_db)):
    data = db.query(ToolkitData).filter(
        ToolkitData.project_id == project_id,
        ToolkitData.tool_name == tool_name
    ).first()
    if not data:
        raise HTTPException(status_code=404, detail="Data not found")
    return data