import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

export default function TeacherDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const navItems = getRoleNavItems('teacher', 'overview');

    const branchName = user?.branch?.name || (typeof user?.branch === 'string' ? user.branch : 'Engineering Department');

    return (
        <DashboardLayout
            title="Faculty Dashboard"
            subtitle="Department Academic Operations & Student Communications"
            navItems={navItems}
            activeKey="overview"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link
                        to="/chat"
                        id="teacher-chat-btn"
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
            {/* Hero Welcome Banner */}
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
                <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '12px', color: '#FDE3BC' }}>
                        <i className="fas fa-chalkboard-teacher" /> Faculty Portal • Academic Year 2024-25
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                        Welcome, {user?.name || 'Prof. Faculty Member'}
                    </h1>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '14px', maxWidth: '600px', lineHeight: 1.5 }}>
                        Department: <strong>{branchName}</strong>. Access branch curricula, engage with students in live chat rooms, and stay updated with official circulars.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link
                        to="/syllabus"
                        style={{
                            background: '#ffffff',
                            color: '#1E1760',
                            padding: '10px 20px',
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
                        <i className="fas fa-book" /> View Syllabus
                    </Link>
                    <Link
                        to="/chat"
                        style={{
                            background: 'rgba(255,255,255,0.18)',
                            color: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.3)',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fas fa-comment-dots" /> Open Chat Room
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
                <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #E8E6FA', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                            <i className="fas fa-graduation-cap" />
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Department</div>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1E1760' }}>{branchName}</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #E8E6FA', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                            <i className="fas fa-comments" />
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Chat Channels</div>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: '#10B981' }}>Live & Active</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #E8E6FA', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                            <i className="fas fa-book-open" />
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Syllabus Schemes</div>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1E1760' }}>Semester 1 – 8</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #E8E6FA', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                            <i className="fas fa-shield-alt" />
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Account Status</div>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: '#047857' }}>Active & Verified</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Navigation Cards */}
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1E1760', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                Quick Operations & Academic Workflows
            </h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                    marginBottom: '28px'
                }}
            >
                <div
                    onClick={() => navigate('/syllabus')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#4F46E5'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>
                        <i className="fas fa-book-open" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700, color: '#1E1760' }}>
                        Department Syllabus & Schemes
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Access updated semester curricula, subject codes, teaching schemes, and official syllabus PDFs for your branch.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/chat')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#10B981'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>
                        <i className="fas fa-comments" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700, color: '#1E1760' }}>
                        Interactive Chat Rooms
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Join real-time discussion channels with branch students, faculty peers, department HOD, and alumni.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/announcements')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#D97706'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>
                        <i className="fas fa-bullhorn" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700, color: '#1E1760' }}>
                        Announcements & Circulars
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Review university-wide circulars, semester exam timetables, event notifications, and department alerts.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/notifications')}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #E8E6FA',
                        borderRadius: '14px',
                        padding: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#8B1A3D'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E8E6FA'; }}
                >
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF0F5', color: '#8B1A3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>
                        <i className="fas fa-bell" />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700, color: '#1E1760' }}>
                        Alerts & Notifications
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                        Stay informed with targeted push alerts, administrative bulletins, and real-time department updates.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
