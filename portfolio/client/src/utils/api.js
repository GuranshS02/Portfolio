import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

export const contactAPI = {
  send:     (data) => api.post('/contact', data),
  getAll:   ()     => api.get('/contact'),
  markRead: (id)   => api.patch(`/contact/${id}/read`),
  delete:   (id)   => api.delete(`/contact/${id}`),
}

export const blogAPI = {
  getAll: ()     => api.get('/blog'),
  getOne: (id)   => api.get(`/blog/${id}`),
  create: (data) => api.post('/blog', data),
  delete: (id)   => api.delete(`/blog/${id}`),
}

export const analyticsAPI = {
  trackVisit:  ()        => api.post('/analytics/visit'),
  trackClick:  (project) => api.post('/analytics/click', { project }),
  getSummary:  ()        => api.get('/analytics'),
}

export const authAPI = {
  login:  (password) => api.post('/auth/login', { password }),
  verify: (token)    => api.post('/auth/verify', { token }),
}

export default api
