import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';
import toast from 'react-hot-toast';

export default function SendNotificationPage() {
    const { user, api } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('official');
    const [scope, setScope] = useState('all');
    const [targetRole, setTargetRole] = useState('student');
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [targetUserId, setTargetUserId] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const navItems = getRoleNavItems(user?.role, 'send-notification');

    useEffect(() => {
        if (!['admin', 'hod', 'tpo'].includes(user?.role)) {
            navigate('/');
            return;
        }
        api.get('/branches').then(res => setBranches(res.data)).catch(console.error);
    }, [user, navigate, api]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const target = { scope };
            if (scope === 'role') target.role = targetRole;
            if (scope === 'branch') target.branch = user?.role === 'hod' ? user.branch : selectedBranch;
            if (scope === 'user') target.user = targetUserId;

            await api.post('/notifications', {
                title,
                message,
                type,
                target
            });

            toast.success("Notification dispatched successfully!");
            navigate('/notifications');
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to send notification");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DashboardLayout
            title="Dispatch Portal Notification"
            subtitle="Broadcast official notices, targeted branch circulars, and role announcements"
            navItems={navItems}
            activeKey="send-notification"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="send-notif-chat-btn"
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
                        to="/notifications"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 14px',
                            background: '#F3F4F6',
                            color: '#1E1760',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                            border: '1px solid #E5E7EB'
                        }}
                    >
                        <i className="fas fa-list" />
                        <span>All Notifications</span>
                    </Link>
                </div>
            }
        >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div
                    style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #E8E6FA',
                        padding: '32px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}
                >
                    <div style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '16px', marginBottom: '24px' }}>
                        <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 800, color: '#1E1760' }}>
                            Create Notification Broadcast
                        </h2>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                            Specify your audience target and compose the message contents.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                Broadcast Title <span style={{ color: '#DC2626' }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g. End Semester Exam Timetable Announcement"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                Notification Body / Circular Content <span style={{ color: '#DC2626' }}>*</span>
                            </label>
                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Enter detailed message text for students, faculty, or department..."
                                required
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px',
                                    boxSizing: 'border-box',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Notification Category
                                </label>
                                <select
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="official">Official Circular</option>
                                    <option value="branch">Branch Specific Notice</option>
                                    <option value="personal">Personal Advisory</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Recipient Scope
                                </label>
                                <select
                                    value={scope}
                                    onChange={e => setScope(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="all">Entire Portal (All Users)</option>
                                    <option value="role">Filter by Role (e.g. Students)</option>
                                    <option value="branch">Filter by Department Branch</option>
                                    <option value="user">Specific User ID</option>
                                </select>
                            </div>
                        </div>

                        {scope === 'role' && (
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Select Target Role
                                </label>
                                <select
                                    value={targetRole}
                                    onChange={e => setTargetRole(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="student">Enrolled Students</option>
                                    <option value="teacher">Faculty Members</option>
                                    <option value="alumni">Registered Alumni</option>
                                    <option value="hod">Department Heads</option>
                                </select>
                            </div>
                        )}

                        {scope === 'branch' && user?.role !== 'hod' && (
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Target Branch Department
                                </label>
                                <select
                                    value={selectedBranch}
                                    onChange={e => setSelectedBranch(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="">Select branch...</option>
                                    {branches.map(b => (
                                        <option key={b._id} value={b._id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {scope === 'user' && (
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Recipient User ID
                                </label>
                                <input
                                    type="text"
                                    value={targetUserId}
                                    onChange={e => setTargetUserId(e.target.value)}
                                    placeholder="Enter target MongoDB User ID..."
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    padding: '12px 28px',
                                    background: '#1E1760',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 12px rgba(30, 23, 96, 0.2)'
                                }}
                            >
                                {submitting ? (
                                    <>
                                        <i className="fas fa-circle-notch fa-spin" /> Dispatching...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane" /> Dispatch Notification
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/notifications')}
                                style={{
                                    padding: '12px 20px',
                                    background: '#F3F4F6',
                                    color: '#4B5563',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
