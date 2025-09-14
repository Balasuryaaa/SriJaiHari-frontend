import axios from 'axios'
import useAuthStore from '../stores/authStore'

export const BASE_URL = 'https://sri-jai-hari-backend.vercel.app'

const api = axios.create({ 
	baseURL: BASE_URL,
	timeout: 10000 // 10 second timeout
})

// Request interceptor
api.interceptors.request.use(
	(config) => {
		const { token } = useAuthStore.getState()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		
		// Log API request
		console.log('API Request', {
			method: config.method?.toUpperCase() || 'UNKNOWN',
			url: config.url || 'UNKNOWN',
			data: config.data
		})
		
		return config
	},
	(error) => {
		console.error('API Request Error', {
			message: error.message,
			config: error.config
		})
		return Promise.reject(error)
	}
)

// Response interceptor
api.interceptors.response.use(
	(response) => {
		// Log successful API response
		console.log('API Response', {
			method: response.config.method?.toUpperCase() || 'UNKNOWN',
			url: response.config.url || 'UNKNOWN',
			status: response.status,
			data: response.data
		})
		return response
	},
	(error) => {
		const status = error.response?.status || 'NETWORK_ERROR'
		const message = error.response?.data?.message || error.message || 'Unknown error'
		
		// Log API error response
		console.error('API Error Response', {
			method: error.config?.method?.toUpperCase() || 'UNKNOWN',
			url: error.config?.url || 'UNKNOWN',
			status,
			data: error.response?.data,
			error: error.message
		})

		// Handle specific error cases
		if (status === 401) {
			console.warn('Token expired, redirecting to login')
			useAuthStore.getState().logout()
			window.location.href = '/admin/login'
		} else if (status === 403) {
			console.warn('Access denied', { url: error.config?.url })
		} else if (status >= 500) {
			console.error('Server Error', {
				status,
				url: error.config?.url,
				message
			})
		}

		return Promise.reject(error)
	}
)

// Health
export const healthCheck = async () => {
	try {
		return await api.get('/health')
	} catch (error) {
		console.error('Health check failed', error)
		throw error
	}
}

// Admin
export const adminLogin = async (payload) => {
	try {
		const response = await api.post('/admin/login', payload)
		console.log('Admin login successful', { username: payload.username })
		return response
	} catch (error) {
		console.error('Admin login failed', { 
			username: payload.username,
			error: error.response?.data?.message || error.message
		})
		throw error
	}
}

// Products
export const getProducts = async () => {
	try {
		return await api.get('/products')
	} catch (error) {
		console.error('Failed to fetch products', error)
		throw error
	}
}

export const getProduct = async (id) => {
	try {
		return await api.get(`/products/${id}`)
	} catch (error) {
		console.error('Failed to fetch product', { productId: id }, error)
		throw error
	}
}

export const createProduct = async (formData) => {
	try {
		const response = await api.post('/products', formData, { 
			headers: { 'Content-Type': 'multipart/form-data' } 
		})
		console.log('Product created successfully', { 
			productId: response.data?._id || response.data?.id 
		})
		return response
	} catch (error) {
		console.error('Failed to create product', { 
			formData: Object.keys(formData || {}) 
		}, error)
		throw error
	}
}

export const updateProduct = async (id, payload) => {
	try {
		const response = await api.put(`/products/${id}`, payload)
		console.log('Product updated successfully', { productId: id })
		return response
	} catch (error) {
		console.error('Failed to update product', { productId: id }, error)
		throw error
	}
}

export const deleteProduct = async (id) => {
	try {
		const response = await api.delete(`/products/${id}`)
		console.log('Product deleted successfully', { productId: id })
		return response
	} catch (error) {
		console.error('Failed to delete product', { productId: id }, error)
		throw error
	}
}

// Enquiries
export const submitEnquiry = async (payload) => {
	try {
		const response = await api.post('/enquiries', payload)
		console.log('Enquiry submitted successfully', { 
			enquiryId: response.data?._id || response.data?.id 
		})
		return response
	} catch (error) {
		console.error('Failed to submit enquiry', { 
			enquiryData: { name: payload.name, email: payload.email } 
		}, error)
		throw error
	}
}

export const listEnquiries = async () => {
	try {
		return await api.get('/enquiries')
	} catch (error) {
		console.error('Failed to fetch enquiries', error)
		throw error
	}
}

export const updateEnquiry = async (id, payload) => {
	try {
		const response = await api.put(`/enquiries/${id}`, payload)
		console.log('Enquiry updated successfully', { 
			enquiryId: id, 
			status: payload.status 
		})
		return response
	} catch (error) {
		console.error('Failed to update enquiry', { enquiryId: id }, error)
		throw error
	}
}

export default api
