import { Navigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

function ProtectedRoute({ children }) {
	const { token } = useAuthStore()

	if (!token) {
		console.warn('Access denied - no token', {
			reason: 'no_token',
			path: window.location.pathname
		})
		return <Navigate to="/admin/login" replace />
	}

	console.log('Access granted', {
		path: window.location.pathname,
		tokenLength: token.length
	})

	return children
}

export default ProtectedRoute
