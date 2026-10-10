import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from '../components/NotificationBell';
import toast from 'react-hot-toast';
import StudentVerificationList from '../components/StudentVerificationList';
import SuccessStories from './SuccessStories';

export default function AdminDashboard() {
    const { user, logout, api } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');
    const [userRoleTab, setUserRoleTab] = useState('hod');
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        if (activeTab === 'users') fetchUsers(userRoleTab);
    }, [activeTab, userRoleTab]);

    const fetchUsers = async (role) => {
        try {
            const res = await api.get(`/admin/users?role=${role}`);
            setUsersList(res.data);
        } catch {
            toast.error('Failed to fetch users');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/admin/users/${id}/status`, { status });
            toast.success(`User marked as ${status}`);
            fetchUsers(userRoleTab);
        } catch {
            toast.error('Status update failed');
        }
    };

    const navItems = [
        { key: 'users', label: '👥 User Approvals' },
        { key: 'student-verification', label: '🎓 Student Profiles' },
        { key: 'alumni-directory', label: '🏛️ Alumni Directory', navigate: '/alumni-directory' },
        { key: 'success-stories', label: '⭐ Success Stories' },
        { key: 'manage-announcements', label: '📢 Announcements', navigate: '/manage-announcements' },
        { key: 'manage-syllabus', label: '📚 Syllabus', navigate: '/manage-syllabus' },
        { key: 'audit-logs', label: '📋 Audit Logs', navigate: '/audit-logs' },
    ];

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <ul>
                        {navItems.map(item => (
                            <li key={item.key}>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); item.navigate ? navigate(item.navigate) : setActiveTab(item.key); }}
                                    className={activeTab === item.key ? 'active' : ''}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header>
                    <h1>Admin Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/admin/chat-moderation')} style={{ background: '#ffc107', color: '#000', border: 'none', padding: '7px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Chat Moderation</button>
                        <button onClick={() => navigate('/chat')} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Chat Rooms</button>
                        <button onClick={() => navigate('/notifications/send')} style={{ background: '#0056b3', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Send Notification</button>
                        <NotificationBell />
                        <button onClick={logout} className="logout-btn" style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '4px', fontSize: '0.85rem' }}>Logout</button>
                    </div>
                </header>

                <div className="dashboard-content" style={{ padding: '20px' }}>
                    {/* User Approvals Tab */}
                    {activeTab === 'users' && (
                        <div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                                {['hod', 'teacher', 'alumni', 'student', 'tpo'].map(role => (
                                    <button
                                        key={role}
                                        onClick={() => setUserRoleTab(role)}
                                        style={{
                                            padding: '7px 14px',
                                            background: userRoleTab === role ? '#003366' : '#eee',
                                            color: userRoleTab === role ? '#fff' : '#333',
                                            border: 'none', borderRadius: '4px', cursor: 'pointer'
                                        }}
                                    >
                                        {role.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                                <thead>
                                    <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>Branch</th>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map(u => (
                                        <tr key={u._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                            <td style={{ padding: '12px' }}>{u.name}</td>
                                            <td style={{ padding: '12px' }}>{u.email}</td>
                                            <td style={{ padding: '12px' }}>{u.branch?.name || '-'}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{
                                                    padding: '4px 8px', borderRadius: '12px', fontSize: '0.8em',
                                                    background: u.status === 'approved' ? '#d4edda' : u.status === 'pending' ? '#fff3cd' : '#f8d7da',
                                                    color: u.status === 'approved' ? '#155724' : u.status === 'pending' ? '#856404' : '#721c24'
                                                }}>
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                {u.status !== 'approved' && <button onClick={() => handleStatusUpdate(u._id, 'approved')} style={{ marginRight: '5px', padding: '4px 8px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>}
                                                {u.status !== 'rejected' && <button onClick={() => handleStatusUpdate(u._id, 'rejected')} style={{ marginRight: '5px', padding: '4px 8px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Reject</button>}
                                                {u.status !== 'blocked'
                                                    ? <button onClick={() => handleStatusUpdate(u._id, 'blocked')} style={{ padding: '4px 8px', background: '#343a40', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Block</button>
                                                    : <button onClick={() => handleStatusUpdate(u._id, 'approved')} style={{ padding: '4px 8px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Unblock</button>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                    {usersList.length === 0 && (
                                        <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No users found for this role.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Student Profile Verification */}
                    {activeTab === 'student-verification' && <StudentVerificationList />}

                    {/* Success Stories Moderation */}
                    {activeTab === 'success-stories' && (
                        <div>
                            <h3 style={{ marginTop: 0 }}>Success Stories Moderation</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>
                                Review and publish alumni success stories submitted for approval.
                            </p>
                            <SuccessStories />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
