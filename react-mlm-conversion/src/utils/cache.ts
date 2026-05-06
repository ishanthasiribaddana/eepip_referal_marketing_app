/**
 * Cache utilities for localStorage and in-memory caching
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class Cache {
  private inMemoryCache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Set data in localStorage with TTL
   */
  setLocalStorage<T>(key: string, data: T, ttlMs: number = 60 * 60 * 1000): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    };
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.warn('Failed to set localStorage cache:', error);
    }
  }

  /**
   * Get data from localStorage, returns null if expired or not found
   */
  getLocalStorage<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      const now = Date.now();

      // Check if expired
      if (now - entry.timestamp > entry.ttl) {
        localStorage.removeItem(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('Failed to get localStorage cache:', error);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeLocalStorage(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove localStorage cache:', error);
    }
  }

  /**
   * Clear all localStorage cache items with a specific prefix
   */
  clearLocalStoragePrefix(prefix: string): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage cache prefix:', error);
    }
  }

  /**
   * Set data in in-memory cache with TTL
   */
  setMemory<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    };
    this.inMemoryCache.set(key, entry);
  }

  /**
   * Get data from in-memory cache, returns null if expired or not found
   */
  getMemory<T>(key: string): T | null {
    const entry = this.inMemoryCache.get(key);
    if (!entry) return null;

    const now = Date.now();

    // Check if expired
    if (now - entry.timestamp > entry.ttl) {
      this.inMemoryCache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Remove item from in-memory cache
   */
  removeMemory(key: string): void {
    this.inMemoryCache.delete(key);
  }

  /**
   * Clear all in-memory cache
   */
  clearMemory(): void {
    this.inMemoryCache.clear();
  }

  /**
   * Cache API response with fallback to localStorage
   */
  async cacheApiResponse<T>(
    key: string,
    apiCall: () => Promise<T>,
    ttlMs: number = 5 * 60 * 1000
  ): Promise<T> {
    // Try in-memory cache first
    const memoryData = this.getMemory<T>(key);
    if (memoryData) return memoryData;

    // Try localStorage cache
    const localData = this.getLocalStorage<T>(key);
    if (localData) {
      // Also set in memory for faster subsequent access
      this.setMemory(key, localData, ttlMs);
      return localData;
    }

    // Fetch from API
    try {
      const data = await apiCall();
      
      // Cache in both memory and localStorage
      this.setMemory(key, data, ttlMs);
      this.setLocalStorage(key, data, ttlMs);
      
      return data;
    } catch (error) {
      // If API fails, try to return stale cache data
      const staleLocalData = this.getLocalStorage<T>(key);
      if (staleLocalData) {
        console.warn('API call failed, returning stale cache:', error);
        return staleLocalData;
      }
      throw error;
    }
  }

  /**
   * Clear all caches
   */
  clearAll(): void {
    this.clearMemory();
    this.clearLocalStoragePrefix('cache_');
  }
}

export const cache = new Cache();

/**
 * Cache key constants
 */
export const CACHE_KEYS = {
  USER_DATA: 'cache_user_data',
  COMMISSIONS: 'cache_commissions',
  TREE_DATA: 'cache_tree_data',
  DASHBOARD_STATS: 'cache_dashboard_stats',
  AGENT_DATA: 'cache_agent_data',
  PRODUCT_DATA: 'cache_product_data',
} as const;
