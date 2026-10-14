import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function NotificationBell() {
    const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggle = () => setOpen(prev => !prev);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && open) {
                setOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open]);

    const latest = notifications ? notifications.slice(0, 5) : [];

    return (
        <div className="soet-bell-wrap" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggle}
                className="soet-bell-btn"
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
                aria-expanded={open}
            >
                <i className="fas fa-bell" aria-hidden="true"></i>
                {unreadCount > 0 && (
                    <span className="soet-bell-badge" aria-hidden="true">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="soet-bell-popover" role="region" aria-label="Notifications panel">
                    <div className="soet-bell-header">
                        <h4 className="soet-bell-header-title">Notifications</h4>
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllRead}
                                className="soet-bell-mark-all"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="soet-bell-list" role="feed">
                        {latest.length === 0 ? (
                            <div className="soet-bell-empty">
                                <i className="fas fa-bell-slash" aria-hidden="true" style={{ fontSize: '20px', display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}></i>
                                No notifications yet
                            </div>
                        ) : (
                            latest.map(n => {
                                const isUnread = !n.readBy || !n.readBy.includes(user?._id);
                                return (
                                    <div
                                        key={n._id}
                                        className={`soet-bell-item ${isUnread ? 'unread' : ''}`}
                                        role="article"
                                        tabIndex={0}
                                        onClick={() => {
                                            if (isUnread) markAsRead(n._id);
                                            navigate('/notifications');
                                            setOpen(false);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                if (isUnread) markAsRead(n._id);
                                                navigate('/notifications');
                                                setOpen(false);
                                            }
                                        }}
                                    >
                                        <div className="soet-bell-item-top">
                                            <span className="soet-bell-item-title">{n.title}</span>
                                            {isUnread && <span className="soet-bell-dot" aria-label="Unread"></span>}
                                        </div>
                                        <p className="soet-bell-item-body">{n.message}</p>
                                        <span className="soet-bell-item-time">
                                            {new Date(n.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })} at {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="soet-bell-footer">
                        <Link
                            to="/notifications"
                            onClick={() => setOpen(false)}
                            className="soet-bell-view-all"
                        >
                            View All Notifications &rarr;
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
