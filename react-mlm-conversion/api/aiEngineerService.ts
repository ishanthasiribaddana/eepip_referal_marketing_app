// =============================================================================
// AI Engineer Service — mirrors MemberService.java / MemberResource.java
// REST: /eepip-api/api/v3/ai-engineers/*
// =============================================================================

import { get, post, put } from './apiClient';
import type {
  AIEngineer,
  EnrollmentRequest,
  DashboardData,
  RankProgress,
  APIResponse,
  Pagination,
} from '../types/mlm.types';

export const aiEngineerService = {

  // --- CRUD ---

  async getById(id: number): Promise<AIEngineer> {
    const res = await get<APIResponse<AIEngineer>>(`/ai-engineers/${id}`);
    return res.data!;
  },

  async getByNic(nic: string): Promise<AIEngineer | null> {
    try {
      const res = await get<APIResponse<AIEngineer>>(`/ai-engineers/nic/${nic}`);
      return res.data ?? null;
    } catch {
      return null;
    }
  },

  async list(page = 0, size = 20): Promise<{ data: AIEngineer[]; pagination: Pagination }> {
    const res = await get<APIResponse<AIEngineer[]>>(
      `/ai-engineers?page=${page}&size=${size}`
    );
    return { data: res.data!, pagination: res.pagination! };
  },

  // --- ENROLLMENT ---

  async enroll(request: EnrollmentRequest): Promise<AIEngineer> {
    const res = await post<APIResponse<AIEngineer>>('/ai-engineers/enroll', request);
    return res.data!;
  },

  // --- DASHBOARD ---

  async getDashboard(id: number): Promise<DashboardData> {
    const res = await get<APIResponse<DashboardData>>(`/ai-engineers/${id}/dashboard`);
    return res.data!;
  },

  // --- RANK ---

  async getRankProgress(id: number): Promise<RankProgress> {
    const res = await get<APIResponse<RankProgress>>(`/ai-engineers/${id}/rank-progress`);
    return res.data!;
  },

  // --- STUDENT NOMINATION ---
  // TODO: Implement when StudentBeneficiary type is added to mlm.types.ts
  /*
  async nominateStudent(aiEngineerId: number, student: StudentBeneficiary): Promise<StudentBeneficiary> {
    const res = await post<APIResponse<StudentBeneficiary>>(
      `/ai-engineers/${aiEngineerId}/nominate-student`,
      student
    );
    return res.data!;
  },

  async getStudent(aiEngineerId: number): Promise<StudentBeneficiary | null> {
    try {
      const res = await get<APIResponse<StudentBeneficiary>>(
        `/ai-engineers/${aiEngineerId}/student`
      );
      return res.data ?? null;
    } catch {
      return null;
    }
  },
  */

  // --- STUDENT MATCHING SERVICE ---
  // TODO: Implement when StudentMatchRequest, StudentMatchCandidate, TriPartyAgreement types are added
  /*
  async requestStudentMatch(request: StudentMatchRequest): Promise<StudentMatchCandidate[]> {
    const res = await post<APIResponse<StudentMatchCandidate[]>>(
      '/student-matching/request',
      request
    );
    return res.data!;
  },

  async getMatchCandidates(aiEngineerId: number): Promise<StudentMatchCandidate[]> {
    const res = await get<APIResponse<StudentMatchCandidate[]>>(
      `/student-matching/candidates/${aiEngineerId}`
    );
    return res.data!;
  },

  async confirmMatch(aiEngineerId: number, studentId: number): Promise<TriPartyAgreement> {
    const res = await post<APIResponse<TriPartyAgreement>>(
      '/student-matching/confirm',
      { aiEngineerId, studentId }
    );
    return res.data!;
  },
  */

  // --- STATE TRANSITIONS ---

  async activateMember(id: number): Promise<AIEngineer> {
    const res = await put<APIResponse<AIEngineer>>(`/ai-engineers/${id}/activate`, {});
    return res.data!;
  },
};
