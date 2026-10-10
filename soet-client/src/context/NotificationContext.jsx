import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const { token, api, user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/notifications');
            setNotifications(res.data.notifications);
            setUnreadCount(res.data.notifications.filter(n => !n.readBy.includes(user?._id)).length);
        } catch (err) {
            console.error("Failed to fetch notifications");
        }
    };

    useEffect(() => {
        if (token && user) {
            const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
                auth: { token }
            });

            newSocket.on('connect', () => {
                console.log('Connected to notification socket');
            });

            newSocket.on('new_notification', (notification) => {
                setNotifications(prev => [notification, ...prev]);
                setUnreadCount(prev => prev + 1);
                toast('New Notification: ' + notification.title, { icon: '🔔' });
            });

            newSocket.on('update_notification', (updatedNotification) => {
                setNotifications(prev => prev.map(n => n._id === updatedNotification._id ? updatedNotification : n));
            });

            newSocket.on('delete_notification', (deletedId) => {
                setNotifications(prev => {
                    const exists = prev.find(n => n._id === deletedId);
                    if (exists && !exists.readBy.includes(user?._id)) {
                        setUnreadCount(c => Math.max(0, c - 1));
                    }
                    return prev.filter(n => n._id !== deletedId);
                });
            });

            setSocket(newSocket);
            fetchNotifications();

            return () => newSocket.close();
        } else {
            if (socket) socket.close();
            setSocket(null);
            setNotifications([]);
            setUnreadCount(0);
        }
    }, [token, user]);

    const markAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => {
                if (n._id === id && !n.readBy.includes(user._id)) {
                    n.readBy.push(user._id);
                    setUnreadCount(c => Math.max(0, c - 1));
                }
                return n;
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const markAllRead = async () => {
        try {
            await api.put(`/notifications/read-all`);
            setNotifications(prev => prev.map(n => {
                if (!n.readBy.includes(user._id)) {
                    n.readBy.push(user._id);
                }
                return n;
            }));
            setUnreadCount(0);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllRead, fetchNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
