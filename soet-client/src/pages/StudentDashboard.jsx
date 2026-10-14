import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

export default function StudentDashboard() {
    const { api, user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const navItems = getRoleNavItems('student', 'overview');

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

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#FFFAF3', color: '#1E1760', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ textAlign: 'center' }}>
                    <i className="fas fa-circle-notch fa-spin fa-2x" style={{ color: '#1E1760', marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontWeight: 600 }}>Loading Student Dashboard...</p>
                </div>
            </div>
        );
    }

    const branchName = profile?.branch?.name || (typeof profile?.branch === 'string' ? profile.branch : 'Engineering');

    return (
        <DashboardLayout
            title="Student Dashboard"
            subtitle="Academic Progress, Verified Credentials & Department Portal"
            navItems={navItems}
            activeKey="overview"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link
                        to="/chat"
                        id="student-chat-btn"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
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
                            padding: '2px 6px',
                            borderRadius: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em'
                        }}>Live</span>
                    </Link>
                </div>
            }
        >
            {/* Student Profile Hero Banner */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #1E1760 0%, #14103A 60%, #8B1A3D 100%)',
                    borderRadius: '16px',
                    padding: '28px 32px',
                    color: '#ffffff',
                    marginBottom: '28px',
                    boxShadow: '0 10px 25px -5px rgba(20, 16, 58, 0.2)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px'
                }}
            >
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div
                        style={{
                            width: '76px',
                            height: '76px',
                            borderRadius: '50%',
                            background: '#ffffff',
                            color: '#1E1760',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            fontWeight: 800,
                            border: '3px solid #FDE3BC',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                        }}
                    >
                        {profile?.photo ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${profile.photo}`}
                                alt={profile.name}
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        ) : (
                            (profile?.name || user?.name || 'S').charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                            <span style={{ background: '#10B981', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                <i className="fas fa-check-circle" /> Verified Student
                            </span>
                            <span style={{ background: 'rgba(255,255,255,0.15)', color: '#FDE3BC', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                                Roll: {profile?.rollNo || 'N/A'}
                            </span>
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                            {profile?.name || user?.name || 'Student'}
                        </h1>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
                            {branchName} • Semester {profile?.semester || 1} • Batch {profile?.sessionBatch || '2023-2027'} • Enroll: <strong>{profile?.enrollmentNo}</strong>
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link
                        to="/student/docs"
                        style={{
                            background: '#ffffff',
                            color: '#1E1760',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '13px',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        <i className="fas fa-id-card" /> Digital ID Card
                    </Link>
                    <Link
                        to="/chat"
                        style={{
                            background: '#10B981',
                            color: '#ffffff',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        <i className="fas fa-comments" /> Chat Rooms
                    </Link>
                </div>
            </div>

            {/* Quick Stat Highlights */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '16px',
                    marginBottom: '28px'
                }}
            >
                <div style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #E8E6FA', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                            <i className="fas fa-graduation-cap" />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Branch & Sem</div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#1E1760' }}>{branchName} (Sem {profile?.semester || 1})</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #E8E6FA', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                            <i className="fas fa-hashtag" />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Enrollment No</div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#1E1760' }}>{profile?.enrollmentNo || 'N/A'}</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #E8E6FA', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                            <i className="fas fa-calendar-alt" />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Academic Session</div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#1E1760' }}>Batch {profile?.sessionBatch || '2023-2027'}</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #E8E6FA', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                            <i className="fas fa-comments" />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Chat Rooms</div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#10B981' }}>Live & Connected</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Access Workflows */}
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1E1760', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                Student Portals & Academic Services
            </h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '16px',
                    marginBottom: '28px'
                }}
            >
                <div
                    onClick={() => navigate('/student/portfolio')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#4F46E5'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
                        <i className="fas fa-award" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#1E1760' }}>
                        Academic Portfolio & Grades
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Track your semester SGPA/CGPA, add verified certifications, skills, and hackathon achievements.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/student/docs')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#10B981'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
                        <i className="fas fa-id-card" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#1E1760' }}>
                        Digital Student ID Card
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        View and download your official SoET Vikram University verified student ID card in PDF or JPEG.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/chat')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#10B981'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
                        <i className="fas fa-comments" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#1E1760' }}>
                        Interactive Chat Rooms
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Collaborate with branch batchmates, ask doubts to faculty, and talk with alumni in dedicated channels.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/syllabus')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#3B82F6'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
                        <i className="fas fa-book-open" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#1E1760' }}>
                        Department Syllabus
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Check semester examination schemes, subject syllabus, course outcomes, and reference materials.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/alumni-directory')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#8B1A3D'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#FFF0F5', color: '#8B1A3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
                        <i className="fas fa-landmark" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#1E1760' }}>
                        Alumni Directory
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Browse SoET alumni profiles, search by company and domain, and connect for career mentorship.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/job-referrals')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#D97706'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
                        <i className="fas fa-briefcase" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#1E1760' }}>
                        Jobs &amp; Referrals
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Discover internships and full-time hiring opportunities posted exclusively for SoET students by alumni and TPO.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
