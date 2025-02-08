import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import EditEventModal from "../components/EditEventModal";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const guest = token ? jwtDecode(token).guest : true;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="text-white text-2xl font-bold tracking-tight hover:text-blue-100 transition-colors"
              >
                Evently
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {token ? (
                  <>
                    {!guest && (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center cursor-pointer space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-all"
                      >
                        <svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span>Create Event</span>
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer space-x-2 text-red-300 hover:text-red-100 px-3 py-2 rounded-md transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m13 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h11a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {token ? (
                <>
                  {!guest && (
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-white hover:bg-white/20 px-3 py-2 rounded-md transition-colors"
                    >
                      Create Event
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-200 hover:text-red-100 px-3 py-2 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <EditEventModal
          event={null}
          onClose={() => setIsModalOpen(false)}
          onUpdate={() => window.location.reload()}
        />
      )}
    </>
  );
}