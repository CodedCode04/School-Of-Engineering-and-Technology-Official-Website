import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

import AlumniProfileCompletion from './AlumniProfileCompletion';
import AlumniDirectory from './AlumniDirectory';
import JobReferrals from './JobReferrals';
import MentorshipRequests from './MentorshipRequests';
import SuccessStories from './SuccessStories';

export default function AlumniDashboard() {
    const { user, logout, api } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Determine active key from subpath
    let activeKey = 'directory';
    if (location.pathname.includes('/jobs')) activeKey = 'jobs';
    else if (location.pathname.includes('/mentorship')) activeKey = 'mentorship';
    else if (location.pathname.includes('/stories')) activeKey = 'stories';
    else if (location.pathname.includes('/edit-profile')) activeKey = 'edit-profile';

    const navItems = getRoleNavItems('alumni', activeKey);

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
    }, [user, navigate, api]);

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#FFFAF3' }}>
                <div style={{ textAlign: 'center' }}>
                    <i className="fas fa-circle-notch fa-spin fa-2x" style={{ color: '#1E1760', marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: '#1E1760' }}>Loading Alumni Portal...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return <AlumniProfileCompletion onComplete={() => window.location.reload()} />;
    }

    if (user?.status === 'pending') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFAF3', padding: '20px' }}>
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #E8E6FA', padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px auto' }}>
                        <i className="fas fa-clock" />
                    </div>
                    <h2 style={{ color: '#1E1760', margin: '0 0 10px 0', fontSize: '22px', fontWeight: 800 }}>
                        Verification Pending
                    </h2>
                    <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.5, margin: '0 0 24px 0' }}>
                        Your alumni registration has been submitted and is awaiting administrator verification. You will receive access to the portal once approved.
                    </p>
                    <button
                        onClick={logout}
                        style={{
                            padding: '10px 24px',
                            background: '#EF4444',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <DashboardLayout
            title="Alumni Network Portal"
            subtitle="Connect with graduates, share opportunities, mentor students, and share milestones"
            navItems={navItems}
            activeKey={activeKey}
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="alumni-chat-btn"
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
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<AlumniDirectory isEmbedded={true} />} />
                <Route path="/jobs" element={<JobReferrals isEmbedded={true} />} />
                <Route path="/mentorship" element={<MentorshipRequests isEmbedded={true} />} />
                <Route path="/stories" element={<SuccessStories isEmbedded={true} />} />
                <Route path="/edit-profile" element={<AlumniProfileCompletion onComplete={() => window.location.reload()} />} />
            </Routes>
        </DashboardLayout>
    );
}
