import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getProducts, createProduct, deleteProduct, updateProduct } from '../../lib/api'
import Loader from '../../components/Loader'
import AdminChatPanel from '../../components/AdminChatPanel'
import { motion, AnimatePresence } from 'framer-motion'
import useAuthStore from '../../stores/authStore'

const RED = '#C41E3A'
const CYAN = '#0EA5E9'
const STEEL = '#8C8C8C'

function AdminDashboard() {
	const [products, setProducts] = useState([])
	const [enquiries, setEnquiries] = useState([])
	const [loading, setLoading] = useState(true)
	const [creating, setCreating] = useState(false)
	
	// Form State
	const [name, setName] = useState('')
	const [model, setModel] = useState('none')
	const [details, setDetails] = useState('')
	const [mediaFiles, setMediaFiles] = useState([])
	const [isDragOver, setIsDragOver] = useState(false)

	// Editing State
	const [editingProduct, setEditingProduct] = useState(null)

	const load = async () => {
		setLoading(true)
		try {
			const prodRes = await getProducts()
			setProducts(prodRes.data)
			
			// Also fetch enquiries for accurate count
			const { getEnquiries } = await import('../../lib/api')
			const enqRes = await getEnquiries()
			setEnquiries(enqRes.data || [])
		} catch (error) {
			toast.error('Failed to load data')
		} finally {
			setLoading(false)
		}
	}

  const onLogout = () => {
    useAuthStore.getState().logout()
    toast.success('Logged out')
    window.location.href = '/'
  }

	useEffect(() => { load() }, [])

	const handleFiles = (files) => {
		const fileArray = Array.from(files || [])
		const map = new Map(mediaFiles.map(f => [f.name + ':' + f.size, f]))
		fileArray.forEach(f => map.set(f.name + ':' + f.size, f))
		setMediaFiles(Array.from(map.values()))
	}

	const onCreate = async () => {
		if (!name.trim() || !details.trim()) {
			toast.error('Name and details are required')
			return
		}
		setCreating(true)
		try {
			const fd = new FormData()
			fd.append('name', name)
			fd.append('model', model)
			fd.append('details', details)
			mediaFiles.forEach((f) => {
				if (f.type.startsWith('image/')) fd.append('images', f)
				else if (f.type.startsWith('video/')) fd.append('videos', f)
			})
			await createProduct(fd)
			toast.success('Product created!')
			setName('')
			setModel('none')
			setDetails('')
			setMediaFiles([])
			load()
		} catch (error) {
			toast.error('Creation failed')
		} finally {
			setCreating(false)
		}
	}

	const onDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this product?')) return
		try {
			await deleteProduct(id)
			toast.success('Deleted')
			load()
		} catch {
			toast.error('Delete failed')
		}
	}

  const onUpdateProduct = async (e) => {
    e.preventDefault()
    try {
      await updateProduct(editingProduct._id || editingProduct.id, {
        name: editingProduct.name,
        model: editingProduct.model,
        details: editingProduct.details
      })
      toast.success('Product updated!')
      setEditingProduct(null)
      load()
    } catch {
      toast.error('Update failed')
    }
  }

	return (
		<div style={{ background: '#fcfcfc', minHeight: '100vh', padding: '2rem 1rem' }}>
			<div className="container-page" style={{ maxWidth: 1200 }}>
				
				{/* Header */}
				<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap:'wrap', gap:20 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 32, color: '#111', margin: 0 }}>
              SJH <span style={{ color: RED }}>Management Suite</span>
            </h1>
            <p style={{ color: STEEL, fontSize: 14 }}>Inventory & Communication Hub</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/admin/enquiries" style={{ textDecoration: 'none', background: '#fff', color: '#111', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, border: '1.5px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              Enquiries ({enquiries.length > 99 ? '99+' : enquiries.length})
            </Link>
            <button onClick={load} style={{ background: RED, color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: `0 8px 20px rgba(196,30,58,0.2)` }}>
              Refresh Data
            </button>
            <button onClick={onLogout} style={{ background: 'none', color: '#111', border: '1.5px solid #eee', padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Logout
            </button>
          </div>
				</header>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))', gap:30, alignItems:'start' }}>
          
          {/* LEFT: Management Form */}
          <section style={{ display:'flex', flexDirection:'column', gap:30 }}>
            {/* Create Product Card */}
            <div style={{ background:'#fff', borderRadius:24, padding:30, border:'1.5px solid #eee', boxShadow:'0 20px 40px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:'#111', marginBottom:24, display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ width:32, height:32, background:'#fde8ec', color:RED, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>+</span>
                Add New Listing
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:15 }}>
                <input 
                  value={name} onChange={e=>setName(e.target.value)} placeholder="Product Name (e.g. Bullet Plate)"
                  style={{ width:'100%', padding:12, borderRadius:12, border:'1.5px solid #eee', outline:'none', fontSize:14, boxSizing:'border-box' }}
                />
                <input 
                  value={model} onChange={e=>setModel(e.target.value)} placeholder="Model Number (or none)"
                  style={{ width:'100%', padding:12, borderRadius:12, border:'1.5px solid #eee', outline:'none', fontSize:14, boxSizing:'border-box' }}
                />
                <textarea 
                  value={details} onChange={e=>setDetails(e.target.value)} placeholder="Technical Specifications..."
                  rows={4} style={{ width:'100%', padding:12, borderRadius:12, border:'1.5://eee', border:'1.5px solid #eee', outline:'none', fontSize:14, resize:'none', boxSizing:'border-box' }}
                />
                
                {/* Upload Zone */}
                <div 
                  onDragOver={e=>{e.preventDefault(); setIsDragOver(true)}} onDragLeave={()=>setIsDragOver(false)}
                  onDrop={e=>{e.preventDefault(); setIsDragOver(false); handleFiles(e.dataTransfer.files)}}
                  style={{ 
                    border:`2px dashed ${isDragOver?RED:'#eee'}`, borderRadius:16, padding:20, textAlign:'center', transition:'0.2s',
                    background: isDragOver ? '#fdf2f4' : '#fafafa'
                  }}
                >
                  <input type="file" multiple onChange={(e)=>handleFiles(e.target.files)} style={{ display:'none' }} id="media-up" />
                  <label htmlFor="media-up" style={{ cursor:'pointer' }}>
                    <div style={{ color:RED, fontWeight:800, fontSize:13 }}>Click to upload Media</div>
                    <div style={{ color:STEEL, fontSize:11 }}>Images or Videos for the gallery</div>
                  </label>
                </div>

                {mediaFiles.length > 0 && <div style={{ fontSize:12, color:STEEL }}>{mediaFiles.length} files selected</div>}

                <button 
                  onClick={onCreate} disabled={creating}
                  style={{ width:'100%', padding:14, borderRadius:12, border:'none', background:'#111', color:'#fff', fontWeight:800, cursor:'pointer', marginTop:10 }}
                >
                  {creating ? 'Uploading...' : 'Publish Listing'}
                </button>
              </div>
            </div>

            {/* Live Chat Integration */}
            <div style={{ background:'#fff', borderRadius:24, padding:10, border:'1.5px solid #eee', overflow:'hidden' }}>
              <AdminChatPanel />
            </div>
          </section>

          {/* RIGHT: Product Listing Table/Cards */}
          <section>
            <h2 style={{ fontSize:18, fontWeight:800, color:'#111', marginBottom:24, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:32, height:32, background:'#f0f9ff', color:CYAN, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>⚙</span>
              Current Inventory
            </h2>

            {loading ? <Loader /> : (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {products.map(p => (
                  <div key={p._id || p.id} style={{ background:'#fff', border:'1.5px solid #eee', borderRadius:20, padding:15, display:'flex', gap:15, alignItems:'center', transition:'0.2s' }}>
                    <img src={p.images?.[0]} alt="" style={{ width:70, height:70, borderRadius:12, objectFit:'cover', background:'#f9f9f9' }} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:800, fontSize:15, color:'#111', marginBottom:2 }}>{p.name}</div>
                      <div style={{ fontSize:11, background:'#f0f0f0', display:'inline-block', padding:'2px 8px', borderRadius:50, fontWeight:700, color:STEEL }}>Model: {p.model || 'none'}</div>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={()=>setEditingProduct(p)} style={{ width:36, height:36, borderRadius:10, border:'1.5px solid #eee', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="18" height="18" fill="none" stroke="#666" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button onClick={()=>onDelete(p._id || p.id)} style={{ width:36, height:36, borderRadius:10, border:'none', background:'#fde8ec', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="18" height="18" fill="none" stroke={RED} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
			</div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10000, padding:20 }}>
            <motion.div 
              initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
              style={{ background:'#fff', padding:40, borderRadius:32, maxWidth:500, width:'100%', boxShadow:'0 40px 100px rgba(0,0,0,0.2)' }}
            >
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight:900, marginBottom:30 }}>Edit Product</h2>
              <form onSubmit={onUpdateProduct} style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <div>
                  <label style={{ fontSize:12, fontWeight:800, color:STEEL, marginBottom:6, display:'block' }}>PRODUCT NAME</label>
                  <input 
                    value={editingProduct.name} 
                    onChange={e=>setEditingProduct({...editingProduct, name: e.target.value})}
                    style={{ width:'100%', padding:14, borderRadius:14, border:'1.5px solid #eee', outline:'none', fontSize:15, boxSizing:'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize:12, fontWeight:800, color:STEEL, marginBottom:6, display:'block' }}>MODEL NUMBER</label>
                  <input 
                    value={editingProduct.model} 
                    onChange={e=>setEditingProduct({...editingProduct, model: e.target.value})}
                    style={{ width:'100%', padding:14, borderRadius:14, border:'1.5px solid #eee', outline:'none', fontSize:15, boxSizing:'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize:12, fontWeight:800, color:STEEL, marginBottom:6, display:'block' }}>SPECIFICATIONS</label>
                  <textarea 
                    value={editingProduct.details} 
                    onChange={e=>setEditingProduct({...editingProduct, details: e.target.value})}
                    rows={5}
                    style={{ width:'100%', padding:14, borderRadius:14, border:'1.5px solid #eee', outline:'none', fontSize:15, resize:'none', boxSizing:'border-box' }}
                  />
                </div>
                <div style={{ display:'flex', gap:12, marginTop:10 }}>
                  <button type="submit" style={{ flex:2, padding:16, borderRadius:16, background:RED, color:'#fff', fontWeight:800, border:'none', cursor:'pointer' }}>Save Changes</button>
                  <button type="button" onClick={()=>setEditingProduct(null)} style={{ flex:1, padding:16, borderRadius:16, background:'#f0f0f0', color:'#111', fontWeight:800, border:'none', cursor:'pointer' }}>Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

		</div>
	)
}

export default AdminDashboard
