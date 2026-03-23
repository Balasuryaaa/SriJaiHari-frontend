import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { listEnquiries, updateEnquiry } from '../../lib/api'
import Loader from '../../components/Loader'
import useAuthStore from '../../stores/authStore'
import { motion, AnimatePresence } from 'framer-motion'

const RED = '#C41E3A'
const STEEL = '#8C8C8C'

function EnquiriesAdmin() {
	const navigate = useNavigate()
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [filter, setFilter] = useState('all') // all, pending, resolved

	const load = () => {
		setLoading(true)
		listEnquiries()
			.then((res) => {
				const sortedItems = res.data.sort((a, b) => {
					const statusA = a.status === 'resolved' ? 1 : 0
					const statusB = b.status === 'resolved' ? 1 : 0
					if (statusA !== statusB) return statusA - statusB
					const dateA = new Date(a.createdAt || 0)
					const dateB = new Date(b.createdAt || 0)
					return dateB - dateA
				})
				setItems(sortedItems)
			})
			.catch(() => toast.error('Failed to load enquiries'))
			.finally(() => setLoading(false))
	}

	useEffect(() => { load() }, [])

  const onLogout = () => {
    useAuthStore.getState().logout()
    toast.success('Logged out')
    navigate('/')
  }

	const markResolved = async (id) => {
		try {
			await updateEnquiry(id, { status: 'resolved' })
			toast.success('Marked as resolved')
			load()
		} catch {
			toast.error('Failed to update')
		}
	}

	const markPending = async (id) => {
		try {
			await updateEnquiry(id, { status: 'pending' })
			toast.success('Marked as pending')
			load()
		} catch {
			toast.error('Failed to update')
		}
	}

	const filteredItems = items.filter(item => {
		if (filter === 'pending') return item.status !== 'resolved'
		if (filter === 'resolved') return item.status === 'resolved'
		return true
	})

	return (
		<div style={{ background:'#fcfcfc', minHeight:'100vh', padding:'2rem 1rem' }}>
			<div className="container-page" style={{ maxWidth: 1000 }}>
				
        {/* Navigation Breadcrumb */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:30 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:STEEL }}>
            <Link to="/admin" style={{ textDecoration:'none', color:STEEL, fontWeight:600 }}>Dashboard</Link>
            <span>/</span>
            <span style={{ color:RED, fontWeight:800 }}>Enquiries</span>
          </div>
          <button onClick={onLogout} style={{ background:'none', color:STEEL, border:'1.5px solid #eee', padding:'6px 16px', borderRadius:10, fontSize:12, fontWeight:700, cursor:'pointer' }}>
            Logout
          </button>
        </div>

				{/* Header */}
				<header style={{ marginBottom: 40 }}>
					<h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 32, color: '#111', margin: 0 }}>
						Customer <span style={{ color: RED }}>Enquiries</span>
					</h1>
					<p style={{ color: STEEL, fontSize: 14 }}>Track and respond to incoming quote requests</p>
				</header>

				{/* Filters & Actions */}
				<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:15 }}>
					<div style={{ display:'flex', alignItems:'center', gap:12 }}>
						<span style={{ fontSize:13, fontWeight:800, color:STEEL }}>FILTER:</span>
						<select 
							value={filter} 
							onChange={(e) => setFilter(e.target.value)}
							style={{ padding:'8px 12px', borderRadius:10, border:'1.5px solid #eee', outline:'none', fontSize:13, fontWeight:700 }}
						>
							<option value="all">All ({items.length})</option>
							<option value="pending">Pending ({items.filter(i => i.status !== 'resolved').length})</option>
							<option value="resolved">Resolved ({items.filter(i => i.status === 'resolved').length})</option>
						</select>
					</div>
					<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={load} style={{ background:'#fff', border:'1.5px solid #eee', padding:'8px 16px', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer' }}>
						Refresh List
					</motion.button>
				</div>

				<div style={{ display:'flex', flexDirection:'column', gap:20 }}>
					{loading ? <Loader /> : (
						filteredItems.length === 0 ? (
							<div style={{ textAlign:'center', padding:'60px 0', color:STEEL }}>No enquiries found matching this filter.</div>
						) : (
							<motion.div initial="hidden" animate="show" variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.06 } } }} style={{ display:'flex', flexDirection:'column', gap:20 }}>
							{filteredItems.map(e => (
								<motion.div variants={{ hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0 } }} whileHover={{ scale: 1.01, boxShadow: '0 15px 40px rgba(196,30,58,0.08)' }} key={e._id || e.id} style={{ 
									background:'#fff', borderRadius:24, padding:25, border: e.status === 'resolved' ? '1.5px solid #eee' : `1.5px solid ${RED}`,
									boxShadow: e.status === 'resolved' ? 'none' : '0 10px 30px rgba(196,30,58,0.05)', position:'relative'
								}}>
									<div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:20 }}>
										<div>
											<h3 style={{ margin:0, fontSize:18, fontWeight:900, color:'#111' }}>{e.name}</h3>
											<div style={{ display:'flex', gap:12, marginTop:6 }}>
												<span style={{ fontSize:12, color:RED, fontWeight:700 }}>{e.email}</span>
												{e.phone && <span style={{ fontSize:12, color:STEEL, fontWeight:700 }}>• {e.phone}</span>}
											</div>
										</div>
										<span style={{ fontSize:11, fontWeight:900, color:STEEL }}>{new Date(e.createdAt).toLocaleDateString()}</span>
									</div>

									<div style={{ background:'#fafafa', padding:18, borderRadius:16, fontSize:14, color:'#444', lineHeight:1.6, marginBottom:20 }}>
										{e.message}
									</div>

									<div style={{ display:'flex', justifyContent:'flex-end' }}>
										{e.status === 'resolved' ? (
											<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={()=>markPending(e._id || e.id)} style={{ padding:'8px 16px', borderRadius:10, border:'1.5px solid #eee', background:'#fff', fontSize:12, fontWeight:800, cursor:'pointer', color:STEEL }}>
												Move to Pending
											</motion.button>
										) : (
											<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={()=>markResolved(e._id || e.id)} style={{ padding:'8px 20px', borderRadius:10, border:'none', background:RED, color:'#fff', fontSize:12, fontWeight:800, cursor:'pointer', boxShadow:`0 4px 12px rgba(196,30,58,0.2)` }}>
												Mark Resolved
											</motion.button>
										)}
									</div>
								</motion.div>
							))}
							</motion.div>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default EnquiriesAdmin
