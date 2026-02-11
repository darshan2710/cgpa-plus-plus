import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { examData } from '../data/examData';

// ── Flatten all sections across rounds into a sequential list ────────────────
const buildSections = () => {
  const sections = [];
  examData.rounds.forEach((round) => {
    round.sections.forEach((section) => {
      sections.push({ ...section, roundId: round.id, roundName: round.name });
    });
  });
  return sections;
};

const ALL_SECTIONS = buildSections();
const TOTAL_QUESTIONS = ALL_SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);
const LETTER_MAP = ['A', 'B', 'C', 'D'];

// ═════════════════════════════════════════════════════════════════════════════
// Option Button — No feedback, just selection highlighting
// ═════════════════════════════════════════════════════════════════════════════
const OptionButton = ({ idx, text, selected, onClick }) => {
  const letter = LETTER_MAP[idx];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
        selected
          ? 'border-primary bg-primary/10 shadow-glow'
          : 'border-dark-400 bg-dark-700 hover:border-dark-300 hover:bg-dark-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
          selected
            ? 'bg-gradient-to-br from-primary to-accent text-white'
            : 'bg-dark-500 text-gray-400'
        }`}>
          {letter}
        </div>
        <span className={`text-sm sm:text-base ${selected ? 'text-white' : 'text-gray-300'}`}>
          {text}
        </span>
      </div>
    </button>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Live Progress Sidebar
// ═════════════════════════════════════════════════════════════════════════════
const LiveProgress = ({ totalAnswered, currentStep, elapsedSeconds }) => {
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      <div className="card !p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Exam Progress</h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Answered</p>
            <p className="text-xl font-heading font-bold gradient-text">{totalAnswered} / {TOTAL_QUESTIONS}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Time Elapsed</p>
            <p className="text-xl font-heading font-bold text-white">{formatTime(elapsedSeconds)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Completion</p>
            <p className="text-xl font-heading font-bold gradient-text">{((totalAnswered / TOTAL_QUESTIONS) * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Section Progress */}
      <div className="card !p-5">
        <p className="text-xs text-gray-500 mb-2">Section</p>
        <p className="text-lg font-heading font-bold text-white">
          {Math.min(currentStep + 1, ALL_SECTIONS.length)} <span className="text-gray-600">/ {ALL_SECTIONS.length}</span>
        </p>
        <div className="w-full h-1.5 bg-dark-500 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${(Math.min(currentStep + 1, ALL_SECTIONS.length) / ALL_SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Completion Screen
// ═════════════════════════════════════════════════════════════════════════════
const CompletionScreen = ({ result, submitting, error }) => {
  const navigate = useNavigate();

  if (submitting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
        <div className="card !p-10 max-w-md w-full text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-heading font-bold gradient-text mb-2">Submitting Exam...</h2>
          <p className="text-gray-400 text-sm">Grading your answers on the server</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
        <div className="card !p-10 max-w-md w-full text-center animate-slide-up">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-heading font-bold text-red-400 mb-2">Submission Error</h2>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary w-full">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="card !p-10 max-w-lg w-full text-center animate-slide-up">
        <div className="text-6xl mb-4">
          {result.accuracy >= 75 ? '🏆' : result.accuracy >= 50 ? '🎯' : '📝'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold gradient-text mb-2">Assessment Complete</h2>
        <p className="text-gray-400 text-sm mb-8">Your answers have been graded on the server</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Score', value: `${result.totalCorrect} / ${result.totalQuestions}` },
            { label: 'Accuracy', value: `${result.accuracy}%` },
            { label: 'Time Taken', value: formatTime(result.timeTakenSeconds) },
            { label: 'Status', value: result.accuracy >= 90 ? 'Elite' : result.accuracy >= 75 ? 'Strong' : result.accuracy >= 60 ? 'Passing' : result.accuracy >= 45 ? 'At Risk' : 'Needs Work' },
          ].map((s) => (
            <div key={s.label} className="bg-dark-600 rounded-xl p-4 border border-dark-400">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-xl font-heading font-bold gradient-text">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="neon-line mb-8" />

        <div className="flex gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-primary flex-1">Dashboard</button>
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Already Taken Screen
// ═════════════════════════════════════════════════════════════════════════════
const AlreadyTakenScreen = ({ result }) => {
  const navigate = useNavigate();
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="card !p-10 max-w-md w-full text-center animate-slide-up">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-heading font-bold gradient-text mb-2">Already Completed</h2>
        <p className="text-gray-400 text-sm mb-6">You have already submitted the CS Exam</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-dark-600 rounded-xl p-3 border border-dark-400">
            <p className="text-[10px] text-gray-500 mb-0.5">Score</p>
            <p className="text-lg font-heading font-bold gradient-text">{result.totalCorrect}/{result.totalQuestions}</p>
          </div>
          <div className="bg-dark-600 rounded-xl p-3 border border-dark-400">
            <p className="text-[10px] text-gray-500 mb-0.5">Time</p>
            <p className="text-lg font-heading font-bold gradient-text">{formatTime(result.timeTakenSeconds)}</p>
          </div>
        </div>

        <button onClick={() => navigate('/dashboard')} className="btn-primary w-full">Return to Dashboard</button>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Main ExamModule Component
// ═════════════════════════════════════════════════════════════════════════════
const ExamModule = () => {
  const { api } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: letter }
  const [isComplete, setIsComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  // Timer
  const [startedAt] = useState(() => new Date().toISOString());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);

  // Tab-switch detection
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const tabSwitchRef = useRef(0);
  const autoSubmitTriggered = useRef(false);

  // Check if already taken
  const [checking, setChecking] = useState(true);
  const [alreadyTaken, setAlreadyTaken] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.get('/exam/status');
        if (res.data.taken) {
          setAlreadyTaken(res.data.result);
        }
      } catch (err) {
        console.log('Status check:', err.message);
      } finally {
        setChecking(false);
      }
    };
    checkStatus();
  }, [api]);

  // ── Enter fullscreen on exam start ──
  useEffect(() => {
    if (checking || alreadyTaken || isComplete) return;

    const enterFullscreen = async () => {
      try {
        const el = document.documentElement;
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      } catch (err) {
        console.log('Fullscreen request failed:', err.message);
      }
    };
    enterFullscreen();

    return () => {
      // Exit fullscreen on cleanup
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [checking, alreadyTaken, isComplete]);

  // ── Tab switch detection ──
  useEffect(() => {
    if (checking || alreadyTaken || isComplete) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchRef.current += 1;
        setTabSwitchCount(tabSwitchRef.current);
        setShowTabWarning(true);

        if (tabSwitchRef.current >= 3 && !autoSubmitTriggered.current) {
          autoSubmitTriggered.current = true;
          // Auto-submit will be triggered via the state update
        }
      }
    };

    // Re-enter fullscreen if user exits it
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !isComplete && !autoSubmitTriggered.current) {
        // Try re-entering fullscreen
        const el = document.documentElement;
        if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [checking, alreadyTaken, isComplete]);

  // Elapsed time counter
  useEffect(() => {
    if (checking || alreadyTaken || isComplete) return;
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [checking, alreadyTaken, isComplete]);

  // ── Navigation Lock — prevent back/close during exam ──
  useEffect(() => {
    if (checking || alreadyTaken || isComplete) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [checking, alreadyTaken, isComplete]);

  const section = ALL_SECTIONS[currentStep];

  const roundProgress = useMemo(() => {
    return examData.rounds.map((r) => {
      const sectionIndices = ALL_SECTIONS
        .map((s, i) => (s.roundId === r.id ? i : -1))
        .filter((i) => i >= 0);
      const total = sectionIndices.length;
      const completed = sectionIndices.filter((i) => i < currentStep).length;
      const isCurrent = sectionIndices.some((i) => i === currentStep);
      return { id: r.id, name: r.name, total, completed, isCurrent };
    });
  }, [currentStep]);

  const totalAnswered = useMemo(() => Object.keys(selectedAnswers).length, [selectedAnswers]);

  const handleOptionClick = useCallback((questionId, optionIdx) => {
    setSelectedAnswers(prev => {
      const updated = { ...prev, [questionId]: LETTER_MAP[optionIdx] };

      // Send live progress to server (fire-and-forget)
      const answeredCount = Object.keys(updated).length;
      const sec = ALL_SECTIONS[currentStep];
      api.post('/exam/progress', {
        answeredCount,
        currentSection: sec?.title || '',
        currentRound: sec?.roundId || 1,
        startedAt
      }).catch(() => {}); // silent — don't break exam on network blip

      return updated;
    });
  }, [currentStep, startedAt, api]);

  const allCurrentAnswered = useMemo(() => {
    if (!section) return false;
    return section.questions.every(q => selectedAnswers[q.id] !== undefined);
  }, [section, selectedAnswers]);

  // Submit to server
  const handleSubmitExam = useCallback(async () => {
    setIsComplete(true);
    setSubmitting(true);
    clearInterval(timerRef.current);

    // Exit fullscreen on submit
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    const answersArray = Object.entries(selectedAnswers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));

    try {
      const res = await api.post('/exam/submit', {
        answers: answersArray,
        startedAt
      });
      setSubmitResult(res.data);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit exam');
    } finally {
      setSubmitting(false);
    }
  }, [selectedAnswers, startedAt, api]);

  // ── Auto-submit on 3 tab switches ──
  useEffect(() => {
    if (tabSwitchCount >= 3 && !isComplete) {
      handleSubmitExam();
    }
  }, [tabSwitchCount, isComplete, handleSubmitExam]);

  const goNext = useCallback(() => {
    if (currentStep >= ALL_SECTIONS.length - 1) {
      handleSubmitExam();
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setCurrentStep(s => s + 1);
      setTransitioning(false);
    }, 300);
  }, [currentStep, handleSubmitExam]);

  // ── Loading ──
  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Already Taken ──
  if (alreadyTaken) {
    return <AlreadyTakenScreen result={alreadyTaken} />;
  }

  // ── Completion / Submitting ──
  if (isComplete) {
    return <CompletionScreen result={submitResult} submitting={submitting} error={submitError} />;
  }

  if (!section) return null;

  const isNewRound = currentStep === 0 || ALL_SECTIONS[currentStep - 1]?.roundId !== section.roundId;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Tab Switch Warning Overlay ── */}
      {showTabWarning && tabSwitchCount < 3 && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card !p-8 max-w-md w-full text-center animate-slide-up border-2 border-red-500/50">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-heading font-bold text-red-400 mb-3">Tab Switch Detected!</h2>
            <p className="text-gray-300 mb-2">
              You switched away from the exam. This is violation <strong className="text-red-400">#{tabSwitchCount}</strong> of 3.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {3 - tabSwitchCount === 1
                ? '⚡ One more tab switch and your exam will be auto-submitted!'
                : `You have ${3 - tabSwitchCount} chances remaining before auto-submission.`}
            </p>
            <div className="flex gap-2 justify-center mb-4">
              {[1, 2, 3].map(n => (
                <div key={n} className={`w-4 h-4 rounded-full ${n <= tabSwitchCount ? 'bg-red-500' : 'bg-dark-500'}`} />
              ))}
            </div>
            <button
              onClick={() => setShowTabWarning(false)}
              className="btn-primary w-full !py-3 text-base"
            >
              Return to Exam
            </button>
          </div>
        </div>
      )}
      {/* ── Top Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-dark-800/90 backdrop-blur-md border-b border-dark-400">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
            {roundProgress.map((r) => (
              <div
                key={r.id}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 border ${
                  r.isCurrent
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : r.completed === r.total
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : 'border-dark-400 bg-dark-700 text-gray-500'
                }`}
              >
                <span>R{r.id}</span>
                <span className="text-[10px] opacity-70">{r.completed}/{r.total}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-1 bg-dark-500 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / ALL_SECTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {isNewRound && (
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="neon-line flex-1" />
              <h2 className="font-heading text-lg sm:text-xl font-bold gradient-text whitespace-nowrap">
                Round {section.roundId} — {section.roundName}
              </h2>
              <div className="neon-line flex-1" />
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left Column: Passage + MCQs ── */}
          <div className={`flex-1 min-w-0 transition-all duration-300 ${transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                {section.title}
              </span>
            </div>

            {/* Passage card */}
            <div className="card !p-6 sm:!p-8 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Passage</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {section.passage}
              </p>
            </div>

            {/* Questions — no feedback, just selection */}
            <div className="space-y-6">
              {section.questions.map((q, qIdx) => {
                const selectedLetter = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="animate-fade-in" style={{ animationDelay: `${qIdx * 100}ms` }}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        selectedLetter ? 'bg-primary/20 text-primary' : 'bg-dark-500 text-gray-400'
                      }`}>
                        {qIdx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-medium text-white leading-snug">{q.text}</h4>
                    </div>

                    <div className="space-y-2 ml-10">
                      {q.options.map((opt, optIdx) => (
                        <OptionButton
                          key={optIdx}
                          idx={optIdx}
                          text={opt}
                          selected={selectedLetter === LETTER_MAP[optIdx]}
                          onClick={() => handleOptionClick(q.id, optIdx)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={goNext}
                disabled={!allCurrentAnswered}
                className={`group flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  allCurrentAnswered
                    ? 'btn-primary'
                    : 'bg-dark-600 text-gray-500 border border-dark-400 cursor-not-allowed'
                }`}
              >
                {currentStep >= ALL_SECTIONS.length - 1 ? 'Submit Exam' : 'Next Passage'}
                <svg className={`w-4 h-4 transition-transform ${allCurrentAnswered ? 'group-hover:translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Right Column: Progress Sidebar ── */}
          <div className="lg:w-72 shrink-0">
            <LiveProgress
              totalAnswered={totalAnswered}
              currentStep={currentStep}
              elapsedSeconds={elapsedSeconds}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamModule;
