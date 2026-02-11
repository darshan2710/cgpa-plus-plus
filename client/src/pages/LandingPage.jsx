import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-block mb-6 px-4 py-1.5 bg-dark-600 border border-dark-400 rounded-full text-xs text-gray-400 tracking-widest uppercase">
            Inter-College Event 2026
          </div>
          
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="gradient-text">CGPA</span>
            <span className="text-white">++</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-3 font-light">
            The Ultimate Academic & Technical Gauntlet
          </p>
          
          <p className="text-gray-500 mb-10 text-sm tracking-wider uppercase">
            Organized by <span className="text-primary font-semibold">LCS</span> — Learn Code Solve | <span className="text-gray-400">IIIT Surat</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-10 py-4 animate-glow-pulse">
              Register Now
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-10 py-4">
              Login
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 gradient-text">About The Event</h2>
            <div className="neon-line w-24 mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">What is CGPA++?</h3>
              <p className="text-gray-400 leading-relaxed">
                CGPA++ is a competitive academic evaluation platform designed to test your knowledge 
                across all core Computer Science subjects, spanning 7 semesters. Think of it as your 
                academic journey compressed into one intense gauntlet.
              </p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">How It Works</h3>
              <p className="text-gray-400 leading-relaxed">
                Attempt timed quizzes for 14 subjects (2 per semester). Your scores are converted into 
                SGPA per semester and a final CGPA. Compete against participants from different colleges 
                for the top rank on the leaderboard!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 gradient-text">Event Timeline</h2>
            <div className="neon-line w-24 mx-auto mb-8" />
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-sm">
                R1
              </div>
              <div className="flex-1 card">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">Online Round</h3>
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Completed</span>
                </div>
                <p className="text-gray-400">Online qualifying round with MCQ-based evaluation across multiple subjects.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-sm">
                R2
              </div>
              <div className="flex-1 card glow-border">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">Offline Finals</h3>
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full animate-pulse">Live</span>
                </div>
                <p className="text-gray-400">Offline finals at IIIT Surat campus with two intensive rounds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rounds Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 gradient-text">Final Rounds</h2>
            <div className="neon-line w-24 mx-auto mb-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-sm">
                  2A
                </div>
                <h3 className="text-xl font-semibold">Academic Evaluation</h3>
              </div>
              <p className="text-gray-400 mb-4">
                14 subjects across 7 semesters. Timed MCQ quizzes testing your knowledge in C/C++, 
                OOP, Data Structures, Algorithms, DBMS, OS, CN, Compiler Design, TOC, and more.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li className="flex items-center gap-2"><span className="text-primary">▸</span> 10 MCQs per subject</li>
                <li className="flex items-center gap-2"><span className="text-primary">▸</span> Timed quiz with countdown</li>
                <li className="flex items-center gap-2"><span className="text-primary">▸</span> SGPA & CGPA calculation</li>
              </ul>
            </div>

            <div className="card group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-sm">
                  2B
                </div>
                <h3 className="text-xl font-semibold">Technical Viva</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Face-to-face technical evaluation with industry experts and faculty. Demonstrate your 
                understanding through real-time problem solving and explanation.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li className="flex items-center gap-2"><span className="text-primary">▸</span> Live problem solving</li>
                <li className="flex items-center gap-2"><span className="text-primary">▸</span> Conceptual deep dives</li>
                <li className="flex items-center gap-2"><span className="text-primary">▸</span> Expert panel evaluation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-dark-400">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-xl mx-auto mb-4">
            LCS
          </div>
          <h3 className="font-heading text-xl font-bold mb-1">Learn Code Solve</h3>
          <p className="text-gray-500 text-sm mb-6">IIIT Surat</p>
          <div className="neon-line w-16 mx-auto mb-6" />
          <p className="text-gray-600 text-xs">
            © 2026 LCS — IIIT Surat. CGPA++ is an academic evaluation platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
