import { Navigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

function ProtectedRoute({ children }) {
	const { token } = useAuthStore()
	if (!token) return <Navigate to="/admin/login" replace />
	return children
}

export default ProtectedRoute
