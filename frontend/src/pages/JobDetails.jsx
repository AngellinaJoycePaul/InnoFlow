import { useLocation, useNavigate } from 'react-router-dom';

function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">No job selected</h2>
        <button onClick={() => navigate('/dashboard')} className="text-blue-600 mt-4 hover:underline">Go back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="text-blue-600 mb-6 hover:underline">
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-xl text-gray-600 mt-1">{job.company}</p>
          </div>
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold text-lg">
            {job.match_score}% Match
          </span>
        </div>

        <div className="flex gap-4 mb-8">
          <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded">Source: {job.source}</span>
          <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded">Type: {job.type}</span>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Job Description</h3>
            <p className="text-gray-600 leading-relaxed">
              We are looking for a motivated {job.title} to join our team at {job.company}. 
              Based on your InnoFlow profile, you are a great fit for this role because you possess the required skills.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Requirements</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Must be currently enrolled in a degree program.</li>
              <li>Strong communication and teamwork skills.</li>
              <li>Familiarity with the skills listed in your profile.</li>
            </ul>
          </div>

          <button 
            onClick={() => alert(`Application submitted for ${job.title} at ${job.company}!`)}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Now via {job.source}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;