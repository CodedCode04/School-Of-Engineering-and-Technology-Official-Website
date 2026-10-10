import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import NotificationBell from '../components/NotificationBell';

import AlumniProfileCompletion from './AlumniProfileCompletion';
import AlumniDirectory from './AlumniDirectory';
import JobReferrals from './JobReferrals';
import MentorshipRequests from './MentorshipRequests';
import SuccessStories from './SuccessStories';

const AlumniDashboard = () => {
    const { user, logout, api } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.role !== 'alumni') {
            navigate('/');
            return;
        }

        api.get('/alumni/profile')
            .then(res => {
                setProfile(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [user, navigate]);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <p>Loading...</p>
        </div>
    );

    if (!profile) {
        return <AlumniProfileCompletion onComplete={() => window.location.reload()} />;
    }

    if (user.status === 'pending') {
        return (
            <div className="dashboard-container" style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', padding: '60px 20px' }}>
                <h2 style={{ color: '#003366', marginBottom: '16px' }}>Verification Pending</h2>
                <p style={{ color: '#555', marginBottom: '20px' }}>
                    Your alumni profile has been submitted and is awaiting administrator approval.
                    You will be able to access the portal once approved.
                </p>
                <button onClick={logout} style={{ padding: '8px 20px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>Alumni Portal</h2>
                <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '16px' }}>Welcome, {user?.name}</p>
                <nav>
                    <ul>
                        <li><Link to="/alumni" style={{ display: 'block', padding: '8px 12px', color: '#fff', textDecoration: 'none' }}>🏠 Directory</Link></li>
                        <li><Link to="/alumni/jobs" style={{ display: 'block', padding: '8px 12px', color: '#fff', textDecoration: 'none' }}>💼 Job Referrals</Link></li>
                        <li><Link to="/alumni/mentorship" style={{ display: 'block', padding: '8px 12px', color: '#fff', textDecoration: 'none' }}>🎓 Mentorship</Link></li>
                        <li><Link to="/alumni/stories" style={{ display: 'block', padding: '8px 12px', color: '#fff', textDecoration: 'none' }}>⭐ Success Stories</Link></li>
                        <li><Link to="/chat" style={{ display: 'block', padding: '8px 12px', color: '#fff', textDecoration: 'none' }}>💬 Alumni Chat</Link></li>
                        <li><Link to="/announcements" style={{ display: 'block', padding: '8px 12px', color: '#fff', textDecoration: 'none' }}>📢 Announcements</Link></li>
                        <li><Link to="/alumni/edit-profile" style={{ display: 'block', padding: '8px 12px', color: '#fff', textDecoration: 'none' }}>✏️ Edit Profile</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header>
                    <h1>Alumni Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <NotificationBell />
                        <button onClick={logout} className="logout-btn" style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>
                            Logout
                        </button>
                    </div>
                </header>
                <div className="dashboard-content" style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<AlumniDirectory />} />
                        <Route path="/jobs" element={<JobReferrals />} />
                        <Route path="/mentorship" element={<MentorshipRequests />} />
                        <Route path="/stories" element={<SuccessStories />} />
                        <Route path="/edit-profile" element={<AlumniProfileCompletion onComplete={() => window.location.reload()} />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default AlumniDashboard;
