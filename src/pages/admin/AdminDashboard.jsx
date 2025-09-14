import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getProducts, createProduct, deleteProduct, updateProduct } from '../../lib/api'
import Loader from '../../components/Loader'

function AdminDashboard() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [name, setName] = useState('')
	const [details, setDetails] = useState('')
	const [mediaFiles, setMediaFiles] = useState([]) // images + videos
	const [isDragOver, setIsDragOver] = useState(false)

	const load = () => {
		setLoading(true)
		getProducts()
			.then((res) => setProducts(res.data))
			.catch(() => toast.error('Failed to load products'))
			.finally(() => setLoading(false))
	}

	useEffect(() => { load() }, [])

	const handleFiles = (files) => {
		const fileArray = Array.from(files || [])
		// append to existing, avoid duplicates by name+size
		const map = new Map(mediaFiles.map(f => [f.name + ':' + f.size, f]))
		fileArray.forEach(f => map.set(f.name + ':' + f.size, f))
		setMediaFiles(Array.from(map.values()))
	}

	const onPickMedia = (e) => {
		handleFiles(e.target.files)
		// Reset the input to allow selecting the same files again
		e.target.value = ''
	}

	const onDragOver = (e) => {
		e.preventDefault()
		setIsDragOver(true)
	}

	const onDragLeave = (e) => {
		e.preventDefault()
		setIsDragOver(false)
	}

	const onDrop = (e) => {
		e.preventDefault()
		setIsDragOver(false)
		handleFiles(e.dataTransfer.files)
	}

	const removeMedia = (idx) => {
		setMediaFiles((prev) => prev.filter((_, i) => i !== idx))
	}

	const onCreate = async () => {
		try {
			const fd = new FormData()
			fd.append('name', name)
			fd.append('details', details)
			mediaFiles.forEach((f) => {
				if (f.type.startsWith('image/')) fd.append('images', f)
				else if (f.type.startsWith('video/')) fd.append('videos', f)
			})
			await createProduct(fd)
			toast.success('Product created')
			setName(''); setDetails(''); setMediaFiles([])
			load()
		} catch {
			toast.error('Create failed')
		}
	}

	const onDelete = async (id) => {
		try {
			await deleteProduct(id)
			toast.success('Deleted')
			load()
		} catch {
			toast.error('Delete failed')
		}
	}

	const onQuickRename = async (p) => {
		const newName = prompt('New name', p.name)
		if (!newName || newName === p.name) return
		try {
			await updateProduct(p._id || p.id, { name: newName, details: p.details })
			toast.success('Updated')
			load()
		} catch {
			toast.error('Update failed')
		}
	}

	return (
		<div className="container-page">
			{/* Header Section */}
			<div className="mb-8 py-8">
				<div className="flex items-center gap-4 mb-6">
					<div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl" style={{
						background: 'linear-gradient(to bottom right, var(--color-secondary), var(--color-primary))'
					}}>
						<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
					</div>
					<div>
						<h1 className="font-display font-bold text-4xl">
							<span className="text-secondary">Admin</span> <span className="text-dark">Dashboard</span>
						</h1>
						<p className="text-lg text-gray-600">Manage SRI JAI HARI Engineering products and enquiries</p>
					</div>
				</div>

				{/* Quick Navigation */}
				<div className="flex flex-wrap gap-4 mb-8">
					<Link 
						to="/admin/enquiries" 
						className="btn-secondary flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
						View Enquiries
					</Link>
					<button 
						onClick={load}
						className="btn-outline flex items-center gap-2"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
						Refresh Products
					</button>
				</div>
			</div>

			{/* Create Product Section */}
			<div className="card-engineering mb-8">
				<div className="flex items-center gap-3 mb-6">
					<svg className="gear-icon" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
					</svg>
					<h2 className="text-2xl font-display font-bold text-dark">Create New Product</h2>
				</div>
				<div className="space-y-6">
					<div className="grid sm:grid-cols-2 gap-6">
						<label className="block">
							<span className="font-sans font-semibold text-dark mb-2 block">Product Name *</span>
							<input 
								value={name} 
								onChange={(e)=>setName(e.target.value)} 
								placeholder="Rajeswari Bullet Plate Mill" 
								className="w-full rounded-lg border-2 bg-white px-4 py-3 font-sans focus:border-primary focus:ring-2 focus:ring-primary-light transition-all duration-200 text-black" 
								style={{borderColor: 'var(--color-accent-light)'}}
							/>
						</label>
						<label className="block">
							<span className="font-sans font-semibold text-dark mb-2 block">Product Details *</span>
							<input 
								value={details} 
								onChange={(e)=>setDetails(e.target.value)} 
								placeholder="Short description" 
								className="w-full rounded-lg border-2 bg-white px-4 py-3 font-sans focus:border-primary focus:ring-2 focus:ring-primary-light transition-all duration-200 text-black" 
								style={{borderColor: 'var(--color-accent-light)'}}
							/>
						</label>
					</div>
					
					<label className="block">
						<span className="font-sans font-semibold text-dark mb-2 block">Media Files (Images & Videos)</span>
						<div 
							className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
								isDragOver 
									? 'border-primary scale-105' 
									: 'hover:border-primary'
							}`}
							style={{
								borderColor: isDragOver ? 'var(--color-primary)' : 'var(--color-accent)',
								backgroundColor: isDragOver ? 'rgba(254, 226, 226, 0.2)' : 'transparent'
							}}
							onDragOver={onDragOver}
							onDragLeave={onDragLeave}
							onDrop={onDrop}
						>
							<div className="flex flex-col items-center gap-4">
								<div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
									background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))'
								}}>
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
									</svg>
								</div>
								<div>
									<input 
										type="file" 
										accept="image/*,video/*" 
										multiple 
										onChange={onPickMedia} 
										className="w-full mb-4" 
									/>
									<p className="text-lg font-medium text-dark mb-2">
										Drag and drop files here, or click to select
									</p>
									<p className="text-sm text-accent">
										Select multiple images and videos. You can remove items below before creating.
									</p>
								</div>
							</div>
						</div>
					</label>
					
					{mediaFiles.length > 0 && (
						<div className="space-y-4">
							<h3 className="font-sans font-semibold text-dark">Selected Files ({mediaFiles.length})</h3>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
								{mediaFiles.map((f, idx) => (
									<div key={f.name + idx} className="relative rounded-xl overflow-hidden border-2 bg-white group hover:border-primary transition-all duration-200" style={{
										borderColor: 'var(--color-accent-light)'
									}}>
										{f.type.startsWith('image/') ? (
											<img src={URL.createObjectURL(f)} className="h-32 w-full object-cover" />
										) : (
											<video src={URL.createObjectURL(f)} className="h-32 w-full object-cover" />
										)}
										<button 
											type="button" 
											className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200" 
											onClick={() => removeMedia(idx)}
										>
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
										<div className="p-2">
											<p className="text-xs text-gray-600 truncate">{f.name}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
					
					<div className="flex justify-center pt-4">
						<button className="btn text-lg px-8 py-4" onClick={onCreate}>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							Create Product
						</button>
					</div>
				</div>
			</div>

			{/* Products List Section */}
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-6">
					<svg className="gear-icon" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
					</svg>
					<h2 className="text-2xl font-display font-bold text-dark">Manage Products</h2>
				</div>
			</div>

			{loading ? <Loader /> : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{products.map((p) => (
						<div key={p._id || p.id} className="card-engineering group">
							<div className="aspect-video rounded-xl overflow-hidden mb-4" style={{
								background: 'linear-gradient(to bottom right, var(--color-secondary-light), var(--color-primary-light))'
							}}>
								{p.images?.[0] ? (
									<img src={p.images[0]} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
								) : (
									<div className="h-full w-full grid place-items-center text-accent">
										<svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
										</svg>
									</div>
								)}
							</div>
							<div className="space-y-4">
								<h3 className="font-sans font-bold text-lg text-dark group-hover:text-primary transition-colors">
									{p.name}
								</h3>
								<div className="flex gap-3">
									<button 
										className="btn-outline flex-1 text-sm py-2" 
										onClick={() => onQuickRename(p)}
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
										Rename
									</button>
									<button 
										className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-sans font-semibold text-sm transition-all duration-200 flex-1 flex items-center justify-center gap-2" 
										onClick={() => onDelete(p._id || p.id)}
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default AdminDashboard
