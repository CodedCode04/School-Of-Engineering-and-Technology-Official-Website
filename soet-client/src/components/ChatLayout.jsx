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
    const [searchRoom, setSearchRoom] = useState('');
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Fetch rooms
    const fetchRooms = async () => {
        setLoadingRooms(true);
        try {
            const res = await api.get('/chat/rooms');
            const data = Array.isArray(res.data) ? res.data : [];
            setRooms(data);
            if (data.length > 0) {
                setActiveRoom(prev => (prev && data.some(r => r._id === prev._id)) ? prev : data[0]);
            }
        } catch (err) {
            console.error('Failed to load chat rooms', err);
            toast.error('Could not load chat channels');
        } finally {
            setLoadingRooms(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [api]);

    const activeRoomRef = useRef(activeRoom);
    useEffect(() => {
        activeRoomRef.current = activeRoom;
    }, [activeRoom]);

    // Setup Socket connection once per token
    useEffect(() => {
        const currentToken = token || localStorage.getItem('token');
        if (!currentToken) return;

        const socketUrl = import.meta.env.VITE_API_BASE_URL ||
                          import.meta.env.VITE_API_URL ||
                          (window.location.port === '5173' ? 'http://localhost:5000' : window.location.origin);

        const newSocket = io(socketUrl, {
            auth: { token: currentToken },
            transports: ['websocket', 'polling']
        });

        newSocket.on('connect', () => {
            if (activeRoomRef.current) {
                newSocket.emit('join_room', activeRoomRef.current._id);
            }
        });

        newSocket.on('new_message', (msg) => {
            const current = activeRoomRef.current;
            if (current && msg.room === current._id) {
                setMessages(prev => {
                    if (prev.some(m => m._id === msg._id)) return prev;
                    return [...prev, msg];
                });
                scrollToBottom();
            }
        });

        newSocket.on('chat_error', (err) => {
            toast.error(err.message + (err.reason ? `: ${err.reason}` : ''));
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [token]);

    // Handle joining room and loading messages when activeRoom changes
    useEffect(() => {
        if (!activeRoom) return;

        setLoadingMessages(true);

        if (socket && socket.connected) {
            socket.emit('join_room', activeRoom._id);
        }

        api.get(`/chat/rooms/${activeRoom._id}/messages`)
            .then(res => {
                setMessages(res.data || []);
                scrollToBottom();
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to load message history');
            })
            .finally(() => {
                setLoadingMessages(false);
            });

        return () => {
            if (socket && socket.connected) {
                socket.emit('leave_room', activeRoom._id);
            }
        };
    }, [activeRoom?._id, socket]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed && !file) return;
        if (!activeRoom) return;

        setIsSending(true);
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
                toast.error('Failed to upload attachment');
                setIsSending(false);
                return;
            }
        }

        try {
            if (socket && socket.connected) {
                socket.emit('send_message', {
                    roomId: activeRoom._id,
                    text: trimmed,
                    attachment: attachmentUrl
                });
            } else {
                const res = await api.post(`/chat/rooms/${activeRoom._id}/messages`, {
                    text: trimmed,
                    attachment: attachmentUrl
                });
                setMessages(prev => {
                    if (prev.some(m => m._id === res.data._id)) return prev;
                    return [...prev, res.data];
                });
                scrollToBottom();
            }

            setText('');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to send message');
        } finally {
            setIsSending(false);
        }
    };

    const handleDelete = async (msgId) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            await api.delete(`/chat/messages/${msgId}`);
            setMessages(prev => prev.map(m => m._id === msgId ? { ...m, deleted: true } : m));
            toast.success('Message deleted');
        } catch (err) {
            toast.error('Failed to delete message');
        }
    };

    const getRoomCategory = (room) => {
        switch (room.type) {
            case 'branch': return 'Department Channel';
            case 'teachers': return 'Faculty Lounge';
            case 'hod': return 'HOD Council';
            case 'admin': return 'Administration';
            case 'alumni': return 'Alumni Network';
            default: return 'General Campus';
        }
    };

    const getRoomIcon = (room) => {
        switch (room.type) {
            case 'branch': return 'fa-laptop-code';
            case 'teachers': return 'fa-chalkboard-teacher';
            case 'hod': return 'fa-user-tie';
            case 'admin': return 'fa-university';
            case 'alumni': return 'fa-graduation-cap';
            default: return 'fa-comments';
        }
    };

    const getRoleBadgeStyle = (role) => {
        switch ((role || '').toLowerCase()) {
            case 'admin': return { bg: '#F3E8FF', color: '#6B21A8', label: 'Admin' };
            case 'hod': return { bg: '#FDF2F4', color: '#8B1A3D', label: 'HOD' };
            case 'teacher': return { bg: '#EFF6FF', color: '#1D4ED8', label: 'Faculty' };
            case 'tpo': return { bg: '#FEF3C7', color: '#92400E', label: 'TPO' };
            case 'alumni': return { bg: '#FFFBEB', color: '#B45309', label: 'Alumni' };
            default: return { bg: '#ECFDF5', color: '#047857', label: 'Student' };
        }
    };

    const filteredRooms = rooms.filter(r => 
        r.name.toLowerCase().includes(searchRoom.toLowerCase()) ||
        getRoomCategory(r).toLowerCase().includes(searchRoom.toLowerCase())
    );

    return (
        <div style={{
            display: 'flex',
            height: 'calc(100vh - 160px)',
            minHeight: '620px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid rgba(30, 23, 96, 0.12)',
            boxShadow: '0 8px 24px rgba(30, 23, 96, 0.08)',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* LEFT SIDEBAR: CHANNELS LIST */}
            <div style={{
                width: '320px',
                minWidth: '280px',
                backgroundColor: '#F8F7FC',
                borderRight: '1px solid rgba(30, 23, 96, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                zIndex: 20
            }}>
                {/* Header */}
                <div style={{
                    padding: '18px 20px',
                    borderBottom: '1px solid rgba(30, 23, 96, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff'
                }}>
                    <div>
                        <h2 style={{
                            margin: 0,
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: '#1E1760',
                            letterSpacing: '-0.01em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <i className="fas fa-comments" style={{ color: '#8B1A3D' }}></i>
                            Chat Channels
                        </h2>
                        <span style={{ fontSize: '11px', color: '#6B6787', fontWeight: 500 }}>
                            {rooms.length} accessible channels
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={fetchRooms}
                        title="Refresh Channels"
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid rgba(30, 23, 96, 0.1)',
                            background: '#ffffff',
                            color: '#1E1760',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px'
                        }}
                    >
                        <i className={`fas fa-sync-alt ${loadingRooms ? 'fa-spin' : ''}`}></i>
                    </button>
                </div>

                {/* Search Bar */}
                <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(30, 23, 96, 0.06)' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid rgba(30, 23, 96, 0.15)',
                        borderRadius: '10px',
                        padding: '6px 12px'
                    }}>
                        <i className="fas fa-search" style={{ color: '#888', fontSize: '12px' }}></i>
                        <input
                            type="text"
                            placeholder="Filter channels..."
                            value={searchRoom}
                            onChange={e => setSearchRoom(e.target.value)}
                            style={{
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                                fontSize: '13px',
                                background: 'transparent',
                                color: '#1E1760'
                            }}
                        />
                        {searchRoom && (
                            <button
                                type="button"
                                onClick={() => setSearchRoom('')}
                                style={{ border: 'none', background: 'none', color: '#999', cursor: 'pointer', padding: 0 }}
                            >
                                <i className="fas fa-times-circle"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Rooms List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
                    {loadingRooms ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#6B6787', fontSize: '13px' }}>
                            <i className="fas fa-circle-notch fa-spin" style={{ marginRight: '8px', color: '#8B1A3D' }}></i>
                            Loading channels...
                        </div>
                    ) : filteredRooms.length === 0 ? (
                        <div style={{ padding: '32px 16px', textAlign: 'center', color: '#6B6787' }}>
                            <i className="fas fa-comment-slash" style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.5 }}></i>
                            <div style={{ fontSize: '13px', fontWeight: 600 }}>No channels found</div>
                            <div style={{ fontSize: '11px', marginTop: '4px' }}>Try a different search or contact admin.</div>
                        </div>
                    ) : (
                        filteredRooms.map(room => {
                            const isSelected = activeRoom?._id === room._id;
                            const category = getRoomCategory(room);
                            const iconClass = getRoomIcon(room);

                            return (
                                <div
                                    key={room._id}
                                    onClick={() => {
                                        setActiveRoom(room);
                                        setMobileRoomsOpen(false);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 14px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        marginBottom: '4px',
                                        backgroundColor: isSelected ? 'rgba(139, 26, 61, 0.08)' : 'transparent',
                                        border: isSelected ? '1px solid rgba(139, 26, 61, 0.2)' : '1px solid transparent',
                                        transition: 'all 0.15s ease'
                                    }}
                                    onMouseEnter={e => {
                                        if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(30, 23, 96, 0.04)';
                                    }}
                                    onMouseLeave={e => {
                                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        backgroundColor: isSelected ? '#8B1A3D' : '#E8E6FA',
                                        color: isSelected ? '#ffffff' : '#2B2185',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                        flexShrink: 0
                                    }}>
                                        <i className={`fas ${iconClass}`}></i>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontWeight: isSelected ? 700 : 600,
                                            fontSize: '13.5px',
                                            color: isSelected ? '#8B1A3D' : '#1E1760',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            # {room.name}
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: '#6B6787',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginTop: '1px'
                                        }}>
                                            {category}
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <div style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: '#8B1A3D'
                                        }}></div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* User Current Session info */}
                <div style={{
                    padding: '12px 16px',
                    borderTop: '1px solid rgba(30, 23, 96, 0.08)',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#1E1760',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '13px'
                    }}>
                        {(user?.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1E1760', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user?.name || 'Authorized Member'}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6B6787', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {user?.role || 'Guest'}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
                        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Live</span>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: ACTIVE CHANNEL CHAT AREA */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                minWidth: 0
            }}>
                {activeRoom ? (
                    <>
                        {/* Channel Header */}
                        <div style={{
                            padding: '16px 24px',
                            borderBottom: '1px solid rgba(30, 23, 96, 0.08)',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            flexWrap: 'wrap'
                        }}>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.15rem',
                                    fontWeight: 800,
                                    color: '#1E1760',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <span style={{ color: '#8B1A3D' }}>#</span> {activeRoom.name}
                                </h3>
                                <div style={{ fontSize: '12px', color: '#6B6787', marginTop: '2px' }}>
                                    {getRoomCategory(activeRoom)} • Real-time discussion for verified institutional members
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 10px',
                                    borderRadius: '999px',
                                    backgroundColor: '#E8E6FA',
                                    color: '#1E1760',
                                    fontSize: '12px',
                                    fontWeight: 600
                                }}>
                                    <i className="fas fa-lock" style={{ fontSize: '10px' }}></i>
                                    Encrypted Portal Channel
                                </span>
                            </div>
                        </div>

                        {/* Message Feed */}
                        <div style={{
                            flex: 1,
                            padding: '24px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            backgroundColor: '#FCFBFE'
                        }}>
                            {loadingMessages ? (
                                <div style={{ margin: 'auto', textAlign: 'center', color: '#6B6787' }}>
                                    <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '24px', color: '#8B1A3D', marginBottom: '8px' }}></i>
                                    <div>Loading message stream...</div>
                                </div>
                            ) : messages.length === 0 ? (
                                <div style={{ margin: 'auto', textAlign: 'center', color: '#6B6787', maxWidth: '360px' }}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        backgroundColor: '#E8E6FA',
                                        color: '#2B2185',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        margin: '0 auto 16px auto'
                                    }}>
                                        <i className="fas fa-comment-dots"></i>
                                    </div>
                                    <h4 style={{ margin: '0 0 6px 0', color: '#1E1760', fontSize: '1rem', fontWeight: 700 }}>
                                        No messages in #{activeRoom.name} yet
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>
                                        Be the first to start the discussion! Send an update, question, or document attachment below.
                                    </p>
                                </div>
                            ) : (
                                messages.map(msg => {
                                    const isMine = msg.sender?._id === user?._id || msg.sender === user?._id;
                                    const roleBadge = getRoleBadgeStyle(msg.sender?.role);
                                    const senderInitial = (msg.sender?.name || 'M').charAt(0).toUpperCase();

                                    return (
                                        <div
                                            key={msg._id}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignSelf: isMine ? 'flex-end' : 'flex-start',
                                                maxWidth: '78%'
                                            }}
                                        >
                                            {/* Sender Header */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                marginBottom: '4px',
                                                justifyContent: isMine ? 'flex-end' : 'flex-start'
                                            }}>
                                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E1760' }}>
                                                    {isMine ? 'You' : (msg.sender?.name || 'Portal Member')}
                                                </span>
                                                {msg.sender?.role && (
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 700,
                                                        padding: '1px 6px',
                                                        borderRadius: '4px',
                                                        backgroundColor: roleBadge.bg,
                                                        color: roleBadge.color,
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {roleBadge.label}
                                                    </span>
                                                )}
                                                <span style={{ fontSize: '11px', color: '#888' }}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>

                                            {/* Bubble */}
                                            <div style={{
                                                padding: '12px 16px',
                                                backgroundColor: msg.deleted
                                                    ? '#F1F0F5'
                                                    : (isMine ? '#1E1760' : '#ffffff'),
                                                color: msg.deleted
                                                    ? '#888'
                                                    : (isMine ? '#ffffff' : '#1E1760'),
                                                borderRadius: '16px',
                                                borderTopRightRadius: isMine ? '4px' : '16px',
                                                borderTopLeftRadius: !isMine ? '4px' : '16px',
                                                border: msg.deleted
                                                    ? '1px dashed #ccc'
                                                    : (isMine ? 'none' : '1px solid rgba(30, 23, 96, 0.1)'),
                                                boxShadow: isMine
                                                    ? '0 4px 12px rgba(30, 23, 96, 0.15)'
                                                    : '0 2px 8px rgba(0, 0, 0, 0.04)',
                                                wordBreak: 'break-word',
                                                fontSize: '14px',
                                                lineHeight: 1.5
                                            }}>
                                                {msg.deleted ? (
                                                    <span style={{ fontStyle: 'italic', fontSize: '13px' }}>
                                                        <i className="fas fa-ban" style={{ marginRight: '6px' }}></i>
                                                        This message was deleted
                                                    </span>
                                                ) : (
                                                    <>
                                                        {msg.text && (
                                                            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                                                        )}

                                                        {msg.attachment && (
                                                            <div style={{ marginTop: msg.text ? '10px' : '0' }}>
                                                                {msg.attachment.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                                                                    <a
                                                                        href={msg.attachment.startsWith('http') ? msg.attachment : msg.attachment}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        style={{ display: 'block', borderRadius: '8px', overflow: 'hidden' }}
                                                                    >
                                                                        <img
                                                                            src={msg.attachment.startsWith('http') ? msg.attachment : msg.attachment}
                                                                            alt="Attachment"
                                                                            style={{
                                                                                maxWidth: '280px',
                                                                                maxHeight: '200px',
                                                                                objectFit: 'cover',
                                                                                borderRadius: '8px',
                                                                                border: '1px solid rgba(0,0,0,0.1)'
                                                                            }}
                                                                        />
                                                                    </a>
                                                                ) : (
                                                                    <a
                                                                        href={msg.attachment.startsWith('http') ? msg.attachment : msg.attachment}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        style={{
                                                                            display: 'inline-flex',
                                                                            alignItems: 'center',
                                                                            gap: '8px',
                                                                            padding: '8px 12px',
                                                                            backgroundColor: isMine ? 'rgba(255,255,255,0.15)' : '#F4F2FA',
                                                                            borderRadius: '8px',
                                                                            color: isMine ? '#ffffff' : '#2B2185',
                                                                            textDecoration: 'none',
                                                                            fontSize: '13px',
                                                                            fontWeight: 600
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-file-download"></i>
                                                                        View Document
                                                                    </a>
                                                                )}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {/* Action bar below message */}
                                            {!msg.deleted && (isMine || user?.role === 'admin') && (
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: isMine ? 'flex-end' : 'flex-start',
                                                    marginTop: '2px'
                                                }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(msg._id)}
                                                        title="Delete message"
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#E11D48',
                                                            cursor: 'pointer',
                                                            fontSize: '11px',
                                                            padding: '2px 6px',
                                                            opacity: 0.7,
                                                            transition: 'opacity 0.2s'
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                                        onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                                                    >
                                                        <i className="fas fa-trash-alt" style={{ marginRight: '4px' }}></i>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* File preview badge before sending */}
                        {file && (
                            <div style={{
                                padding: '8px 20px',
                                backgroundColor: '#FFFBEB',
                                borderTop: '1px solid #FDE68A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '13px',
                                color: '#92400E'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fas fa-paperclip"></i>
                                    <span>Attached: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFile(null);
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        color: '#B45309',
                                        cursor: 'pointer',
                                        fontWeight: 700
                                    }}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        )}

                        {/* Composer Form */}
                        <form
                            onSubmit={handleSend}
                            style={{
                                padding: '16px 20px',
                                borderTop: '1px solid rgba(30, 23, 96, 0.08)',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            {/* Attachment Button */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={e => setFile(e.target.files[0] || null)}
                                style={{ display: 'none' }}
                                id="chat-file-input"
                            />
                            <label
                                htmlFor="chat-file-input"
                                title="Attach file or image"
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(30, 23, 96, 0.15)',
                                    backgroundColor: file ? '#8B1A3D' : '#F8F7FC',
                                    color: file ? '#ffffff' : '#1E1760',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <i className="fas fa-paperclip"></i>
                            </label>

                            {/* Text Input */}
                            <div style={{ flex: 1, position: 'relative' }}>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    placeholder={`Message #${activeRoom.name}...`}
                                    disabled={isSending}
                                    style={{
                                        width: '100%',
                                        padding: '12px 18px',
                                        borderRadius: '12px',
                                        border: '1.5px solid rgba(30, 23, 96, 0.18)',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        color: '#1E1760',
                                        transition: 'border-color 0.2s ease'
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#8B1A3D'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(30, 23, 96, 0.18)'}
                                />
                            </div>

                            {/* Send Button */}
                            <button
                                type="submit"
                                disabled={isSending || (!text.trim() && !file)}
                                style={{
                                    height: '44px',
                                    padding: '0 20px',
                                    borderRadius: '12px',
                                    backgroundColor: '#8B1A3D',
                                    color: '#ffffff',
                                    border: 'none',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: (isSending || (!text.trim() && !file)) ? 'not-allowed' : 'pointer',
                                    opacity: (isSending || (!text.trim() && !file)) ? 0.6 : 1,
                                    flexShrink: 0,
                                    boxShadow: '0 4px 12px rgba(139, 26, 61, 0.25)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {isSending ? (
                                    <i className="fas fa-circle-notch fa-spin"></i>
                                ) : (
                                    <>
                                        <span>Send</span>
                                        <i className="fas fa-paper-plane" style={{ fontSize: '12px' }}></i>
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6B6787',
                        padding: '40px'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#E8E6FA',
                            color: '#2B2185',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px',
                            marginBottom: '16px'
                        }}>
                            <i className="fas fa-comments"></i>
                        </div>
                        <h3 style={{ margin: '0 0 8px 0', color: '#1E1760', fontSize: '1.25rem' }}>Select a Channel</h3>
                        <p style={{ margin: 0, fontSize: '14px', maxWidth: '360px', textAlign: 'center' }}>
                            Choose any departmental, faculty, or campus channel from the sidebar to view conversations.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
