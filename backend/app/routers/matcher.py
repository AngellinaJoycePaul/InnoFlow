from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models.project import Profile, Resource

router = APIRouter(prefix="/api/match", tags=["Matcher"])

class ProfileCreate(BaseModel):
    name: str
    skills: str
    interest: str

@router.post("/profile")
def save_profile(profile: ProfileCreate, db: Session = Depends(get_db)):
    new_profile = Profile(name=profile.name, skills=profile.skills, interest=profile.interest)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get("/{profile_id}")
def get_matches(profile_id: int, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        return {"error": "Profile not found"}
    
    user_skills = [s.strip().lower() for s in profile.skills.split(",") if s.strip()]
    resources = db.query(Resource).all()
    
    matched_results = []
    for res in resources:
        res_skills = [s.strip().lower() for s in res.required_skills.split(",") if s.strip()]
        
        if not res_skills:
            match_score = 100
        else:
            matches = len(set(user_skills) & set(res_skills))
            match_score = int((matches / len(res_skills)) * 100)
            
        if match_score > 0 or res.type == "course":
            matched_results.append({
                "id": res.id,
                "title": res.title,
                "company": res.company,
                "type": res.type,
                "source": res.source,
                "url": res.url,
                "match_score": match_score
            })
            
    matched_results.sort(key=lambda x: x["match_score"], reverse=True)
    
    return {
        "internships": [r for r in matched_results if r["type"] == "internship"],
        "mentors": [r for r in matched_results if r["type"] == "mentor"],
        "courses": [r for r in matched_results if r["type"] == "course"]
    }

@router.post("/seed")
def seed_data(db: Session = Depends(get_db)):
    db.query(Resource).delete() 
    
    # EXPANDED DATABASE: Jobs, Mentors, and Courses across multiple fields
    dummy_data = [
        # --- SOFTWARE DEVELOPMENT ---
        Resource(title="Frontend Developer Intern", company="TechNova", type="internship", required_skills="react,javascript,html", source="LinkedIn", url="https://www.linkedin.com/jobs/search/?keywords=Frontend%20Developer%20Intern"),
        Resource(title="Backend Engineer Intern", company="CloudScale", type="internship", required_skills="python,java,sql", source="Internshala", url="https://internshala.com/internships/software-development-internship"),
        Resource(title="Full Stack Developer", company="StartupHub", type="internship", required_skills="react,node,python,sql", source="Indeed", url="https://in.indeed.com/jobs?q=Full+Stack+Developer+Intern"),
        
        # --- DATA SCIENCE ---
        Resource(title="Data Analyst Intern", company="DataCorp", type="internship", required_skills="python,sql,excel", source="Internshala", url="https://internshala.com/internships/data-science-internship"),
        Resource(title="Machine Learning Intern", company="AI Labs", type="internship", required_skills="python,machine learning,tensorflow", source="LinkedIn", url="https://www.linkedin.com/jobs/search/?keywords=Machine%20Learning%20Intern"),
        
        # --- UI/UX DESIGN ---
        Resource(title="UI/UX Designer", company="CreativeHub", type="internship", required_skills="figma,ui,ux", source="Indeed", url="https://in.indeed.com/jobs?q=UI+UX+Designer+Intern"),
        Resource(title="Graphic Design Intern", company="PixelWorks", type="internship", required_skills="photoshop,illustrator,design", source="Internshala", url="https://internshala.com/internships/design-internship"),
        
        # --- MARKETING ---
        Resource(title="Digital Marketing Intern", company="GrowthGen", type="internship", required_skills="seo,social media,content", source="LinkedIn", url="https://www.linkedin.com/jobs/search/?keywords=Digital%20Marketing%20Intern"),

        # --- MENTORS ---
        Resource(title="Senior Frontend Dev", company="Google", type="mentor", required_skills="react,javascript", source="Alumni Network", url="https://www.linkedin.com/in/"),
        Resource(title="Data Scientist", company="Microsoft", type="mentor", required_skills="python,machine learning", source="Alumni Network", url="https://www.linkedin.com/in/"),
        Resource(title="Product Designer", company="Apple", type="mentor", required_skills="figma,ui,ux", source="Alumni Network", url="https://www.linkedin.com/in/"),
        Resource(title="Marketing Lead", company="HubSpot", type="mentor", required_skills="seo,content", source="Alumni Network", url="https://www.linkedin.com/in/"),

        # --- COURSES ---
        Resource(title="Advanced React", company="Coursera", type="course", required_skills="react", source="Coursera", url="https://www.coursera.org/learn/react-basics"),
        Resource(title="Python for Data Science", company="Coursera", type="course", required_skills="python", source="Coursera", url="https://www.coursera.org/learn/python-for-applied-data-science-ai"),
        Resource(title="SQL Bootcamp", company="Udemy", type="course", required_skills="sql", source="Udemy", url="https://www.udemy.com/course/the-complete-sql-bootcamp/"),
        Resource(title="Figma UI/UX Masterclass", company="Udemy", type="course", required_skills="figma,ui,ux", source="Udemy", url="https://www.udemy.com/course/figma-ux-ui-design-the-ultimate-course/"),
        Resource(title="Machine Learning A-Z", company="Udemy", type="course", required_skills="machine learning", source="Udemy", url="https://www.udemy.com/course/machinelearning/"),
        Resource(title="SEO Training", company="Google", type="course", required_skills="seo", source="Google Digital Garage", url="https://learndigital.withgoogle.com/digitalgarage/course/seo-fundamentals"),
    ]
    db.add_all(dummy_data)
    db.commit()
    return {"message": "Database expanded and seeded successfully!"}