// API Client
const API_BASE_URL = '/api'; // Adjust based on your backend

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch {
          error = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        return text ? JSON.parse(text) : {};
      }
      
      return await response.text();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server');
      }
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Jobs
  async getJobs() {
    return this.request('/jobs');
  }

  async getJob(id) {
    return this.request(`/jobs/${id}`);
  }

  async createJob(jobData) {
    return this.request('/jobs', {
      method: 'POST',
      body: jobData,
    });
  }

  async cancelJob(id) {
    return this.request(`/jobs/${id}/cancel`, {
      method: 'POST',
    });
  }

  async getJobStatus(id) {
    return this.request(`/jobs/${id}/status`);
  }

  async getJobResults(id, page = 1, pageSize = 50) {
    return this.request(`/jobs/${id}/results?page=${page}&pageSize=${pageSize}`);
  }

  async exportJob(id, format = 'csv') {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}/export?format=${format}`);
    if (!response.ok) throw new Error('Export failed');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-${id}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Selector Testing
  async testSelectors(url, selectors) {
    return this.request('/test-selectors', {
      method: 'POST',
      body: { url, selectors },
    });
  }

  // Robots.txt
  async checkRobots(domain) {
    return this.request(`/robots/${encodeURIComponent(domain)}`);
  }
}

const api = new ApiClient();

