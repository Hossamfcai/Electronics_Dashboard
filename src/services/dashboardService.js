import apiClient from '../config/api';

// Dashboard API endpoints
const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get system health information
  getSystemHealth: async () => {
    try {
      const response = await apiClient.get('/dashboard/health');
      return response.data;
    } catch (error) {
      console.error('Error fetching system health:', error);
      throw error;
    }
  },

  // Get dashboard summary
  getSummary: async () => {
    try {
      const response = await apiClient.get('/dashboard/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw error;
    }
  },
};

export default dashboardService;
