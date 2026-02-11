import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResultPage = () => {
  const { api, user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/quiz/result')
      .then(res => setResult(res.data))
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

  if (!result || !result.subjectResults || result.subjectResults.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16 px-4">
        <div className="card text-center max-w-md">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-semibold mb-2">No Results Yet</h2>
          <p className="text-gray-400 mb-6">Complete your quizzes to see your results here.</p>
          <Link to="/dashboard" className="btn-primary">Go to Quiz Dashboard</Link>
        </div>
      </div>
    );
  }

  // Group results by semester
  const semResults = {};
  result.subjectResults.forEach(sr => {
    if (!semResults[sr.semester]) semResults[sr.semester] = [];
    semResults[sr.semester].push(sr);
  });

  const getSGPA = (sem) => {
    const found = result.semesterSGPAs?.find(s => s.semester === sem);
    return found ? found.sgpa : null;
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="font-heading text-3xl font-bold gradient-text mb-2">Your Result Card</h1>
          <p className="text-gray-500">{user?.name} • {user?.college}</p>
        </div>

        {/* CGPA Card */}
        {result.isComplete && (
          <div className="card glow-border text-center mb-10 animate-slide-up">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Final CGPA</p>
            <p className="font-heading text-6xl font-black gradient-text mb-3">{result.cgpa?.toFixed(2)}</p>
            {result.rank > 0 && (
              <p className="text-gray-400">Rank: <span className="text-primary font-semibold">#{result.rank}</span></p>
            )}
            <div className="flex gap-3 justify-center mt-6">
              <Link to="/leaderboard" className="btn-secondary !px-5 !py-2 text-sm">View Leaderboard</Link>
              <Link to="/certificate" className="btn-primary !px-5 !py-2 text-sm">Get Certificate</Link>
            </div>
          </div>
        )}

        {/* Semester-wise Results */}
        {Object.entries(semResults).sort(([a], [b]) => a - b).map(([sem, subjects]) => {
          const sgpa = getSGPA(parseInt(sem));
          return (
            <div key={sem} className="mb-8 animate-slide-up" style={{ animationDelay: `${sem * 0.1}s` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-xs">
                    S{sem}
                  </div>
                  <h2 className="font-heading text-lg font-bold">Semester {sem}</h2>
                </div>
                {sgpa !== null && (
                  <div className="px-4 py-1.5 bg-dark-600 rounded-lg">
                    <span className="text-xs text-gray-400">SGPA: </span>
                    <span className="font-heading font-bold text-primary">{sgpa.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {subjects.map((sr, idx) => (
                  <div key={idx} className="card !p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{sr.subjectName}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {sr.correctCount}/{sr.totalQuestions} correct
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        <span className="text-primary">{sr.score}</span>
                        <span className="text-gray-600 text-sm">/{sr.maxScore}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {((sr.score / sr.maxScore) * 10).toFixed(1)} GP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultPage;
