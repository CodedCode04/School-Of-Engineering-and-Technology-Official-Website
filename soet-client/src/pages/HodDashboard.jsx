import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/shared/DashboardLayout';
import StatCard from '../components/shared/StatCard';
import Card from '../components/shared/Card';
import StudentVerificationList from '../components/StudentVerificationList';
import { getRoleNavItems } from '../utils/dashboardNav';

export default function HodDashboard() {
    const { user, api } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Support tab in URL query (e.g. ?tab=verification)
    const initialTab = searchParams.get('tab') === 'verification' ? 'student-verification' : 'overview';
    const [activeTab, setActiveTab] = useState(initialTab);

    // Dynamic stats
    const [stats, setStats] = useState({
        pendingCount: 0,
        verifiedCount: 0,
        announcementsCount: 0,
        channelsCount: 0,
        loading: true
    });

    const [recentPending, setRecentPending] = useState([]);

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam === 'verification') {
            setActiveTab('student-verification');
        } else if (!tabParam) {
            setActiveTab('overview');
        }
    }, [searchParams]);

    // Fetch dashboard overview metrics
    useEffect(() => {
        const loadDashboardStats = async () => {
            try {
                const [pendingRes, verifiedRes, announcementsRes, roomsRes] = await Promise.allSettled([
                    api.get('/staff/students/pending'),
                    api.get('/staff/students/verified'),
                    api.get('/announcements?all=true'),
                    api.get('/chat/rooms')
                ]);

                const pendingData = pendingRes.status === 'fulfilled' ? (pendingRes.value.data || []) : [];
                const verifiedData = verifiedRes.status === 'fulfilled' ? (verifiedRes.value.data || []) : [];
                const announcementsData = announcementsRes.status === 'fulfilled' ? (announcementsRes.value.data?.data || announcementsRes.value.data || []) : [];
                const roomsData = roomsRes.status === 'fulfilled' ? (roomsRes.value.data || []) : [];

                setStats({
                    pendingCount: pendingData.length,
                    verifiedCount: verifiedData.length,
                    announcementsCount: announcementsData.length,
                    channelsCount: roomsData.length,
                    loading: false
                });

                setRecentPending(pendingData.slice(0, 5));
            } catch (err) {
                console.error('Failed to load HOD stats', err);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        loadDashboardStats();
    }, [api]);

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        if (tabKey === 'student-verification') {
            setSearchParams({ tab: 'verification' });
        } else {
            setSearchParams({});
        }
    };

    // Build sidebar nav items
    const navItems = [
        {
            key: 'overview',
            label: 'Overview',
            icon: 'fas fa-home',
            onClick: () => handleTabChange('overview')
        },
        {
            key: 'student-verification',
            label: 'Verify Students',
            icon: 'fas fa-user-check',
            badge: stats.pendingCount > 0 ? `${stats.pendingCount} Pending` : undefined,
            onClick: () => handleTabChange('student-verification')
        },
        {
            key: 'announcements',
            label: 'Announcements',
            icon: 'fas fa-bullhorn',
            navigate: '/manage-announcements'
        },
        {
            key: 'syllabus',
            label: 'Syllabus & Schemes',
            icon: 'fas fa-book',
            navigate: '/manage-syllabus'
        },
        {
            key: 'alumni-directory',
            label: 'Alumni Directory',
            icon: 'fas fa-user-graduate',
            navigate: '/alumni-directory'
        },
        {
            key: 'job-referrals',
            label: 'Job Referrals',
            icon: 'fas fa-briefcase',
            navigate: '/job-referrals'
        },
        {
            key: 'chat',
            label: 'Chat Rooms',
            icon: 'fas fa-comments',
            badge: 'Live',
            navigate: '/chat'
        },
        {
            key: 'send-notification',
            label: 'Send Alert',
            icon: 'fas fa-paper-plane',
            navigate: '/notifications/send'
        },
        {
            key: 'notifications',
            label: 'Notifications',
            icon: 'fas fa-bell',
            navigate: '/notifications'
        }
    ];

    const quickActionCards = [
        {
            title: 'Verify Students',
            desc: 'Review student registrations, check verification documents, and generate official ID cards.',
            icon: 'fas fa-user-check',
            iconColor: '#8B1A3D',
            bgColor: '#FDF2F4',
            badge: stats.pendingCount > 0 ? `${stats.pendingCount} Pending` : null,
            action: () => handleTabChange('student-verification')
        },
        {
            title: 'Manage Announcements',
            desc: 'Compose, publish, and pin departmental notices, examination circulars, and academic news.',
            icon: 'fas fa-bullhorn',
            iconColor: '#1D4ED8',
            bgColor: '#EFF6FF',
            action: () => navigate('/manage-announcements')
        },
        {
            title: 'Curriculum & Syllabus',
            desc: 'Maintain semester-wise subjects, course codes, schemes, and syllabus documents.',
            icon: 'fas fa-book-open',
            iconColor: '#047857',
            bgColor: '#ECFDF5',
            action: () => navigate('/manage-syllabus')
        },
        {
            title: 'Department Chat Rooms',
            desc: 'Engage directly in real-time encrypted channels with faculty members, students, and alumni.',
            icon: 'fas fa-comments',
            iconColor: '#7C3AED',
            bgColor: '#F5F3FF',
            badge: 'Live',
            action: () => navigate('/chat')
        },
        {
            title: 'Alumni Directory',
            desc: 'Connect with graduated alumni, review industry placements, and coordinate mentorships.',
            icon: 'fas fa-user-graduate',
            iconColor: '#B45309',
            bgColor: '#FFFBEB',
            action: () => navigate('/alumni-directory')
        },
        {
            title: 'Job & Internship Referrals',
            desc: 'Monitor placement drives and industry referrals submitted for department students.',
            icon: 'fas fa-briefcase',
            iconColor: '#0E7490',
            bgColor: '#ECFEFF',
            action: () => navigate('/job-referrals')
        },
        {
            title: 'Send Official Notification',
            desc: 'Broadcast high-priority push notifications and circulars directly to students or faculty.',
            icon: 'fas fa-paper-plane',
            iconColor: '#BE123C',
            bgColor: '#FFF1F2',
            action: () => navigate('/notifications/send')
        },
        {
            title: 'View All Notifications',
            desc: 'Access your full inbox of administrative alerts, circulars, and system messages.',
            icon: 'fas fa-bell',
            iconColor: '#4338CA',
            bgColor: '#EEF2FF',
            action: () => navigate('/notifications')
        }
    ];

    return (
        <DashboardLayout
            title="Head of Department (HOD) Portal"
            subtitle="School of Engineering & Technology • Academic Year 2026-27"
            navItems={navItems}
            activeKey={activeTab}
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/chat')}
                        className="soet-btn soet-btn-secondary soet-btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                        <i className="fas fa-comments" style={{ color: '#8B1A3D' }}></i>
                        <span>Chat Rooms</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/notifications/send')}
                        className="soet-btn soet-btn-primary soet-btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                        <i className="fas fa-paper-plane"></i>
                        <span>Send Alert</span>
                    </button>
                </div>
            }
        >
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Welcome Hero Banner */}
                    <div style={{
                        background: 'linear-gradient(135deg, #14103A 0%, #1E1760 50%, #2B2185 100%)',
                        borderRadius: '20px',
                        padding: '32px 36px',
                        color: '#ffffff',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 12px 30px rgba(20, 16, 58, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}>
                        {/* Decorative watermark */}
                        <div style={{
                            position: 'absolute',
                            right: '-20px',
                            bottom: '-30px',
                            opacity: 0.08,
                            fontSize: '180px',
                            color: '#ffffff',
                            pointerEvents: 'none'
                        }}>
                            <i className="fas fa-university"></i>
                        </div>

                        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <span style={{
                                    backgroundColor: 'rgba(249, 210, 154, 0.2)',
                                    color: '#FDE3BC',
                                    border: '1px solid rgba(249, 210, 154, 0.4)',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase'
                                }}>
                                    HOD Console Active
                                </span>
                                <span style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                    color: '#ffffff',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    fontSize: '12px',
                                    fontWeight: 600
                                }}>
                                    Session 2026-27
                                </span>
                            </div>

                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                margin: '0 0 10px 0',
                                color: '#ffffff',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.2
                            }}>
                                Welcome back, {user?.name || 'Head of Department'}
                            </h1>
                            <p style={{
                                fontSize: '15px',
                                margin: '0 0 20px 0',
                                color: 'rgba(232, 230, 250, 0.85)',
                                lineHeight: 1.6
                            }}>
                                Monitor departmental academic operations, verify student admissions and digital ID card issuances, coordinate curriculum schedules, and communicate with institutional members.
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => handleTabChange('student-verification')}
                                    className="soet-btn soet-btn-primary soet-btn-sm"
                                    style={{ backgroundColor: '#F9D29A', color: '#1E1760', fontWeight: 700 }}
                                >
                                    <i className="fas fa-user-check"></i>
                                    <span>Review Pending Verifications ({stats.pendingCount})</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/chat')}
                                    className="soet-btn soet-btn-secondary soet-btn-sm"
                                    style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#ffffff' }}
                                >
                                    <i className="fas fa-comments"></i>
                                    <span>Open Department Chat</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Strip */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                        gap: '20px'
                    }}>
                        <StatCard
                            icon="fas fa-clock"
                            value={stats.loading ? '...' : stats.pendingCount}
                            label="Pending Student Verifications"
                            trend={stats.pendingCount > 0 ? 'Requires HOD Review' : 'All Clear'}
                        />
                        <StatCard
                            icon="fas fa-user-graduate"
                            value={stats.loading ? '...' : stats.verifiedCount}
                            label="Verified Department Students"
                            trend="Active Digital ID Holders"
                        />
                        <StatCard
                            icon="fas fa-bullhorn"
                            value={stats.loading ? '...' : stats.announcementsCount}
                            label="Published Announcements"
                            trend="Circulars & Bulletins"
                        />
                        <StatCard
                            icon="fas fa-comments"
                            value={stats.loading ? '...' : stats.channelsCount}
                            label="Live Discussion Channels"
                            trend="Faculty, Branch & Campus"
                        />
                    </div>

                    {/* Urgent Action Needed: Pending Verifications Banner */}
                    {stats.pendingCount > 0 && (
                        <Card style={{
                            borderLeft: '5px solid #8B1A3D',
                            backgroundColor: '#FFF8F9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '16px',
                            padding: '20px 24px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    backgroundColor: '#8B1A3D',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    flexShrink: 0
                                }}>
                                    <i className="fas fa-exclamation-circle"></i>
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 4px 0', color: '#8B1A3D', fontSize: '1.05rem', fontWeight: 800 }}>
                                        {stats.pendingCount} Student {stats.pendingCount === 1 ? 'Profile Needs' : 'Profiles Need'} Approval
                                    </h3>
                                    <p style={{ margin: 0, fontSize: '13.5px', color: '#6B6787' }}>
                                        Registered students cannot download their digital ID cards or access branch chat channels until verified.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleTabChange('student-verification')}
                                className="soet-btn soet-btn-primary soet-btn-sm"
                            >
                                <i className="fas fa-arrow-right"></i>
                                <span>Verify Profiles Now</span>
                            </button>
                        </Card>
                    )}

                    {/* Quick Actions Grid */}
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontWeight: 800,
                                color: '#1E1760',
                                margin: '0 0 4px 0',
                                letterSpacing: '-0.01em'
                            }}>
                                Department Management Workflows
                            </h2>
                            <p style={{ margin: 0, fontSize: '13.5px', color: '#6B6787' }}>
                                Core academic administrative actions and collaborative resources
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '20px'
                        }}>
                            {quickActionCards.map(card => (
                                <Card
                                    key={card.title}
                                    onClick={card.action}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        position: 'relative'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(30, 23, 96, 0.12)';
                                        e.currentTarget.style.borderColor = 'rgba(139, 26, 61, 0.3)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(30, 23, 96, 0.06)';
                                        e.currentTarget.style.borderColor = 'rgba(30, 23, 96, 0.12)';
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '16px'
                                    }}>
                                        <div style={{
                                            width: '46px',
                                            height: '46px',
                                            borderRadius: '12px',
                                            backgroundColor: card.bgColor,
                                            color: card.iconColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '18px'
                                        }}>
                                            <i className={card.icon}></i>
                                        </div>
                                        {card.badge && (
                                            <span style={{
                                                backgroundColor: '#8B1A3D',
                                                color: '#ffffff',
                                                padding: '3px 8px',
                                                borderRadius: '999px',
                                                fontSize: '11px',
                                                fontWeight: 700
                                            }}>
                                                {card.badge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.05rem',
                                        fontWeight: 700,
                                        color: '#1E1760',
                                        margin: '0 0 8px 0',
                                        lineHeight: 1.3
                                    }}>
                                        {card.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '13px',
                                        color: '#6B6787',
                                        margin: '0 0 16px 0',
                                        lineHeight: 1.5,
                                        flex: 1
                                    }}>
                                        {card.desc}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        color: '#8B1A3D'
                                    }}>
                                        <span>Open module</span>
                                        <i className="fas fa-chevron-right" style={{ fontSize: '11px' }}></i>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* VERIFICATION TAB */}
            {activeTab === 'student-verification' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E1760', margin: '0 0 4px 0' }}>
                                Student Registration & Verification
                            </h2>
                            <p style={{ margin: 0, fontSize: '13.5px', color: '#6B6787' }}>
                                Verify identity credentials, approve course enrollments, and authorize official student digital ID cards.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleTabChange('overview')}
                            className="soet-btn soet-btn-secondary soet-btn-sm"
                        >
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Overview</span>
                        </button>
                    </div>

                    <Card padding="default">
                        <StudentVerificationList />
                    </Card>
                </div>
            )}
        </DashboardLayout>
    );
}
