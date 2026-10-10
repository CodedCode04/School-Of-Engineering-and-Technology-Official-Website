import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function NotificationBell() {
    const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggle = () => setOpen(!open);

    const handleRead = (id, e) => {
        e.stopPropagation();
        markAsRead(id);
    };

    const latest = notifications.slice(0, 5);

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginRight: '20px' }}>
            <button onClick={toggle} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', position: 'relative' }}>
                🔔
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white',
                        borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold'
                    }}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div style={{
                    position: 'absolute', right: 0, top: '40px', width: '300px', background: 'white',
                    border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000
                }}>
                    <div style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: '#333' }}>Notifications</strong>
                        <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '12px' }}>Mark all read</button>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {latest.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#777' }}>No notifications</div>
                        ) : (
                            latest.map(n => {
                                const isUnread = !n.readBy.includes(user?._id);
                                return (
                                    <div key={n._id} style={{ padding: '10px', borderBottom: '1px solid #eee', background: isUnread ? '#f8f9fa' : 'white', cursor: 'pointer' }}
                                         onClick={() => {
                                             if (isUnread) markAsRead(n._id);
                                             navigate('/notifications');
                                             setOpen(false);
                                         }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong style={{ fontSize: '14px', color: '#333' }}>{n.title}</strong>
                                            {isUnread && <span style={{ width: '8px', height: '8px', background: 'blue', borderRadius: '50%', display: 'inline-block' }}></span>}
                                        </div>
                                        <p style={{ fontSize: '12px', color: '#666', margin: '5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.message}</p>
                                        <small style={{ color: '#999', fontSize: '10px' }}>{new Date(n.createdAt).toLocaleString()}</small>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div style={{ padding: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
                        <Link to="/notifications" onClick={() => setOpen(false)} style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>View All</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
