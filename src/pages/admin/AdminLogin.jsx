import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { adminLogin } from '../../lib/api'
import useAuthStore from '../../stores/authStore'

function AdminLogin() {
	const { register, handleSubmit } = useForm()
	const navigate = useNavigate()
	const { setToken } = useAuthStore()

	const onSubmit = async (data) => {
		try {
			const res = await adminLogin(data)
			setToken(res.data?.token || '')
			toast.success('Logged in')
			navigate('/admin')
		} catch (e) {
			toast.error('Invalid credentials')
		}
	}

	return (
		<div className="container-page max-w-md">
			{/* Hero Section */}
			<div className="text-center mb-12 py-8">
				<div className="flex justify-center mb-6">
					<div className="relative">
						<div className="w-20 h-20 bg-gradient-to-br from-[--color-secondary] to-[--color-primary] rounded-full flex items-center justify-center shadow-2xl">
							<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						</div>
						<div className="absolute -top-2 -right-2 w-6 h-6 bg-[--color-primary] rounded-full animate-pulse"></div>
					</div>
				</div>
				<h1 className="font-display font-bold text-4xl mb-4">
					<span className="text-secondary">Admin</span> <span className="text-dark">Portal</span>
				</h1>
				<p className="text-lg text-gray-600">
					Access the SRI JAI HARI Engineering Solution admin dashboard
				</p>
			</div>

			{/* Login Form */}
			<div className="card-engineering">
				<div className="flex items-center gap-3 mb-6">
					<svg className="gear-icon" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
					</svg>
					<h2 className="text-2xl font-display font-bold text-dark">Admin Login</h2>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<label className="block">
						<span className="font-sans font-semibold text-dark mb-2 block">Username *</span>
						<input 
							className="w-full rounded-lg border-2 bg-white px-4 py-3 font-sans focus:border-secondary focus:ring-2 focus:ring-secondary-light transition-all duration-200 text-black" 
							placeholder="admin" 
							style={{borderColor: 'var(--color-accent-light)'}}
							{...register('username', { required: true })} 
						/>
					</label>
					<label className="block">
						<span className="font-sans font-semibold text-dark mb-2 block">Password *</span>
						<input 
							type="password" 
							className="w-full rounded-lg border-2 bg-white px-4 py-3 font-sans focus:border-secondary focus:ring-2 focus:ring-secondary-light transition-all duration-200 text-black" 
							placeholder="••••••••" 
							style={{borderColor: 'var(--color-accent-light)'}}
							{...register('password', { required: true })} 
						/>
					</label>
					
					<div className="bg-[--color-primary-light] rounded-lg p-4 flex items-start gap-3">
						<svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
						</svg>
						<p className="text-sm text-gray-700">
							<strong>Secure Access:</strong> This is a restricted area for authorized personnel only.
						</p>
					</div>
					
					<button className="btn-secondary w-full text-lg py-4" type="submit">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
						</svg>
						Login to Dashboard
					</button>
				</form>
			</div>
		</div>
	)
}

export default AdminLogin
