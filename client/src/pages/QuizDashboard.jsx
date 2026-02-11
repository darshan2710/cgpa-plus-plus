import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuizDashboard = () => {
  const { api, user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, progRes] = await Promise.all([
          api.get('/quiz/subjects'),
          api.get('/quiz/progress')
        ]);
        setSubjects(subRes.data);
        setProgress(progRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Group by semester
  const semesters = {};
  subjects.forEach(sub => {
    if (!semesters[sub.semester]) semesters[sub.semester] = [];
    semesters[sub.semester].push(sub);
  });

  const isCompleted = (subId) => progress?.completedSubjects?.includes(subId);
  const progressPercent = progress ? Math.round((progress.completedCount / progress.totalSubjects) * 100) : 0;

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="font-heading text-3xl font-bold gradient-text mb-2">Academic Evaluation</h1>
          <p className="text-gray-500">Welcome, <span className="text-gray-300">{user?.name}</span>. Complete all subjects to get your CGPA.</p>
        </div>

        {/* Progress Bar */}
        <div className="card mb-10 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Overall Progress</span>
            <span className="text-sm font-semibold text-primary">{progress?.completedCount || 0} / {progress?.totalSubjects || 0} subjects</span>
          </div>
          <div className="w-full h-3 bg-dark-500 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {progress?.isComplete && (
            <div className="mt-4 flex gap-4">
              <Link to="/result" className="btn-primary !px-5 !py-2 text-sm">View Results</Link>
              <Link to="/certificate" className="btn-secondary !px-5 !py-2 text-sm">Get Certificate</Link>
            </div>
          )}
        </div>

        {/* Semesters */}
        {Object.entries(semesters).sort(([a], [b]) => a - b).map(([sem, subs]) => (
          <div key={sem} className="mb-10 animate-slide-up" style={{ animationDelay: `${sem * 0.1}s` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-xs">
                S{sem}
              </div>
              <h2 className="font-heading text-xl font-bold">Semester {sem}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {subs.map(sub => {
                const done = isCompleted(sub._id);
                return (
                  <div key={sub._id} className={`card flex items-center justify-between ${done ? 'border-green-500/30' : ''}`}>
                    <div>
                      <h3 className="font-semibold mb-1">{sub.name}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>⏱ {sub.timer} min</span>
                        <span>📝 {sub.questionCount} questions</span>
                        <span>🎯 {sub.totalMarks} marks</span>
                      </div>
                    </div>
                    {done ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                        ✓ Done
                      </span>
                    ) : (
                      <Link to={`/quiz/${sub._id}`} className="btn-primary !px-5 !py-2 text-sm">
                        Start
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDashboard;
