import { apiClient } from './apiClient';
import type { Agent, AgentDTO, AiEngineer } from '../types';

export class AgentService {
  async getAll(): Promise<Agent[]> {
    return apiClient.get<Agent[]>('/agents');
  }

  async getById(id: number): Promise<Agent> {
    return apiClient.get<Agent>(`/agents/${id}`);
  }

  async appoint(dto: AgentDTO): Promise<Agent> {
    return apiClient.post<Agent>('/agents/appoint', dto);
  }

  async updateStatus(id: number, status: string): Promise<Agent> {
    return apiClient.put<Agent>(`/agents/${id}/status`, { status });
  }

  async getDashboard(id: number): Promise<any> {
    return apiClient.get<any>(`/agents/${id}/dashboard`);
  }

  async getReferrals(id: number): Promise<AiEngineer[]> {
    return apiClient.get<any>(`/agents/${id}/referrals`);
  }

  async getCommissions(id: number): Promise<any[]> {
    return apiClient.get<any[]>(`/agents/${id}/commissions`);
  }

  async getTree(id: number, depth: number = 4): Promise<any> {
    return apiClient.get<any>(`/agents/${id}/tree?depth=${depth}`);
  }

  async place(dto: { agentId: number; parentId: number; position: string }): Promise<Agent> {
    return apiClient.post<Agent>('/agents/place', dto);
  }

  async getPoolStatus(cycleMonth?: string): Promise<any> {
    const params = cycleMonth ? `?cycleMonth=${cycleMonth}` : '';
    return apiClient.get<any>(`/agents/pool-status${params}`);
  }
}

export const agentService = new AgentService();
