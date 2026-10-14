import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

export default function JobReferrals({ isEmbedded = false }) {
    const { user, api } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
        title: '', company: '', description: '', link: '', expiresAt: '', branch: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const navItems = getRoleNavItems(user?.role, 'job-referrals');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await api.get('/alumni/jobs');
            setJobs(res.data);
        } catch (err) {
            toast.error('Failed to load job referrals');
        } finally {
            setLoading(false);
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
            toast.success('Job referral published successfully!');
            setShowForm(false);
            setFormData({ title: '', company: '', description: '', link: '', expiresAt: '', branch: '' });
            fetchJobs();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to post job');
        } finally {
            setSubmitting(false);
        }
    };

    const content = (
        <div>
            {/* Header Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h2 style={{ color: '#1E1760', margin: '0 0 4px 0', fontSize: '20px', fontWeight: 800 }}>
                        Active Job &amp; Internship Openings
                    </h2>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>
                        Curated referral opportunities posted directly by SoET Alumni and Placement Cell
                    </span>
                </div>
                {['alumni', 'tpo', 'admin'].includes(user?.role) && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            padding: '9px 18px',
                            background: showForm ? '#EF4444' : '#1E1760',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            boxShadow: '0 2px 6px rgba(30, 23, 96, 0.2)'
                        }}
                    >
                        <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'}`} />
                        {showForm ? 'Cancel Form' : 'Post New Referral'}
                    </button>
                )}
            </div>

            {/* Post Job Form */}
            {showForm && (
                <div
                    style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #C7D2FE',
                        padding: '28px',
                        marginBottom: '28px',
                        boxShadow: '0 6px 16px rgba(79, 70, 229, 0.08)'
                    }}
                >
                    <div style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '14px', marginBottom: '20px' }}>
                        <h3 style={{ margin: '0 0 4px 0', color: '#1E1760', fontSize: '18px', fontWeight: 800 }}>
                            Publish a New Career Referral
                        </h3>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                            Help juniors and peers find jobs, internships, or off-campus referral openings.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Job / Internship Title <span style={{ color: '#DC2626' }}>*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Software Development Engineer - I"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Hiring Company <span style={{ color: '#DC2626' }}>*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Microsoft, Oracle, Razorpay"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Application / Referral URL <span style={{ color: '#DC2626' }}>*</span>
                                </label>
                                <input
                                    required
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.link}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Application Deadline <span style={{ color: '#DC2626' }}>*</span>
                                </label>
                                <input
                                    required
                                    type="date"
                                    value={formData.expiresAt}
                                    onChange={e => setFormData({ ...formData, expiresAt: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Eligible Branch Department
                                </label>
                                <select
                                    value={formData.branch}
                                    onChange={e => setFormData({ ...formData, branch: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }}
                                >
                                    <option value="">Open to All Engineering Branches</option>
                                    {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                Job Description &amp; Candidate Requirements <span style={{ color: '#DC2626' }}>*</span>
                            </label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Details about responsibilities, eligibility criteria, required skills..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                style={{ padding: '9px 18px', background: '#F3F4F6', color: '#4B5563', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                style={{ padding: '9px 24px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '13px', cursor: submitting ? 'not-allowed' : 'pointer' }}
                            >
                                {submitting ? 'Publishing...' : 'Publish Referral'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading && (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <i className="fas fa-circle-notch fa-spin fa-2x" style={{ color: '#1E1760', marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: '#1E1760' }}>Loading Job Openings...</p>
                </div>
            )}

            {/* Jobs List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {jobs.map(job => (
                    <div
                        key={job._id}
                        style={{
                            background: '#ffffff',
                            borderRadius: '14px',
                            border: '1px solid #E8E6FA',
                            padding: '24px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                            borderLeft: '5px solid #1E1760',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                                        {job.company}
                                    </span>
                                    {job.branch?.name && (
                                        <span style={{ background: '#ECFDF5', color: '#047857', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                                            {job.branch.name}
                                        </span>
                                    )}
                                </div>
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1E1760' }}>
                                    {job.title}
                                </h3>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#DC2626', background: '#FEF2F2', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                                    <i className="fas fa-clock" /> Closes: {new Date(job.expiresAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#4B5563', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                            {job.description}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #F3F4F6' }}>
                            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                                Posted by: <strong style={{ color: '#1E1760' }}>{job.alumni?.name || 'Portal Member'}</strong>
                            </span>

                            <a
                                href={job.link}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 18px',
                                    background: '#1E1760',
                                    color: '#ffffff',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    boxShadow: '0 2px 4px rgba(30, 23, 96, 0.2)'
                                }}
                            >
                                Apply Now <i className="fas fa-external-link-alt" style={{ fontSize: '11px' }} />
                            </a>
                        </div>
                    </div>
                ))}

                {!loading && jobs.length === 0 && (
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
                        <i className="fas fa-briefcase fa-3x" style={{ color: '#D1D5DB', marginBottom: '12px', display: 'block' }} />
                        <h3 style={{ margin: '0 0 6px 0', color: '#1E1760', fontSize: '16px', fontWeight: 700 }}>No Active Referrals</h3>
                        <p style={{ margin: 0, fontSize: '13px' }}>Check back soon or post a new referral opportunity if you are an alumnus.</p>
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
            title="Job & Internship Referrals"
            subtitle="Campus and industry openings posted by alumni and training & placement cell"
            navItems={navItems}
            activeKey="job-referrals"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="jobs-chat-btn"
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
