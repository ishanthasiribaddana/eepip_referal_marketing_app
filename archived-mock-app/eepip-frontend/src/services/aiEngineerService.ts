import { apiClient } from './apiClient';
import type { AiEngineer, AiEngineerDTO } from '../types';

export class AiEngineerService {
  async getAll(): Promise<AiEngineer[]> {
    return apiClient.get<AiEngineer[]>('/ai-engineers');
  }

  async getById(id: number): Promise<AiEngineer> {
    return apiClient.get<AiEngineer>(`/ai-engineers/${id}`);
  }

  async create(dto: AiEngineerDTO): Promise<AiEngineer> {
    return apiClient.post<AiEngineer>('/ai-engineers', dto);
  }

  async update(id: number, dto: AiEngineerDTO): Promise<AiEngineer> {
    return apiClient.put<AiEngineer>(`/ai-engineers/${id}`, dto);
  }

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/ai-engineers/${id}`);
  }

  async getByMemberId(memberId: number): Promise<AiEngineer> {
    return apiClient.get<AiEngineer>(`/ai-engineers/member/${memberId}`);
  }

  async getTree(id: number, depth: number = 3): Promise<any> {
    return apiClient.get<any>(`/ai-engineers/${id}/tree?depth=${depth}`);
  }

  async getDashboard(id: number): Promise<any> {
    return apiClient.get<any>(`/ai-engineers/${id}/dashboard`);
  }
}

export const aiEngineerService = new AiEngineerService();
