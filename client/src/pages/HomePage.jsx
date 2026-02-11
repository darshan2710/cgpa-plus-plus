import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const { user, api } = useAuth();
  const navigate = useNavigate();
  const [examStatus, setExamStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExam = async () => {
      try {
        const res = await api.get('/exam/status');
        setExamStatus(res.data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    checkExam();
  }, [api]);

  const formatTime = (s) => {
    if (!s && s !== 0) return '';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Welcome Back</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold gradient-text mb-3">
            Hello, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Ready to test your Core Computer Science knowledge?
          </p>
        </div>

        {/* Exam Card */}
        <div className="card !p-0 overflow-hidden animate-slide-up max-w-lg mx-auto">
          {/* Header gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                🧠
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Core CS Assessment</h2>
                <p className="text-xs text-gray-500">4 Rounds · 78 Questions · Timed</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: '📚', label: 'Rounds', value: '4' },
                { icon: '❓', label: 'Questions', value: '78' },
                { icon: '🏆', label: 'Ranked', value: 'By Speed' },
              ].map((s) => (
                <div key={s.label} className="bg-dark-600 rounded-xl p-3 text-center border border-dark-400">
                  <div className="text-lg mb-1">{s.icon}</div>
                  <p className="text-xs text-gray-500 mb-0.5">{s.label}</p>
                  <p className="text-sm font-heading font-bold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Subjects covered */}
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Subjects Covered</p>
              <div className="flex flex-wrap gap-2">
                {['C/C++', 'OOPs', 'DSA', 'Digital Design', 'COA', 'OS', 'DBMS', 'CN', 'SE', 'DAA', 'ML', 'HPC'].map((sub) => (
                  <span key={sub} className="px-2.5 py-1 rounded-lg bg-dark-500 text-xs text-gray-300 border border-dark-400">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="neon-line mb-8" />

            {loading ? (
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : examStatus?.taken ? (
              /* Already taken */
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <span className="text-emerald-400 text-sm font-semibold">✅ Assessment Completed</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-dark-600 rounded-xl p-3 border border-dark-400">
                    <p className="text-[10px] text-gray-500 mb-0.5">Score</p>
                    <p className="text-lg font-heading font-bold gradient-text">
                      {examStatus.result.totalCorrect}/{examStatus.result.totalQuestions}
                    </p>
                  </div>
                  <div className="bg-dark-600 rounded-xl p-3 border border-dark-400">
                    <p className="text-[10px] text-gray-500 mb-0.5">Time</p>
                    <p className="text-lg font-heading font-bold gradient-text">
                      {formatTime(examStatus.result.timeTakenSeconds)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs">You have already completed the assessment.</p>
              </div>
            ) : (
              /* Start button */
              <>
                <div className="bg-dark-600/50 rounded-xl p-4 border border-dark-400 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-lg mt-0.5">⚠️</span>
                    <div>
                      <p className="text-sm text-white font-medium mb-1">Important</p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Once you start, you <strong className="text-white">cannot go back or leave</strong> until all 
                        78 questions are answered. Your score and completion time determine your ranking.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/exam')}
                  className="btn-primary w-full !py-4 text-base font-bold group"
                >
                  <span className="flex items-center justify-center gap-3">
                    🚀 Start Assessment
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
