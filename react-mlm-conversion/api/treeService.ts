// =============================================================================
// Binary Tree Service — mirrors BinaryTreeResource.java
// REST: /eepip-api/api/v3/tree/*
// =============================================================================

import { get, post } from './apiClient';
import type {
  BinaryTreeResponse,
  PlacementRequest,
  AIEngineer,
  APIResponse,
} from '../types/mlm.types';

export const treeService = {

  async getTree(aiEngineerId: number, depth = 4): Promise<BinaryTreeResponse> {
    const res = await get<APIResponse<BinaryTreeResponse>>(
      `/tree/${aiEngineerId}?depth=${depth}`
    );
    return res.data!;
  },

  async getSubtree(nodeId: number, depth = 3): Promise<BinaryTreeResponse> {
    const res = await get<APIResponse<BinaryTreeResponse>>(
      `/tree/${nodeId}/subtree?depth=${depth}`
    );
    return res.data!;
  },

  async placeMember(placement: PlacementRequest & { newMemberId: number }): Promise<AIEngineer> {
    const res = await post<APIResponse<AIEngineer>>('/tree/place', placement);
    return res.data!;
  },

  async getSpilloverPosition(sponsorId: number, leg: 'LEFT' | 'RIGHT'): Promise<{ parentId: number; position: string }> {
    const res = await get<APIResponse<{ parentId: number; position: string }>>(
      `/tree/spillover?sponsorId=${sponsorId}&leg=${leg}`
    );
    return res.data!;
  },
};
