import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

const STATUS_STYLES = {
    pending:  { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', label: 'Pending Response' },
    accepted: { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', label: 'Accepted' },
    declined: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', label: 'Declined' },
};

export default function MentorshipRequests({ isEmbedded = false }) {
    const { user, api } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const navItems = getRoleNavItems(user?.role, 'mentorship');

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await api.get('/alumni/mentorship');
            setRequests(res.data);
        } catch (err) {
            toast.error('Failed to load mentorship requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/alumni/mentorship/${id}`, { status });
            toast.success(`Request marked as ${status}!`);
            fetchRequests();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to update status');
        }
    };

    const content = (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{ color: '#1E1760', margin: '0 0 4px 0', fontSize: '20px', fontWeight: 800 }}>
                    {user?.role === 'alumni' ? 'Incoming Mentorship Requests' : 'My Mentorship Requests'}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                    {user?.role === 'alumni'
                        ? 'Students seeking your industry guidance, career advice, and interview preparation'
                        : 'Track responses to your mentorship inquiries sent to alumni graduates'
                    }
                </p>
            </div>

            {loading && (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <i className="fas fa-circle-notch fa-spin fa-2x" style={{ color: '#1E1760', marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: '#1E1760' }}>Loading Mentorship Requests...</p>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {requests.map(req => {
                    const statusConfig = STATUS_STYLES[req.status] || STATUS_STYLES.pending;
                    return (
                        <div
                            key={req._id}
                            style={{
                                background: '#ffffff',
                                borderRadius: '14px',
                                border: '1px solid #E8E6FA',
                                padding: '20px 24px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '16px'
                            }}
                        >
                            <div style={{ flex: '1 1 320px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>
                                        <i className="fas fa-user" />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1E1760' }}>
                                            {user?.role === 'alumni' ? req.student?.name : req.alumni?.name}
                                        </h4>
                                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                                            {user?.role === 'alumni' ? `Student (${req.student?.email || 'N/A'})` : `Alumni (${req.alumni?.email || 'N/A'})`}
                                        </span>
                                    </div>
                                </div>

                                <blockquote
                                    style={{
                                        margin: '0 0 12px 0',
                                        padding: '10px 14px',
                                        background: '#F9FAFB',
                                        borderLeft: '4px solid #1E1760',
                                        borderRadius: '0 8px 8px 0',
                                        color: '#4B5563',
                                        fontSize: '13px',
                                        lineHeight: 1.5,
                                        fontStyle: 'italic'
                                    }}
                                >
                                    "{req.message}"
                                </blockquote>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span
                                        style={{
                                            padding: '3px 10px',
                                            borderRadius: '12px',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            background: statusConfig.bg,
                                            color: statusConfig.color,
                                            border: `1px solid ${statusConfig.border}`,
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {statusConfig.label}
                                    </span>
                                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                                        <i className="fas fa-clock" /> {new Date(req.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {user?.role === 'alumni' && req.status === 'pending' && (
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                                    <button
                                        onClick={() => updateStatus(req._id, 'accepted')}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#10B981',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontWeight: 700,
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        <i className="fas fa-check" /> Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus(req._id, 'declined')}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#EF4444',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontWeight: 700,
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        <i className="fas fa-times" /> Decline
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}

                {!loading && requests.length === 0 && (
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
                        <i className="fas fa-hands-helping fa-3x" style={{ color: '#D1D5DB', marginBottom: '12px', display: 'block' }} />
                        <h3 style={{ margin: '0 0 6px 0', color: '#1E1760', fontSize: '16px', fontWeight: 700 }}>No Mentorship Requests</h3>
                        <p style={{ margin: 0, fontSize: '13px' }}>
                            {user?.role === 'alumni' ? 'You have no pending requests from students.' : 'Browse the Alumni Directory to request mentorship.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

    if (isEmbedded) {
        return content;
    }

    return (
        <DashboardLayout
            title="Mentorship Requests"
            subtitle="Connect 1-on-1 for career planning, industry insights, and academic guidance"
            navItems={navItems}
            activeKey="mentorship"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="mentorship-chat-btn"
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
            {content}
        </DashboardLayout>
    );
}
