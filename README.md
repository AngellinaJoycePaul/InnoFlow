# InnoFlow
**An Integrated Digital Innovation Toolkit with Smart Tool Recommendation**

InnoFlow is a full-stack web application designed to solve the problem of scattered internship and placement resources. It acts as a centralized aggregator that matches students with real-world jobs, courses, and mentors based on their skills, while also integrating structured Innovation Toolkits to guide their problem-solving process.

## 📌 Case Study
**Student Placement and Internship Discovery**
Students struggle to discover relevant internships because information is scattered across platforms, opportunities don't match their skills, and there is no personalized guidance. InnoFlow solves this by paving a personalized path.

## 🚀 Features (Current MVP)
1. **Student Profile Setup:** Users input their name, current skills, and career interests.
2. **Smart Matching Algorithm:** A custom backend algorithm calculates a "Match Score" based on the overlap between the student's skills and the job's required skills.
3. **Aggregated Resources:** Displays Internships, Mentorship Opportunities, and Skill-Gap Courses.
4. **Real External Links:** Directs users to the actual application/course pages (LinkedIn, Coursera, Udemy, etc.).
5. **Innovation Toolkits (Unit II):** Integrated "5 Whys" tool that allows users to perform root-cause analysis on their career problems.

## 🛠️ Tech Stack
*   **Frontend:** React, Vite, Tailwind CSS, React Router
*   **Backend:** Python, FastAPI, SQLAlchemy
*   **Database:** SQLite
*   **HTTP Client:** Axios

## 📂 Project Structure

innoflow/
├── backend/
│   ├── app/
│   │   ├── models/       # Database schemas (Profile, Resource, Project)
│   │   ├── routers/      # API endpoints (matcher, toolkits, projects)
│   │   ├── schemas/      # Pydantic validation models
│   │   └── database.py   # SQLite connection setup
│   ├── main.py           # FastAPI entry point
│   └── requirements.txt  # Python dependencies
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI (Layout)
    │   ├── pages/        # Home, Dashboard, ToolLibrary, FiveWhys
    │   ├── services/     # API connection (axios)
    │   └── App.jsx       # Route configuration
    └── package.json      # Node dependencies

## ⚙️ How to Run Locally

### 1. Start the Backend (FastAPI)
Open a terminal and navigate to the backend folder:

cd backend
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\Activate.ps1
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload

*Backend runs on http://127.0.0.1:8000*

### 2. Start the Frontend (React)
Open a **second** terminal and navigate to the frontend folder:

cd frontend
npm install
npm run dev

*Frontend runs on http://localhost:5173*

## 🧪 How to Test the Demo
1. Open http://localhost:5173.
2. Enter a name, and try entering skills like `react, python` or `figma, ui`.
3. Click **Generate My Path**.
4. The dashboard will show jobs and mentors with a high match percentage.
5. Click **Apply on LinkedIn** or **Take Course on Coursera** to see it link to real websites.
6. Scroll down to **Open Toolkits** to test the integrated 5 Whys innovation tool.

## 🎓 Syllabus Mapping (Units I - V)
*   **Unit I (Foundations):** Toolkits are categorized in the Tool Library (Problem Analysis, Idea Generation, Decision Making, Digital Innovation).
*   **Unit II (Problem Analysis):** The integrated 5 Whys tool allows users to diagnose root causes.
*   *(Future Scope)* **Unit III, IV, V:** The architecture is ready to plug in TRIZ, AI-generation, and Decision Matrices in future updates.

## 👥 Team
*   Angellina Joyce Paul (253115205007)
*   Kaadambari M (253115205045)
*   Jeevitha D (253115205042)