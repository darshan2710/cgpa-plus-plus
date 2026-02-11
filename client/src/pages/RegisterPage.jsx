import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', college: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.college, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-16">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="card !p-8 border-dark-300">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold gradient-text mb-2">Join CGPA++</h1>
            <p className="text-gray-500 text-sm">Create your account to participate</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                className="input-field"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">College</label>
              <input
                type="text"
                name="college"
                className="input-field"
                placeholder="Enter your college name"
                value={form.college}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="btn-primary w-full text-center py-3.5 mt-2" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : 'Register'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:text-accent transition-colors">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
