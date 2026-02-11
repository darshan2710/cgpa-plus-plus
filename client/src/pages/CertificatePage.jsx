import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const CertificatePage = () => {
  const { api, user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const certRef = useRef(null);

  useEffect(() => {
    api.get('/quiz/result')
      .then(res => setResult(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const downloadPDF = async () => {
    if (!certRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        backgroundColor: '#000000',
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CGPA++_Certificate_${user?.name?.replace(/\s/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!result?.isComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16 px-4">
        <div className="card text-center max-w-md">
          <div className="text-5xl mb-4">📜</div>
          <h2 className="text-xl font-semibold mb-2">Certificate Not Available</h2>
          <p className="text-gray-400">Complete all subjects to unlock your certificate.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-heading text-3xl font-bold gradient-text mb-2">Your Certificate</h1>
          <p className="text-gray-500">Download your official CGPA++ result certificate</p>
        </div>

        {/* Certificate */}
        <div className="animate-slide-up">
          <div
            ref={certRef}
            className="relative bg-black border-2 border-primary/30 rounded-2xl overflow-hidden mx-auto"
            style={{ aspectRatio: '297/210', maxWidth: '800px' }}
          >
            {/* Background decorations */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[80px]" />
              <div className="absolute inset-0 border-8 border-dark-600/30 rounded-2xl m-2" />
              <div className="absolute inset-0 border border-primary/10 rounded-2xl m-6" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 sm:p-12 text-center">
              {/* Logo */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-sm mb-3">
                LCS
              </div>

              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-1">Learn Code Solve — IIIT Surat</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-black gradient-text mb-1">CGPA++</h2>
              <p className="text-xs text-gray-400 mb-6">Certificate of Achievement</p>

              <div className="neon-line w-32 mb-6" />

              <p className="text-gray-400 text-sm mb-1">This is to certify that</p>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">{user?.name}</h3>
              <p className="text-gray-500 text-sm mb-6">from <span className="text-gray-300">{user?.college}</span></p>

              <p className="text-gray-400 text-sm mb-2">has achieved a CGPA of</p>
              <p className="font-heading text-5xl font-black gradient-text mb-2">{result.cgpa?.toFixed(2)}</p>
              {result.rank > 0 && (
                <p className="text-gray-500 text-sm mb-4">Rank #{result.rank}</p>
              )}

              <div className="neon-line w-24 mb-4" />

              <p className="text-[10px] text-gray-600">The Ultimate Academic & Technical Gauntlet</p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center mt-8">
          <button onClick={downloadPDF} className="btn-primary text-lg px-10 py-4">
            📥 Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
