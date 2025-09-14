import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ImageModal({ isOpen, onClose, images, currentIndex, onIndexChange }) {
	const [currentIdx, setCurrentIdx] = useState(currentIndex || 0)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	useEffect(() => {
		setCurrentIdx(currentIndex || 0)
	}, [currentIndex])

	const handleKeyDown = (e) => {
		if (!isOpen) return
		
		switch (e.key) {
			case 'Escape':
				onClose()
				break
			case 'ArrowLeft':
				if (images && images.length > 1) {
					const newIndex = (currentIdx - 1 + images.length) % images.length
					setCurrentIdx(newIndex)
					onIndexChange?.(newIndex)
				}
				break
			case 'ArrowRight':
				if (images && images.length > 1) {
					const newIndex = (currentIdx + 1) % images.length
					setCurrentIdx(newIndex)
					onIndexChange?.(newIndex)
				}
				break
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, currentIdx, images])

	if (!isOpen || !images || images.length === 0) return null

	const currentImage = images[currentIdx]

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
					onClick={onClose}
				>
					{/* Close button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
					>
						<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					{/* Navigation arrows */}
					{images.length > 1 && (
						<>
							<button
								onClick={(e) => {
									e.stopPropagation()
									const newIndex = (currentIdx - 1 + images.length) % images.length
									setCurrentIdx(newIndex)
									onIndexChange?.(newIndex)
								}}
								className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
							>
								<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation()
									const newIndex = (currentIdx + 1) % images.length
									setCurrentIdx(newIndex)
									onIndexChange?.(newIndex)
								}}
								className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
							>
								<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</>
					)}

					{/* Image container */}
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
						onClick={(e) => e.stopPropagation()}
					>
						{currentImage.type === 'image' ? (
							<motion.img
								key={currentIdx}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3 }}
								src={currentImage.src}
								alt={`Image ${currentIdx + 1}`}
								className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
							/>
						) : (
							<motion.video
								key={currentIdx}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3 }}
								src={currentImage.src}
								className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
								controls
								autoPlay
								muted
							/>
						)}
					</motion.div>

					{/* Image counter */}
					{images.length > 1 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full"
						>
							{currentIdx + 1} / {images.length}
						</motion.div>
					)}

					{/* Thumbnail strip */}
					{images.length > 1 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto"
						>
							{images.map((img, idx) => (
								<button
									key={idx}
									onClick={(e) => {
										e.stopPropagation()
										setCurrentIdx(idx)
										onIndexChange?.(idx)
									}}
									className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
										idx === currentIdx 
											? 'border-white scale-110' 
											: 'border-transparent hover:border-white/50'
									}`}
								>
									{img.type === 'image' ? (
										<img src={img.src} className="w-full h-full object-cover" />
									) : (
										<video src={img.src} className="w-full h-full object-cover" muted />
									)}
								</button>
							))}
						</motion.div>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default ImageModal
