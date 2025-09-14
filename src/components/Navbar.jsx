import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuthStore from '../stores/authStore'
import logo from '../assets/logo.png'

function Navbar() {
	const navigate = useNavigate()
	const { token, logout } = useAuthStore()
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		// Check for saved theme preference or default to light mode
		const savedTheme = localStorage.getItem('theme')
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
		
		setIsDark(shouldBeDark)
		if (shouldBeDark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [])

	const toggleTheme = () => {
		const newTheme = !isDark
		setIsDark(newTheme)
		if (newTheme) {
			document.documentElement.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		} else {
			document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', 'light')
		}
	}

	return (
		<header className="sticky top-0 z-40 navbar">
			<div className="container-page flex h-20 items-center justify-between">
				<Link to="/" className="flex items-center gap-4 group">
					<div className="relative">
						<img 
							src={logo} 
							alt="SRI JAI HARI ENGINEERING SOLUTION" 
							className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: 'var(--color-secondary)'}}></div>
					</div>
					<div className="hidden sm:block">
						<div className="logo-text">
							<span className="text-primary">SRI</span> <span className="text-dark dark:text-white">JAI HARI</span>
						</div>
						<div className="logo-subtitle">ENGINEERING SOLUTION</div>
					</div>
				</Link>
				<nav className="flex items-center gap-6">
					<NavLink 
						to="/" 
						className={({isActive}) => 
							`font-sans font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
								isActive 
									? 'text-primary shadow-md' 
									: 'text-dark dark:text-white hover:text-primary dark:hover:bg-gray-700'
							}`
						}
						style={({isActive}) => ({
							backgroundColor: isActive 
								? 'var(--color-primary-light)' 
								: 'transparent',
							'--tw-bg-opacity': isActive ? '1' : '0'
						})}
					>
						Home
					</NavLink>
					<NavLink 
						to="/enquiry" 
						className={({isActive}) => 
							`font-sans font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
								isActive 
									? 'text-primary shadow-md' 
									: 'text-dark dark:text-white hover:text-primary dark:hover:bg-gray-700'
							}`
						}
						style={({isActive}) => ({
							backgroundColor: isActive 
								? 'var(--color-primary-light)' 
								: 'transparent',
							'--tw-bg-opacity': isActive ? '1' : '0'
						})}
					>
						Enquiry
					</NavLink>
					
					{/* Dark Mode Toggle */}
					<button
						onClick={toggleTheme}
						className="p-2 rounded-lg hover-accent-light dark:hover:bg-gray-700 transition-colors"
						aria-label="Toggle dark mode"
					>
						{isDark ? (
							<svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
							</svg>
						) : (
							<svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
								<path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 9 9 0 004.463-1.69a.75.75 0 01.162-.819 1.5 1.5 0 01.985-.44 1.5 1.5 0 011.5 1.5c0 .74-.402 1.38-1.001 1.73a.75.75 0 01-.162.819A8.97 8.97 0 0115 18a9 9 0 01-9-9 9 9 0 00-4.463 1.69.75.75 0 01-.162.819 1.5 1.5 0 01-.985.44 1.5 1.5 0 01-1.5-1.5c0-.74.402-1.38 1.001-1.73a.75.75 0 01.162-.819A8.97 8.97 0 009 6a8.97 8.97 0 00-4.463-1.69.75.75 0 01-.162-.819 1.5 1.5 0 01.985-.44 1.5 1.5 0 011.5 1.5c0 .74-.402 1.38-1.001 1.73z" clipRule="evenodd" />
							</svg>
						)}
					</button>
					
					{token ? (
						<>
							<NavLink 
								to="/admin" 
								className={({isActive}) => 
									`font-sans font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
										isActive 
											? 'text-secondary shadow-md' 
											: 'text-dark dark:text-white hover:text-secondary dark:hover:bg-gray-700'
									}`
								}
								style={({isActive}) => ({
									backgroundColor: isActive 
										? 'var(--color-secondary-light)' 
										: 'transparent',
									'--tw-bg-opacity': isActive ? '1' : '0'
								})}
							>
								Admin
							</NavLink>
							<button 
								className="btn" 
								onClick={() => { logout(); navigate('/') }}
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								Logout
							</button>
						</>
					) : (
						<Link to="/admin/login" className="btn-secondary">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
							</svg>
							Admin Login
						</Link>
					)}
				</nav>
			</div>
		</header>
	)
}

export default Navbar
