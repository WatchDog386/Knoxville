export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (envUrl && typeof envUrl === 'string') {
    return envUrl.trim().replace(/\/$/, '');
  }

  if (import.meta.env.DEV) {
    return 'http://localhost:1000';
  }

  return 'https://knoxville-rp7g.onrender.com';
};

export const buildJsonHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
