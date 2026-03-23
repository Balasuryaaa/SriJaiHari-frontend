import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { BASE_URL } from '../lib/api'

// Avoid trailing slashes for clean API calls
const API_URL = BASE_URL.replace(/\/$/, '')

function getRoomId() {
  let id = localStorage.getItem('chat_room_id') || 'user_' + Math.random().toString(36).slice(2) + '_' + Date.now()
  localStorage.setItem('chat_room_id', id)
  return id
}

export default function ChatWidget({ forcedOpen, onClose }) {
  const { t } = useLanguage()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(true) // Always connected via HTTP
  const [nameSubmitted, setNameSubmitted] = useState(!!localStorage.getItem('chat_user_name'))
  const [nameInput, setNameInput] = useState(localStorage.getItem('chat_user_name') || '')
  
  const messagesEndRef = useRef(null)
  const [winWidth, setWinWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // HTTP Long Polling for Chat Messages
  useEffect(() => {
    if (!nameSubmitted) return

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/chat/history/${getRoomId()}?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          // Only update if history length changed to avoid jitter
          setMessages(prev => data.length > prev.length ? data : prev);
        }
      } catch (err) {
        console.error('Chat API Error:', err.message);
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 1500); // Super-fast 1.5s poll for instant feedback
    return () => clearInterval(interval);
  }, [nameSubmitted])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (!nameInput.trim()) return
    localStorage.setItem('chat_user_name', nameInput.trim())
    setNameSubmitted(true)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const messageText = input.trim();
    setInput('');

    // Optimistic UI Update guarantees zero input latency
    const optimisticMsg = { text: messageText, sender: 'user' };
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: getRoomId(),
          text: messageText,
          sender: 'user',
          userName: localStorage.getItem('chat_user_name')
        })
      });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  }

  if (!forcedOpen) return null

  const isSmall = winWidth < 500

  return (
    <div style={{ 
      position: 'fixed', right: isSmall ? 10 : 25, bottom: isSmall ? 85 : 100,
      width: isSmall ? 'calc(100% - 20px)' : 380, height: isSmall ? 450 : 550,
      background: '#fff', borderRadius: 24, boxShadow: '0 20px 80px rgba(0,0,0,0.25)',
      display: 'flex', flexDirection: 'column', zIndex: 1000000, overflow: 'hidden',
      border: '1.5px solid #eee'
    }}>
      {/* Premium Dark Header */}
      <div style={{ background: '#111', color: '#fff', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `3px solid ${connected ? '#22c55e' : '#ff4b2b'}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background: connected ? '#22c55e' : '#ff4b2b', boxShadow: connected ? '0 0 10px #22c55e' : 'none' }} />
          <div>
            <div style={{ fontWeight:900, fontSize:13 }}>SJH Consultant</div>
            <div style={{ fontSize:10, opacity:0.7 }}>{connected ? 'Instant Response' : 'Connecting...'}</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:'rgba(255,255,255,0.1)', color:'#fff', border:'none', cursor:'pointer', padding: '6px 10px', borderRadius: 8, fontSize: 13, fontWeight: 900 }}>✕</button>
      </div>

      {!nameSubmitted ? (
        <div style={{ flex:1, padding:30, display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center', background:'#fcfcfc' }}>
          <div style={{ fontSize: 40, marginBottom: 15 }}>👋</div>
          <h2 style={{ fontSize:18, fontWeight:900, marginBottom:8 }}>Welcome to SJH</h2>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 24 }}>Please introduce yourself to start.</p>
          <form onSubmit={handleNameSubmit}>
            <input 
              value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder={t('chat.placeholder')}
              style={{ width:'100%', padding:16, borderRadius:16, border:'1.5px solid #eee', marginBottom:12, boxSizing:'border-box', outline:'none', fontSize:14 }}
            />
            <button style={{ width:'100%', padding:16, borderRadius:16, background:'#111', color:'#fff', fontWeight:900, border:'none', cursor:'pointer' }}>{t('chat.start')}</button>
          </form>
        </div>
      ) : (
        <>
          <div style={{ flex:1, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', gap:12, background:'#ffffff' }}>
            {messages.length === 0 && (
              <div style={{ textAlign:'center', color:'#999', fontSize:13, marginTop:60, padding: '0 20px' }}>
                <p style={{ fontWeight:900, color:'#333', marginBottom:4 }}>Chat is active!</p>
                <p>Welcome, <b>{localStorage.getItem('chat_user_name')}</b>. Type your question below and our consultant will respond shortly.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.sender==='user'?'flex-end':'flex-start', maxWidth:'85%' }}>
                <div style={{ 
                  background: m.sender==='user'?'#111':'#f5f5f5', 
                  color: m.sender==='user'?'#fff':'#111', 
                  padding:'12px 16px', borderRadius:20, fontSize:14, 
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  borderBottomRightRadius: m.sender==='user' ? 4 : 20,
                  borderBottomLeftRadius: m.sender==='user' ? 20 : 4,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} style={{ padding:'12px 18px', borderTop:'1px solid #eee', display:'flex', gap:10, alignItems: 'center', background:'#fff' }}>
            <input 
              value={input} onChange={e=>setInput(e.target.value)} placeholder={t('chat.type')}
              style={{ flex:1, padding:'12px 18px', borderRadius:50, border:'1.5px solid #f0f0f0', outline:'none', fontSize:14, background:'#fafafa' }}
            />
            <button type="submit" style={{ width:48, height:48, borderRadius:'50%', background:'#111', color:'#fff', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5l16 7-14.5 1 1.5 6 12-7-15 0" /></svg>
            </button>
          </form>
        </>
      )}
    </div>
  )
}
