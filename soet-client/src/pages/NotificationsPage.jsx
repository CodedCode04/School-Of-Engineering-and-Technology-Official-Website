import React, { useState, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotificationsPage() {
    const { notifications, markAsRead, markAllRead, fetchNotifications } = useNotifications();
    const { user, api } = useAuth();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    const [editingNotification, setEditingNotification] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editMessage, setEditMessage] = useState('');

    const handleRead = (id, isRead) => {
        if (!isRead) markAsRead(id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notifications/${id}`);
            fetchNotifications();
        } catch (err) {
            console.error("Failed to delete", err);
        }
    };

    const handleEditClick = (n) => {
        setEditingNotification(n._id);
        setEditTitle(n.title);
        setEditMessage(n.message);
    };

    const handleEditSubmit = async (e, id) => {
        e.preventDefault();
        try {
            await api.put(`/notifications/${id}`, { title: editTitle, message: editMessage });
            setEditingNotification(null);
            fetchNotifications();
        } catch (err) {
            console.error("Failed to update", err);
        }
    };

    const filtered = notifications.filter(n => {
        const isRead = n.readBy.includes(user?._id);
        if (filter === 'unread') return !isRead;
        if (filter === 'read') return isRead;
        return true;
    });

    return (
        <Layout>
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>All Notifications</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px' }}>
                            <option value="all">All</option>
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                        </select>
                        <button onClick={markAllRead} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Mark all read</button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filtered.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#777' }}>No notifications found.</p>
                    ) : (
                        filtered.map(n => {
                            const isRead = n.readBy.includes(user?._id);
                            const isSender = n.sender?._id === user?._id || user?.role === 'admin';
                            
                            if (editingNotification === n._id) {
                                return (
                                    <div key={n._id} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#fff' }}>
                                        <form onSubmit={(e) => handleEditSubmit(e, n._id)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                            <textarea value={editMessage} onChange={e => setEditMessage(e.target.value)} required rows="3" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button type="submit" style={{ padding: '6px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                                                <button type="button" onClick={() => setEditingNotification(null)} style={{ padding: '6px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                );
                            }

                            return (
                                <div key={n._id} onClick={() => handleRead(n._id, isRead)} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: isRead ? 'white' : '#f8f9fa', cursor: isRead ? 'default' : 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div>
                                            <strong style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {n.title}
                                                {!isRead && <span style={{ width: '8px', height: '8px', background: 'blue', borderRadius: '50%', display: 'inline-block' }}></span>}
                                            </strong>
                                            <small style={{ color: '#888' }}>{new Date(n.createdAt).toLocaleString()} • From: {n.sender?.name || 'System'} ({n.type})</small>
                                        </div>
                                        {isSender && (
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button onClick={(e) => { e.stopPropagation(); handleEditClick(n); }} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>Edit</button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDelete(n._id); }} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                    <p style={{ color: '#444' }}>{n.message}</p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </Layout>
    );
}
