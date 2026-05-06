import { useState } from 'react';
import CandidateCard, { StudentCandidate } from '../components/StudentMatch/CandidateCard';
import AgreementPreview from '../components/StudentMatch/AgreementPreview';
import { mockStudentCandidates, mockDashboardData } from '../data/mockData';

export default function StudentMatch() {
  const [selectedCandidate, setSelectedCandidate] = useState<StudentCandidate | null>(null);
  const [showAgreement, setShowAgreement] = useState(false);
  const [matchSuccess, setMatchSuccess] = useState(false);

  const handleSelectCandidate = (candidate: StudentCandidate) => {
    if (candidate.eligibilityStatus === 'ELIGIBLE') {
      setSelectedCandidate(candidate);
      setShowAgreement(true);
    }
  };

  const handleConfirmMatch = () => {
    setMatchSuccess(true);
    setShowAgreement(false);
    setSelectedCandidate(null);
  };

  const handleCancelMatch = () => {
    setShowAgreement(false);
    setSelectedCandidate(null);
  };

  const handleCloseSuccess = () => {
    setMatchSuccess(false);
  };

  const userStr = localStorage.getItem('eepip_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const aiEngineerName = user?.fullName || mockDashboardData.user.fullName;
  const sponsorName = mockDashboardData.user.fullName;

  if (matchSuccess) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Matching</h2>
          <p className="text-gray-500 mt-1 text-sm">Match an eligible student for your education investment.</p>
        </div>

        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Match Request Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">The student will be notified and the tri-party agreement will be processed.</p>
          <button
            onClick={handleCloseSuccess}
            className="px-6 py-2.5 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
          >
            Back to Student List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Student Matching</h2>
        <p className="text-gray-500 mt-1 text-sm">Match an eligible student for your education investment.</p>
      </div>

      {/* Agreement Preview Modal */}
      {showAgreement && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <AgreementPreview
            aiEngineerName={aiEngineerName}
            studentName={selectedCandidate.fullName}
            sponsorName={sponsorName}
            investmentAmount={mockDashboardData.investment.investmentAmount}
            productName={mockDashboardData.investment.productName}
            onConfirm={handleConfirmMatch}
            onCancel={handleCancelMatch}
          />
        </div>
      )}

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by name or university..."
              className="input-field w-full"
            />
          </div>
          <div className="min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Eligibility</label>
            <select className="input-field w-full">
              <option value="">All Status</option>
              <option value="ELIGIBLE">Eligible</option>
              <option value="PENDING">Pending</option>
              <option value="NOT_ELIGIBLE">Not Eligible</option>
            </select>
          </div>
          <div className="min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Min Score</label>
            <select className="input-field w-full">
              <option value="">Any Score</option>
              <option value="85">85%+</option>
              <option value="75">75%+</option>
              <option value="70">70%+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStudentCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onSelect={handleSelectCandidate}
            isSelected={selectedCandidate?.id === candidate.id}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="card p-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{mockStudentCandidates.length}</span> candidates
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Eligible: {mockStudentCandidates.filter(c => c.eligibilityStatus === 'ELIGIBLE').length}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            Pending: {mockStudentCandidates.filter(c => c.eligibilityStatus === 'PENDING').length}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            Not Eligible: {mockStudentCandidates.filter(c => c.eligibilityStatus === 'NOT_ELIGIBLE').length}
          </span>
        </div>
      </div>
    </div>
  );
}
