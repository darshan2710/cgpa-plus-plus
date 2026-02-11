import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ViewParticipants = () => {
  const { api } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, rRes] = await Promise.all([
          api.get('/admin/participants'),
          api.get('/admin/results')
        ]);
        setParticipants(pRes.data);
        setResults(rRes.data);
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

  const getResult = (userId) => results.find(r => r.user?._id === userId);

  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.college.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-heading text-3xl font-bold gradient-text mb-2">Participants</h1>
            <p className="text-gray-500">{participants.length} total registered</p>
          </div>
          <input
            className="input-field !w-64"
            placeholder="Search by name, email, college..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-600 border-b border-dark-400">
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">#</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium hidden md:table-cell">College</th>
                  <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">Progress</th>
                  <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">CGPA</th>
                  <th className="text-center px-4 py-3 text-xs text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, idx) => {
                  const result = getResult(p._id);
                  const completed = result?.subjectResults?.length || 0;
                  return (
                    <tr key={p._id} className="border-b border-dark-400/50 hover:bg-dark-600/50 transition-colors">
                      <td className="px-4 py-3 text-gray-500 text-sm">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-sm">{p.name}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{p.email}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm hidden md:table-cell">{p.college}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs text-gray-400">{completed}/14</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {result?.isComplete ? (
                          <span className="font-heading font-bold text-primary">{result.cgpa?.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {result?.isComplete ? (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Complete</span>
                        ) : completed > 0 ? (
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">In Progress</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-dark-500 text-gray-500 text-xs rounded-full">Not Started</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewParticipants;
