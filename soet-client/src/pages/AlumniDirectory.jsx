import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AlumniDirectory() {
    const { user, api } = useAuth();
    const [alumni, setAlumni] = useState([]);
    const [filters, setFilters] = useState({ branch: '', passingYear: '', company: '', location: '' });
    const [branches, setBranches] = useState([]);
    const [mentorshipAlumniId, setMentorshipAlumniId] = useState(null);
    const [mentorshipMessage, setMentorshipMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/branches').then(res => setBranches(res.data)).catch(() => {});
        fetchDirectory();
    }, []);

    const fetchDirectory = async () => {
        setLoading(true);
        try {
            const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
            const res = await api.get('/alumni/directory', { params });
            setAlumni(res.data);
        } catch (err) {
            toast.error('Failed to load directory');
        } finally {
            setLoading(false);
        }
    };

    const submitMentorship = async (e) => {
        e.preventDefault();
        try {
            await api.post('/alumni/mentorship', { alumniId: mentorshipAlumniId, message: mentorshipMessage });
            toast.success('Mentorship request sent!');
            setMentorshipAlumniId(null);
            setMentorshipMessage('');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send request');
        }
    };

    return (
        <div>
            <h2 style={{ color: '#003366', marginBottom: '16px' }}>Alumni Directory</h2>

            {/* Filters */}
            <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Branch</label>
                    <select value={filters.branch} onChange={e => setFilters({ ...filters, branch: e.target.value })} style={{ padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <option value="">All Branches</option>
                        {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Passing Year</label>
                    <input type="number" placeholder="e.g. 2022" value={filters.passingYear} onChange={e => setFilters({ ...filters, passingYear: e.target.value })} style={{ padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px', width: '100px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Company</label>
                    <input type="text" placeholder="Search company" value={filters.company} onChange={e => setFilters({ ...filters, company: e.target.value })} style={{ padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Location</label>
                    <input type="text" placeholder="Search city" value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} style={{ padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <button onClick={fetchDirectory} style={{ padding: '6px 16px', background: '#003366', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Search
                </button>
            </div>

            {loading && <p>Loading alumni...</p>}

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                {alumni.map(a => (
                    <div key={a._id} style={{ background: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            {a.photo
                                ? <img src={`${API_URL}${a.photo}`} alt={a.user?.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #003366' }} />
                                : <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#6366f1' }}>
                                    {a.user?.name?.[0]?.toUpperCase() || '?'}
                                </div>
                            }
                            <div>
                                <h3 style={{ margin: 0, fontWeight: '700', color: '#1a202c' }}>{a.user?.name}</h3>
                                <p style={{ margin: '2px 0', fontSize: '0.8rem', color: '#555' }}>{a.role}{a.company ? ` at ${a.company}` : ''}</p>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>{a.branch?.name} · {a.passingYear}</p>
                            </div>
                        </div>
                        {a.location && <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>📍 {a.location}</p>}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {a.linkedin && <a href={a.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#0077b5', textDecoration: 'none' }}>LinkedIn ↗</a>}
                            {user?.role === 'student' && (
                                <button onClick={() => setMentorshipAlumniId(a.user._id)} style={{ fontSize: '0.8rem', padding: '4px 10px', background: '#e0e7ff', color: '#4338ca', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    Request Mentorship
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {!loading && alumni.length === 0 && <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No alumni found matching the filters.</p>}

            {/* Mentorship Modal */}
            {mentorshipAlumniId && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', width: '100%', maxWidth: '480px' }}>
                        <h3 style={{ marginTop: 0, color: '#003366' }}>Request Mentorship</h3>
                        <form onSubmit={submitMentorship}>
                            <textarea
                                required
                                placeholder="Introduce yourself and explain what you'd like to learn from this alumni..."
                                value={mentorshipMessage}
                                onChange={e => setMentorshipMessage(e.target.value)}
                                style={{ width: '100%', height: '120px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', boxSizing: 'border-box' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                                <button type="button" onClick={() => setMentorshipAlumniId(null)} style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '8px 16px', background: '#003366', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
