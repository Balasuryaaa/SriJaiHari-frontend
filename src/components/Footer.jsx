import logo from '../assets/logo.png'

function Footer() {
	return (
		<footer 
			className="footer border-t-2 py-12 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800"
			style={{
				borderColor: 'var(--color-accent)',
				background: 'linear-gradient(to right, var(--color-dark), #1f2937)'
			}}
		>
			<div className="container-page">
				<div className="grid md:grid-cols-3 gap-8 mb-8">
					{/* Company Info */}
					<div className="flex flex-col items-center md:items-start">
						<div className="flex items-center gap-3 mb-4">
							<img 
								src={logo} 
								alt="SRI JAI HARI ENGINEERING SOLUTION" 
								className="h-10 w-auto"
							/>
							<div>
								<div className="font-display font-bold text-white text-lg">
									<span className="text-primary">SRI</span> <span>JAI HARI</span>
								</div>
								<div 
									className="text-xs uppercase tracking-wider"
									style={{color: 'var(--color-accent)'}}
								>
									ENGINEERING SOLUTION
								</div>
							</div>
						</div>
						<p className="text-gray-300 text-sm text-center md:text-left">
							Your trusted partner in engineering solutions. 
							Delivering excellence through innovation and precision.
						</p>
					</div>

					{/* Quick Links */}
					<div className="text-center md:text-left">
						<h3 className="font-sans font-semibold text-white mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li><a href="/" className="text-gray-300 hover:text-primary transition-colors">Home</a></li>
							<li><a href="/enquiry" className="text-gray-300 hover:text-primary transition-colors">Enquiry</a></li>
							<li><a href="/admin/login" className="text-gray-300 hover:text-secondary transition-colors">Admin</a></li>
						</ul>
					</div>

					{/* Contact Info */}
					<div className="text-center md:text-left">
						<h3 className="font-sans font-semibold text-white mb-4">Contact</h3>
						<div className="space-y-3 text-gray-300 text-sm">
							<p>📧 info@srijaihari.com</p>
							<div className="space-y-1">
								<p>📞 +91 9514111460</p>
								<p>📞 +91 9842211460</p>
							</div>
							<a 
								href="https://maps.app.goo.gl/edDjPjikbigW1iEbA" 
								target="_blank" 
								rel="noopener noreferrer"
								className="flex items-center gap-2 hover:text-primary transition-colors"
							>
								📍 View Location on Map
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-gray-400 text-sm">
						© {new Date().getFullYear()} SRI JAI HARI ENGINEERING SOLUTION. All rights reserved.
					</p>
					<div className="flex items-center gap-2 text-gray-400 text-sm">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
						</svg>
						<span>Built with React + Tailwind</span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
