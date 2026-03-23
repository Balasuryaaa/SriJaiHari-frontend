import { useState, useEffect, useRef, useCallback } from 'react'
import { io } from 'socket.io-client'
import { useLanguage } from '../context/LanguageContext'
import { BASE_URL } from '../lib/api'

function getRoomId() {
  let id = localStorage.getItem('chat_room_id') || 'user_' + Math.random().toString(36).slice(2) + '_' + Date.now()
  localStorage.setItem('chat_room_id', id)
  return id
}

export default function ChatWidget({ forcedOpen, onClose }) {
  const { t } = useLanguage()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(false)
  const [nameSubmitted, setNameSubmitted] = useState(!!localStorage.getItem('chat_user_name'))
  const [nameInput, setNameInput] = useState(localStorage.getItem('chat_user_name') || '')
  
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [winWidth, setWinWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!nameSubmitted) return
    const socket = io(BASE_URL, { transports: ['websocket', 'polling'] })
    socketRef.current = socket
    socket.on('connect', () => {
      setConnected(true)
      socket.emit('user:join', { roomId: getRoomId(), userName: localStorage.getItem('chat_user_name') })
    })
    socket.on('disconnect', () => setConnected(false))
    socket.on('chat:history', (hist) => setMessages(hist))
    socket.on('chat:message', (m) => setMessages(prev => [...prev, m]))
    return () => socket.disconnect()
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

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    socketRef.current?.emit('user:message', { roomId: getRoomId(), text: input.trim() })
    setInput('')
  }

  if (!forcedOpen) return null

  const isSmall = winWidth < 500

  return (
    <div style={{ 
      position: 'fixed', right: isSmall ? 10 : 25, bottom: isSmall ? 85 : 100,
      width: isSmall ? 'calc(100% - 20px)' : 380, height: isSmall ? 450 : 550,
      background: '#fff', borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      display: 'flex', flexDirection: 'column', zIndex: 1000000, overflow: 'hidden',
      border: '1px solid #eee'
    }}>
      <div style={{ background: '#111', color: '#fff', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background: connected ? '#22c55e' : '#ff4b2b' }} />
          <div style={{ fontWeight:900, fontSize:13 }}>SJH Consultant</div>
        </div>
        <button onClick={onClose} style={{ background:'none', color:'#fff', border:'none', cursor:'pointer', fontWeight:900 }}>✕</button>
      </div>

      {!nameSubmitted ? (
        <div style={{ flex:1, padding:30, display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center' }}>
          <h2 style={{ fontSize:16, fontWeight:900, marginBottom:10 }}>Start Conversation</h2>
          <form onSubmit={handleNameSubmit}>
            <input 
              value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder="Your Name"
              style={{ width:'100%', padding:14, borderRadius:12, border:'1.5px solid #eee', marginBottom:10, boxSizing:'border-box' }}
            />
            <button style={{ width:'100%', padding:14, borderRadius:12, background:'#111', color:'#fff', fontWeight:900, border:'none' }}>Join Chat</button>
          </form>
        </div>
      ) : (
        <>
          <div style={{ flex:1, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', gap:10, background:'#fcfcfc' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.sender==='user'?'flex-end':'flex-start', background: m.sender==='user'?'#111':'#f0f0f0', color: m.sender==='user'?'#fff':'#111', padding:'10px 14px', borderRadius:16, maxWidth:'85%', fontSize:13 }}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} style={{ padding:15, borderTop:'1px solid #eee', display:'flex', gap:10 }}>
            <input 
              value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message..."
              style={{ flex:1, padding:'12px 16px', borderRadius:12, border:'1.5px solid #eee', outline:'none' }}
            />
            <button style={{ width:45, height:45, borderRadius:'50%', background:'#111', color:'#fff', border:'none', cursor:'pointer' }}>➔</button>
          </form>
        </>
      )}
    </div>
  )
}
