from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import projects, toolkits, matcher # Added matcher

Base.metadata.create_all(bind=engine)

app = FastAPI(title="InnoFlow API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(toolkits.router)
app.include_router(matcher.router) # Added matcher

@app.get("/")
def read_root():
    return {"message": "InnoFlow backend is running"}