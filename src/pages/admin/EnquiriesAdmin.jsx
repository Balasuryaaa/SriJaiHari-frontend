import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { listEnquiries, updateEnquiry } from '../../lib/api'
import Loader from '../../components/Loader'

function EnquiriesAdmin() {
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [filter, setFilter] = useState('all') // all, pending, resolved

	const load = () => {
		setLoading(true)
		listEnquiries()
			.then((res) => {
				// Sort by status first (unresolved first), then by newest first
				const sortedItems = res.data.sort((a, b) => {
					// First sort by status: unresolved (pending) first, then resolved
					const statusA = a.status === 'resolved' ? 1 : 0
					const statusB = b.status === 'resolved' ? 1 : 0
					
					if (statusA !== statusB) {
						return statusA - statusB // 0 (unresolved) comes before 1 (resolved)
					}
					
					// If same status, sort by newest first
					const dateA = new Date(a.createdAt || a.created_at || 0)
					const dateB = new Date(b.createdAt || b.created_at || 0)
					return dateB - dateA
				})
				setItems(sortedItems)
			})
			.catch(() => toast.error('Failed to load enquiries'))
			.finally(() => setLoading(false))
	}

	useEffect(() => { load() }, [])

	const markResolved = async (id) => {
		try {
			await updateEnquiry(id, { status: 'resolved' })
			toast.success('Marked as resolved')
			load()
		} catch {
			toast.error('Failed to update enquiry')
		}
	}

	const markPending = async (id) => {
		try {
			await updateEnquiry(id, { status: 'pending' })
			toast.success('Marked as pending')
			load()
		} catch {
			toast.error('Failed to update enquiry')
		}
	}

	const filteredItems = items.filter(item => {
		if (filter === 'pending') return item.status !== 'resolved'
		if (filter === 'resolved') return item.status === 'resolved'
		return true
	})

	return (
		<div className="container-page">
			{/* Header Section */}
			<div className="mb-8 py-8">
				<div className="flex items-center gap-4 mb-6">
					<div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl" style={{
						background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))'
					}}>
						<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
					</div>
					<div>
						<h1 className="font-display font-bold text-4xl">
							<span className="text-primary">Customer</span> <span className="text-dark dark:text-white">Enquiries</span>
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300">Manage and respond to customer inquiries</p>
					</div>
				</div>

				{/* Filter Controls */}
				<div className="flex flex-wrap items-center gap-4 mb-6">
					<div className="flex items-center gap-2">
						<span className="font-sans font-semibold text-dark dark:text-white">Filter:</span>
						<select 
							value={filter} 
							onChange={(e) => setFilter(e.target.value)}
							className="rounded-lg border-2 px-3 py-2 font-sans focus:border-primary focus:ring-2 focus:ring-primary-light transition-all duration-200 dark:bg-gray-800 text-black"
							style={{
								borderColor: 'var(--color-accent-light)',
								backgroundColor: 'white'
							}}
						>
							<option value="all">All Enquiries ({items.length})</option>
							<option value="pending">Pending ({items.filter(i => i.status !== 'resolved').length})</option>
							<option value="resolved">Resolved ({items.filter(i => i.status === 'resolved').length})</option>
						</select>
					</div>
					<button 
						onClick={load}
						className="btn-outline text-sm px-4 py-2"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
						Refresh
					</button>
				</div>
			</div>

			{loading ? <Loader /> : (
				<div className="space-y-6">
					{filteredItems.length === 0 ? (
						<div className="card-engineering text-center py-12">
							<svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-accent)'}}>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
							<h3 className="text-xl font-display font-bold text-dark dark:text-white mb-2">
								{filter === 'all' ? 'No Enquiries Yet' : `No ${filter} Enquiries`}
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								{filter === 'all' 
									? 'Customer enquiries will appear here when they are submitted.' 
									: `No ${filter} enquiries found. Try changing the filter.`
								}
							</p>
						</div>
					) : (
						filteredItems.map((e) => (
							<div key={e._id || e.id} className="card-engineering group hover:shadow-xl transition-all duration-300">
								<div className="flex items-start justify-between gap-6">
									<div className="flex-1 space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
												background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))'
											}}>
												<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
												</svg>
											</div>
											<div className="flex-1">
												<div className="flex items-center justify-between">
													<h3 className="font-sans font-bold text-lg text-dark dark:text-white">{e.name}</h3>
													<span className="text-xs text-gray-500 dark:text-gray-400">
														{new Date(e.createdAt || e.created_at || Date.now()).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
															day: 'numeric',
															hour: '2-digit',
															minute: '2-digit'
														})}
													</span>
												</div>
												<p className="text-sm dark:text-gray-300" style={{color: 'var(--color-accent)'}}>{e.email}</p>
											</div>
										</div>
										<div className="rounded-lg p-4" style={{backgroundColor: 'var(--color-accent-light)'}}>
											<p className="text-gray-700 dark:text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{e.message}</p>
										</div>
									</div>
									<div className="flex flex-col items-end gap-3">
										<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
											e.status === 'resolved' 
												? 'bg-green-100 text-green-700 border border-green-200' 
												: 'bg-amber-100 text-amber-700 border border-amber-200'
										}`}>
											{e.status === 'resolved' ? '✓ Resolved' : '⏳ Pending'}
										</span>
										<div className="flex gap-2">
											{e.status === 'resolved' ? (
												<button 
													className="btn-outline text-sm px-3 py-2" 
													onClick={() => markPending(e._id || e.id)}
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													Mark Pending
												</button>
											) : (
												<button 
													className="btn text-sm px-3 py-2" 
													onClick={() => markResolved(e._id || e.id)}
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
													</svg>
													Mark Resolved
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			)}
		</div>
	)
}

export default EnquiriesAdmin
