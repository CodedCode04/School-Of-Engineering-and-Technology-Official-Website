import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';
import IdCard from '../components/IdCard';

export default function StudentDocs() {
    const { api } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const navItems = getRoleNavItems('student', 'docs');

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

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#FFFAF3' }}>
                <div style={{ textAlign: 'center' }}>
                    <i className="fas fa-circle-notch fa-spin fa-2x" style={{ color: '#1E1760', marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: '#1E1760' }}>Loading Digital ID Card...</p>
                </div>
            </div>
        );
    }

    return (
        <DashboardLayout
            title="Digital Student ID & Documents"
            subtitle="Official Vikram University digital credential, valid for campus identity & examinations"
            navItems={navItems}
            activeKey="docs"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="docs-chat-btn"
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
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                {/* ID Card Display Card */}
                <div
                    style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #E8E6FA',
                        padding: '32px',
                        marginBottom: '28px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '16px', marginBottom: '24px' }}>
                        <div>
                            <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 800, color: '#1E1760' }}>
                                Official Digital ID Card
                            </h2>
                            <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                                Verified institutional credential issued by School of Engineering &amp; Technology, Vikram University.
                            </p>
                        </div>
                        <span style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <i className="fas fa-check-circle" /> Digitally Verified
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 20px 0' }}>
                        <IdCard student={profile} />
                    </div>
                </div>

                {/* Additional Documents Section */}
                <div
                    style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #E8E6FA',
                        padding: '24px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                >
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#1E1760' }}>
                        Academic Documents &amp; Certificates
                    </h3>
                    <div style={{ background: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '12px', padding: '24px', textAlign: 'center', color: '#6B7280' }}>
                        <i className="fas fa-folder-open fa-2x" style={{ color: '#9CA3AF', marginBottom: '8px', display: 'block' }} />
                        <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 600 }}>No additional documents pending</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>Semester grade cards and provisional degrees will appear here once published by the examination branch.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
