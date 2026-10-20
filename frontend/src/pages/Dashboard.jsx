import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({ internships: [], mentors: [], courses: [] });
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileId = localStorage.getItem('innoflow_profile_id');
    const savedName = localStorage.getItem('innoflow_name');
    
    if (!profileId) {
      navigate('/');
      return;
    }
    setName(savedName);

    api.get(`/api/match/${profileId}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        navigate('/');
      });
  }, [navigate]);

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Matching your profile...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hello, {name} 👋</h1>
          <p className="text-gray-600 mt-1">Here is your centralized path based on your skills.</p>
        </div>
        <button onClick={() => { localStorage.clear(); navigate('/'); }} className="text-sm text-red-500 hover:underline">
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Internships & Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">💼 Matched Internships</h2>
            
            <div className="space-y-4">
              {data.internships.length === 0 && <p className="text-gray-500">No internships match your skills yet.</p>}
              {data.internships.map(job => (
                <div key={job.id} className="border border-gray-100 rounded-lg p-4 flex justify-between items-center bg-gray-50 hover:border-blue-300 transition-colors">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Source: {job.source}</span>
                      <span className={`text-xs px-2 py-1 rounded font-bold ${job.match_score > 50 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {job.match_score}% Match
                      </span>
                    </div>
                  </div>
                  {/* OPENS REAL LINK IN NEW TAB */}
                  <button 
                    onClick={() => window.open(job.url, '_blank')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Apply on {job.source}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">📚 Skill Gap Guidance</h2>
            <div className="space-y-3">
              {data.courses.map(course => (
                <div key={course.id} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-100">
                  <div>
                    <span className="font-medium text-gray-800">{course.title}</span>
                    <span className="text-xs text-gray-500 ml-2">({course.source})</span>
                  </div>
                  {/* OPENS REAL COURSE LINK */}
                  <button 
                    onClick={() => window.open(course.url, '_blank')}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Take Course on {course.source} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Mentors */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">🤝 Alumni Mentors</h2>
            <div className="space-y-4">
              {data.mentors.map(mentor => (
                <div key={mentor.id} className="flex items-center gap-3 border-b pb-3 last:border-0">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                    {mentor.company[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{mentor.title}</h4>
                    <p className="text-xs text-gray-600">Works at {mentor.company}</p>
                    {/* OPENS LINKEDIN */}
                    <button 
                      onClick={() => window.open(mentor.url, '_blank')}
                      className="text-xs text-blue-600 font-semibold mt-1 hover:underline"
                    >
                      Connect on LinkedIn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md p-6 text-white">
            <h2 className="text-lg font-bold mb-2">Not sure how to proceed?</h2>
            <p className="text-sm text-blue-100 mb-4">Use our Innovation Toolkits to analyze your skill gaps and plan your next move.</p>
            <button onClick={() => navigate('/tools')} className="bg-white text-blue-700 px-4 py-2 rounded font-bold text-sm w-full hover:bg-gray-100">
              Open Toolkits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;