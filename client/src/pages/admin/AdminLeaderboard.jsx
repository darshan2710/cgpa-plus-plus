import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminLeaderboard = () => {
  const { api } = useAuth();
  const [data, setData] = useState({ active: [], completed: [], activeCount: 0, completedCount: 0 });
  const [history, setHistory] = useState([]);
  const [expandedArchive, setExpandedArchive] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [resetLabel, setResetLabel] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const intervalRef = useRef(null);

  const fetchLive = async () => {
    try {
      const res = await api.get('/exam/live');
      setData(res.data);
    } catch (err) {
      console.error('Live fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get('/exam/history');
      setHistory(res.data);
    } catch (err) {
      console.error('History fetch error:', err);
    }
  };

  useEffect(() => {
    fetchLive();
    fetchHistory();
    intervalRef.current = setInterval(fetchLive, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleReset = async () => {
    setResetting(true);
    try {
      await api.post('/exam/reset', { label: resetLabel || undefined });
      setShowResetConfirm(false);
      setResetLabel('');
      await fetchLive();
      await fetchHistory();
      alert('✅ Leaderboard archived and reset successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reset');
    } finally {
      setResetting(false);
    }
  };

  const handleDeleteArchive = async (id) => {
    if (!window.confirm('Delete this archived session permanently?')) return;
    try {
      await api.delete(`/exam/history/${id}`);
      setHistory(prev => prev.filter(a => a._id !== id));
      if (expandedArchive === id) setExpandedArchive(null);
    } catch (err) {
      alert('Failed to delete archive');
    }
  };

  const formatTime = (s) => {
    if (!s && s !== 0) return '—';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const exportCSV = () => {
    if (data.completed.length === 0) return;
    const headers = ['Rank', 'Name', 'Email', 'College', 'Score', 'Accuracy', 'Time'];
    const rows = data.completed.map(e => [
      e.rank, e.name, e.email, e.college,
      `${e.totalCorrect}/${e.totalQuestions}`, `${e.accuracy}%`, formatTime(e.timeTakenSeconds)
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exam_leaderboard.csv';
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
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold gradient-text mb-1">Live Exam Dashboard</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {data.activeCount} taking now
              </span>
              <span>✅ {data.completedCount} completed</span>
              <span className="text-gray-600">• auto-refreshing</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowHistory(!showHistory)} className="btn-secondary !px-4 !py-2 text-sm">
              📜 {showHistory ? 'Hide' : 'View'} History {history.length > 0 && `(${history.length})`}
            </button>
            <button onClick={exportCSV} className="btn-secondary !px-4 !py-2 text-sm">
              📥 Export CSV
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="!px-4 !py-2 text-sm rounded-xl font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
            >
              🔄 Archive & Reset
            </button>
          </div>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="card !p-6 max-w-md w-full animate-slide-up">
              <h3 className="text-lg font-heading font-bold text-white mb-2">Archive & Reset Leaderboard</h3>
              <p className="text-gray-400 text-sm mb-4">
                This will save the current {data.completedCount} results as a historical snapshot, then
                <strong className="text-red-400"> delete all current results and progress</strong> so new participants can take the exam.
              </p>
              <input
                type="text"
                value={resetLabel}
                onChange={(e) => setResetLabel(e.target.value)}
                placeholder="Optional label (e.g. Batch 1 — Feb 2026)"
                className="w-full bg-dark-600 border border-dark-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-primary"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  disabled={resetting || data.completedCount === 0}
                  className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50"
                >
                  {resetting ? 'Archiving...' : `Archive ${data.completedCount} Results & Reset`}
                </button>
                <button
                  onClick={() => { setShowResetConfirm(false); setResetLabel(''); }}
                  className="btn-secondary !px-4 !py-2.5 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── HISTORY ── */}
        {showHistory && (
          <div className="mb-8 animate-fade-in">
            <h2 className="font-heading text-lg font-bold text-white mb-4">
              📜 Past Sessions
              <span className="text-sm text-gray-500 font-normal ml-2">({history.length})</span>
            </h2>

            {history.length === 0 ? (
              <div className="card text-center !py-8">
                <p className="text-gray-400">No archived sessions yet. Use "Archive & Reset" to save a snapshot.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((archive) => (
                  <div key={archive._id} className="card !p-0 overflow-hidden">
                    <div
                      className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-dark-600/50 transition-colors"
                      onClick={() => setExpandedArchive(expandedArchive === archive._id ? null : archive._id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📁</span>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{archive.label || 'Untitled Session'}</h4>
                          <p className="text-xs text-gray-500">
                            {new Date(archive.archivedAt).toLocaleString()} · {archive.totalParticipants} participants
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteArchive(archive._id); }}
                          className="text-xs text-red-400 hover:text-red-300 px-2 py-1"
                        >
                          🗑️ Delete
                        </button>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${expandedArchive === archive._id ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {expandedArchive === archive._id && (
                      <div className="border-t border-dark-400">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-dark-600">
                                <th className="text-left px-4 py-2 text-xs text-gray-400">Rank</th>
                                <th className="text-left px-4 py-2 text-xs text-gray-400">Name</th>
                                <th className="text-left px-4 py-2 text-xs text-gray-400 hidden sm:table-cell">Email</th>
                                <th className="text-center px-4 py-2 text-xs text-gray-400">Score</th>
                                <th className="text-center px-4 py-2 text-xs text-gray-400">Accuracy</th>
                                <th className="text-center px-4 py-2 text-xs text-gray-400 hidden md:table-cell">Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {archive.results.map((r, i) => (
                                <tr key={i} className="border-t border-dark-400/50">
                                  <td className="px-4 py-2 text-sm">
                                    <span className={i < 3 ? 'text-primary font-bold' : 'text-gray-400'}>
                                      {i < 3 ? ['🥇','🥈','🥉'][i] : `#${r.rank}`}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-sm text-white">{r.userName}</td>
                                  <td className="px-4 py-2 text-sm text-gray-400 hidden sm:table-cell">{r.userEmail}</td>
                                  <td className="px-4 py-2 text-sm text-center text-primary font-bold">{r.totalCorrect}/{r.totalQuestions}</td>
                                  <td className="px-4 py-2 text-sm text-center text-gray-300">{r.accuracy}%</td>
                                  <td className="px-4 py-2 text-sm text-center text-gray-400 hidden md:table-cell">{formatTime(r.timeTakenSeconds)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ACTIVE PARTICIPANTS ── */}
        {data.active.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="font-heading text-lg font-bold text-white">
                Currently Taking Exam
                <span className="text-sm text-gray-500 font-normal ml-2">({data.activeCount})</span>
              </h2>
            </div>

            <div className="grid gap-3">
              {data.active.map((p, idx) => (
                <div key={idx} className="card !p-4 border-l-4 border-l-emerald-400">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-white truncate">{p.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                          R{p.currentRound}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{p.email} · {p.college}</p>
                      <p className="text-xs text-gray-600 mt-0.5">📄 {p.currentSection}</p>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <p className="text-xl font-heading font-bold gradient-text">
                          {p.answeredCount}<span className="text-sm text-gray-500">/{p.totalQuestions}</span>
                        </p>
                        <p className="text-[10px] text-gray-600 uppercase">answered</p>
                      </div>
                      <div className="w-24 sm:w-32">
                        <div className="w-full h-2 bg-dark-500 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5 text-center">{p.progress}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading font-bold text-white">{formatTime(p.elapsedSeconds)}</p>
                        <p className="text-[10px] text-gray-600 uppercase">elapsed</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── COMPLETED PARTICIPANTS ── */}
        <div>
          <h2 className="font-heading text-lg font-bold text-white mb-4">
            Completed Results
            <span className="text-sm text-gray-500 font-normal ml-2">({data.completedCount})</span>
          </h2>

          {data.completed.length === 0 ? (
            <div className="card text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">No Completed Results Yet</h3>
              <p className="text-gray-400">Results will appear here as participants finish the exam.</p>
            </div>
          ) : (
            <div className="card !p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-600 border-b border-dark-400">
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Rank</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium hidden sm:table-cell">Email</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium hidden md:table-cell">College</th>
                      <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">Score</th>
                      <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">Accuracy</th>
                      <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium hidden md:table-cell">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.completed.map((entry, idx) => {
                      const medals = ['🥇', '🥈', '🥉'];
                      return (
                        <tr key={idx} className={`border-b border-dark-400/50 transition-colors hover:bg-dark-600/50 ${idx < 3 ? 'bg-primary/5' : ''}`}>
                          <td className="px-4 py-3">
                            <span className={`font-heading font-bold ${idx < 3 ? 'text-primary text-lg' : 'text-gray-400'}`}>
                              {idx < 3 ? medals[idx] : `#${entry.rank}`}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-sm">{entry.name}</td>
                          <td className="px-4 py-3 text-gray-400 text-sm hidden sm:table-cell">{entry.email}</td>
                          <td className="px-4 py-3 text-gray-400 text-sm hidden md:table-cell">{entry.college}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-heading font-bold ${idx < 3 ? 'text-primary' : 'text-gray-300'}`}>
                              {entry.totalCorrect}/{entry.totalQuestions}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-gray-300">{entry.accuracy}%</td>
                          <td className="px-4 py-3 text-center hidden md:table-cell">
                            <span className="px-2 py-0.5 bg-dark-500 rounded text-xs text-gray-400">
                              ⏱ {formatTime(entry.timeTakenSeconds)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
