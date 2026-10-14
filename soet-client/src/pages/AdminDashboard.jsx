import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';
import StudentVerificationList from '../components/StudentVerificationList';
import SuccessStories from './SuccessStories';

export default function AdminDashboard() {
    const { user, api } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentTabParam = searchParams.get('tab') || 'users';
    const [activeTab, setActiveTab] = useState(currentTabParam);
    const [userRoleTab, setUserRoleTab] = useState('hod');
    const [usersList, setUsersList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingUsers, setLoadingUsers] = useState(false);

    // Sync tab when search params change
    useEffect(() => {
        const tab = searchParams.get('tab') || 'users';
        setActiveTab(tab);
    }, [searchParams]);

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers(userRoleTab);
        }
    }, [activeTab, userRoleTab]);

    const fetchUsers = async (role) => {
        setLoadingUsers(true);
        try {
            const res = await api.get(`/admin/users?role=${role}`);
            setUsersList(res.data);
        } catch {
            toast.error('Failed to fetch users');
        } finally {
            setLoadingUsers(false);
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

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        setSearchParams(tabKey === 'users' ? {} : { tab: tabKey });
    };

    const navItems = getRoleNavItems('admin', activeTab);

    const filteredUsers = usersList.filter(u => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            (u.name && u.name.toLowerCase().includes(q)) ||
            (u.email && u.email.toLowerCase().includes(q)) ||
            (u.branch?.name && u.branch.name.toLowerCase().includes(q))
        );
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved':
                return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', icon: 'fa-check-circle' };
            case 'pending':
                return { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', icon: 'fa-clock' };
            case 'blocked':
                return { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', icon: 'fa-ban' };
            default:
                return { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB', icon: 'fa-info-circle' };
        }
    };

    return (
        <DashboardLayout
            title="Administrator Console"
            subtitle="User approvals, system governance, student records, and chat moderation"
            navItems={navItems}
            activeKey={activeTab}
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <Link
                        to="/chat"
                        id="admin-chat-btn"
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

                    <Link
                        to="/admin/chat-moderation"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 14px',
                            background: '#F59E0B',
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                            boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)'
                        }}
                    >
                        <i className="fas fa-shield-alt" />
                        <span>Chat Moderation</span>
                    </Link>

                    <Link
                        to="/notifications/send"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 14px',
                            background: '#1E1760',
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none'
                        }}
                    >
                        <i className="fas fa-paper-plane" />
                        <span>Send Alert</span>
                    </Link>
                </div>
            }
        >
            {/* Top Navigation Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #E8E6FA', paddingBottom: '12px' }}>
                <button
                    onClick={() => handleTabChange('users')}
                    style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeTab === 'users' ? '#1E1760' : 'transparent',
                        color: activeTab === 'users' ? '#ffffff' : '#6B7280',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.15s ease'
                    }}
                >
                    <i className="fas fa-users-cog" /> User Approvals
                </button>
                <button
                    onClick={() => handleTabChange('student-verification')}
                    style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeTab === 'student-verification' ? '#1E1760' : 'transparent',
                        color: activeTab === 'student-verification' ? '#ffffff' : '#6B7280',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.15s ease'
                    }}
                >
                    <i className="fas fa-user-check" /> Student Verifications
                </button>
                <button
                    onClick={() => handleTabChange('success-stories')}
                    style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: 'none',
                        background: activeTab === 'success-stories' ? '#1E1760' : 'transparent',
                        color: activeTab === 'success-stories' ? '#ffffff' : '#6B7280',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.15s ease'
                    }}
                >
                    <i className="fas fa-star" /> Success Stories
                </button>
            </div>

            {/* TAB 1: USER APPROVALS */}
            {activeTab === 'users' && (
                <div>
                    {/* Role selector & Search Bar */}
                    <div
                        style={{
                            background: '#ffffff',
                            borderRadius: '14px',
                            padding: '18px 24px',
                            border: '1px solid #E8E6FA',
                            marginBottom: '20px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {[
                                { role: 'hod', label: 'Department HODs', icon: 'fa-user-tie' },
                                { role: 'teacher', label: 'Faculty Members', icon: 'fa-chalkboard-teacher' },
                                { role: 'alumni', label: 'Alumni', icon: 'fa-user-graduate' },
                                { role: 'student', label: 'Students', icon: 'fa-user' },
                                { role: 'tpo', label: 'TPO Officers', icon: 'fa-briefcase' }
                            ].map(item => (
                                <button
                                    key={item.role}
                                    onClick={() => setUserRoleTab(item.role)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: '1px solid',
                                        borderColor: userRoleTab === item.role ? '#1E1760' : '#E5E7EB',
                                        background: userRoleTab === item.role ? '#1E1760' : '#F9FAFB',
                                        color: userRoleTab === item.role ? '#ffffff' : '#4B5563',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    <i className={`fas ${item.icon}`} />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>

                        <div style={{ position: 'relative', minWidth: '260px' }}>
                            <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: '13px' }} />
                            <input
                                type="text"
                                placeholder={`Search ${userRoleTab} by name or email...`}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px 8px 34px',
                                    borderRadius: '8px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '13px',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    {/* Users Table */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E1760' }}>
                                Showing {filteredUsers.length} {userRoleTab.toUpperCase()} records
                            </span>
                            {loadingUsers && (
                                <span style={{ fontSize: '12px', color: '#6B7280' }}>
                                    <i className="fas fa-circle-notch fa-spin" /> Updating...
                                </span>
                            )}
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontWeight: 700 }}>
                                        <th style={{ padding: '12px 20px' }}>Name &amp; Identity</th>
                                        <th style={{ padding: '12px 20px' }}>Email Address</th>
                                        <th style={{ padding: '12px 20px' }}>Department</th>
                                        <th style={{ padding: '12px 20px' }}>Current Status</th>
                                        <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(u => {
                                        const s = getStatusStyle(u.status);
                                        return (
                                            <tr key={u._id} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background 0.1s ease' }}>
                                                <td style={{ padding: '14px 20px' }}>
                                                    <div style={{ fontWeight: 700, color: '#1E1760', fontSize: '14px' }}>{u.name}</div>
                                                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>ID: {u._id}</div>
                                                </td>
                                                <td style={{ padding: '14px 20px', color: '#4B5563' }}>
                                                    {u.email}
                                                </td>
                                                <td style={{ padding: '14px 20px', color: '#4B5563' }}>
                                                    <span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                                                        {u.branch?.name || (typeof u.branch === 'string' ? u.branch : 'General')}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '14px 20px' }}>
                                                    <span
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            padding: '4px 10px',
                                                            borderRadius: '12px',
                                                            fontSize: '11px',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.04em',
                                                            background: s.bg,
                                                            color: s.color,
                                                            border: `1px solid ${s.border}`
                                                        }}
                                                    >
                                                        <i className={`fas ${s.icon}`} />
                                                        {u.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                                                        {u.status !== 'approved' && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(u._id, 'approved')}
                                                                style={{
                                                                    padding: '6px 12px',
                                                                    background: '#10B981',
                                                                    color: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '12px',
                                                                    fontWeight: 600,
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}
                                                            >
                                                                <i className="fas fa-check" /> Approve
                                                            </button>
                                                        )}
                                                        {u.status !== 'rejected' && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(u._id, 'rejected')}
                                                                style={{
                                                                    padding: '6px 12px',
                                                                    background: '#EF4444',
                                                                    color: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '12px',
                                                                    fontWeight: 600,
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}
                                                            >
                                                                <i className="fas fa-times" /> Reject
                                                            </button>
                                                        )}
                                                        {u.status !== 'blocked' ? (
                                                            <button
                                                                onClick={() => handleStatusUpdate(u._id, 'blocked')}
                                                                style={{
                                                                    padding: '6px 12px',
                                                                    background: '#374151',
                                                                    color: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '12px',
                                                                    fontWeight: 600,
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}
                                                            >
                                                                <i className="fas fa-ban" /> Block
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleStatusUpdate(u._id, 'approved')}
                                                                style={{
                                                                    padding: '6px 12px',
                                                                    background: '#3B82F6',
                                                                    color: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '12px',
                                                                    fontWeight: 600,
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}
                                                            >
                                                                <i className="fas fa-unlock" /> Unblock
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
                                                <i className="fas fa-inbox fa-2x" style={{ marginBottom: '8px', display: 'block', color: '#D1D5DB' }} />
                                                No users found matching current filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: STUDENT PROFILE VERIFICATION */}
            {activeTab === 'student-verification' && (
                <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <StudentVerificationList />
                </div>
            )}

            {/* TAB 3: SUCCESS STORIES MODERATION */}
            {activeTab === 'success-stories' && (
                <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 800, color: '#1E1760' }}>
                            Alumni Success Stories Moderation
                        </h3>
                        <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>
                            Review, verify, and publish inspiring alumni achievements and career milestones across the portal.
                        </p>
                    </div>
                    <SuccessStories />
                </div>
            )}
        </DashboardLayout>
    );
}
