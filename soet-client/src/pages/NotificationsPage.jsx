import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
    const { notifications, markAsRead, markAllRead, fetchNotifications } = useNotifications();
    const { user, api } = useAuth();
    const [filter, setFilter] = useState('all');

    const [editingNotification, setEditingNotification] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editMessage, setEditMessage] = useState('');

    const navItems = getRoleNavItems(user?.role, 'notifications');

    const handleRead = (id, isRead) => {
        if (!isRead) markAsRead(id);
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm('Delete this notification?')) return;
        try {
            await api.delete(`/notifications/${id}`);
            toast.success('Notification deleted');
            fetchNotifications();
        } catch (err) {
            console.error("Failed to delete", err);
            toast.error('Failed to delete notification');
        }
    };

    const handleEditClick = (n, e) => {
        e.stopPropagation();
        setEditingNotification(n._id);
        setEditTitle(n.title);
        setEditMessage(n.message);
    };

    const handleEditSubmit = async (e, id) => {
        e.preventDefault();
        try {
            await api.put(`/notifications/${id}`, { title: editTitle, message: editMessage });
            setEditingNotification(null);
            toast.success('Notification updated');
            fetchNotifications();
        } catch (err) {
            console.error("Failed to update", err);
            toast.error('Failed to update notification');
        }
    };

    const filtered = notifications.filter(n => {
        const isRead = n.readBy?.includes(user?._id);
        if (filter === 'unread') return !isRead;
        if (filter === 'read') return isRead;
        return true;
    });

    const getTypeBadge = (type) => {
        switch (type) {
            case 'official':
                return { bg: '#EEF2FF', color: '#4F46E5', icon: 'fa-bullhorn', label: 'Official' };
            case 'branch':
                return { bg: '#ECFDF5', color: '#047857', icon: 'fa-building', label: 'Branch' };
            case 'personal':
                return { bg: '#FFFBEB', color: '#B45309', icon: 'fa-user', label: 'Personal' };
            default:
                return { bg: '#F3F4F6', color: '#4B5563', icon: 'fa-bell', label: 'Notice' };
        }
    };

    return (
        <DashboardLayout
            title="Notifications & Circulars"
            subtitle="Official bulletins, academic circulars, and departmental messages"
            navItems={navItems}
            activeKey="notifications"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="notifications-chat-btn"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 14px',
                            background: '#10B981',
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                            boxShadow: '0 2px 4px rgba(16, 185, 129, 0.25)',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <i className="fas fa-comments" />
                        <span>Chat Rooms</span>
                        <span style={{
                            background: '#047857',
                            color: '#fff',
                            fontSize: '10px',
                            padding: '2px 5px',
                            borderRadius: '10px',
                            textTransform: 'uppercase'
                        }}>Live</span>
                    </Link>

                    {['admin', 'hod', 'tpo'].includes(user?.role) && (
                        <Link
                            to="/notifications/send"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '7px',
                                padding: '8px 14px',
                                background: '#1E1760',
                                color: '#ffffff',
                                borderRadius: '8px',
                                fontWeight: 600,
                                fontSize: '13px',
                                textDecoration: 'none'
                            }}
                        >
                            <i className="fas fa-paper-plane" />
                            <span>Dispatch Alert</span>
                        </Link>
                    )}
                </div>
            }
        >
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Controls Bar */}
                <div
                    style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #E8E6FA',
                        padding: '16px 20px',
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E1760' }}>Filter View:</span>
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            style={{
                                padding: '7px 12px',
                                borderRadius: '8px',
                                border: '1px solid #D1D5DB',
                                fontSize: '13px',
                                color: '#1E1760',
                                outline: 'none'
                            }}
                        >
                            <option value="all">All Notifications ({notifications.length})</option>
                            <option value="unread">Unread Only</option>
                            <option value="read">Read Only</option>
                        </select>
                    </div>

                    <button
                        onClick={markAllRead}
                        style={{
                            padding: '7px 16px',
                            background: '#F3F4F6',
                            color: '#1E1760',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <i className="fas fa-check-double" /> Mark All as Read
                    </button>
                </div>

                {/* Notifications List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filtered.length === 0 ? (
                        <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
                            <i className="fas fa-bell-slash fa-3x" style={{ color: '#D1D5DB', marginBottom: '12px', display: 'block' }} />
                            <h3 style={{ margin: '0 0 6px 0', color: '#1E1760', fontSize: '16px', fontWeight: 700 }}>No Notifications</h3>
                            <p style={{ margin: 0, fontSize: '13px' }}>You are completely caught up with announcements and alerts.</p>
                        </div>
                    ) : (
                        filtered.map(n => {
                            const isRead = n.readBy?.includes(user?._id);
                            const isSender = n.sender?._id === user?._id || user?.role === 'admin';
                            const badge = getTypeBadge(n.type);

                            if (editingNotification === n._id) {
                                return (
                                    <div key={n._id} style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #4F46E5', padding: '20px', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.1)' }}>
                                        <form onSubmit={(e) => handleEditSubmit(e, n._id)} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={e => setEditTitle(e.target.value)}
                                                required
                                                style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', fontWeight: 600 }}
                                            />
                                            <textarea
                                                value={editMessage}
                                                onChange={e => setEditMessage(e.target.value)}
                                                required
                                                rows="3"
                                                style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', resize: 'vertical' }}
                                            />
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button type="submit" style={{ padding: '8px 16px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                                                    Save Changes
                                                </button>
                                                <button type="button" onClick={() => setEditingNotification(null)} style={{ padding: '8px 16px', background: '#9CA3AF', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={n._id}
                                    onClick={() => handleRead(n._id, isRead)}
                                    style={{
                                        background: isRead ? '#ffffff' : '#F8F9FE',
                                        borderRadius: '14px',
                                        border: '1px solid',
                                        borderColor: isRead ? '#E8E6FA' : '#C7D2FE',
                                        padding: '18px 20px',
                                        cursor: isRead ? 'default' : 'pointer',
                                        boxShadow: isRead ? '0 1px 3px rgba(0,0,0,0.02)' : '0 2px 6px rgba(79, 70, 229, 0.06)',
                                        transition: 'all 0.15s ease',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                            <span
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    padding: '3px 8px',
                                                    borderRadius: '6px',
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    background: badge.bg,
                                                    color: badge.color
                                                }}
                                            >
                                                <i className={`fas ${badge.icon}`} /> {badge.label}
                                            </span>

                                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: isRead ? 700 : 800, color: '#1E1760' }}>
                                                {n.title}
                                            </h4>

                                            {!isRead && (
                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5', display: 'inline-block' }} title="Unread" />
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {isSender && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleEditClick(n, e)}
                                                        style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: '4px', fontSize: '13px' }}
                                                        title="Edit notification"
                                                    >
                                                        <i className="fas fa-edit" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleDelete(n._id, e)}
                                                        style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '4px', fontSize: '13px' }}
                                                        title="Delete notification"
                                                    >
                                                        <i className="fas fa-trash-alt" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#4B5563', lineHeight: 1.5 }}>
                                        {n.message}
                                    </p>

                                    <div style={{ fontSize: '11px', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span><i className="fas fa-clock" /> {new Date(n.createdAt).toLocaleString()}</span>
                                        <span>•</span>
                                        <span><i className="fas fa-user-circle" /> {n.sender?.name || 'System'}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
