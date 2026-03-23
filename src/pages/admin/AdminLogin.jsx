import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { adminLogin } from '../../lib/api'
import useAuthStore from '../../stores/authStore'

function AdminLogin() {
	const { register, handleSubmit, formState: { isSubmitting } } = useForm()
	const navigate = useNavigate()
	const { setToken } = useAuthStore()

	const onSubmit = async (data) => {
		try {
			const res = await adminLogin(data)
			setToken(res.data?.token || '')
			toast.success('Welcome back!')
			navigate('/admin')
		} catch {
			toast.error('Invalid credentials')
		}
	}

	return (
		<div style={{
			minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
			padding: '2rem 1rem',
			background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
		}}>
			<div style={{ width: '100%', maxWidth: 440 }}>
				{/* Logo header */}
				<div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
					<div style={{
						width: 72, height: 72,
						background: 'linear-gradient(135deg, #2563EB, #DC2626)',
						borderRadius: '50%',
						display: 'flex', alignItems: 'center', justifyContent: 'center',
						margin: '0 auto 18px',
						boxShadow: '0 12px 32px rgba(37,99,235,0.25)',
					}}>
						<svg width="34" height="34" fill="none" stroke="white" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
					<h1 style={{
						fontFamily: "'Playfair Display', serif",
						fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 6,
					}}>
						Admin Portal
					</h1>
					<p style={{ color: '#6b7280', fontSize: 14 }}>
						SRI JAI HARI Engineering Solution
					</p>
				</div>

				{/* Card */}
				<div style={{
					background: '#fff',
					borderRadius: 20,
					boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
					padding: '2.5rem',
					border: '1.5px solid #e5e7eb',
				}}>
					<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
						{/* Username */}
						<div>
							<label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 8 }}>
								Username
							</label>
							<div style={{ position: 'relative' }}>
								<span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
									<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</span>
								<input
									{...register('username', { required: true })}
									placeholder="Enter username"
									style={{
										width: '100%', padding: '11px 14px 11px 40px',
										border: '1.5px solid #e5e7eb', borderRadius: 10,
										fontSize: 14, color: '#111827', outline: 'none',
										boxSizing: 'border-box', background: '#fafafa',
										transition: 'border-color 0.2s',
									}}
									onFocus={e => e.currentTarget.style.borderColor = '#2563EB'}
									onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
								/>
							</div>
						</div>

						{/* Password */}
						<div>
							<label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 8 }}>
								Password
							</label>
							<div style={{ position: 'relative' }}>
								<span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
									<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</span>
								<input
									{...register('password', { required: true })}
									type="password"
									placeholder="••••••••••"
									style={{
										width: '100%', padding: '11px 14px 11px 40px',
										border: '1.5px solid #e5e7eb', borderRadius: 10,
										fontSize: 14, color: '#111827', outline: 'none',
										boxSizing: 'border-box', background: '#fafafa',
										transition: 'border-color 0.2s',
									}}
									onFocus={e => e.currentTarget.style.borderColor = '#2563EB'}
									onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
								/>
							</div>
						</div>

						{/* Notice */}
						<div style={{
							background: '#f0f9ff', border: '1px solid #bae6fd',
							borderRadius: 10, padding: '10px 14px',
							display: 'flex', alignItems: 'center', gap: 10,
						}}>
							<svg width="18" height="18" fill="#0ea5e9" viewBox="0 0 24 24">
								<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
							</svg>
							<p style={{ fontSize: 12, color: '#0369a1', margin: 0 }}>
								<strong>Restricted:</strong> Authorized personnel only.
							</p>
						</div>

						{/* Submit */}
						<button
							type="submit"
							disabled={isSubmitting}
							style={{
								background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #2563EB, #DC2626)',
								color: '#fff', border: 'none', borderRadius: 12,
								padding: '13px', fontWeight: 700, fontSize: 15,
								cursor: isSubmitting ? 'not-allowed' : 'pointer',
								display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
								transition: 'transform 0.15s, box-shadow 0.15s',
								boxShadow: isSubmitting ? 'none' : '0 8px 20px rgba(37,99,235,0.3)',
							}}
							onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.transform = 'translateY(-1px)' }}
							onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
						>
							{isSubmitting ? (
								<svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg>
							) : (
								<svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
								</svg>
							)}
							{isSubmitting ? 'Signing in…' : 'Sign in to Dashboard'}
						</button>
					</form>
				</div>
			</div>
			<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
		</div>
	)
}

export default AdminLogin
