import { useState, useEffect } from 'react';
import { listProjects, createProject } from '../services/projectService';

function Home() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      const data = await listProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError('');

    try {
      await createProject({
        title: title.trim(),
        problem_statement: problemStatement.trim() || null,
      });
      setTitle('');
      setProblemStatement('');
      await fetchProjects();
    } catch (err) {
      console.error(err);
      setError('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome to InnoFlow
      </h1>
      <p className="text-gray-600 mb-8">
        An Integrated Digital Innovation Toolkit with Smart Tool Recommendation
      </p>

      {/* Create Project Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Start a New Innovation Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Student Placement and Internship Discovery"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Problem Statement
            </label>
            <textarea
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Describe the problem you want to solve..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Your Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No projects yet. Create your first one above.
          </p>
        ) : (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className="border border-gray-200 rounded-md p-4 hover:border-blue-300 transition-colors"
              >
                <h3 className="font-medium text-gray-800">{project.title}</h3>
                {project.problem_statement && (
                  <p className="text-sm text-gray-600 mt-1">
                    {project.problem_statement}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Stage: {project.current_stage} · Created:{' '}
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;