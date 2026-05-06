// =============================================================================
// EPIN SERVICE — Optional Payment Confirmation Method
// TEMCO Bank staff generate ePins after payment verification
// =============================================================================

import { get, post, del } from './apiClient';
import type {
  EPin,
  EPinGenerationRequest,
  EPinValidationRequest,
  EPinValidationResponse,
  APIResponse
} from '../types/mlm.types';

const EPIN_BASE_URL = '/api/eepip/epins';

/**
 * Generate new ePins (Bank staff only)
 * @param request ePin generation details
 * @returns Generated ePins
 */
export async function generateEPins(request: EPinGenerationRequest): Promise<APIResponse<EPin[]>> {
  return post<APIResponse<EPin[]>>(`${EPIN_BASE_URL}/generate`, request);
}

/**
 * Validate an ePin during registration
 * @param request ePin validation request
 * @returns Validation result with ePin details if valid
 */
export async function validateEPin(request: EPinValidationRequest): Promise<EPinValidationResponse> {
  return post<EPinValidationResponse>(`${EPIN_BASE_URL}/validate`, request);
}

/**
 * Get all ePins (Admin/Bank staff only)
 * @param filters Optional filters (status, date range, etc.)
 * @returns List of ePins
 */
export async function getEPins(filters?: {
  status?: string;
  startDate?: string;
  endDate?: string;
  issuedBy?: number;
}): Promise<APIResponse<EPin[]>> {
  const queryString = filters ? new URLSearchParams(filters as any).toString() : '';
  return get<APIResponse<EPin[]>>(`${EPIN_BASE_URL}${queryString ? '?' + queryString : ''}`);
}

/**
 * Get ePin by ID
 * @param id ePin ID
 * @returns ePin details
 */
export async function getEPinById(id: number): Promise<APIResponse<EPin>> {
  return get<APIResponse<EPin>>(`${EPIN_BASE_URL}/${id}`);
}

/**
 * Delete/expire an ePin (Admin/Bank staff only)
 * @param id ePin ID
 * @returns Success response
 */
export async function deleteEPin(id: number): Promise<APIResponse<void>> {
  return del<APIResponse<void>>(`${EPIN_BASE_URL}/${id}`);
}

/**
 * Get ePin statistics (Admin/Bank staff only)
 * @returns ePin statistics (generated, used, expired counts)
 */
export async function getEPinStatistics(): Promise<APIResponse<{
  total: number;
  generated: number;
  used: number;
  expired: number;
  available: number;
}>> {
  return get<APIResponse<{
    total: number;
    generated: number;
    used: number;
    expired: number;
    available: number;
  }>>(`${EPIN_BASE_URL}/statistics`);
}
