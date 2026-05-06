// =============================================================================
// Commission Service — mirrors CommissionResource.java
// REST: /eepip-api/api/v3/commissions/*
// =============================================================================

import { get } from './apiClient';
import type {
  Commission,
  CommissionReport,
  BinaryPoolStatus,
  MemberBinaryDetail,
  CommissionFilters,
  ReportPeriod,
  APIResponse,
  Pagination,
} from '../types/mlm.types';

export const commissionService = {

  async getCommissions(
    aiEngineerId: number,
    filters: CommissionFilters = {},
    page = 0,
    size = 20
  ): Promise<{ data: Commission[]; pagination: Pagination }> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    if (filters.type) params.set('type', filters.type);
    if (filters.status) params.set('status', filters.status);
    if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.set('dateTo', filters.dateTo);
    if (filters.cycleMonth) params.set('cycleMonth', filters.cycleMonth);
    if (filters.amountMin !== undefined) params.set('amountMin', String(filters.amountMin));
    if (filters.amountMax !== undefined) params.set('amountMax', String(filters.amountMax));

    const res = await get<APIResponse<Commission[]>>(
      `/commissions/${aiEngineerId}?${params.toString()}`
    );
    return { data: res.data!, pagination: res.pagination! };
  },

  async getReport(aiEngineerId: number, period: ReportPeriod): Promise<CommissionReport> {
    const res = await get<APIResponse<CommissionReport>>(
      `/commissions/${aiEngineerId}/report?period=${period}`
    );
    return res.data!;
  },

  async getBinaryPoolStatus(cycleMonth: string): Promise<BinaryPoolStatus> {
    const res = await get<APIResponse<BinaryPoolStatus>>(
      `/commissions/pool-status?cycleMonth=${cycleMonth}`
    );
    return res.data!;
  },

  async getMemberBinaryDetail(aiEngineerId: number, cycleMonth: string): Promise<MemberBinaryDetail> {
    const res = await get<APIResponse<MemberBinaryDetail>>(
      `/commissions/${aiEngineerId}/binary-detail?cycleMonth=${cycleMonth}`
    );
    return res.data!;
  },
};
