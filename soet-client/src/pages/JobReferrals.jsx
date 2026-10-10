import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function JobReferrals() {
    const { user, api } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
        title: '', company: '', description: '', link: '', expiresAt: '', branch: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const fetchJobs = async () => {
        try {
            const res = await api.get('/alumni/jobs');
            setJobs(res.data);
        } catch (err) {
            toast.error('Failed to load job referrals');
        }
    };

    useEffect(() => {
        fetchJobs();
        api.get('/branches').then(res => setBranches(res.data)).catch(() => {});
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/alumni/jobs', formData);
            toast.success('Job referral posted!');
            setShowForm(false);
            setFormData({ title: '', company: '', description: '', link: '', expiresAt: '', branch: '' });
            fetchJobs();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to post job');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#003366', margin: 0 }}>Job &amp; Internship Referrals</h2>
                {user?.role === 'alumni' && (
                    <button onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px', background: '#003366', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {showForm ? 'Cancel' : '+ Post a Job'}
                    </button>
                )}
            </div>

            {showForm && (
                <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginTop: 0, color: '#003366' }}>Post a New Referral</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Job Title *</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Company *</label>
                                <input required type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Application Link *</label>
                                <input required type="url" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Expires On *</label>
                                <input required type="date" value={formData.expiresAt} onChange={e => setFormData({ ...formData, expiresAt: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Target Branch (optional)</label>
                                <select value={formData.branch} onChange={e => setFormData({ ...formData, branch: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                    <option value="">All Branches</option>
                                    {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Description *</label>
                            <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={4} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <button type="submit" disabled={submitting} style={{ padding: '10px 24px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer' }}>
                                {submitting ? 'Posting...' : 'Post Referral'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {jobs.map(job => (
                    <div key={job._id} style={{ background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #003366' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <h3 style={{ margin: 0, color: '#003366' }}>{job.title} <span style={{ color: '#555', fontWeight: 'normal' }}>at {job.company}</span></h3>
                            <span style={{ fontSize: '0.75rem', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px' }}>Expires: {new Date(job.expiresAt).toLocaleDateString()}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#777', marginBottom: '12px' }}>
                            Posted by: {job.alumni?.name}
                            {job.branch?.name ? ` · For: ${job.branch.name}` : ' · Open to All'}
                        </p>
                        <p style={{ margin: '0 0 16px 0', whiteSpace: 'pre-wrap', color: '#333' }}>{job.description}</p>
                        <a href={job.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '8px 20px', background: '#003366', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem' }}>
                            Apply / View →
                        </a>
                    </div>
                ))}
                {jobs.length === 0 && <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No active job referrals at the moment.</p>}
            </div>
        </div>
    );
}
