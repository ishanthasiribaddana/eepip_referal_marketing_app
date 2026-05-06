
interface StudentCandidate {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  academicScore: number;
  eligibilityStatus: 'ELIGIBLE' | 'PENDING' | 'NOT_ELIGIBLE';
  graduationYear: number;
  specialization: string;
}

interface CandidateCardProps {
  candidate: StudentCandidate;
  onSelect: (candidate: StudentCandidate) => void;
  isSelected: boolean;
}

export default function CandidateCard({ candidate, onSelect, isSelected }: CandidateCardProps) {
  const statusColors = {
    ELIGIBLE: 'bg-green-100 text-green-800 border-green-200',
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    NOT_ELIGIBLE: 'bg-red-100 text-red-800 border-red-200',
  };

  const scoreColor = candidate.academicScore >= 85 ? 'text-green-600' : candidate.academicScore >= 70 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className={`card p-5 cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-primary-500 border-primary-500' : ''}`} onClick={() => onSelect(candidate)}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{candidate.fullName}</h3>
          <p className="text-sm text-gray-500">{candidate.university}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[candidate.eligibilityStatus]}`}>
          {candidate.eligibilityStatus}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>{candidate.degree} - {candidate.specialization}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{candidate.email}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{candidate.phone}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500">Academic Score</span>
          <p className={`text-2xl font-bold ${scoreColor}`}>{candidate.academicScore}%</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(candidate);
          }}
          disabled={candidate.eligibilityStatus === 'NOT_ELIGIBLE'}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-green-600 text-white'
              : candidate.eligibilityStatus === 'ELIGIBLE'
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : candidate.eligibilityStatus === 'PENDING'
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSelected ? 'Selected' : candidate.eligibilityStatus === 'ELIGIBLE' ? 'Select' : candidate.eligibilityStatus === 'PENDING' ? 'Pending' : 'Not Eligible'}
        </button>
      </div>
    </div>
  );
}

export type { StudentCandidate };
