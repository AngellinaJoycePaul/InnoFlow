import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ToolLibrary from './pages/ToolLibrary';
import FiveWhys from './pages/FiveWhys';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/5whys" element={<FiveWhys />} /> {/* Updated path */}
        <Route path="/tools" element={<ToolLibrary />} />
      </Routes>
    </Layout>
  );
}

export default App;