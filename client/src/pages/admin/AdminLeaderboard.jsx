import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminLeaderboard = () => {
  const { api } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/export-leaderboard')
      .then(res => setLeaderboard(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCalculateRanks = async () => {
    try {
      await api.post('/admin/calculate-ranks');
      const res = await api.get('/admin/export-leaderboard');
      setLeaderboard(res.data);
      alert('✅ Ranks recalculated!');
    } catch (err) {
      alert('Failed to calculate ranks');
    }
  };

  const exportCSV = () => {
    if (leaderboard.length === 0) return;
    const headers = ['Rank', 'Name', 'Email', 'College', 'CGPA'];
    const rows = leaderboard.map(e => [e.rank, e.name, e.email, e.college, e.cgpa?.toFixed(2)]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cgpaplus_leaderboard.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-heading text-3xl font-bold gradient-text mb-2">Admin Leaderboard</h1>
            <p className="text-gray-500">{leaderboard.length} completed participants</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCalculateRanks} className="btn-secondary !px-5 !py-2 text-sm">
              📊 Recalculate Ranks
            </button>
            <button onClick={exportCSV} className="btn-primary !px-5 !py-2 text-sm">
              📥 Export CSV
            </button>
          </div>
        </div>

        {leaderboard.length === 0 ? (
          <div className="card text-center">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-xl font-semibold mb-2">No Completed Results</h2>
            <p className="text-gray-400">Results will appear here once participants complete all subjects.</p>
          </div>
        ) : (
          <div className="card !p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-dark-600 border-b border-dark-400">
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Rank</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Name</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Email</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium hidden md:table-cell">College</th>
                    <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">CGPA</th>
                    <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium hidden lg:table-cell">SGPA Breakdown</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, idx) => (
                    <tr key={idx} className={`border-b border-dark-400/50 hover:bg-dark-600/50 transition-colors ${idx < 3 ? 'bg-primary/5' : ''}`}>
                      <td className="px-4 py-3">
                        <span className={`font-heading font-bold ${idx < 3 ? 'text-primary text-lg' : 'text-gray-400'}`}>
                          #{entry.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-sm">{entry.name}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{entry.email}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm hidden md:table-cell">{entry.college}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-heading font-bold text-primary text-lg">{entry.cgpa?.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-3 text-center hidden lg:table-cell">
                        <div className="flex gap-1 justify-center flex-wrap">
                          {entry.semesterSGPAs?.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-dark-500 rounded text-xs text-gray-400">
                              S{s.semester}: {s.sgpa?.toFixed(1)}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeaderboard;
