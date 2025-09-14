import { useForm } from 'react-hook-form'
import { submitEnquiry } from '../lib/api'
import toast from 'react-hot-toast'

function Enquiry() {
	const { register, handleSubmit, reset } = useForm()

	const onSubmit = async (data) => {
		try {
			await submitEnquiry(data)
			toast.success('Enquiry submitted')
			reset()
		} catch (e) {
			toast.error('Failed to submit enquiry')
		}
	}

	return (
		<div className="container-page max-w-2xl">
			{/* Hero Section */}
			<div className="text-center mb-12 py-8">
				<div className="flex justify-center mb-6">
					<div className="relative">
						<div className="w-16 h-16 bg-gradient-to-br from-[--color-primary] to-[--color-secondary] rounded-full flex items-center justify-center shadow-2xl">
							<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
						</div>
						<div className="absolute -top-1 -right-1 w-4 h-4 bg-[--color-secondary] rounded-full animate-pulse"></div>
					</div>
				</div>
				<h1 className="font-display font-bold text-4xl mb-4">
					<span className="text-primary">Get in Touch</span>
				</h1>
				<p className="text-lg text-gray-600 max-w-xl mx-auto">
					Have questions about our engineering solutions? We'd love to hear from you and help with your project needs.
				</p>
			</div>

			{/* Form Section */}
			<div className="card-engineering">
				<div className="flex items-center gap-3 mb-6">
					<svg className="gear-icon" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
					</svg>
					<h2 className="text-2xl font-display font-bold text-dark">Send an Enquiry</h2>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid md:grid-cols-2 gap-6">
						<label className="block">
							<span className="font-sans font-semibold text-dark mb-2 block">Name *</span>
							<input 
								className="w-full rounded-lg border-2 bg-white px-4 py-3 font-sans focus:border-primary focus:ring-2 focus:ring-primary-light transition-all duration-200 text-black" 
								placeholder="John Doe" 
								style={{borderColor: 'var(--color-accent-light)'}}
								{...register('name', { required: true })} 
							/>
						</label>
						<label className="block">
							<span className="font-sans font-semibold text-dark mb-2 block">Email *</span>
							<input 
								type="email" 
								className="w-full rounded-lg border-2 bg-white px-4 py-3 font-sans focus:border-primary focus:ring-2 focus:ring-primary-light transition-all duration-200 text-black" 
								placeholder="john@example.com" 
								style={{borderColor: 'var(--color-accent-light)'}}
								{...register('email', { required: true })} 
							/>
						</label>
					</div>
					
					<label className="block">
						<span className="font-sans font-semibold text-dark mb-2 block">Message *</span>
						<textarea 
							className="w-full rounded-lg border-2 bg-white px-4 py-3 font-sans focus:border-primary focus:ring-2 focus:ring-primary-light transition-all duration-200 resize-none text-black" 
							placeholder="Tell us about your engineering requirements and how we can help you..." 
							rows={6} 
							style={{borderColor: 'var(--color-accent-light)'}}
							{...register('message', { required: true })} 
						/>
					</label>
					
					<div className="bg-[--color-secondary-light] rounded-lg p-4 flex items-start gap-3">
						<svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
						</svg>
						<p className="text-sm text-gray-700">
							<strong>Quick Response:</strong> We usually respond within 24 hours. For urgent inquiries, please call us directly.
						</p>
					</div>
					
					<div className="flex justify-center pt-4">
						<button className="btn text-lg px-8 py-4" type="submit">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
							</svg>
							Send Enquiry
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Enquiry
