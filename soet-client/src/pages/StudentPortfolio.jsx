import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function StudentPortfolio() {
    const { api } = useAuth();
    const [portfolio, setPortfolio] = useState({ profile: {}, academics: [], achievements: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [submitting, setSubmitting] = useState(false);

    const navItems = getRoleNavItems('student', 'portfolio');

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const res = await api.get('/student/portfolio');
            setPortfolio({
                profile: res.data.profile || {},
                academics: res.data.academics || [],
                achievements: res.data.achievements || []
            });
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load portfolio');
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.target);
        
        try {
            await api.put('/student/portfolio/extras', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Profile extras updated successfully');
            fetchPortfolio();
        } catch (error) {
            toast.error('Update failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddAcademic = async (e) => {
        e.preventDefault();
        const body = {
            semester: e.target.semester.value,
            sgpa: e.target.sgpa.value,
            cgpa: e.target.cgpa.value,
            backlogs: e.target.backlogs.value
        };
        try {
            await api.post('/student/portfolio/academics', body);
            toast.success('Academic record added');
            e.target.reset();
            fetchPortfolio();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to add record');
        }
    };

    const handleDeleteAcademic = async (id) => {
        if (!window.confirm('Delete this record?')) return;
        try {
            await api.delete(`/student/portfolio/academics/${id}`);
            toast.success('Academic record removed');
            fetchPortfolio();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleAddAchievement = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            await api.post('/student/portfolio/achievements', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Achievement recorded');
            e.target.reset();
            fetchPortfolio();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to add achievement');
        }
    };

    const handleDeleteAchievement = async (id) => {
        if (!window.confirm('Delete this achievement?')) return;
        try {
            await api.delete(`/student/portfolio/achievements/${id}`);
            toast.success('Achievement deleted');
            fetchPortfolio();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#FFFAF3' }}>
                <div style={{ textAlign: 'center' }}>
                    <i className="fas fa-circle-notch fa-spin fa-2x" style={{ color: '#1E1760', marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: '#1E1760' }}>Loading Academic Portfolio...</p>
                </div>
            </div>
        );
    }

    const { profile, academics, achievements } = portfolio;

    return (
        <DashboardLayout
            title="Academic Portfolio & Achievements"
            subtitle="Record your semester grades, manage verified skill tags, and upload milestone credentials"
            navItems={navItems}
            activeKey="portfolio"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="portfolio-chat-btn"
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
            <div style={{ maxWidth: '950px', margin: '0 auto' }}>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #E8E6FA', paddingBottom: '12px' }}>
                    <button
                        onClick={() => setActiveTab('profile')}
                        style={{
                            padding: '10px 18px',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeTab === 'profile' ? '#1E1760' : 'transparent',
                            color: activeTab === 'profile' ? '#ffffff' : '#6B7280',
                            fontWeight: 700,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fas fa-user-edit" /> Career Profile &amp; Skills
                    </button>
                    <button
                        onClick={() => setActiveTab('academic')}
                        style={{
                            padding: '10px 18px',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeTab === 'academic' ? '#1E1760' : 'transparent',
                            color: activeTab === 'academic' ? '#ffffff' : '#6B7280',
                            fontWeight: 700,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fas fa-graduation-cap" /> Semester SGPA / CGPA ({academics.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('achievements')}
                        style={{
                            padding: '10px 18px',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeTab === 'achievements' ? '#1E1760' : 'transparent',
                            color: activeTab === 'achievements' ? '#ffffff' : '#6B7280',
                            fontWeight: 700,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fas fa-trophy" /> Achievements &amp; Certs ({achievements.length})
                    </button>
                </div>

                {/* TAB 1: PROFILE EXTRAS */}
                {activeTab === 'profile' && (
                    <div
                        style={{
                            background: '#ffffff',
                            borderRadius: '16px',
                            border: '1px solid #E8E6FA',
                            padding: '32px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                    >
                        <div style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '14px', marginBottom: '24px' }}>
                            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#1E1760' }}>
                                Placement &amp; Professional Profile Details
                            </h3>
                            <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                                This information is visible to the Training &amp; Placement Officer (TPO) and Alumni recruiters.
                            </p>
                        </div>

                        <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Technical Skills (comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="skills"
                                    defaultValue={(profile.skills || []).join(', ')}
                                    placeholder="e.g. React, Node.js, Python, Data Structures, Figma"
                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }}
                                    onChange={e => {
                                        const el = e.target;
                                        if (el.form.elements['skillsJson']) {
                                            el.form.elements['skillsJson'].value = JSON.stringify(el.value.split(',').map(s => s.trim()).filter(Boolean));
                                        }
                                    }}
                                />
                                <input type="hidden" name="skills" id="skillsJson" defaultValue={JSON.stringify(profile.skills || [])} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                        Current Placement Intent
                                    </label>
                                    <select
                                        name="placementStatus"
                                        defaultValue={profile.placementStatus || 'Unplaced'}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }}
                                    >
                                        <option value="Unplaced">Actively Looking / Unplaced</option>
                                        <option value="Placed">Placed via Campus Recruitment</option>
                                        <option value="Not Interested">Higher Studies / Not Interested</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                        LinkedIn Profile URL
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        defaultValue={profile.linkedin || ''}
                                        placeholder="https://linkedin.com/in/..."
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                        GitHub Portfolio URL
                                    </label>
                                    <input
                                        type="url"
                                        name="github"
                                        defaultValue={profile.github || ''}
                                        placeholder="https://github.com/..."
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                    Resume Document (PDF)
                                </label>
                                {profile.resumeFile && (
                                    <div style={{ marginBottom: '10px' }}>
                                        <a
                                            href={`${API_URL}${profile.resumeFile}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '6px 12px',
                                                background: '#EEF2FF',
                                                color: '#4F46E5',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <i className="fas fa-file-pdf" /> View Current Uploaded Resume
                                        </a>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="resumeFile"
                                    accept=".pdf"
                                    style={{ width: '100%', padding: '8px 0', fontSize: '13px' }}
                                />
                            </div>

                            <div>
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
                                        gap: '8px'
                                    }}
                                >
                                    <i className="fas fa-save" /> Save Profile Extras
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* TAB 2: ACADEMIC RECORDS */}
                {activeTab === 'academic' && (
                    <div>
                        <div
                            style={{
                                background: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid #E8E6FA',
                                padding: '24px',
                                marginBottom: '24px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                        >
                            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: 800, color: '#1E1760' }}>
                                Add New Semester Grade Report
                            </h3>
                            <form onSubmit={handleAddAcademic} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Semester</label>
                                    <input type="number" name="semester" min="1" max="8" required placeholder="1-8" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>SGPA</label>
                                    <input type="number" step="0.01" name="sgpa" max="10" required placeholder="e.g. 8.25" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Cumulative CGPA</label>
                                    <input type="number" step="0.01" name="cgpa" max="10" required placeholder="e.g. 8.10" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Active Backlogs</label>
                                    <input type="number" name="backlogs" defaultValue="0" min="0" required style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <button type="submit" style={{ width: '100%', padding: '9px 16px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                                        + Save Record
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Academics Table */}
                        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #E8E6FA', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontWeight: 700 }}>
                                        <th style={{ padding: '12px 20px' }}>Semester</th>
                                        <th style={{ padding: '12px 20px' }}>SGPA</th>
                                        <th style={{ padding: '12px 20px' }}>CGPA</th>
                                        <th style={{ padding: '12px 20px' }}>Backlogs</th>
                                        <th style={{ padding: '12px 20px', textAlign: 'right' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {academics.map(rec => (
                                        <tr key={rec._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                            <td style={{ padding: '14px 20px', fontWeight: 700, color: '#1E1760' }}>
                                                Semester {rec.semester}
                                            </td>
                                            <td style={{ padding: '14px 20px', fontWeight: 700, color: '#4F46E5' }}>
                                                {rec.sgpa}
                                            </td>
                                            <td style={{ padding: '14px 20px', fontWeight: 800, color: '#10B981' }}>
                                                {rec.cgpa}
                                            </td>
                                            <td style={{ padding: '14px 20px' }}>
                                                <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, background: rec.backlogs > 0 ? '#FEF2F2' : '#ECFDF5', color: rec.backlogs > 0 ? '#DC2626' : '#047857' }}>
                                                    {rec.backlogs === 0 ? 'Clear (0)' : `${rec.backlogs} Backlog`}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => handleDeleteAcademic(rec._id)}
                                                    style={{ padding: '5px 10px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                                                >
                                                    <i className="fas fa-trash-alt" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {academics.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
                                                No semester performance records entered yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 3: ACHIEVEMENTS */}
                {activeTab === 'achievements' && (
                    <div>
                        <div
                            style={{
                                background: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid #E8E6FA',
                                padding: '24px',
                                marginBottom: '24px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                        >
                            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: 800, color: '#1E1760' }}>
                                Record Co-Curricular Achievement or Certification
                            </h3>
                            <form onSubmit={handleAddAchievement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Achievement Title</label>
                                        <input type="text" name="title" required placeholder="e.g. Smart India Hackathon Finalist" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Category</label>
                                        <select name="category" required style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}>
                                            <option value="hackathon">Hackathon</option>
                                            <option value="technical">Technical Competition</option>
                                            <option value="certification">Professional Certification</option>
                                            <option value="internship">Internship Experience</option>
                                            <option value="academic">Academic Honor</option>
                                            <option value="sports">Sports</option>
                                            <option value="cultural">Cultural</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Achievement Date</label>
                                        <input type="date" name="date" required style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Brief Description</label>
                                    <textarea name="description" placeholder="Explain your contribution or award details..." style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', minHeight: '60px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Certificate Upload (Image or PDF)</label>
                                    <input type="file" name="certificateFile" style={{ width: '100%', padding: '6px 0', fontSize: '13px' }} />
                                </div>
                                <div>
                                    <button type="submit" style={{ padding: '9px 20px', background: '#1E1760', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                                        + Record Achievement
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Achievements Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                            {achievements.map(ach => (
                                <div
                                    key={ach._id}
                                    style={{
                                        background: '#ffffff',
                                        borderRadius: '14px',
                                        border: '1px solid #E8E6FA',
                                        padding: '20px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                            <span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                                                {ach.category}
                                            </span>
                                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                                                {new Date(ach.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#1E1760' }}>
                                            {ach.title}
                                        </h4>
                                        <p style={{ margin: '0 0 14px 0', fontSize: '13px', color: '#4B5563', lineHeight: 1.5 }}>
                                            {ach.description}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
                                        {ach.certificateFile ? (
                                            <a
                                                href={`${API_URL}${ach.certificateFile}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ fontSize: '12px', color: '#4F46E5', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                                            >
                                                <i className="fas fa-certificate" /> View Certificate
                                            </a>
                                        ) : <span />}

                                        <button
                                            onClick={() => handleDeleteAchievement(ach._id)}
                                            style={{ padding: '4px 8px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {achievements.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
                                    No achievements uploaded yet.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
