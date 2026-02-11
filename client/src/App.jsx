import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuizDashboard from './pages/QuizDashboard';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CertificatePage from './pages/CertificatePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageSubjects from './pages/admin/ManageSubjects';
import ViewParticipants from './pages/admin/ViewParticipants';
import AdminLeaderboard from './pages/admin/AdminLeaderboard';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  return children;
};

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><QuizDashboard /></ProtectedRoute>} />
        <Route path="/quiz/:subjectId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/certificate" element={<ProtectedRoute><CertificatePage /></ProtectedRoute>} />
        
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/subjects" element={<ProtectedRoute adminOnly><ManageSubjects /></ProtectedRoute>} />
        <Route path="/admin/participants" element={<ProtectedRoute adminOnly><ViewParticipants /></ProtectedRoute>} />
        <Route path="/admin/leaderboard" element={<ProtectedRoute adminOnly><AdminLeaderboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
