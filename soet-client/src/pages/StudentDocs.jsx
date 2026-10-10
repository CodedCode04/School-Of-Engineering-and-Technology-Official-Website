import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from '../components/NotificationBell';
import { useNavigate, Link } from 'react-router-dom';
import IdCard from '../components/IdCard';

export default function StudentDocs() {
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
                console.error("Failed to load profile", err);
                navigate('/student-dashboard');
            });
    }, [api, navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Student Panel</h2>
                <nav>
                    <ul>
                        <li><Link to="/student-dashboard">Overview</Link></li>
                        <li><Link to="/student/docs" className="active">My ID Card</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="dashboard-main">
                <header>
                    <h1>My Documents & ID Card</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}><NotificationBell /><button onClick={logout} className="logout-btn">Logout</button></div>
                </header>
                <div className="dashboard-content">
                    <section style={{ marginBottom: '40px' }}>
                        <h2>Digital ID Card</h2>
                        <p style={{ marginBottom: '20px' }}>Your verified student ID card. You can download it as PDF or JPEG.</p>
                        <IdCard student={profile} />
                    </section>
                    <section>
                        <h2>Other Documents</h2>
                        <div style={{ padding: '20px', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center' }}>
                            <p>No other documents available at the moment.</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
