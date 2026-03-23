import { useState, useEffect, useRef, useCallback } from 'react'
import { io } from 'socket.io-client'
import { useLanguage } from '../context/LanguageContext'

const BACKEND_URL = import.meta.env.DEV ? 'http://localhost:8070' : ''

function getRoomId() {
  let id = sessionStorage.getItem('chat_room_id')
  if (!id) {
    id = 'user_' + Math.random().toString(36).slice(2) + '_' + Date.now()
    sessionStorage.setItem('chat_room_id', id)
  }
  return id
}

export default function ChatWidget({ forcedOpen, onClose }) {
  const { t } = useLanguage()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(false)
  const [userName, setUserName] = useState(sessionStorage.getItem('chat_user_name') || '')
  const [nameSubmitted, setNameSubmitted] = useState(!!sessionStorage.getItem('chat_user_name'))
  const [nameInput, setNameInput] = useState('')

  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)
  const roomId = useRef(getRoomId())

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (forcedOpen) scrollToBottom()
  }, [messages, forcedOpen, scrollToBottom])

  useEffect(() => {
    if (!nameSubmitted) return

    const socket = io(BACKEND_URL, { transports: ['websocket', 'polling'] })
    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      socket.emit('user:join', { roomId: roomId.current, userName })
    })

    socket.on('disconnect', () => setConnected(false))
    socket.on('chat:history', (history) => setMessages(history))
    socket.on('chat:message', (msg) => {
      setMessages((prev) => {
        if (prev.find((m) => (m._id || m.id) === (msg._id || msg.id))) return prev
        return [...prev, msg]
      })
    })

    return () => socket.disconnect()
  }, [nameSubmitted, userName])

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (!nameInput.trim()) return
    const name = nameInput.trim()
    sessionStorage.setItem('chat_user_name', name)
    setUserName(name)
    setNameSubmitted(true)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim() || !connected) return
    socketRef.current?.emit('user:message', { roomId: roomId.current, text: input.trim() })
    setInput('')
  }

  if (!forcedOpen) return null

  return (
    <div style={{ 
      position: 'absolute', right: 0, bottom: 85,
      width: 320, height: 450, background: '#fff', borderRadius: 24, padding: 0, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', border: '1px solid #eee', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ background: '#111', color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 13 }}>{t('chat.title')}</div>
          <div style={{ fontSize: 10, opacity: 0.7 }}>{connected ? `🟢 ${t('chat.online')}` : `🔴 ${t('chat.connecting')}`}</div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {!nameSubmitted ? (
        <div style={{ padding: 30, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 15 }}>👋</div>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>{t('chat.nameReq')}</p>
          <form onSubmit={handleNameSubmit}>
            <input 
              autoFocus value={nameInput} onChange={e => setNameInput(e.target.value)}
              placeholder={t('chat.placeholder')}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid #eee', marginBottom: 10, boxSizing: 'border-box' }}
            />
            <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 12, border: 'none', background: '#C41E3A', color: '#fff', fontWeight: 800 }}>{t('chat.start')}</button>
          </form>
        </div>
      ) : (
        <>
          <div style={{ flex: 1, overflowY: 'auto', padding: 15, background: '#fcfcfc', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.length === 0 && <div style={{ textAlign:'center', color:'#aaa', fontSize:12, marginTop:40 }}>{t('chat.noMsg')}</div>}
            {messages.map((msg, i) => (
              <div key={msg._id || i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{ 
                  padding: '10px 14px', borderRadius: 16, fontSize: 13,
                  background: msg.sender === 'user' ? '#C41E3A' : '#f0f0f0',
                  color: msg.sender === 'user' ? '#fff' : '#111',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} style={{ padding: 12, borderTop: '1px solid #eee', display: 'flex', gap: 8 }}>
            <input 
              value={input} onChange={e => setInput(e.target.value)} 
              placeholder={t('chat.type')} disabled={!connected}
              style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #eee', borderRadius: 12, outline: 'none', fontSize: 13 }}
            />
            <button type="submit" style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: '#C41E3A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5l16 7-14.5 1 1.5 6 12-7-15 0" /></svg>
            </button>
          </form>
        </>
      )}
    </div>
  )
}
