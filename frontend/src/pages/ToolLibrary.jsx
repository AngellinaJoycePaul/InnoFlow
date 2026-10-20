import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const toolCategories = [
  {
    category: 'Problem Analysis',
    description: 'Diagnose the problem using structured tools (Unit II)',
    tools: [
      { name: '5 Whys', route: '/5whys', active: true },
      { name: 'Fishbone Diagram', active: false },
      { name: 'Stakeholder Mapping', active: false },
      { name: 'Empathy Map', active: false },
      { name: 'Value Chain Analysis', active: false }
    ],
  },
  {
    category: 'Idea Generation',
    description: 'Generate diverse solutions using creative techniques (Unit III)',
    tools: [
      { name: 'TRIZ', active: false },
      { name: 'Six Thinking Hats', active: false },
      { name: 'Lateral Thinking', active: false },
      { name: 'Forced Association', active: false }
    ],
  },
  {
    category: 'Decision Making',
    description: 'Evaluate and prioritize solutions using decision toolkits (Unit V)',
    tools: [
      { name: 'Decision Matrix', active: false },
      { name: 'MoSCoW', active: false },
      { name: 'ICE Scoring', active: false },
      { name: 'RICE Scoring', active: false },
      { name: 'Risk Assessment', active: false }
    ],
  },
  {
    category: 'Digital Innovation',
    description: 'Leverage AI and digital tools for refinement and visualization (Unit IV)',
    tools: [
      { name: 'AI Idea Generation', active: false },
      { name: 'AI Concept Refinement', active: false },
      { name: 'Visualization Export', active: false },
      { name: 'Innovation Toolkit Canvas', active: false }
    ],
  },
];

function ToolLibrary() {
  const [selectedTool, setSelectedTool] = useState(null);
  const navigate = useNavigate();

  const handleToolClick = (tool) => {
    if (tool.active && tool.route) {
      navigate(tool.route);
    } else {
      setSelectedTool({ tool: tool.name, category: 'Coming Soon' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </button>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Tool Library</h1>
      <p className="text-gray-600 mb-8">
        All innovation toolkits classified by category. Active tools are clickable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolCategories.map((cat) => (
          <div
            key={cat.category}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {cat.category}
            </h2>
            <p className="text-xs text-gray-500 mb-4">{cat.description}</p>
            <ul className="space-y-2">
              {cat.tools.map((tool) => (
                <li key={tool.name}>
                  <button
                    onClick={() => handleToolClick(tool)}
                    className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md border transition-colors ${
                      tool.active 
                        ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' 
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-3 ${tool.active ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                      <span className={tool.active ? 'text-blue-800 font-medium' : 'text-gray-700'}>
                        {tool.name}
                      </span>
                    </div>
                    {tool.active && (
                      <span className="text-xs text-blue-600 font-semibold">Open</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedTool && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTool(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {selectedTool.tool}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {selectedTool.category}
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-4">
              <p className="text-sm text-blue-800">
                This tool is part of the InnoFlow toolkit. It will be implemented in the next build phase.
              </p>
            </div>
            <button
              onClick={() => setSelectedTool(null)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolLibrary;