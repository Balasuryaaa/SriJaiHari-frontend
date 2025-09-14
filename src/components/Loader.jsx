import { motion } from 'framer-motion'

function Loader() {
	return (
		<div className="flex flex-col items-center justify-center py-20">
			<motion.div
				className="relative h-20 w-20 mb-6"
				initial="hidden"
				animate="show"
				variants={{ hidden: {}, show: {} }}
			>
				{/* Main gear animation */}
				<motion.div
					className="absolute inset-0 rounded-full border-4 border-primary"
					style={{ borderTopColor: 'transparent' }}
					animate={{ rotate: 360 }}
					transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
				/>
				{/* Inner gear */}
				<motion.div
					className="absolute inset-2 rounded-full border-2 border-secondary"
					style={{ borderTopColor: 'transparent' }}
					animate={{ rotate: -360 }}
					transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
				/>
				{/* Center dot */}
				<motion.div
					className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
				/>
			</motion.div>
			
			{/* Loading text */}
			<motion.div
				className="text-center"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<h3 className="font-display font-bold text-xl text-dark mb-2">
					<span className="text-primary">SRI JAI HARI</span> Engineering
				</h3>
				<p className="text-accent font-sans">Loading your solution...</p>
			</motion.div>
		</div>
	)
}

export default Loader
