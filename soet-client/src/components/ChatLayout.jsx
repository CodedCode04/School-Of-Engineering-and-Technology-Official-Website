import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

export default function ChatLayout() {
    const { token, api, user } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        api.get('/chat/rooms').then(res => setRooms(res.data)).catch(console.error);
    }, [api]);

    useEffect(() => {
        if (token) {
            const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
                auth: { token }
            });

            newSocket.on('new_message', (msg) => {
                setMessages(prev => {
                    // Only add if it belongs to active room or keep in memory
                    // Since it emits to room, we just append
                    if (activeRoom && msg.room === activeRoom._id) {
                        return [...prev, msg];
                    }
                    return prev;
                });
                if (activeRoom && msg.room === activeRoom._id) {
                    scrollToBottom();
                }
            });

            newSocket.on('chat_error', (err) => {
                toast.error(err.message + (err.reason ? `: ${err.reason}` : ''));
            });

            setSocket(newSocket);
            return () => newSocket.close();
        }
    }, [token, activeRoom]);

    useEffect(() => {
        if (activeRoom && socket) {
            socket.emit('join_room', activeRoom._id);
            api.get(`/chat/rooms/${activeRoom._id}/messages`)
                .then(res => {
                    setMessages(res.data);
                    scrollToBottom();
                })
                .catch(err => {
                    toast.error('Failed to load messages');
                });
            
            return () => {
                socket.emit('leave_room', activeRoom._id);
            };
        }
    }, [activeRoom, socket, api]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!text.trim() && !file) return;

        let attachmentUrl = null;
        if (file) {
            const formData = new FormData();
            formData.append('attachment', file);
            try {
                const res = await api.post('/chat/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                attachmentUrl = res.data.url;
            } catch (err) {
                toast.error('Failed to upload file');
                return;
            }
        }

        socket.emit('send_message', {
            roomId: activeRoom._id,
            text,
            attachment: attachmentUrl
        });

        setText('');
        setFile(null);
    };

    const handleDelete = async (msgId) => {
        try {
            await api.delete(`/chat/messages/${msgId}`);
            setMessages(prev => prev.map(m => m._id === msgId ? { ...m, deleted: true } : m));
        } catch (err) {
            toast.error('Failed to delete message');
        }
    };

    return (
        <div style={{ display: 'flex', height: '80vh', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ width: '250px', background: '#f4f4f4', borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ padding: '15px', margin: 0, background: '#e0e0e0', borderBottom: '1px solid #ccc' }}>Chat Rooms</h3>
                <div style={{ overflowY: 'auto', flex: 1 }}>
                    {rooms.map(room => (
                        <div 
                            key={room._id} 
                            onClick={() => setActiveRoom(room)}
                            style={{ 
                                padding: '15px', 
                                cursor: 'pointer', 
                                background: activeRoom?._id === room._id ? '#fff' : 'transparent',
                                borderBottom: '1px solid #eee',
                                fontWeight: activeRoom?._id === room._id ? 'bold' : 'normal'
                            }}
                        >
                            # {room.name}
                        </div>
                    ))}
                </div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
                {activeRoom ? (
                    <>
                        <div style={{ padding: '15px', background: '#f8f9fa', borderBottom: '1px solid #ccc' }}>
                            <h3 style={{ margin: 0 }}>{activeRoom.name}</h3>
                        </div>
                        
                        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {messages.map(msg => {
                                const isMine = msg.sender?._id === user?._id;
                                return (
                                    <div key={msg._id} style={{ alignSelf: isMine ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', textAlign: isMine ? 'right' : 'left' }}>
                                            {msg.sender?.name}
                                        </div>
                                        <div style={{ 
                                            padding: '10px 15px', 
                                            background: msg.deleted ? '#e0e0e0' : (isMine ? '#007bff' : '#f1f0f0'),
                                            color: msg.deleted ? '#777' : (isMine ? 'white' : 'black'),
                                            borderRadius: '15px',
                                            borderBottomRightRadius: isMine ? '2px' : '15px',
                                            borderBottomLeftRadius: !isMine ? '2px' : '15px'
                                        }}>
                                            {msg.deleted ? <em>This message was deleted</em> : (
                                                <>
                                                    {msg.text && <div>{msg.text}</div>}
                                                    {msg.attachment && (
                                                        <a href={import.meta.env.VITE_API_URL + msg.attachment} target="_blank" rel="noreferrer" style={{ color: isMine ? '#fff' : '#007bff', textDecoration: 'underline' }}>
                                                            View Attachment
                                                        </a>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '10px', color: '#999', marginTop: '2px', textAlign: isMine ? 'right' : 'left' }}>
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                            {!msg.deleted && (isMine || user?.role === 'admin') && (
                                                <button onClick={() => handleDelete(msg._id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '10px', marginLeft: '10px' }}>Delete</button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        
                        <form onSubmit={handleSend} style={{ padding: '15px', borderTop: '1px solid #ccc', display: 'flex', gap: '10px', background: '#f8f9fa' }}>
                            <input 
                                type="text" 
                                value={text} 
                                onChange={e => setText(e.target.value)} 
                                placeholder="Type a message..." 
                                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                            <input type="file" onChange={e => setFile(e.target.files[0])} style={{ width: '180px' }} />
                            <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
                        </form>
                    </>
                ) : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
                        Select a room to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
