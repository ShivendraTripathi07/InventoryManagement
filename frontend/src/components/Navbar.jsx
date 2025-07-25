import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">IS</span>
              </div>
              <span>Inventory System</span>
            </Link>
          </div>

          {/* Navigation Links */}
          {user ? (
            <div className="flex items-center space-x-1">
              {/* Main Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/products"
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  Products
                </Link>
                <Link
                  to="/analytics"
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  Analytics
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 font-medium flex items-center space-x-1"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    <span>Admin</span>
                  </Link>
                )}
              </div>

              {/* User Section */}
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">
                    {user.name || user.email}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Logout
                </button>
              </div>

              {/* Mobile Menu Button - You can expand this for mobile navigation */}
              <div className="md:hidden ml-4">
                <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
