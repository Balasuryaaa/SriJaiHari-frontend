import { create } from 'zustand'

const useAuthStore = create((set) => ({
	token: localStorage.getItem('admin_token') || '',
	setToken: (token) => {
		try {
			localStorage.setItem('admin_token', token)
			set({ token })
			console.log('Auth token set', { tokenLength: token?.length || 0 })
		} catch (error) {
			console.error('Failed to set auth token', { 
				tokenLength: token?.length || 0 
			}, error)
		}
	},
	logout: () => {
		try {
			localStorage.removeItem('admin_token')
			set({ token: '' })
			console.log('User logged out')
		} catch (error) {
			console.error('Failed to clear auth token', error)
		}
	},
}))

export default useAuthStore
