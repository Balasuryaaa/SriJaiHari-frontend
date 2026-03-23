import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct } from '../lib/api'
import Loader from '../components/Loader'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const RED   = '#C41E3A'
const CYAN  = '#0EA5E9'
const STEEL = '#8C8C8C'

function ProductDetails() {
	const { t } = useLanguage()
	const { productId } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [activeImg, setActiveImg] = useState(0)

	useEffect(() => {
		setLoading(true)
		getProduct(productId)
			.then((res) => setProduct(res.data))
			.catch(() => setError('Failed to load product details.'))
			.finally(() => setLoading(false))
	}, [productId])

	if (loading) return <Loader />

	if (error || !product) return (
		<div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh', flexDirection:'column' }}>
			<h2 style={{ color:STEEL, marginBottom:20 }}>{error || 'Product not found'}</h2>
			<button onClick={() => navigate('/')} style={{ background:RED, color:'#fff', border:'none', borderRadius:10, padding:'10px 24px', cursor:'pointer', fontWeight:800 }}>
				{t('product.back')}
			</button>
		</div>
	)

	const images = product.images || []

	return (
		<div style={{ background:'#fff', minHeight:'100vh' }}>
			{/* ── Sub-Header / Breadcrumb ────────────────────────────────────── */}
			<div style={{ background:'#f8f8f6', borderBottom:'1px solid #e8e8e8', padding:'1rem 0' }}>
				<div className="container-page" style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:STEEL }}>
					<span onClick={() => navigate('/')} style={{ cursor:'pointer', fontWeight:600 }}>{t('nav.home')}</span>
					<span style={{ opacity:0.5 }}>/</span>
					<span style={{ color:RED, fontWeight:800 }}>{product.name}</span>
				</div>
			</div>

			<div className="container-page" style={{ padding:'4rem 1rem' }}>
				<div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'4rem', alignItems:'start' }}>
					
					{/* ── Left: Image Gallery ────────────────────────────────────────── */}
					<div className="lg:sticky lg:top-24">
						<motion.div 
							initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
							style={{ 
								aspectRatio:'1/1', background:'#f9f9f9', borderRadius:24, overflow:'hidden', 
								border:'1.5px solid #eee', boxShadow:'0 10px 40px rgba(0,0,0,0.04)',
								marginBottom:20, position:'relative'
							}}
						>
							<AnimatePresence mode='wait'>
								<motion.img 
									key={activeImg}
									initial={{ opacity:0, scale:0.95 }}
									animate={{ opacity:1, scale:1 }}
									exit={{ opacity:0, scale:1.05 }}
									transition={{ duration:0.3 }}
									src={images[activeImg]} 
									alt={product.name} 
									style={{ width:'100%', height:'100%', objectFit:'contain', padding:20 }}
								/>
							</AnimatePresence>
							
							{/* Large Brand Watermark */}
							<div style={{ position:'absolute', bottom:20, right:20, opacity:0.1, pointerEvents:'none' }}>
								<div style={{ fontSize:40, fontWeight:900, color:STEEL, fontFamily:"'Playfair Display',serif" }}>SJHES</div>
							</div>
						</motion.div>

						{/* Thumbnails */}
						{images.length > 1 && (
							<div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
								{images.map((img, idx) => (
									<button 
										key={idx}
										onClick={() => setActiveImg(idx)}
										style={{ 
											width:80, height:80, borderRadius:12, overflow:'hidden', cursor:'pointer',
											border: activeImg === idx ? `2px solid ${RED}` : '2px solid transparent',
											padding:4, background:'#fff', transition:'all 0.2s',
											boxShadow: activeImg === idx ? '0 4px 12px rgba(196,30,58,0.2)' : 'none'
										}}
									>
										<img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:8 }} />
									</button>
								))}
							</div>
						)}
					</div>

					{/* ── Right: Product Content ────────────────────────────────────── */}
					<motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}>
						<div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#fde8ec', borderRadius:50, padding:'5px 16px', marginBottom:18 }}>
							<span style={{ width:8, height:8, borderRadius:'50%', background:RED }} />
							<span style={{ color:RED, fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.06em' }}>{t('product.premium')}</span>
						</div>

						<h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.4rem,4vw,3.2rem)', fontWeight:900, color:'#111', lineHeight:1.1, marginBottom:16 }}>
							{product.name}
						</h1>

						<div style={{ display:'flex', gap:16, marginBottom:32 }}>
							<div style={{ display:'flex', alignItems:'center', gap:6 }}>
								<div style={{ color:'gold', fontSize:18 }}>★★★★★</div>
								<span style={{ fontSize:13, color:STEEL, fontWeight:600 }}>{t('product.trusted')}</span>
							</div>
							<div style={{ borderLeft:'1px solid #ddd', height:20 }} />
							<div style={{ fontSize:13, color:CYAN, fontWeight:800, letterSpacing:'0.02em' }}>{t('product.delivery')}</div>
						</div>

						<div style={{ background:'#fcfcfc', border:'1.5px solid #f0f0f0', borderRadius:20, padding:'2rem', marginBottom:32 }}>
							<h3 style={{ fontSize:14, fontWeight:800, color:'#111', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
								<svg width="18" height="18" fill="none" stroke={RED} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
								{t('product.specs')}
							</h3>
							<p style={{ color:'#444', fontSize:16, lineHeight:1.8, whiteSpace:'pre-wrap' }}>
								{product.details}
							</p>
						</div>

						{/* Feature List */}
						<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:40 }}>
							{[
								{ t: t('product.category'), v: 'Industrial Spare Part' },
								{ t: 'Model', v: product.model || 'none' },
								{ t: t('product.deliveryLabel'), v: 'All Tamil Nadu' },
								{ t: t('product.supportLabel'), v: '24/7 Assistance' },
								{ t: t('product.warranty'), v: 'Manufacturer Warranty' }
							].map(item => (
								<div key={item.t} style={{ borderBottom:'1px solid #f0f0f0', paddingBottom:10 }}>
									<div style={{ fontSize:11, color:STEEL, textTransform:'uppercase', fontWeight:700 }}>{item.t}</div>
									<div style={{ fontSize:14, fontWeight:700, color:'#333' }}>{item.v}</div>
								</div>
							))}
						</div>

						{/* Inquiry Actions */}
						<div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
							<button 
								onClick={() => navigate('/enquiry')}
								style={{ 
									flex:1, minWidth:240, background:RED, color:'#fff', border:'none', borderRadius:14, 
									padding:'18px 32px', fontWeight:800, fontSize:16, cursor:'pointer',
									boxShadow:`0 10px 30px rgba(196,30,58,0.35)`, transition:'all 0.2s',
									display:'flex', alignItems:'center', justifyContent:'center', gap:10
								}}
							>
								{t('product.customQuote')}
							</button>
							<a 
								href="tel:+919514111460"
								style={{ 
									background:'rgba(14,165,233,0.1)', color:CYAN, textDecoration:'none', borderRadius:14, 
									padding:'18px 24px', fontWeight:800, border:`1.5px solid ${CYAN}`,
									transition:'all 0.2s', display:'flex', alignItems:'center', gap:10
								}}
							>
								<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
							</a>
						</div>

						<div style={{ marginTop:30, display:'flex', alignItems:'center', gap:10, color:STEEL, fontSize:12 }}>
							<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
							SJH Genuine Safety Verified
						</div>
					</motion.div>
				</div>
			</div>

			{/* ── CTA Banner ─────────────────────────────────────────────────── */}
			<div style={{ background:'#fcfcfc', borderTop:'1px solid #f0f0f0', padding:'5rem 0' }}>
				<div className="container-page" style={{ textAlign:'center' }}>
					<h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:32, marginBottom:12 }}>{t('product.bulkTitle')}</h2>
					<p style={{ color:STEEL, marginBottom:30, fontSize:15 }}>{t('product.bulkSub')}</p>
					<div style={{ height:2, width:60, background:RED, margin:'0 auto 30px' }} />
					<div style={{ display:'flex', justifyContent:'center', gap:40, flexWrap:'wrap', color:'#111', fontWeight:800, fontSize:14, letterSpacing:'0.02em', textTransform:'uppercase' }}>
						<div style={{ display:'flex', alignItems:'center', gap:10 }}>
							<span style={{ width:12, height:12, background:CYAN, borderRadius:'50%', boxShadow:`0 0 10px ${CYAN}` }} />
							{t('product.instant')}
						</div>
						<div style={{ display:'flex', alignItems:'center', gap:10 }}>
							<span style={{ width:12, height:12, background:RED, borderRadius:'50%', boxShadow:`0 0 10px ${RED}` }} />
							{t('product.allTN')}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
