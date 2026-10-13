import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          InnoFlow
        </Link>
        <span className="text-sm text-gray-500">Innovation Toolkit</span>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

export default Layout;