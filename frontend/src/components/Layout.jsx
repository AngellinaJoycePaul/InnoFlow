import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1 rounded text-sm">iF</span> InnoFlow
        </Link>
        <nav className="flex gap-6">
          <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            My Dashboard
          </Link>
          <Link to="/tools" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Toolkits
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-500">
        InnoFlow · Student Placement and Internship Discovery
      </footer>
    </div>
  );
}

export default Layout;