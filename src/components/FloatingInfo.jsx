import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatWidget from './ChatWidget'

const RED   = '#C41E3A'
const CYAN  = '#0EA5E9'

function FloatingInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
    setIsOpen(false) // close menu when chat opens
  }

  return (
    <>
      <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
        
        {/* Menu Options */}
        <AnimatePresence>
          {isOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
              
              {/* Call Option */}
              <motion.a 
                href="tel:+919514111460"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                style={{
                  width: 50, height: 50, borderRadius: '50%', background: '#fff', border: `2px solid ${CYAN}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  textDecoration: 'none', color: CYAN
                }}
                title="Call Us"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </motion.a>

               {/* Chat Option */}
              <motion.button 
                onClick={toggleChat}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: 0.05 }}
                style={{
                  height: 50, borderRadius: 25, background: '#fff', border: `2.5px solid ${CYAN}`,
                  display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)', cursor: 'pointer', color: CYAN,
                  fontWeight: 900, whiteSpace: 'nowrap'
                }}
              >
                <div style={{ fontSize: 13 }}>Message SJH Consultant</div>
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </motion.button>

              {/* Email Option */}
              <motion.a 
                href="mailto:jaiharienggsolutions@gmail.com"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: 0.1 }}
                style={{
                  width: 50, height: 50, borderRadius: '50%', background: '#fff', border: `2px solid ${RED}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  textDecoration: 'none', color: RED
                }}
                title="Email Us"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>
            </div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: 65, height: 65, borderRadius: '50%', background: RED, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(196,30,58,0.4)', color: '#fff'
          }}
        >
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            {isOpen ? (
              <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 5v14M5 12h14" /></svg>
            )}
          </motion.div>
        </button>

        {/* Invisible area for ChatWidget overlay */}
        <ChatWidget forcedOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </>
  )
}

export default FloatingInfo
