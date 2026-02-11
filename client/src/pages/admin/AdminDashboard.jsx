import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { api } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: 'Participants', value: stats?.totalParticipants || 0, icon: '👥', color: 'from-blue-500 to-blue-700' },
    { label: 'Subjects', value: stats?.totalSubjects || 0, icon: '📚', color: 'from-primary to-accent' },
    { label: 'Completed', value: stats?.completedQuizzes || 0, icon: '✅', color: 'from-green-500 to-green-700' },
    { label: 'Top CGPA', value: stats?.topCGPA?.toFixed(2) || '0.00', icon: '🏆', color: 'from-yellow-500 to-yellow-700' },
  ];

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 animate-fade-in">
          <h1 className="font-heading text-3xl font-bold gradient-text mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">Manage CGPA++ platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat, idx) => (
            <div key={idx} className="card text-center animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="font-heading text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
          <Link to="/admin/subjects" className="card group hover:border-primary/50 text-center">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-semibold mb-1">Manage Subjects</h3>
            <p className="text-xs text-gray-500">Create & edit subjects, questions</p>
          </Link>
          <Link to="/admin/participants" className="card group hover:border-primary/50 text-center">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold mb-1">View Participants</h3>
            <p className="text-xs text-gray-500">See registered participants</p>
          </Link>
          <Link to="/admin/leaderboard" className="card group hover:border-primary/50 text-center">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-semibold mb-1">Leaderboard</h3>
            <p className="text-xs text-gray-500">View & export rankings</p>
          </Link>
          <button
            onClick={async () => {
              try {
                await api.post('/admin/calculate-ranks');
                alert('Ranks calculated successfully!');
              } catch (err) {
                alert('Failed to calculate ranks');
              }
            }}
            className="card group hover:border-primary/50 text-center"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold mb-1">Calculate Ranks</h3>
            <p className="text-xs text-gray-500">Update all participant ranks</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
