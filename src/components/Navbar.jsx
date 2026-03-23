import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

const RED   = '#C41E3A'
const STEEL = '#8C8C8C'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { lang, setLang, t } = useLanguage()

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/enquiry', label: t('nav.enquiry') }
  ]

  return (
    <nav style={{
      background: '#fff',
      borderBottom: `2px solid ${RED}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    }}>
      <div className="container-page" style={{ 
        height: 'clamp(60px, 10vh, 80px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 1rem'
      }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', maxWidth: '75%' }}>
          <img src={logo} alt="SRI JAI HARI" style={{ height: 'clamp(32px, 5vw, 44px)', width: 'auto' }} />
          <div className="hidden-mobile">
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18 }}>
              <span style={{ color: RED }}>SRI JAI HARI</span>
            </div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: STEEL, marginTop: 1 }}>
              Engineering Solution
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2.5rem)' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              style={{
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 700,
                color: isActive(link.path) ? RED : '#333',
                padding: '8px 16px',
                borderRadius: 8,
                background: isActive(link.path) ? '#fde8ec' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Toggle */}
          <div style={{ display:'flex', border:`1.5px solid #eee`, borderRadius:10, overflow:'hidden', background:'#f9f9f9' }}>
            <button 
              onClick={() => setLang('en')}
              style={{ 
                padding:'6px 14px', fontSize:11, fontWeight:800, cursor:'pointer', border:'none',
                background: lang === 'en' ? RED : 'transparent',
                color: lang === 'en' ? '#fff' : STEEL,
                transition: 'all 0.2s'
              }}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('ta')}
              style={{ 
                padding:'6px 14px', fontSize:11, fontWeight:800, cursor:'pointer', border:'none',
                background: lang === 'ta' ? RED : 'transparent',
                color: lang === 'ta' ? '#fff' : STEEL,
                transition: 'all 0.2s'
              }}
            >
              தமிழ்
            </button>
          </div>

          <a href="tel:+919514111460" className="hidden-mobile" style={{
            background: RED,
            color: '#fff',
            textDecoration: 'none',
            padding: '11px 24px',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: `0 8px 24px rgba(196,30,58,0.3)`
          }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t('nav.callNow')}
          </a>
        </div>

        {/* ── Animated Hamburger Icon ── */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="visible-mobile"
          style={{ background:'none', border:'none', cursor:'pointer', width:40, height:40, position:'relative', zIndex:1001 }}
        >
          <div style={{ width:24, height:2, background:RED, position:'absolute', top:isOpen?'20px':'14px', left:8, 
            transform:isOpen?'rotate(45deg)':'none', transition:'0.3s' }} />
          <div style={{ width:24, height:2, background:RED, position:'absolute', top:'20px', left:8, 
            opacity:isOpen?0:1, transition:'0.2s' }} />
          <div style={{ width:24, height:2, background:RED, position:'absolute', top:isOpen?'20px':'26px', left:8, 
            transform:isOpen?'rotate(-45deg)':'none', transition:'0.3s' }} />
        </button>
      </div>

      {/* ── Mobile Side Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px', 
              background: '#fff', zIndex: 1000, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              padding: '100px 30px 40px', display: 'flex', flexDirection: 'column', gap: 20
            }}
          >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={()=>setIsOpen(false)}
                style={{ textDecoration:'none', color:'#111', fontSize:18, fontWeight:800, borderBottom:'1px solid #f0f0f0', paddingBottom:12 }}>
                {link.label}
              </Link>
            ))}
            
            {/* Added Control Room link for Admin access */}
            <Link to="/admin" onClick={()=>setIsOpen(false)}
              style={{ textDecoration:'none', color:RED, fontSize:18, fontWeight:900, borderBottom:'1px solid #f0f0f0', paddingBottom:12 }}>
              ⚙ Control Room
            </Link>
          </div>

          <div style={{ marginTop:'auto', display:'flex', gap:10 }}>
            <button onClick={()=>setLang('en')} style={{ flex:1, padding:14, borderRadius:12, border:`1.5px solid ${lang==='en'?RED:'#eee'}`, background:lang==='en'?RED:'#fff', color:lang==='en'?'#fff':'#333', fontWeight:800, fontSize:12 }}>English</button>
            <button onClick={()=>setLang('ta')} style={{ flex:1, padding:14, borderRadius:12, border:`1.5px solid ${lang==='ta'?RED:'#eee'}`, background:lang==='ta'?RED:'#fff', color:lang==='ta'?'#fff':'#333', fontWeight:800, fontSize:12 }}>தமிழ்</button>
          </div>

          <a href="tel:+919514111460" style={{ background:RED, color:'#fff', textDecoration:'none', padding:18, borderRadius:14, textAlign:'center', fontWeight:800, fontSize:16, boxShadow:'0 10px 20px rgba(196,30,58,0.2)' }}>
            {t('nav.callNow')}
          </a>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay */}
      {isOpen && <div onClick={()=>setIsOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.2)', backdropFilter:'blur(2px)', zIndex:999 }} />}
    </nav>
  )
}

export default Navbar
