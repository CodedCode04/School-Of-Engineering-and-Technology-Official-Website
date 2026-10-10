import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from '../components/NotificationBell';
import { useNavigate, Link } from 'react-router-dom';

export default function StudentDashboard() {
    const { logout, api } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/student/profile')
            .then(res => {
                const data = res.data;
                if (!data || data.verificationStatus === 'not_submitted' || data.verificationStatus === 'rejected') {
                    navigate('/student/profile-completion');
                } else if (data.verificationStatus === 'pending') {
                    navigate('/student/verification-pending');
                } else {
                    setProfile(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    navigate('/student/profile-completion');
                } else {
                    console.error("Failed to load profile", err);
                    setLoading(false);
                }
            });
    }, [api, navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Student Panel</h2>
                <nav>
                    <ul>
                        <li><Link to="/student-dashboard" className="active">Overview</Link></li>
                        <li><Link to="/student/portfolio">Academic & Achievements</Link></li>
                        <li><Link to="/student/docs">My ID Card</Link></li>
                        <li><Link to="/syllabus">My Syllabus</Link></li>
                        <li><Link to="/alumni-directory">Alumni Directory</Link></li>
                        <li><Link to="/job-referrals">Job Referrals</Link></li>
                        <li><Link to="/mentorship-requests">Mentorship Requests</Link></li>
                        <li><Link to="/success-stories">Success Stories</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="dashboard-main">
                <header>
                    <h1>Student Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button onClick={() => navigate('/chat')} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Chat Rooms</button>
                        <NotificationBell />
                        <button onClick={logout} className="logout-btn">Logout</button>
                    </div>
                </header>
                <div className="dashboard-content">
                    <p>Welcome, {profile?.name}. Your profile is verified.</p>
                </div>
            </main>
        </div>
    );
}
