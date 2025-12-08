const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to make API requests
const apiRequest = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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

    return response.json();
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
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
    return apiRequest<{ 
      success: boolean; 
      data: { 
        packages: any[]; 
        pagination: any;
      } 
    }>(`/packages/public${queryString ? `?${queryString}` : ''}`);
  },

  // Get package by ID (public)
  getById: async (id: string) => {
    return apiRequest<{ 
      success: boolean; 
      data: { package: any } 
    }>(`/packages/public/${id}`);
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
    return apiRequest<{
      success: boolean;
      data: {
        vendors: any[];
        pagination: any;
      }
    }>(`/vendors/public/list${queryString ? `?${queryString}` : ''}`);
  },
};

export default apiRequest;

