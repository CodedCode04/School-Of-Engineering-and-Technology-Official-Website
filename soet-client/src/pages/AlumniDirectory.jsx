import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AlumniDirectory({ isEmbedded = false }) {
    const { user, api } = useAuth();
    const [alumni, setAlumni] = useState([]);
    const [filters, setFilters] = useState({ branch: '', passingYear: '', company: '', location: '' });
    const [branches, setBranches] = useState([]);
    const [mentorshipAlumniId, setMentorshipAlumniId] = useState(null);
    const [mentorshipMessage, setMentorshipMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navItems = getRoleNavItems(user?.role, 'alumni-directory');

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

    const content = (
        <div>
            {/* Filters Bar */}
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid #E8E6FA',
                    padding: '20px 24px',
                    marginBottom: '24px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontWeight: 700, color: '#1E1760', fontSize: '15px' }}>
                    <i className="fas fa-search" style={{ color: '#4F46E5' }} />
                    <span>Search &amp; Filter Alumni Network</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Department</label>
                        <select
                            value={filters.branch}
                            onChange={e => setFilters({ ...filters, branch: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        >
                            <option value="">All Branches</option>
                            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Passing Year</label>
                        <input
                            type="number"
                            placeholder="e.g. 2022"
                            value={filters.passingYear}
                            onChange={e => setFilters({ ...filters, passingYear: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Company</label>
                        <input
                            type="text"
                            placeholder="e.g. Google, TCS, Infosys"
                            value={filters.company}
                            onChange={e => setFilters({ ...filters, company: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Location / City</label>
                        <input
                            type="text"
                            placeholder="e.g. Bangalore, Indore, Pune"
                            value={filters.location}
                            onChange={e => setFilters({ ...filters, location: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={fetchDirectory}
                            style={{
                                width: '100%',
                                padding: '9px 16px',
                                background: '#1E1760',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: 700,
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                            }}
                        >
                            <i className="fas fa-search" /> Filter Alumni
                        </button>
                    </div>
                </div>
            </div>

            {loading && (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <i className="fas fa-circle-notch fa-spin fa-2x" style={{ color: '#1E1760', marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: '#1E1760' }}>Loading Alumni Network...</p>
                </div>
            )}

            {/* Alumni Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {alumni.map(a => (
                    <div
                        key={a._id}
                        style={{
                            background: '#ffffff',
                            borderRadius: '14px',
                            border: '1px solid #E8E6FA',
                            padding: '20px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                                {a.photo ? (
                                    <img
                                        src={`${API_URL}${a.photo}`}
                                        alt={a.user?.name}
                                        style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E5E7EB' }}
                                    />
                                ) : (
                                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800 }}>
                                        {(a.user?.name || 'A').charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 800, color: '#1E1760' }}>
                                        {a.user?.name || 'Graduate'}
                                    </h3>
                                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>
                                        {a.role}{a.company ? ` @ ${a.company}` : ''}
                                    </p>
                                    <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#9CA3AF' }}>
                                        {a.branch?.name} • Class of {a.passingYear}
                                    </p>
                                </div>
                            </div>

                            {a.location && (
                                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className="fas fa-map-marker-alt" style={{ color: '#EF4444' }} /> {a.location}
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
                            {a.linkedin ? (
                                <a
                                    href={a.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        fontSize: '12px',
                                        color: '#0A66C2',
                                        textDecoration: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    <i className="fab fa-linkedin" /> Profile
                                </a>
                            ) : <span />}

                            {user?.role === 'student' && (
                                <button
                                    onClick={() => setMentorshipAlumniId(a.user?._id || a.user)}
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        padding: '6px 12px',
                                        background: '#EEF2FF',
                                        color: '#4F46E5',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    <i className="fas fa-hands-helping" /> Request Mentorship
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {!loading && alumni.length === 0 && (
                <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', padding: '48px', textAlign: 'center', color: '#9CA3AF', marginTop: '20px' }}>
                    <i className="fas fa-user-friends fa-3x" style={{ color: '#D1D5DB', marginBottom: '12px', display: 'block' }} />
                    <h3 style={{ margin: '0 0 6px 0', color: '#1E1760', fontSize: '16px', fontWeight: 700 }}>No Alumni Found</h3>
                    <p style={{ margin: 0, fontSize: '13px' }}>Try broadening your search or choosing a different branch filter.</p>
                </div>
            )}

            {/* Mentorship Modal */}
            {mentorshipAlumniId && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(20, 16, 58, 0.65)',
                        backdropFilter: 'blur(3px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }}
                >
                    <div
                        style={{
                            background: '#ffffff',
                            borderRadius: '16px',
                            padding: '28px',
                            width: '100%',
                            maxWidth: '500px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ margin: 0, color: '#1E1760', fontSize: '18px', fontWeight: 800 }}>
                                Request 1-on-1 Mentorship
                            </h3>
                            <button
                                onClick={() => setMentorshipAlumniId(null)}
                                style={{ background: 'none', border: 'none', fontSize: '20px', color: '#9CA3AF', cursor: 'pointer' }}
                            >
                                &times;
                            </button>
                        </div>
                        <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                            Introduce yourself, mention your semester and branch, and explain what career guidance or advice you would like to receive.
                        </p>
                        <form onSubmit={submitMentorship}>
                            <textarea
                                required
                                placeholder="Hi, I am currently studying in Semester 4 CSE at SoET. I would love some guidance on..."
                                value={mentorshipMessage}
                                onChange={e => setMentorshipMessage(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '130px',
                                    padding: '12px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    resize: 'vertical',
                                    boxSizing: 'border-box',
                                    fontSize: '13px'
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                                <button
                                    type="button"
                                    onClick={() => setMentorshipAlumniId(null)}
                                    style={{ padding: '8px 16px', background: '#F3F4F6', color: '#4B5563', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ padding: '8px 18px', background: '#1E1760', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                                >
                                    Send Mentorship Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    if (isEmbedded) {
        return content;
    }

    return (
        <DashboardLayout
            title="Alumni Directory"
            subtitle="Connect with graduates, network across industry domains, and seek mentorship"
            navItems={navItems}
            activeKey="alumni-directory"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="alumni-dir-chat-btn"
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
