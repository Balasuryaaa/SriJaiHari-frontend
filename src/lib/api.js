import axios from 'axios'
import useAuthStore from '../stores/authStore'

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sri-jai-hari-backend.vercel.app'

const api = axios.create({ 
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor
api.interceptors.request.use(
	(config) => {
		const { token } = useAuthStore.getState()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Clear token on unauthorized
			useAuthStore.getState().setToken(null)
			window.location.href = '/admin/login'
		}
		return Promise.reject(error)
	}
)

// Health
export const healthCheck = () => api.get('/health')

// Admin
export const adminLogin = (payload) => api.post('/admin/login', payload)

// Products
export const getProducts = () => api.get('/products')
export const getProduct = (id) => api.get(`/products/${id}`)
export const createProduct = (formData) => api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

// Enquiries
export const submitEnquiry = (payload) => api.post('/enquiries', payload)
export const listEnquiries = () => api.get('/enquiries')
export const updateEnquiry = (id, payload) => api.put(`/enquiries/${id}`, payload)

export default api
