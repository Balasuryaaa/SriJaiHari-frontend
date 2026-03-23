import { useState, useEffect, useRef, useCallback } from 'react'
import { io } from 'socket.io-client'

const BACKEND_URL = import.meta.env.DEV ? 'http://localhost:8070' : ''
const RED = '#C41E3A'
const STEEL = '#8C8C8C'

export default function AdminChatPanel() {
  const [rooms, setRooms] = useState([])          // [{ roomId, userName, messages }]
  const [activeRoom, setActiveRoom] = useState(null)  // roomId string
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(false)
  const [unreadMap, setUnreadMap] = useState({})   // { roomId: count }

  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [activeRoom, rooms, scrollToBottom])

  // Connect as admin
  useEffect(() => {
    const socket = io(BACKEND_URL, { transports: ['websocket', 'polling'] })
    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      socket.emit('admin:join')
    })

    socket.on('disconnect', () => setConnected(false))

    // Initial room list
    socket.on('admin:rooms', (existingRooms) => {
      setRooms(existingRooms)
    })

    // A user started / returned to a room
    socket.on('admin:user-joined', ({ roomId, userName, messages }) => {
      setRooms((prev) => {
        const exists = prev.find((r) => r.roomId === roomId)
        if (exists) {
          return prev.map((r) =>
            r.roomId === roomId ? { ...r, userName, messages } : r
          )
        }
        return [...prev, { roomId, userName, messages }]
      })
    })

    // Incoming message
    socket.on('chat:message', (msg) => {
      const { roomId } = msg
      setRooms((prev) =>
        prev.map((r) => {
          if (r.roomId !== roomId) return r
          // avoid duplicate
          const msgId = msg._id || msg.id
          if (r.messages.find((m) => (m._id || m.id) === msgId)) return r
          return { ...r, messages: [...r.messages, msg] }
        })
      )
      // increment unread if that room is not active
      if (msg.sender === 'user') {
        setUnreadMap((u) => {
          // We need to check if activeRoom is the one receiving message
          // but we can't easily get latest activeRoom state here without refs or setters
          // So we check it using the functional updater Pattern below if needed
          return u
        })
      }
    })

    return () => socket.disconnect()
  }, [])

  // Handle unread status in a separate effect to avoid closure issues
  useEffect(() => {
    if (!socketRef.current) return
    const handleMsg = (msg) => {
      if (activeRoom !== msg.roomId && msg.sender === 'user') {
        setUnreadMap(prev => ({ ...prev, [msg.roomId]: (prev[msg.roomId] || 0) + 1 }))
      }
    }
    socketRef.current.on('chat:message', handleMsg)
    return () => socketRef.current.off('chat:message', handleMsg)
  }, [activeRoom])

  const selectRoom = (roomId) => {
    setActiveRoom(roomId)
    setUnreadMap((u) => ({ ...u, [roomId]: 0 }))
    setTimeout(scrollToBottom, 80)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim() || !activeRoom || !connected) return
    socketRef.current?.emit('admin:message', { roomId: activeRoom, text: input.trim() })
    setInput('')
  }

  const activeRoomData = rooms.find((r) => r.roomId === activeRoom)

  const formatTime = (ts) => {
    if (!ts) return ''
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ background:'#fff', borderRadius:24, border:'1.5px solid #eee', overflow:'hidden', boxShadow:'0 20px 50px rgba(0,0,0,0.1)', display:'flex', height:620 }}>
      {/* Sidebar */}
      <div style={{ width:240, borderRight:'1.5px solid #f0f0f0', background:'#fcfcfc', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'20px 24px', background:`linear-gradient(135deg, ${RED}, #8e1529)`, color:'#fff' }}>
          <div style={{ fontWeight:800, fontSize:15, marginBottom:4 }}>Customer Chats</div>
          <div style={{ fontSize:10, opacity:0.8, fontWeight:600 }}>{connected ? `🟢 ${rooms.length} Active Sessions` : '🔴 Connecting...'}</div>
        </div>
        
        <div style={{ flex:1, overflowY:'auto' }}>
          {rooms.length === 0 ? (
            <div style={{ padding:40, textAlign:'center', color:'#aaa', fontSize:12 }}>No messages yet</div>
          ) : (
            rooms.map(room => {
              const active = activeRoom === room.roomId
              const unread = unreadMap[room.roomId] || 0
              const last = room.messages[room.messages.length-1]
              return (
                <button
                  key={room.roomId}
                  onClick={() => selectRoom(room.roomId)}
                  style={{
                    width:'100%', padding:'16px 20px', border:'none', borderBottom:'1px solid #f5f5f5', cursor:'pointer',
                    background: active ? '#fdf2f4' : 'transparent', textAlign:'left', transition:'all 0.2s',
                    position:'relative', display:'flex', alignItems:'center', gap:12
                  }}
                >
                  <div style={{ width:40, height:40, borderRadius:'50%', background:RED, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, flexShrink:0 }}>
                    {room.userName?.[0] || 'G'}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:'#111', display:'flex', justifyContent:'space-between' }}>
                      {room.userName}
                      {unread > 0 && <span style={{ background:RED, color:'#fff', fontSize:10, padding:'2px 6px', borderRadius:10 }}>{unread}</span>}
                    </div>
                    {last && <div style={{ fontSize:11, color:STEEL, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{last.text}</div>}
                  </div>
                  {active && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:RED }} />}
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#fff' }}>
        {!activeRoomData ? (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#ccc' }}>
            <svg width="60" height="60" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
            <p style={{ marginTop:20, fontWeight:700 }}>Select a customer to start chatting</p>
          </div>
        ) : (
          <>
            <div style={{ padding:'18px 24px', borderBottom:'1.5px solid #f5f5f5', display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:42, height:42, borderRadius:'50%', background:RED, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800 }}>{activeRoomData.userName?.[0]}</div>
              <div>
                <div style={{ fontWeight:800, fontSize:16 }}>{activeRoomData.userName}</div>
                <div style={{ fontSize:11, color:STEEL }}>{activeRoomData.messages.length} messages in history</div>
              </div>
            </div>

            <div style={{ flex:1, overflowY:'auto', padding:'24px', background:'#fcfcfc', display:'flex', flexDirection:'column', gap:12 }}>
              {activeRoomData.messages.map((m, i) => (
                <div key={m._id || i} style={{ alignSelf: m.sender === 'admin' ? 'flex-end' : 'flex-start', maxWidth:'75%' }}>
                  <div style={{ 
                    padding:'12px 18px', borderRadius:20, fontSize:14, lineHeight:1.5,
                    background: m.sender === 'admin' ? RED : '#fff',
                    color: m.sender === 'admin' ? '#fff' : '#111',
                    border: m.sender === 'admin' ? 'none' : '1px solid #eee',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}>
                    {m.text}
                  </div>
                  <div style={{ fontSize:10, color:STEEL, marginTop:5, textAlign: m.sender === 'admin' ? 'right' : 'left' }}>
                    {formatTime(m.timestamp)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} style={{ padding:'20px 24px', borderTop:'1.5px solid #f5f5f5', display:'flex', gap:12 }}>
              <input 
                autoFocus value={input} onChange={e => setInput(e.target.value)}
                placeholder={`Type a message to ${activeRoomData.userName}...`}
                style={{ flex:1, padding:'14px 20px', borderRadius:16, border:'1.5px solid #eee', outline:'none', fontSize:14 }}
              />
              <button 
                type="submit" disabled={!input.trim()}
                style={{ 
                  padding:'0 24px', borderRadius:16, border:'none', background:RED, color:'#fff', 
                  fontWeight:800, cursor:'pointer', opacity: input.trim() ? 1 : 0.5 
                }}
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
