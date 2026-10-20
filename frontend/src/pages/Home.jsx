import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    skills: '',
    interest: 'Software Development'
  });

  const handleStart = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Seed DB on first run just for demo
      await api.post('/api/match/seed');
      
      // Save profile
      const res = await api.post('/api/match/profile', profile);
      // Save ID to local storage
      localStorage.setItem('innoflow_profile_id', res.data.id);
      localStorage.setItem('innoflow_name', res.data.name);
      
      navigate('/dashboard');
    } catch (err) {
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to InnoFlow</h1>
        <p className="text-xl text-gray-600">Your centralized platform for internships, mentorship, and skill guidance.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Build Your Profile</h2>
        
        <form onSubmit={handleStart} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" required value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., Angellina" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Skills (comma separated)</label>
            <input type="text" required value={profile.skills} onChange={(e) => setProfile({...profile, skills: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., React, Python, SQL" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Career Interest</label>
            <select value={profile.interest} onChange={(e) => setProfile({...profile, interest: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Software Development</option>
              <option>Data Science</option>
              <option>Design</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors mt-4">
            {loading ? 'Analyzing...' : 'Generate My Path'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;