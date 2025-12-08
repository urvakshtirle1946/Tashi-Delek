import { 
  isOnline, 
  storeApiResponse, 
  getCachedApiResponse,
  storePackages,
  getCachedPackages,
  storeVendors,
  getCachedVendors
} from './offline';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to make API requests with offline support
const apiRequest = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  // Check if online
  if (!isOnline()) {
    console.log('[API] Offline, trying cache for:', fullUrl);
    const cached = await getCachedApiResponse(fullUrl);
    if (cached) {
      console.log('[API] Serving from cache');
      return cached as T;
    }
    throw new Error('You are offline and no cached data is available.');
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Cache successful responses
    await storeApiResponse(fullUrl, data);
    
    return data;
  } catch (error) {
    // Handle network errors - try cache
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.log('[API] Network error, trying cache');
      const cached = await getCachedApiResponse(fullUrl);
      if (cached) {
        console.log('[API] Serving from cache after network error');
        return cached as T;
      }
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running.`);
    }
    throw error;
  }
};

// Package API
export const packageAPI = {
  // Get all active packages (public)
  getAll: async (params?: { 
    category?: string; 
    search?: string; 
    page?: number; 
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    
    try {
      const response = await apiRequest<{ 
        success: boolean; 
        data: { 
          packages: any[]; 
          pagination: any;
        } 
      }>(`/packages/public${queryString ? `?${queryString}` : ''}`);
      
      // Store packages in IndexedDB for offline access
      if (response.success && response.data.packages) {
        await storePackages(response.data.packages);
      }
      
      return response;
    } catch (error) {
      // If online request fails, try getting from IndexedDB
      const cachedPackages = await getCachedPackages();
      if (cachedPackages.length > 0) {
        console.log('[API] Returning cached packages');
        return {
          success: true,
          data: {
            packages: cachedPackages,
            pagination: {
              page: 1,
              limit: cachedPackages.length,
              total: cachedPackages.length,
              pages: 1
            }
          }
        };
      }
      throw error;
    }
  },

  // Get package by ID (public)
  getById: async (id: string) => {
    try {
      return await apiRequest<{ 
        success: boolean; 
        data: { package: any } 
      }>(`/packages/public/${id}`);
    } catch (error) {
      // Try getting from cached packages
      const cachedPackages = await getCachedPackages();
      const pkg = cachedPackages.find(p => p.id === id);
      if (pkg) {
        return {
          success: true,
          data: { package: pkg }
        };
      }
      throw error;
    }
  },
};

// Vendor API
export const vendorAPI = {
  // Get all vendors (public)
  getAll: async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    
    try {
      const response = await apiRequest<{
        success: boolean;
        data: {
          vendors: any[];
          pagination: any;
        }
      }>(`/vendors/public/list${queryString ? `?${queryString}` : ''}`);
      
      // Store vendors in IndexedDB for offline access
      if (response.success && response.data.vendors) {
        await storeVendors(response.data.vendors);
      }
      
      return response;
    } catch (error) {
      // If online request fails, try getting from IndexedDB
      const cachedVendors = await getCachedVendors();
      if (cachedVendors.length > 0) {
        console.log('[API] Returning cached vendors');
        return {
          success: true,
          data: {
            vendors: cachedVendors,
            pagination: {
              page: 1,
              limit: cachedVendors.length,
              total: cachedVendors.length,
              pages: 1
            }
          }
        };
      }
      throw error;
    }
  },
};

export default apiRequest;

