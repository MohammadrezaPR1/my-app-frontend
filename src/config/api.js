// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_URL = API_BASE_URL;

// Helper function برای ساخت URL کامل
export const getApiUrl = (endpoint) => {
  // اگر endpoint با / شروع نشده باشد، اضافه کن
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${path}`;
};

// Export کردن برای استفاده در کل پروژه
export default {
  API_URL,
  getApiUrl
};
