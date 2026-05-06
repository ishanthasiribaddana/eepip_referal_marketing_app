// =============================================================================
// API Client — follows TEMCO ERP pattern (api/*Service.ts)
// Base URL: /eepip-api/api/v3  (path-versioned per design doc)
// Auth: SSO shared cookie on *.temcobank.com
// =============================================================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/eepip-api/api/v3';
const SSO_URL  = import.meta.env.VITE_SSO_BASE_URL  || 'http://localhost:8085/temco-api/api/v1';

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = localStorage.getItem('sso_token');
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // send SSO cookie
  });

  if (response.status === 401) {
    localStorage.removeItem('sso_token');
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw {
      status: response.status,
      code: errorBody?.error?.code || 'UNKNOWN',
      message: errorBody?.error?.message || response.statusText,
      details: errorBody?.error?.details,
    };
  }

  return response.json();
}

export function get<T>(path: string, baseUrl = BASE_URL): Promise<T> {
  return request<T>(`${baseUrl}${path}`);
}

export function post<T>(path: string, body: unknown, baseUrl = BASE_URL): Promise<T> {
  return request<T>(`${baseUrl}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function put<T>(path: string, body: unknown, baseUrl = BASE_URL): Promise<T> {
  return request<T>(`${baseUrl}${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function del<T>(path: string, baseUrl = BASE_URL): Promise<T> {
  return request<T>(`${baseUrl}${path}`, { method: 'DELETE' });
}

export { BASE_URL, SSO_URL };
