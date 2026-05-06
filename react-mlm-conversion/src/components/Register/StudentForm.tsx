import { useState, useRef, useEffect } from 'react';
import memberService, { MemberLookup, MemberSearchResult } from '../../../api/memberService';

interface StudentFormProps {
  data: {
    hasStudent: boolean;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    studentNic: string;
    program: string;
  };
  onChange: (data: any) => void;
  onSkip: () => void;
  errors: Record<string, string>;
}

export default function StudentForm({ data, onChange, onSkip, errors }: StudentFormProps) {
  const [studentFound, setStudentFound] = useState<MemberLookup | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MemberSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Clear previous timer
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    if (query.length < 3) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Set new timer for debounce (500ms)
    searchTimerRef.current = setTimeout(() => {
      performSearch(query);
    }, 500);
  };

  const performSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await memberService.search(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectStudent = async (member: MemberSearchResult) => {
    setShowSearchResults(false);
    setSearchQuery('');

    // Lookup full member details by NIC
    const fullMember = await memberService.lookupByNic(member.nic);
    if (fullMember) {
      setStudentFound(fullMember);
      onChange({
        ...data,
        studentName: member.fullName,
        studentEmail: member.email || '',
        studentPhone: member.mobileNo || '',
        studentNic: member.nic,
      });
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  if (!data.hasStudent) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Student Nomination (Optional)</h3>
        <p className="text-sm text-gray-500">
          Nominate a student to receive the BSc + MPhil education. You can add a student later.
        </p>

        <div className="card bg-gray-50 border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Would you like to nominate a student now?
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleChange('hasStudent', true)}
              className="btn-primary"
            >
              Yes, nominate a student
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="btn-secondary"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Student Nomination</h3>
      <p className="text-sm text-gray-500">
        Enter the student's details for the BSc + MPhil education program.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Search Student (NIC or Name) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className={`input-field ${errors.studentNic ? 'border-red-300 focus:border-red-500' : ''} ${studentFound ? 'border-green-300 focus:border-green-500 bg-gray-50 cursor-not-allowed' : ''}`}
              placeholder="Search by NIC or name..."
              value={searchQuery || data.studentNic}
              onChange={(e) => {
                handleChange('studentNic', e.target.value);
                handleSearch(e.target.value);
              }}
              disabled={isSearching || !!studentFound}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
              </div>
            )}
            {studentFound && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Student found - details auto-filled
              </p>
            )}
            {errors.studentNic && <p className="text-xs text-red-500 mt-1">{errors.studentNic}</p>}

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((member) => (
                  <button
                    key={member.memberId}
                    type="button"
                    onClick={() => handleSelectStudent(member)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">{member.fullName}</div>
                    <div className="text-sm text-gray-500">NIC: {member.nic}</div>
                    {member.mobileNo && (
                      <div className="text-xs text-gray-400">{member.mobileNo}</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Student Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`input-field ${errors.studentName ? 'border-red-300 focus:border-red-500' : ''} ${studentFound ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            placeholder="Sarah Smith"
            value={data.studentName}
            onChange={(e) => handleChange('studentName', e.target.value)}
            disabled={!!studentFound}
          />
          {errors.studentName && <p className="text-xs text-red-500 mt-1">{errors.studentName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Student Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={`input-field ${errors.studentEmail ? 'border-red-300 focus:border-red-500' : ''} ${studentFound ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            placeholder="sarah.smith@example.com"
            value={data.studentEmail}
            onChange={(e) => handleChange('studentEmail', e.target.value)}
            disabled={!!studentFound}
          />
          {errors.studentEmail && <p className="text-xs text-red-500 mt-1">{errors.studentEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Student Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className={`input-field ${errors.studentPhone ? 'border-red-300 focus:border-red-500' : ''} ${studentFound ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            placeholder="+94 7X XXX XXXX"
            value={data.studentPhone}
            onChange={(e) => handleChange('studentPhone', e.target.value)}
            disabled={!!studentFound}
          />
          {errors.studentPhone && <p className="text-xs text-red-500 mt-1">{errors.studentPhone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Education Program <span className="text-red-500">*</span>
          </label>
          <select
            className={`input-field ${errors.program ? 'border-red-300 focus:border-red-500' : ''}`}
            value={data.program}
            onChange={(e) => handleChange('program', e.target.value)}
          >
            <option value="">Select program</option>
            <option value="BSC_MPHIL">BSc + MPhil Computer Science</option>
            <option value="BSC_ONLY">BSc Computer Science Only</option>
          </select>
          {errors.program && <p className="text-xs text-red-500 mt-1">{errors.program}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleChange('hasStudent', false)}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        ← Back to skip student nomination
      </button>
    </div>
  );
}
