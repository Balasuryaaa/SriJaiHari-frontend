import { useState } from 'react'

function FloatingInfo() {
	const [isContactOpen, setIsContactOpen] = useState(false)
	const [isServiceOpen, setIsServiceOpen] = useState(false)

	return (
		<>
			{/* Floating Contact Button */}
			<div className="fixed right-4 bottom-4 z-50">
				<div className="relative">
					{/* Contact Info Panel */}
					{isContactOpen && (
						<div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border-2 border-primary p-6 w-80 animate-in slide-in-from-bottom-2 duration-300">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-display font-bold text-lg text-primary">Contact Us</h3>
								<button 
									onClick={() => setIsContactOpen(false)}
									className="text-gray-400 hover:text-gray-600 transition-colors"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
										</svg>
									</div>
									<div>
										<p className="font-sans font-semibold text-dark">Call Now</p>
										<div className="space-y-1">
											<a href="tel:+919514111460" className="block text-primary hover:text-primary-dark transition-colors">
												+91 9514111460
											</a>
											<a href="tel:+919842211460" className="block text-primary hover:text-primary-dark transition-colors">
												+91 9842211460
											</a>
										</div>
									</div>
								</div>
								
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
									</div>
									<div>
										<p className="font-sans font-semibold text-dark">Location</p>
										<a 
											href="https://maps.app.goo.gl/edDjPjikbigW1iEbA" 
											target="_blank" 
											rel="noopener noreferrer"
											className="text-secondary hover:text-secondary-dark transition-colors text-sm"
										>
											View on Google Maps
										</a>
									</div>
								</div>
							</div>
						</div>
					)}
					
					{/* Contact Toggle Button */}
					<button
						onClick={() => setIsContactOpen(!isContactOpen)}
						className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
					>
						<svg className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
					</button>
				</div>
			</div>

			{/* Floating Service Info Button */}
			<div className="fixed left-4 bottom-4 z-50">
				<div className="relative">
					{/* Service Info Panel */}
					{isServiceOpen && (
						<div className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl border-2 border-secondary p-6 w-80 animate-in slide-in-from-bottom-2 duration-300">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-display font-bold text-lg text-secondary">Our Services</h3>
								<button 
									onClick={() => setIsServiceOpen(false)}
									className="text-gray-400 hover:text-gray-600 transition-colors"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
										<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
										</svg>
									</div>
									<div>
										<p className="font-sans font-semibold text-dark mb-2">Available Spare Parts</p>
										<ul className="text-sm text-gray-700 space-y-1">
											<li>• Rice Mill Spare Parts</li>
											<li>• Chilli Mill Spare Parts</li>
											<li>• Oil Mill Spare Parts</li>
										</ul>
									</div>
								</div>
								
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
										<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
									</div>
									<div>
										<p className="font-sans font-semibold text-dark mb-2">Service Coverage</p>
										<p className="text-sm text-gray-700">
											Our mechanics are available in all districts across Tamil Nadu and provide immediate service.
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
					
					{/* Service Toggle Button */}
					<button
						onClick={() => setIsServiceOpen(!isServiceOpen)}
						className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
					>
						<svg className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
						</svg>
					</button>
				</div>
			</div>
		</>
	)
}

export default FloatingInfo
