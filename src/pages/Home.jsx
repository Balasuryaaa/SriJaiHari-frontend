import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../lib/api'
import Loader from '../components/Loader'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const RED   = '#C41E3A'
const CYAN  = '#0EA5E9'
const STEEL = '#8C8C8C'

function Home() {
	const [products, setProducts] = useState([])
	const [loading, setLoading]   = useState(true)
	const [error, setError]       = useState(false)
	const navigate = useNavigate()
	const { t } = useLanguage()

	useEffect(() => {
		getProducts()
			.then((res) => setProducts(res.data))
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}, [])

	if (loading) return <Loader />

	return (
		<div style={{ background:'#fff' }}>

			{/* ══════════════════════════════════════════
			    HERO SECTION
			══════════════════════════════════════════ */}
			<div style={{
				background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 55%, #3a0d16 100%)`,
				position: 'relative', overflow: 'hidden',
				padding: 'clamp(3rem,8vw,6rem) 1rem clamp(3rem,7vw,5rem)',
			}}>
				<div className="container-page" style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
					{/* Live badge */}
					<motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
						style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(14,165,233,0.15)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:50, padding:'6px 18px', marginBottom:28 }}>
						<span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
						<span style={{ color:'rgba(255,255,255,0.85)', fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' }}>{t('hero.trusted')}</span>
					</motion.div>

					{/* Headline */}
					<motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
						style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2.4rem,6vw,4.2rem)', lineHeight:1.12, marginBottom:22, letterSpacing:'-0.01em' }}>
						<span style={{ color:RED }}>SRI JAI HARI</span><br />
						<span style={{ color:'#fff' }}>{t('hero.engineering')}</span>
					</motion.h1>

					{/* Sub-headline */}
					<motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.18 }}
						style={{ color:'rgba(255,255,255,0.68)', fontSize:'clamp(0.95rem,2vw,1.12rem)', maxWidth:560, marginBottom:36, lineHeight:1.7 }}>
						{t('hero.tagline')}
					</motion.p>

					{/* CTAs */}
					<motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.25 }}
						style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:56 }}>
						<a href="#products" style={{ background:RED, color:'#fff', textDecoration:'none', borderRadius:10, padding:'13px 30px', fontWeight:700, fontSize:15, boxShadow:`0 8px 24px rgba(196,30,58,0.4)`, transition:'all 0.2s' }}>
							{t('hero.browse')}
						</a>
						<a href="/enquiry" style={{ background:'rgba(14,165,233,0.18)', color:'#fff', textDecoration:'none', borderRadius:10, padding:'13px 30px', fontWeight:700, fontSize:15, border:'1.5px solid rgba(14,165,233,0.5)', transition:'all 0.2s' }}>
							{t('hero.getQuote')}
						</a>
					</motion.div>

					{/* Stats */}
					<motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.4 }}
						style={{ display:'flex', justifyContent:'center', gap:'clamp(1.5rem,4vw,4rem)', flexWrap:'wrap', paddingTop:40, borderTop:'1px solid rgba(255,255,255,0.1)', width:'100%' }}>
						{[ 
							{v:'20+', l: t('hero.years')}, 
							{v:'3', l: t('hero.categories')}, 
							{v:'All TN', l: t('hero.coverage')}, 
							{v:'24/7', l: t('hero.support')} 
						].map(item => (
							<div key={item.l} style={{ textAlign:'center' }}>
								<div style={{ color:RED, fontWeight:900, fontSize:'clamp(1.5rem,3vw,2.2rem)', fontFamily:"'Playfair Display',serif" }}>{item.v}</div>
								<div style={{ color:'rgba(255,255,255,0.5)', fontSize:12, fontWeight:500, marginTop:3, letterSpacing:'0.04em' }}>{item.l}</div>
							</div>
						))}
					</motion.div>
				</div>
			</div>

			{/* ══════════════════════════════════════════
			    PRODUCTS SECTION
			══════════════════════════════════════════ */}
			<div id="products" className="container-page" style={{ padding:'4.5rem 1rem' }}>
				{/* Section heading */}
				<div style={{ textAlign:'center', marginBottom:'3rem' }}>
					<div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#fde8ec', borderRadius:50, padding:'4px 16px', marginBottom:14 }}>
						<span style={{ color:RED, fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em' }}>{t('home.catalogue')}</span>
					</div>
					<h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.9rem,4vw,3rem)', color:'#111', marginBottom:12 }}>
						{t('home.engineeringProducts')}
					</h2>
					<p style={{ color:STEEL, maxWidth:500, margin:'0 auto', fontSize:15, lineHeight:1.65 }}>
						{t('home.productsTagline')}
					</p>
				</div>

				{products.length === 0 ? (
					<div style={{ textAlign:'center', padding:'4rem 1rem', color:'#9ca3af' }}>
						<p style={{ fontSize:16, fontWeight:700, color:'#374151', marginBottom:6 }}>{t('home.noProducts')}</p>
						<p style={{ fontSize:13, color:STEEL }}>{t('home.noProductsSub')}</p>
					</div>
				) : (
					<motion.div
						initial="hidden" animate="show"
						variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.07 } } }}
						style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:'1.75rem' }}
					>
						{products.map((p) => (
							<ProductCard key={p._id || p.id} p={p} onClick={() => navigate(`/products/${p._id || p.id}`)} />
						))}
					</motion.div>
				)}

				{/* ── CTA Banner ─────────────────────────────────────────────── */}
				<motion.div
					initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
					viewport={{ once:true }} transition={{ duration:0.6 }}
					style={{
						marginTop:'4.5rem',
						background:`linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #3a0d16 100%)`,
						borderRadius:20, padding:'3.5rem 2rem', textAlign:'center',
						position:'relative', overflow:'hidden',
						border:`2px solid rgba(196,30,58,0.3)`,
					}}
				>
					<div style={{ position:'relative' }}>
						<h3 style={{ fontFamily:"'Playfair Display',serif", color:'#fff', fontWeight:900, fontSize:'clamp(1.5rem,3vw,2.4rem)', marginBottom:12 }}>
							{t('home.bulkTitle')}
						</h3>
						<p style={{ color:'rgba(255,255,255,0.6)', marginBottom:30, fontSize:15, maxWidth:480, margin:'0 auto 30px' }}>
							{t('home.bulkSub')}
						</p>
						<div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
							<a href="/enquiry" style={{ display:'inline-flex', alignItems:'center', gap:8, background:RED, color:'#fff', textDecoration:'none', borderRadius:10, padding:'13px 28px', fontWeight:700, fontSize:15, boxShadow:`0 8px 24px rgba(196,30,58,0.4)` }}>
								{t('home.sendEnquiry')}
							</a>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

function ProductCard({ p, onClick }) {
	const [hovered, setHovered] = useState(false)
	return (
		<motion.div
			variants={{ hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0 } }}
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				background:'#fff', borderRadius:16, overflow:'hidden', cursor:'pointer',
				border: hovered ? `1.5px solid ${RED}` : '1.5px solid #e8e8e8',
				boxShadow: hovered ? `0 16px 48px rgba(196,30,58,0.14)` : '0 4px 16px rgba(0,0,0,0.05)',
				transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
				transition: 'all 0.28s ease',
			}}
		>
			<div style={{ aspectRatio:'16/10', overflow:'hidden', background:'linear-gradient(135deg, #f0f8ff, #fde8ec)' }}>
				{p.images?.[0] && (
					<img src={p.images[0]} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', transform: hovered ? 'scale(1.07)' : 'scale(1)', transition:'transform 0.4s ease' }} />
				)}
			</div>
			<div style={{ padding:'1.1rem 1.25rem 1.3rem' }}>
				<h3 style={{ fontWeight:700, fontSize:15.5, color:'#111', marginBottom:6 }}>{p.name}</h3>
				<p style={{ fontSize:13, color:'#6b6b6b', lineHeight:1.55, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.details}</p>
			</div>
		</motion.div>
	)
}

export default Home
