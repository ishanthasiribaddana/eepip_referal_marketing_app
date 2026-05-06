// =============================================================================
// Auth Service — SSO integration (GAP-01 fix)
// Mirrors TEMCO SSO at :8085 (/temco-api/api/v1/auth/*)
// =============================================================================

import { post, get, SSO_URL } from './apiClient';
import type { SSOLoginRequest, SSOLoginResponse, AuthenticatedUser, APIResponse } from '../types/mlm.types';

export const authService = {

  async login(credentials: SSOLoginRequest): Promise<SSOLoginResponse> {
    const response = await post<APIResponse<SSOLoginResponse>>(
      '/auth/login',
      credentials,
      SSO_URL
    );
    if (response.data?.token) {
      localStorage.setItem('sso_token', response.data.token);
    }
    return response.data!;
  },

  async logout(): Promise<void> {
    await post<void>('/auth/logout', {}, SSO_URL);
    localStorage.removeItem('sso_token');
  },

  async getCurrentUser(): Promise<AuthenticatedUser> {
    const response = await get<APIResponse<AuthenticatedUser>>(
      '/auth/me',
      SSO_URL
    );
    return response.data!;
  },

  async validateSession(): Promise<boolean> {
    try {
      await get<APIResponse<void>>('/auth/validate', SSO_URL);
      return true;
    } catch {
      localStorage.removeItem('sso_token');
      return false;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('sso_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('sso_token');
  },
};
