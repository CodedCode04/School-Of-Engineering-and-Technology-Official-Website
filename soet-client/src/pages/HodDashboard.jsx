import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from '../components/NotificationBell';
import StudentVerificationList from '../components/StudentVerificationList';

export default function HodDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const navItems = [
        { key: 'overview', label: '🏠 Overview' },
        { key: 'student-verification', label: '🎓 Verify Students' },
        { key: 'alumni-directory', label: '🏛️ Alumni Directory', navigate: '/alumni-directory' },
        { key: 'manage-announcements', label: '📢 Announcements', navigate: '/manage-announcements' },
        { key: 'manage-syllabus', label: '📚 Syllabus', navigate: '/manage-syllabus' },
    ];

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>HOD Panel</h2>
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
                    <h1>HOD Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button onClick={() => navigate('/chat')} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Chat Rooms</button>
                        <button onClick={() => navigate('/notifications/send')} style={{ background: '#0056b3', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Send Notification</button>
                        <NotificationBell />
                        <button onClick={logout} className="logout-btn">Logout</button>
                    </div>
                </header>

                <div className="dashboard-content" style={{ padding: '20px' }}>
                    {activeTab === 'overview' && (
                        <div>
                            <h3 style={{ color: '#003366' }}>Welcome to the HOD Dashboard</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
                                {[
                                    { label: 'Verify Students', icon: '🎓', action: () => setActiveTab('student-verification') },
                                    { label: 'Alumni Directory', icon: '🏛️', action: () => navigate('/alumni-directory') },
                                    { label: 'Manage Announcements', icon: '📢', action: () => navigate('/manage-announcements') },
                                    { label: 'Manage Syllabus', icon: '📚', action: () => navigate('/manage-syllabus') },
                                    { label: 'Chat Rooms', icon: '💬', action: () => navigate('/chat') },
                                    { label: 'Job Referrals', icon: '💼', action: () => navigate('/job-referrals') },
                                ].map(card => (
                                    <div key={card.label} onClick={card.action}
                                        style={{ background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', textAlign: 'center', border: '1px solid #e8e8e8', transition: 'box-shadow 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'}
                                        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                                    >
                                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{card.icon}</div>
                                        <div style={{ fontWeight: '600', color: '#003366', fontSize: '0.9rem' }}>{card.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'student-verification' && <StudentVerificationList />}
                </div>
            </main>
        </div>
    );
}
