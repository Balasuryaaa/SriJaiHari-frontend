import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatWidget from './ChatWidget'

const RED   = '#C41E3A'
const CYAN  = '#0EA5E9'

function FloatingInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => setIsChatOpen(!isChatOpen)

  return (
    <>
      {/* ── Separate High-Visibility Chat Button ── */}
      <div style={{ position: 'fixed', right: 20, bottom: 100, zIndex: 9999 }}>
        <AnimatePresence>
          {!isChatOpen && (
            <motion.button 
              onClick={toggleChat}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 'clamp(55px, 12vw, 70px)', height: 'clamp(55px, 12vw, 70px)', borderRadius: '50%', background: CYAN,
                border: '3px solid #fff', color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 12px 30px rgba(14,165,233,0.4)`
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </motion.div>
              
              {/* Tooltip notice */}
              <div style={{ position:'absolute', right:75, background:'#111', color:'#fff', padding:'6px 12px', borderRadius:8, fontSize:10, fontWeight:700, whiteSpace:'nowrap', boxShadow:'0 10px 20px rgba(0,0,0,0.1)' }} className="hidden-mobile">
                Message Consultant
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Contact Menu Toggle ── */}
      <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 998 }}>
        <AnimatePresence>
          {isOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
              <motion.a 
                href="tel:+919514111460" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }}
                style={{ width:50, height:50, borderRadius:'50%', background:'#fff', border:`2px solid #22c55e`, display:'flex', alignItems:'center', justifyContent:'center', color:'#22c55e', textDecoration:'none' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </motion.a>
              <motion.a 
                href="mailto:jaiharienggsolutions@gmail.com" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }}
                style={{ width:50, height:50, borderRadius:'50%', background:'#fff', border:`2px solid ${RED}`, display:'flex', alignItems:'center', justifyContent:'center', color:RED, textDecoration:'none' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </motion.a>
            </div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ width:60, height:60, borderRadius:'50%', background:RED, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', boxShadow: `0 8px 30px rgba(196,30,58,0.4)` }}
        >
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
             {isOpen ? 'X' : '+'}
          </motion.div>
        </button>
      </div>

      <ChatWidget forcedOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}

export default FloatingInfo
