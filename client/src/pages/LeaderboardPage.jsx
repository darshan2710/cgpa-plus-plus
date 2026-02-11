import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const LeaderboardPage = () => {
  const { api, token } = useAuth();
  const [tab, setTab] = useState('exam'); // 'quiz' or 'exam'
  const [quizLeaderboard, setQuizLeaderboard] = useState([]);
  const [examLeaderboard, setExamLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [quizRes, examRes] = await Promise.allSettled([
          api.get('/quiz/leaderboard', { headers }),
          api.get('/exam/leaderboard', { headers }),
        ]);

        if (quizRes.status === 'fulfilled') setQuizLeaderboard(quizRes.value.data);
        if (examRes.status === 'fulfilled') setExamLeaderboard(examRes.value.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatTime = (s) => {
    if (!s && s !== 0) return '—';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const medals = ['🥇', '🥈', '🥉'];

  const activeData = tab === 'exam' ? examLeaderboard : quizLeaderboard;

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-2">Leaderboard</h1>
          <p className="text-gray-500">Top performers ranked by score & speed</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { key: 'exam', label: '🧠 CS Exam' },
            { key: 'quiz', label: '📝 CGPA Quiz' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                tab === t.key
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow'
                  : 'bg-dark-700 text-gray-400 border border-dark-400 hover:border-dark-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeData.length === 0 ? (
          <div className="card text-center animate-fade-in">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-xl font-semibold mb-2">No Results Yet</h2>
            <p className="text-gray-400">
              {tab === 'exam'
                ? 'The CS Exam leaderboard will appear once participants complete their exam.'
                : 'The leaderboard will appear once participants complete their quizzes.'}
            </p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {activeData.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-10 animate-slide-up">
                {[1, 0, 2].map(podiumIdx => {
                  const entry = activeData[podiumIdx];
                  if (!entry) return null;
                  const isFirst = podiumIdx === 0;
                  return (
                    <div key={podiumIdx} className={`card text-center ${isFirst ? 'glow-border -mt-4' : 'mt-4'}`}>
                      <div className="text-3xl mb-2">{medals[podiumIdx]}</div>
                      <h3 className={`font-semibold ${isFirst ? 'text-lg' : 'text-sm'}`}>{entry.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{entry.college}</p>
                      {tab === 'exam' ? (
                        <>
                          <p className={`font-heading font-bold ${isFirst ? 'text-2xl gradient-text' : 'text-lg text-primary'}`}>
                            {entry.totalCorrect}/{entry.totalQuestions}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">⏱ {formatTime(entry.timeTakenSeconds)}</p>
                        </>
                      ) : (
                        <>
                          <p className={`font-heading font-bold ${isFirst ? 'text-3xl gradient-text' : 'text-xl text-primary'}`}>
                            {entry.cgpa?.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">CGPA</p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full Table */}
            <div className="card !p-0 overflow-hidden animate-slide-up">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-600 border-b border-dark-400">
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Rank</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium hidden sm:table-cell">College</th>
                      {tab === 'exam' ? (
                        <>
                          <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">Score</th>
                          <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">Accuracy</th>
                          <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium hidden md:table-cell">Time</th>
                        </>
                      ) : (
                        <>
                          <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">CGPA</th>
                          <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium hidden md:table-cell">SGPAs</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {activeData.map((entry, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-dark-400/50 transition-colors hover:bg-dark-600/50"
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
                        {tab === 'exam' ? (
                          <>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-heading font-bold ${idx < 10 ? 'text-primary' : 'text-gray-300'}`}>
                                {entry.totalCorrect}/{entry.totalQuestions}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="text-sm text-gray-300">{entry.accuracy}%</span>
                            </td>
                            <td className="px-4 py-3 text-center hidden md:table-cell">
                              <span className="px-2 py-0.5 bg-dark-500 rounded text-xs text-gray-400">
                                ⏱ {formatTime(entry.timeTakenSeconds)}
                              </span>
                            </td>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
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
