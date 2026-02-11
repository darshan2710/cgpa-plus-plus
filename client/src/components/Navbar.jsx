import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LCSLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-sm">
      LCS
    </div>
    <span className="font-heading text-lg font-bold gradient-text hidden sm:block">CGPA++</span>
  </div>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <LCSLogo />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <>
                    <Link to="/admin" className="text-gray-300 hover:text-white transition-colors text-sm">Dashboard</Link>
                    <Link to="/admin/subjects" className="text-gray-300 hover:text-white transition-colors text-sm">Subjects</Link>
                    <Link to="/admin/participants" className="text-gray-300 hover:text-white transition-colors text-sm">Participants</Link>
                    <Link to="/admin/leaderboard" className="text-gray-300 hover:text-white transition-colors text-sm">Leaderboard</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">Quiz</Link>
                    <Link to="/result" className="text-gray-300 hover:text-white transition-colors text-sm">Results</Link>
                    <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors text-sm">Leaderboard</Link>
                    <Link to="/certificate" className="text-gray-300 hover:text-white transition-colors text-sm">Certificate</Link>
                  </>
                )}
                <div className="flex items-center gap-3 pl-4 border-l border-dark-400">
                  <span className="text-sm text-gray-400">{user.name}</span>
                  <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors text-sm">Leaderboard</Link>
                <Link to="/login" className="btn-secondary !px-5 !py-2 text-sm">Login</Link>
                <Link to="/register" className="btn-primary !px-5 !py-2 text-sm">Register</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-gray-300" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    <>
                      <Link to="/admin" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                      <Link to="/admin/subjects" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Subjects</Link>
                      <Link to="/admin/participants" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Participants</Link>
                      <Link to="/admin/leaderboard" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Leaderboard</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Quiz</Link>
                      <Link to="/result" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Results</Link>
                      <Link to="/leaderboard" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Leaderboard</Link>
                      <Link to="/certificate" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Certificate</Link>
                    </>
                  )}
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-left text-red-400 py-2 text-sm">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/leaderboard" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Leaderboard</Link>
                  <Link to="/login" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/register" className="text-gray-300 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
