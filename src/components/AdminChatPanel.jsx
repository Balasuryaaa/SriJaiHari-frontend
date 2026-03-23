import { useState, useEffect, useRef, useCallback } from 'react'
import { BASE_URL } from '../lib/api'

// Clean the Base URL to avoid double-slash issues in API calls
const API_URL = BASE_URL.replace(/\/$/, '')

const RED = '#C41E3A'
const STEEL = '#8C8C8C'

export default function AdminChatPanel() {
  const [rooms, setRooms] = useState([])          
  const [activeRoom, setActiveRoom] = useState(null)  
  const [activeHistory, setActiveHistory] = useState([]) 
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(true)

  const messagesEndRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [activeHistory, scrollToBottom])

  // Poll for Active Rooms (Sidebar)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Cache busting guarantees real-time updates and bypasses Vercel/Chrome strict caching
        const res = await fetch(`${API_URL}/chat/rooms?t=${Date.now()}`, { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setRooms(data)
        }
      } catch (err) {
        console.error('Failed to fetch rooms:', err)
      }
    }
    
    fetchRooms()
    const interval = setInterval(fetchRooms, 1500) // Much faster polling for seamless feel
    return () => clearInterval(interval)
  }, [])

  // Poll for Active Room History (Main Chat Area)
  useEffect(() => {
    if (!activeRoom) return

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/chat/history/${activeRoom}?t=${Date.now()}`, { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setActiveHistory(prev => data.length > prev.length ? data : prev)
        }
      } catch (err) {
        console.error('Failed to fetch room history:', err)
      }
    }

    fetchHistory()
    const interval = setInterval(fetchHistory, 1000) // Near real-time
    return () => clearInterval(interval)
  }, [activeRoom])

  const selectRoom = (roomId) => {
    if (activeRoom !== roomId) {
      setActiveHistory([]) // clear previous chat immediately
      setActiveRoom(roomId)
    }
    setTimeout(scrollToBottom, 80)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || !activeRoom) return

    const messageText = input.trim()
    setInput('')

    // Optimistic Update directly to history ensures instant visual feedback
    const optimisticMsg = { text: messageText, sender: 'admin', timestamp: new Date().toISOString() }
    setActiveHistory(prev => [...prev, optimisticMsg])
    setTimeout(scrollToBottom, 50)

    try {
      await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: activeRoom,
          text: messageText,
          sender: 'admin',
          userName: 'Admin',
          senderName: 'SJH Consultant'
        })
      })
    } catch (err) {
      console.error('Failed to send admin message:', err)
    }
  }

  const activeRoomMeta = rooms.find((r) => r._id === activeRoom)

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
              const active = activeRoom === room._id
              return (
                <button
                  key={room._id}
                  onClick={() => selectRoom(room._id)}
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
                    <div style={{ fontSize:14, fontWeight:700, color:'#111', display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                      <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'100%' }}>{room.userName}</span>
                    </div>
                    {room.lastMessage && <div style={{ fontSize:11, color:STEEL, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{room.lastMessage}</div>}
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
        {!activeRoom ? (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#ccc' }}>
            <svg width="60" height="60" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
            <p style={{ marginTop:20, fontWeight:700 }}>Select a customer to start chatting</p>
          </div>
        ) : (
          <>
            <div style={{ padding:'18px 24px', borderBottom:'1.5px solid #f5f5f5', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
              <div style={{ width:42, height:42, borderRadius:'50%', background:RED, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800 }}>{activeRoomMeta?.userName?.[0] || 'C'}</div>
              <div>
                <div style={{ fontWeight:800, fontSize:16 }}>{activeRoomMeta?.userName || 'Customer'}</div>
                <div style={{ fontSize:11, color:STEEL }}>{activeHistory.length} messages in history</div>
              </div>
            </div>

            <div style={{ flex:1, overflowY:'auto', padding:'24px', background:'#fcfcfc', display:'flex', flexDirection:'column', gap:12 }}>
              {activeHistory.length === 0 && (
                <div style={{ textAlign:'center', color:'#aaa', fontSize:12, marginTop:40 }}>Loading chat history...</div>
              )}
              {activeHistory.map((m, i) => (
                <div key={m._id || i} style={{ alignSelf: m.sender === 'admin' ? 'flex-end' : 'flex-start', maxWidth:'75%' }}>
                  <div style={{ 
                    padding:'12px 18px', borderRadius:20, fontSize:14, lineHeight:1.5,
                    background: m.sender === 'admin' ? RED : '#fff',
                    color: m.sender === 'admin' ? '#fff' : '#111',
                    border: m.sender === 'admin' ? 'none' : '1px solid #eee',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    wordBreak: 'break-word'
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

            <form onSubmit={sendMessage} style={{ padding:'20px 24px', borderTop:'1.5px solid #f5f5f5', display:'flex', gap:12, flexShrink:0 }}>
              <input 
                autoFocus value={input} onChange={e => setInput(e.target.value)}
                placeholder={`Type a message to ${activeRoomMeta?.userName || 'Customer'}...`}
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
