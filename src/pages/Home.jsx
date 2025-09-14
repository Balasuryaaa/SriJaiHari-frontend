import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../lib/api'
import Loader from '../components/Loader'
import { motion } from 'framer-motion'

function Home() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	useEffect(() => {
		getProducts()
			.then((res) => setProducts(res.data))
			.catch(() => setError('Failed to load products'))
			.finally(() => setLoading(false))
	}, [])

	if (loading) return <Loader />
	if (error) return <div className="container-page">{error}</div>

	return (
		<div className="container-page">
			{/* Hero Section */}
			<div className="text-center mb-12 py-8">
				<div className="flex justify-center mb-6">
					<div className="relative">
						<div className="w-20 h-20 bg-gradient-to-br from-[--color-primary] to-[--color-secondary] rounded-full flex items-center justify-center shadow-2xl">
							<svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
							</svg>
						</div>
						<div className="absolute -top-2 -right-2 w-6 h-6 bg-[--color-secondary] rounded-full animate-pulse"></div>
					</div>
				</div>
				<h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
					<span className="text-primary">SRI JAI HARI</span>
				</h1>
				<p className="text-xl text-accent font-sans font-medium mb-2">ENGINEERING SOLUTION</p>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Discover our comprehensive range of engineering products and solutions designed to meet your industrial needs with precision and reliability.
				</p>
			</div>

			{/* Products Section */}
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-6">
					<svg className="gear-icon" fill="currentColor" viewBox="0 0 24 24">
						{/* <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/> */}
					</svg>
					<h2 className="text-3xl font-display font-bold text-dark">Our Products</h2>
				</div>
			</div>

			<motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
				initial="hidden" animate="show"
				variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
			>
				{products.map((p) => (
					<motion.div key={p._id || p.id}
						variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
						whileHover={{ y: -8, scale: 1.02 }}
						transition={{ type: 'spring', stiffness: 300, damping: 24 }}
						className="card-engineering group"
					>
						<div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[--color-secondary-light] to-[--color-primary-light] mb-4"
						>
							{p.images?.[0] ? (
								<img src={p.images[0]} alt={p.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
							) : (
								<div className="h-full w-full grid place-items-center text-accent">
									<div className="text-center">
										<svg className="w-12 h-12 mx-auto mb-2 text-accent" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
										</svg>
										<p className="text-sm font-medium">No image available</p>
									</div>
								</div>
							)}
							<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20" />
						</div>
						<div className="space-y-3">
							<Link to={`/products/${p._id || p.id}`} className="block group">
								<h3 className="font-sans font-bold text-lg text-dark group-hover:text-primary transition-colors">
									{p.name}
								</h3>
								<p className="text-sm text-gray-600 line-clamp-2 mt-2 leading-relaxed">
									{p.details}
								</p>
							</Link>
							<div className="flex items-center justify-between pt-2">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="text-xs text-accent font-medium">Engineering Solution</span>
								</div>
								<svg className="w-4 h-4 text-accent group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>
			
		</div>
	)
}

export default Home
