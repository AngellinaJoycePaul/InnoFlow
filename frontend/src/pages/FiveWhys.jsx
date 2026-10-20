import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const questions = [
  "Why is this problem happening?",
  "Why is that happening?",
  "Why is that happening?",
  "Why is that happening?",
  "Why is that happening (Root Cause)?"
];

function FiveWhys() {
  const navigate = useNavigate();
  // Get the current user's ID from local storage
  const profileId = localStorage.getItem('innoflow_profile_id');
  
  const [answers, setAnswers] = useState(['', '', '', '', '']);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // If no user, kick them back to login
    if (!profileId) {
      navigate('/');
      return;
    }
    // Try to load previous answers using the profile ID
    api.get(`/api/toolkits/${profileId}/5_whys`)
      .then(res => setAnswers(JSON.parse(res.data.data)))
      .catch(err => console.log('No previous data found'));
  }, [profileId, navigate]);

  const handleSave = async () => {
    try {
      await api.post('/api/toolkits/save', {
        project_id: parseInt(profileId), // Use profile ID as the project ID
        tool_name: '5_whys',
        data: JSON.stringify(answers)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Failed to save');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="text-blue-600 mb-4 hover:underline">
        ← Back to Dashboard
      </button>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">5 Whys Analysis</h1>
        <p className="text-gray-600 mb-6">Drill down to find the root cause of your problem (Unit II).</p>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why {index + 1}: {q}
              </label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter answer..."
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Analysis
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">Saved successfully!</span>}
        </div>
      </div>
    </div>
  );
}

export default FiveWhys;