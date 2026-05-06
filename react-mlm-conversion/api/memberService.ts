import { get } from './apiClient';

export interface MemberLookup {
  memberId: number;
  nic: string;
  fullName: string;
  mobileNo: string;
  email: string;
}

export interface MemberSearchResult {
  memberId: number;
  nic: string;
  fullName: string;
  mobileNo: string;
  email: string;
}

export interface SponsorSearchResult {
  memberId: number;
  nic: string;
  fullName: string;
  mobileNo: string;
  email: string;
  aiEngineerId: number;
}

/**
 * Member service for looking up existing members from the shared member table
 */
const memberService = {
  /**
   * Lookup member by NIC (exact match)
   * Used for auto-complete in registration form
   */
  lookupByNic: async (nic: string): Promise<MemberLookup | null> => {
    try {
      const response = await get<any>(`/members/lookup/${nic}`);
      return response;
    } catch (error: any) {
      if (error.status === 404) {
        return null; // Member not found
      }
      console.error('Failed to lookup member:', error);
      throw error;
    }
  },

  /**
   * Search members by partial NIC or name
   * Used for auto-complete dropdown
   */
  search: async (query: string): Promise<MemberSearchResult[]> => {
    try {
      const response = await get<any>(`/members/search?q=${encodeURIComponent(query)}`);
      return response;
    } catch (error) {
      console.error('Failed to search members:', error);
      throw error;
    }
  },

  /**
   * Search AI Engineer sponsors by partial NIC or name
   * Used for sponsor selection in enrollment
   * Path: general_user_profile -> member -> ai_engineer
   */
  searchSponsors: async (query: string): Promise<SponsorSearchResult[]> => {
    try {
      const response = await get<any>(`/members/sponsors/search?q=${encodeURIComponent(query)}`);
      return response;
    } catch (error) {
      console.error('Failed to search sponsors:', error);
      throw error;
    }
  },
};

export default memberService;
