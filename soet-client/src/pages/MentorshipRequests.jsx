import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
    pending:  { background: '#fff3cd', color: '#856404' },
    accepted: { background: '#d4edda', color: '#155724' },
    declined: { background: '#f8d7da', color: '#721c24' },
};

export default function MentorshipRequests() {
    const { user, api } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => { fetchRequests(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/alumni/mentorship/${id}`, { status });
            toast.success(`Request ${status}!`);
            fetchRequests();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to update status');
        }
    };

    return (
        <div>
            <h2 style={{ color: '#003366', marginBottom: '20px' }}>
                {user?.role === 'alumni' ? 'Mentorship Requests (Received)' : 'My Mentorship Requests'}
            </h2>

            {loading && <p>Loading...</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {requests.map(req => (
                    <div key={req._id} style={{ background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ flex: '1 1 300px' }}>
                            <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>
                                {user?.role === 'alumni'
                                    ? `From: ${req.student?.name}`
                                    : `To: ${req.alumni?.name}`
                                }
                            </p>
                            <blockquote style={{ margin: '0 0 10px 0', padding: '8px 12px', borderLeft: '4px solid #dee2e6', color: '#555', fontStyle: 'italic' }}>
                                "{req.message}"
                            </blockquote>
                            <span style={{
                                display: 'inline-block', padding: '3px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600',
                                ...(STATUS_STYLES[req.status] || {})
                            }}>
                                {req.status.toUpperCase()}
                            </span>
                        </div>

                        {user?.role === 'alumni' && req.status === 'pending' && (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                                <button onClick={() => updateStatus(req._id, 'accepted')}
                                    style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    ✓ Accept
                                </button>
                                <button onClick={() => updateStatus(req._id, 'declined')}
                                    style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    ✗ Decline
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {!loading && requests.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No mentorship requests found.</p>
                )}
            </div>
        </div>
    );
}
