import { useState, useRef, useEffect } from 'react';
import memberService, { SponsorSearchResult } from '../../../api/memberService';

interface PlacementFormProps {
  data: {
    sponsorNic: string;
    sponsorId: string;
    preferredLeg: 'LEFT' | 'RIGHT' | '';
  };
  onChange: (data: any) => void;
  errors: Record<string, string>;
}

export default function PlacementForm({ data, onChange, errors }: PlacementFormProps) {
  const [searchResults, setSearchResults] = useState<SponsorSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [sponsorFound, setSponsorFound] = useState<SponsorSearchResult | null>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lookupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });

    // Debounced auto-complete when sponsor NIC is entered
    if (field === 'sponsorNic') {
      // Clear previous timer
      if (lookupTimerRef.current) {
        clearTimeout(lookupTimerRef.current);
      }

      // Reset state if NIC is too short
      if (value.length < 10) {
        setSponsorFound(null);
        return;
      }

      // Set new timer for debounce (500ms)
      lookupTimerRef.current = setTimeout(() => {
        lookupSponsor(value);
      }, 500);
    }
  };

  const lookupSponsor = async (nic: string) => {
    setIsSearching(true);
    try {
      // Use the search endpoint and filter for exact match
      const results = await memberService.searchSponsors(nic);
      const exactMatch = results.find(sponsor => sponsor.nic === nic);
      if (exactMatch) {
        setSponsorFound(exactMatch);
        onChange({
          ...data,
          sponsorNic: exactMatch.nic,
          sponsorId: exactMatch.aiEngineerId.toString(),
        });
      } else {
        setSponsorFound(null);
      }
    } catch (error) {
      console.error('Sponsor lookup error:', error);
      setSponsorFound(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (query: string) => {
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
      const results = await memberService.searchSponsors(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSponsor = (sponsor: SponsorSearchResult) => {
    setShowSearchResults(false);
    setSponsorFound(sponsor);
    onChange({
      ...data,
      sponsorNic: sponsor.nic,
      sponsorId: sponsor.aiEngineerId.toString(),
    });
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
      if (lookupTimerRef.current) {
        clearTimeout(lookupTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Placement Details</h3>
      <p className="text-sm text-gray-500">
        Specify your sponsor and preferred placement leg in the binary tree.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Sponsor NIC <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`input-field ${errors.sponsorNic ? 'border-red-300 focus:border-red-500' : ''} ${sponsorFound ? 'border-green-300 focus:border-green-500 bg-gray-50 cursor-not-allowed' : ''}`}
            placeholder="Enter sponsor NIC"
            value={data.sponsorNic}
            onChange={(e) => {
              handleChange('sponsorNic', e.target.value);
              handleSearch(e.target.value);
            }}
            disabled={isSearching || !!sponsorFound}
          />
          {isSearching && (
            <div className="absolute right-3 top-9 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
            </div>
          )}
          {sponsorFound && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sponsor found: {sponsorFound.fullName}
            </p>
          )}
          {errors.sponsorNic && <p className="text-xs text-red-500 mt-1">{errors.sponsorNic}</p>}

          {/* Search results dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {searchResults.map((sponsor) => (
                <div
                  key={sponsor.memberId}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSelectSponsor(sponsor)}
                >
                  <div className="text-sm font-medium text-gray-800">{sponsor.fullName}</div>
                  <div className="text-xs text-gray-500">{sponsor.nic}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Sponsor ID (if known)
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g., AI001"
            value={data.sponsorId}
            onChange={(e) => handleChange('sponsorId', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Placement Leg <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preferredLeg"
                value="LEFT"
                checked={data.preferredLeg === 'LEFT'}
                onChange={(e) => handleChange('preferredLeg', e.target.value)}
                className="w-4 h-4 text-primary-600"
              />
              <span className="text-sm text-gray-700">Left Leg</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preferredLeg"
                value="RIGHT"
                checked={data.preferredLeg === 'RIGHT'}
                onChange={(e) => handleChange('preferredLeg', e.target.value)}
                className="w-4 h-4 text-primary-600"
              />
              <span className="text-sm text-gray-700">Right Leg</span>
            </label>
          </div>
          {errors.preferredLeg && <p className="text-xs text-red-500 mt-1">{errors.preferredLeg}</p>}
        </div>
      </div>

      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-700">
            <p className="font-semibold mb-1">Placement Information</p>
            <p>Your sponsor will place you in their binary tree. The preferred leg helps guide placement, but final placement depends on tree balance and availability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
