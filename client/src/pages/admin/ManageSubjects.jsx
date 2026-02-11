import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ManageSubjects = () => {
  const { api } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showQForm, setShowQForm] = useState(null);
  const [form, setForm] = useState({ name: '', semester: 1, timer: 10, totalMarks: 10, order: 0 });
  const [qForm, setQForm] = useState({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/admin/subjects');
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/subjects/${editingId}`, form);
      } else {
        await api.post('/admin/subjects', form);
      }
      setShowForm(false);
      setEditingId(null);
      setForm({ name: '', semester: 1, timer: 10, totalMarks: 10, order: 0 });
      fetchSubjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving subject');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this subject and all its questions?')) return;
    try {
      await api.delete(`/admin/subjects/${id}`);
      fetchSubjects();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/admin/subjects/${showQForm}/questions`, {
        questions: [{ ...qForm, marks: 1 }]
      });
      setShowQForm(null);
      setQForm({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });
      fetchSubjects();
    } catch (err) {
      alert('Failed to add question');
    }
  };

  const startEdit = (sub) => {
    setForm({ name: sub.name, semester: sub.semester, timer: sub.timer, totalMarks: sub.totalMarks, order: sub.order });
    setEditingId(sub._id);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Group by semester
  const semesters = {};
  subjects.forEach(s => {
    if (!semesters[s.semester]) semesters[s.semester] = [];
    semesters[s.semester].push(s);
  });

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-3xl font-bold gradient-text mb-2">Manage Subjects</h1>
            <p className="text-gray-500">{subjects.length} subjects with {subjects.reduce((a, s) => a + s.questions.length, 0)} total questions</p>
          </div>
          <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', semester: 1, timer: 10, totalMarks: 10, order: 0 }); }} className="btn-primary !px-5 !py-2 text-sm">
            + Add Subject
          </button>
        </div>

        {/* Subject Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
            <div className="card !p-8 max-w-md w-full animate-slide-up">
              <h3 className="font-heading text-xl font-bold mb-6">{editingId ? 'Edit' : 'Add'} Subject</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Subject Name</label>
                  <input className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Semester</label>
                    <input type="number" className="input-field" min="1" max="7" value={form.semester} onChange={e => setForm({...form, semester: parseInt(e.target.value)})} required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Timer (min)</label>
                    <input type="number" className="input-field" min="1" value={form.timer} onChange={e => setForm({...form, timer: parseInt(e.target.value)})} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Total Marks</label>
                    <input type="number" className="input-field" min="1" value={form.totalMarks} onChange={e => setForm({...form, totalMarks: parseInt(e.target.value)})} required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Order</label>
                    <input type="number" className="input-field" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-sm">Cancel</button>
                  <button type="submit" className="btn-primary flex-1 text-sm">{editingId ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Question Modal */}
        {showQForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
            <div className="card !p-8 max-w-lg w-full animate-slide-up max-h-[90vh] overflow-y-auto">
              <h3 className="font-heading text-xl font-bold mb-6">Add Question</h3>
              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Question Text</label>
                  <textarea className="input-field" rows="3" value={qForm.questionText} onChange={e => setQForm({...qForm, questionText: e.target.value})} required />
                </div>
                {qForm.options.map((opt, idx) => (
                  <div key={idx}>
                    <label className="block text-sm text-gray-400 mb-1">Option {String.fromCharCode(65 + idx)}</label>
                    <input className="input-field" value={opt} onChange={e => {
                      const newOpts = [...qForm.options];
                      newOpts[idx] = e.target.value;
                      setQForm({...qForm, options: newOpts});
                    }} required />
                  </div>
                ))}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Correct Answer</label>
                  <select className="input-field" value={qForm.correctAnswer} onChange={e => setQForm({...qForm, correctAnswer: parseInt(e.target.value)})}>
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowQForm(null)} className="btn-secondary flex-1 text-sm">Cancel</button>
                  <button type="submit" className="btn-primary flex-1 text-sm">Add Question</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Subject List */}
        {Object.entries(semesters).sort(([a], [b]) => a - b).map(([sem, subs]) => (
          <div key={sem} className="mb-8">
            <h2 className="font-heading text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold">S{sem}</span>
              Semester {sem}
            </h2>
            <div className="space-y-3">
              {subs.map(sub => (
                <div key={sub._id} className="card !p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{sub.name}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>⏱ {sub.timer} min</span>
                        <span>📝 {sub.questions.length} questions</span>
                        <span>🎯 {sub.totalMarks} marks</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowQForm(sub._id)} className="px-3 py-1.5 bg-dark-500 hover:bg-dark-400 rounded-lg text-xs transition-colors">+ Question</button>
                      <button onClick={() => startEdit(sub)} className="px-3 py-1.5 bg-dark-500 hover:bg-dark-400 rounded-lg text-xs transition-colors">Edit</button>
                      <button onClick={() => handleDelete(sub._id)} className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs transition-colors">Delete</button>
                    </div>
                  </div>
                  {sub.questions.length > 0 && (
                    <div className="border-t border-dark-400 pt-3 mt-3">
                      <div className="space-y-2">
                        {sub.questions.map((q, idx) => (
                          <div key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                            <span className="text-primary font-mono shrink-0">Q{idx + 1}.</span>
                            <span className="truncate">{q.questionText}</span>
                            <span className="shrink-0 text-green-400">Ans: {String.fromCharCode(65 + q.correctAnswer)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSubjects;
