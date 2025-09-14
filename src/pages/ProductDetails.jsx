import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../lib/api'
import Loader from '../components/Loader'
import ImageModal from '../components/ImageModal'

function ProductDetails() {
	const { productId } = useParams()
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [active, setActive] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalIndex, setModalIndex] = useState(0)
	const timerRef = useRef(null)

	useEffect(() => {
		getProduct(productId)
			.then((res) => setProduct(res.data))
			.catch(() => setError('Failed to load product'))
			.finally(() => setLoading(false))
	}, [productId])

	const media = useMemo(() => {
		if (!product) return []
		const imgs = product.images || []
		const vids = product.videos || []
		return [...imgs.map((src) => ({ type: 'image', src })), ...vids.map((src) => ({ type: 'video', src }))]
	}, [product])

	useEffect(() => {
		if (!media.length) return
		clearInterval(timerRef.current)
		timerRef.current = setInterval(() => {
			setActive((i) => (i + 1) % media.length)
		}, 6000)
		return () => clearInterval(timerRef.current)
	}, [media.length])

	const openModal = (index) => {
		setModalIndex(index)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	if (loading) return <Loader />
	if (error) return <div className="container-page">{error}</div>
	if (!product) return null

	return (
		<div className="container-page">
			{/* Hero Section */}
			<div className="text-center mb-12 py-8">
				<div className="flex justify-center mb-6">
					<div className="relative">
						<div className="w-20 h-20 bg-gradient-to-br from-[--color-primary] to-[--color-secondary] rounded-full flex items-center justify-center shadow-2xl">
							<svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
							</svg>
						</div>
						<div className="absolute -top-2 -right-2 w-6 h-6 bg-[--color-secondary] rounded-full animate-pulse"></div>
					</div>
				</div>
				<h1 className="font-display font-bold text-4xl mb-4">
					<span className="text-primary">Product</span> <span className="text-dark">Details</span>
				</h1>
			</div>

			<div className="grid lg:grid-cols-2 gap-12">
				{/* Media Section */}
				<div className="space-y-6">
					<div 
						className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[--color-secondary-light] to-[--color-primary-light] grid place-items-center hover:opacity-90 transition-all duration-300 group"
					>
						{media.length ? (
							media[active].type === 'image' ? (
								<img 
									src={media[active].src} 
									alt={product.name} 
									className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
								/>
							) : (
								<video 
									src={media[active].src} 
									className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
									controls 
									autoPlay 
									muted 
								/>
							)
						) : (
							<div className="h-full w-full grid place-items-center text-accent">
								<div className="text-center">
									<svg className="w-16 h-16 mx-auto mb-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
									</svg>
									<p className="text-lg font-medium">No media available</p>
								</div>
							</div>
						)}
					</div>
					
					{/* Thumbnail Gallery */}
					{media.length > 1 && (
						<div className="space-y-3">
							<h3 className="font-sans font-semibold text-dark">Gallery</h3>
							<div className="flex gap-3 overflow-x-auto pb-2">
								{media.map((m, idx) => (
									<div 
										key={idx} 
										className={`relative h-24 w-32 overflow-hidden rounded-xl border-2 transition-all hover:scale-105 flex-shrink-0 ${
											idx === active 
												? 'border-primary shadow-lg' 
												: 'border-[--color-accent-light] hover:border-primary'
										}`}
									>
										{m.type === 'image' ? (
											<img 
												src={m.src} 
												className="h-full w-full object-cover cursor-pointer" 
												onClick={() => {
													setActive(idx)
													openModal(idx)
												}}
											/>
										) : (
											<video 
												src={m.src} 
												className="h-full w-full object-cover cursor-pointer" 
												muted 
												onClick={() => {
													setActive(idx)
													openModal(idx)
												}}
											/>
										)}
										{idx === active && (
											<div className="absolute inset-0 bg-primary/20 flex items-center justify-center pointer-events-none">
												<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
													<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
												</svg>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Product Info Section */}
				<div className="space-y-8">
					<div className="card-engineering">
						<div className="flex items-center gap-3 mb-6">
							<svg className="gear-icon" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
							</svg>
							<h2 className="text-2xl font-display font-bold text-dark">Product Information</h2>
						</div>
						
						<h1 className="font-display font-bold text-4xl mb-8 text-dark">{product.name}</h1>
						<div className="prose prose-xl max-w-none">
							<p className="text-gray-800 leading-10 whitespace-pre-wrap font-sans text-lg">{product.details}</p>
						</div>
						
						<div className="mt-8 pt-6 border-t-2 border-[--color-accent-light]">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-3 h-3 bg-primary rounded-full"></div>
									<span className="text-accent font-semibold text-lg">SRI JAI HARI Engineering Solution</span>
								</div>
								<Link 
									to="/enquiry" 
									className="btn text-lg px-6 py-3"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
									Get Quote
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			{/* Image Modal */}
			<ImageModal
				isOpen={isModalOpen}
				onClose={closeModal}
				images={media}
				currentIndex={modalIndex}
				onIndexChange={setModalIndex}
			/>
		</div>
	)
}

export default ProductDetails
