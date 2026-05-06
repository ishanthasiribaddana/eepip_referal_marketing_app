// =============================================================================
// Bank Read-Only Service (GAP-05 fix)
// For TEMCO Bank staff — read-only access + commission disbursement
// REST: /eepip-api/api/v3/bank/*
// =============================================================================

import { get, post } from './apiClient';
import type {
  BankAuditView,
  BankMemberView,
  BankDisbursementRequest,
  APIResponse,
  Pagination,
} from '../types/mlm.types';

export const bankService = {

  // --- AUDIT DASHBOARD (read-only) ---

  async getAuditOverview(): Promise<BankAuditView> {
    const res = await get<APIResponse<BankAuditView>>('/bank/audit/overview');
    return res.data!;
  },

  // --- MEMBER LOOKUP (read-only) ---

  async getMemberView(aiEngineerId: number): Promise<BankMemberView> {
    const res = await get<APIResponse<BankMemberView>>(
      `/bank/members/${aiEngineerId}`
    );
    return res.data!;
  },

  async searchMembers(
    query: string,
    page = 0,
    size = 20
  ): Promise<{ data: BankMemberView[]; pagination: Pagination }> {
    const res = await get<APIResponse<BankMemberView[]>>(
      `/bank/members/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`
    );
    return { data: res.data!, pagination: res.pagination! };
  },

  // --- COMMISSION DISBURSEMENT ---

  async getPendingDisbursements(cycleMonth: string): Promise<BankDisbursementRequest> {
    const res = await get<APIResponse<BankDisbursementRequest>>(
      `/bank/disbursements/pending?cycleMonth=${cycleMonth}`
    );
    return res.data!;
  },

  async confirmDisbursement(request: BankDisbursementRequest): Promise<void> {
    await post<APIResponse<void>>('/bank/disbursements/confirm', request);
  },
};
