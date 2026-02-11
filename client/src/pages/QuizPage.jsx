import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuizPage = () => {
  const { subjectId } = useParams();
  const { api } = useAuth();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [tabWarning, setTabWarning] = useState(false);
  const timerRef = useRef(null);
  const submittedRef = useRef(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/quiz/subjects/${subjectId}/questions`);
        setSubject(res.data);
        setTimeLeft(res.data.timer * 60);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [subjectId]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(([idx, opt]) => ({
        questionIndex: parseInt(idx),
        selectedOption: opt
      }));

      await api.post(`/quiz/subjects/${subjectId}/submit`, { answers: formattedAnswers });
      navigate('/dashboard');
    } catch (err) {
      submittedRef.current = false;
      setError(err.response?.data?.message || 'Failed to submit');
      setSubmitting(false);
    }
  }, [answers, subjectId, api, navigate]);

  // Timer
  useEffect(() => {
    if (!subject || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [subject, handleSubmit]);

  // Fullscreen
  useEffect(() => {
    if (subject) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
    return () => {
      document.exitFullscreen?.().catch(() => {});
    };
  }, [subject]);

  // Tab visibility detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabWarning(true);
        setTimeout(() => setTabWarning(false), 3000);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const selectAnswer = (qIdx, optIdx) => {
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-16">
        <div className="card text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  if (!subject) return null;

  const question = subject.questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const isTimeCritical = timeLeft < 60;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Tab Warning */}
      {tabWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500/90 text-white text-center py-3 text-sm font-semibold animate-slide-down">
          ⚠️ Tab switching detected! This activity is monitored.
        </div>
      )}

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-dark-700 border-b border-dark-400 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-sm">{subject.name}</h2>
            <p className="text-xs text-gray-500">Question {currentQ + 1} of {subject.questions.length}</p>
          </div>
          <div className={`font-heading text-2xl font-bold ${isTimeCritical ? 'text-red-500 animate-pulse' : 'gradient-text'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-5xl mx-auto mt-2">
          <div className="w-full h-1.5 bg-dark-500 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${(answeredCount / subject.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="pt-28 pb-24 px-4">
        <div className="max-w-3xl mx-auto animate-fade-in" key={currentQ}>
          <div className="card !p-8 mb-6">
            <span className="text-xs text-primary font-mono mb-4 block">Question {currentQ + 1}</span>
            <h3 className="text-lg sm:text-xl font-medium leading-relaxed">{question.questionText}</h3>
          </div>

          <div className="space-y-3">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(currentQ, idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  answers[currentQ] === idx
                    ? 'border-primary bg-primary/10 shadow-glow'
                    : 'border-dark-400 bg-dark-700 hover:border-dark-300 hover:bg-dark-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    answers[currentQ] === idx
                      ? 'bg-gradient-to-br from-primary to-accent text-white'
                      : 'bg-dark-500 text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={answers[currentQ] === idx ? 'text-white' : 'text-gray-300'}>{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark-700 border-t border-dark-400 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {subject.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQ(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                  idx === currentQ
                    ? 'bg-gradient-to-br from-primary to-accent text-white'
                    : answers[idx] !== undefined
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-dark-500 text-gray-500 hover:bg-dark-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {currentQ > 0 && (
              <button onClick={() => setCurrentQ(currentQ - 1)} className="btn-secondary !px-4 !py-2 text-sm">
                Prev
              </button>
            )}
            {currentQ < subject.questions.length - 1 ? (
              <button onClick={() => setCurrentQ(currentQ + 1)} className="btn-primary !px-4 !py-2 text-sm">
                Next
              </button>
            ) : (
              <button onClick={() => setShowConfirm(true)} className="btn-primary !px-6 !py-2 text-sm">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="card !p-8 max-w-sm w-full text-center animate-slide-up">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Submit Quiz?</h3>
            <p className="text-gray-400 text-sm mb-2">
              You have answered <span className="text-primary font-semibold">{answeredCount}</span> out of <span className="text-white font-semibold">{subject.questions.length}</span> questions.
            </p>
            {answeredCount < subject.questions.length && (
              <p className="text-yellow-500 text-xs mb-4">⚠️ {subject.questions.length - answeredCount} unanswered question(s) will be marked as wrong.</p>
            )}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowConfirm(false)} className="btn-secondary flex-1 text-sm">
                Review
              </button>
              <button onClick={handleSubmit} className="btn-primary flex-1 text-sm" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Confirm Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
