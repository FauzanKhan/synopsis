const apiUrl = 'https://ancient-springs-73658.herokuapp.com';

const api = async (method, endpoint, options) => {
  const res = await fetch(`${apiUrl}${endpoint}`, { method, ...options });
  const { ok, status, statusMessage } = res;

  if (!ok) {
    throw new Error(`API Failure - ${method} ${endpoint}: ${status} ${statusMessage}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : {};
};

const apiFactory = method => (endpoint, options = {}) => api(method, endpoint, options);

api.get = apiFactory('GET');
api.post = apiFactory('POST');
api.put = apiFactory('PUT');
api.delete = apiFactory('DELETE');

export { api };
