import { create } from 'zustand'

const useAuthStore = create((set) => ({
	token: localStorage.getItem('admin_token') || '',
	setToken: (token) => {
		localStorage.setItem('admin_token', token)
		set({ token })
	},
	logout: () => {
		localStorage.removeItem('admin_token')
		set({ token: '' })
	},
}))

export default useAuthStore
