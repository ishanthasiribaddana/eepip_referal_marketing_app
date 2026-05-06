import { useState, useEffect, useRef } from 'react';
import memberService, { MemberLookup, MemberSearchResult } from '../../../api/memberService';

interface PersonalInfoFormProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    nic: string;
    address: string;
    city: string;
  };
  onChange: (data: any) => void;
  onMemberFound: (found: boolean) => void;
  errors: Record<string, string>;
}

export default function PersonalInfoForm({ data, onChange, onMemberFound, errors }: PersonalInfoFormProps) {
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [memberFound, setMemberFound] = useState<MemberLookup | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MemberSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
    
    // Debounced auto-complete when NIC is entered
    if (field === 'nic') {
      // Clear previous timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      // Reset state if NIC is too short
      if (value.length < 10) {
        setMemberFound(null);
        setLookupError(null);
        return;
      }
      
      // Set new timer for debounce (500ms)
      debounceTimerRef.current = setTimeout(() => {
        lookupMember(value);
      }, 500);
    }
  };

  const lookupMember = async (nic: string) => {
    setIsLookingUp(true);
    setLookupError(null);
    
    try {
      const member = await memberService.lookupByNic(nic);
      if (member) {
        setMemberFound(member);
        onMemberFound(true);
        onChange({
          ...data,
          fullName: member.fullName,
          email: member.email || '',
          phone: member.mobileNo || '',
          nic: member.nic,
        });
      } else {
        setMemberFound(null);
        onMemberFound(false);
      }
    } catch (error) {
      setLookupError('Failed to lookup member');
      console.error('Member lookup error:', error);
    } finally {
      setIsLookingUp(false);
    }
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

  const handleSelectMember = async (member: MemberSearchResult) => {
    setShowSearchResults(false);
    setSearchQuery('');
    
    // Lookup full member details by NIC
    const fullMember = await memberService.lookupByNic(member.nic);
    if (fullMember) {
      setMemberFound(fullMember);
      onMemberFound(true);
      onChange({
        ...data,
        fullName: member.fullName,
        email: member.email || '',
        phone: member.mobileNo || '',
        nic: member.nic,
      });
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">AI Engineer Personal Information</h3>
      <p className="text-sm text-gray-500">
        Enter your personal details for the AI Engineer enrollment.
      </p>

      {/* Search Box */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Search Existing Member (NIC or Name)
        </label>
        <div className="relative">
          <input
            type="text"
            className="input-field pr-10"
            placeholder="Search by NIC or first name..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
            </div>
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((member) => (
              <button
                key={member.memberId}
                type="button"
                onClick={() => handleSelectMember(member)}
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
        
        {showSearchResults && searchResults.length === 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm text-gray-500">
            No members found
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`input-field ${errors.fullName ? 'border-red-300 focus:border-red-500' : ''} ${memberFound ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            placeholder="John Smith"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            disabled={!!memberFound}
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={`input-field ${errors.email ? 'border-red-300 focus:border-red-500' : ''} ${memberFound ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            placeholder="john.smith@example.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={!!memberFound}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className={`input-field ${errors.phone ? 'border-red-300 focus:border-red-500' : ''} ${memberFound ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            placeholder="+94 7X XXX XXXX"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            disabled={!!memberFound}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            NIC <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className={`input-field ${errors.nic ? 'border-red-300 focus:border-red-500' : ''} ${memberFound ? 'border-green-300 focus:border-green-500 bg-gray-50 cursor-not-allowed' : ''}`}
              placeholder="123456789V"
              value={data.nic}
              onChange={(e) => handleChange('nic', e.target.value)}
              disabled={isLookingUp || !!memberFound}
            />
            {isLookingUp && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
              </div>
            )}
          </div>
          {memberFound && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Member found - details auto-filled
            </p>
          )}
          {lookupError && (
            <p className="text-xs text-red-500 mt-1">{lookupError}</p>
          )}
          {errors.nic && <p className="text-xs text-red-500 mt-1">{errors.nic}</p>}
        </div>

        {!memberFound && (
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`input-field ${errors.address ? 'border-red-300 focus:border-red-500' : ''}`}
              placeholder="No. 123, Main Street, Colombo"
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>
        )}

        {!memberFound && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`input-field ${errors.city ? 'border-red-300 focus:border-red-500' : ''}`}
              placeholder="Colombo"
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
