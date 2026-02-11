import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const LeaderboardPage = () => {
  const { api, token } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Use public or auth endpoint
        const endpoint = token ? '/quiz/leaderboard' : '/quiz/leaderboard';
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await api.get(endpoint, { headers });
        setLeaderboard(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-2">Leaderboard</h1>
          <p className="text-gray-500">Top performers across all colleges</p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="card text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-xl font-semibold mb-2">No Results Yet</h2>
            <p className="text-gray-400">The leaderboard will appear once participants complete their quizzes.</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-10 animate-slide-up">
                {[1, 0, 2].map(podiumIdx => {
                  const entry = leaderboard[podiumIdx];
                  if (!entry) return null;
                  const isFirst = podiumIdx === 0;
                  return (
                    <div key={podiumIdx} className={`card text-center ${isFirst ? 'glow-border -mt-4' : 'mt-4'}`}>
                      <div className="text-3xl mb-2">{medals[podiumIdx]}</div>
                      <h3 className={`font-semibold ${isFirst ? 'text-lg' : 'text-sm'}`}>{entry.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{entry.college}</p>
                      <p className={`font-heading font-bold ${isFirst ? 'text-3xl gradient-text' : 'text-xl text-primary'}`}>
                        {entry.cgpa?.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">CGPA</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full Leaderboard Table */}
            <div className="card !p-0 overflow-hidden animate-slide-up">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-600 border-b border-dark-400">
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Rank</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium hidden sm:table-cell">College</th>
                      <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">CGPA</th>
                      <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium hidden md:table-cell">SGPAs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-dark-400/50 transition-colors hover:bg-dark-600/50 ${
                          idx < 10 ? 'relative' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          <span className={`font-heading font-bold ${idx < 3 ? 'text-primary text-lg' : 'text-gray-400'}`}>
                            {idx < 3 ? medals[idx] : `#${entry.rank}`}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-medium ${idx < 10 ? 'text-white' : 'text-gray-300'}`}>{entry.name}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm hidden sm:table-cell">{entry.college}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-heading font-bold ${idx < 10 ? 'text-primary' : 'text-gray-300'}`}>
                            {entry.cgpa?.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center hidden md:table-cell">
                          <div className="flex gap-1 justify-center flex-wrap">
                            {entry.semesterSGPAs?.map((s, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-dark-500 rounded text-xs text-gray-400">
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
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
