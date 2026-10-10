import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentPortfolio() {
    const { api, user } = useAuth();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState({ profile: {}, academics: [], achievements: [] });
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('profile');

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
        const formData = new FormData(e.target);
        
        try {
            await api.put('/student/portfolio/extras', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Profile updated');
            fetchPortfolio();
        } catch (error) {
            toast.error('Update failed');
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
            toast.error(error.response?.data?.error || 'Failed to add');
        }
    };

    const handleDeleteAcademic = async (id) => {
        if (!window.confirm('Delete this record?')) return;
        try {
            await api.delete(`/student/portfolio/academics/${id}`);
            toast.success('Deleted');
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
            toast.success('Achievement added');
            e.target.reset();
            fetchPortfolio();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to add');
        }
    };

    const handleDeleteAchievement = async (id) => {
        if (!window.confirm('Delete this achievement?')) return;
        try {
            await api.delete(`/student/portfolio/achievements/${id}`);
            toast.success('Deleted');
            fetchPortfolio();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

    const { profile, academics, achievements } = portfolio;

    return (
        <div className="dashboard-content" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Academic & Achievements</h2>
                <button onClick={() => window.history.back()} className="btn-primary">Back to Dashboard</button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button className={`filter-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Extra Profile Data</button>
                <button className={`filter-btn ${activeTab === 'academic' ? 'active' : ''}`} onClick={() => setActiveTab('academic')}>Academic Records</button>
                <button className={`filter-btn ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>Achievements</button>
            </div>

            {activeTab === 'profile' && (
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label>Skills (comma separated)</label>
                            <input type="text" name="skills" defaultValue={(profile.skills || []).join(', ')} style={{ width: '100%', padding: '8px' }} onChange={e => {
                                const el = e.target;
                                el.form.elements['skillsJson'].value = JSON.stringify(el.value.split(',').map(s => s.trim()).filter(s => s));
                            }} />
                            <input type="hidden" name="skills" id="skillsJson" defaultValue={JSON.stringify(profile.skills || [])} />
                        </div>
                        <div>
                            <label>Placement Status</label>
                            <select name="placementStatus" defaultValue={profile.placementStatus || 'Unplaced'} style={{ width: '100%', padding: '8px' }}>
                                <option value="Unplaced">Unplaced</option>
                                <option value="Placed">Placed</option>
                                <option value="Not Interested">Not Interested</option>
                            </select>
                        </div>
                        <div>
                            <label>LinkedIn URL</label>
                            <input type="url" name="linkedin" defaultValue={profile.linkedin || ''} style={{ width: '100%', padding: '8px' }} />
                        </div>
                        <div>
                            <label>GitHub URL</label>
                            <input type="url" name="github" defaultValue={profile.github || ''} style={{ width: '100%', padding: '8px' }} />
                        </div>
                        <div>
                            <label>Resume File (PDF)</label>
                            {profile.resumeFile && <div><a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${profile.resumeFile}`} target="_blank" rel="noreferrer">Current Resume</a></div>}
                            <input type="file" name="resumeFile" accept=".pdf" style={{ width: '100%', padding: '8px' }} />
                        </div>
                        
                        {/* Complex arrays like internships and projects omitted in simple form for brevity, but could be added as dynamic lists. Using a simplified approach here */}
                        <div style={{ marginTop: '10px' }}>
                            <button type="submit" className="btn-primary">Update Profile Extras</button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'academic' && (
                <div>
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                        <h3>Add Academic Record</h3>
                        <form onSubmit={handleAddAcademic} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                            <div><label>Semester</label><input type="number" name="semester" min="1" max="8" required style={{ padding: '8px', width: '100px' }} /></div>
                            <div><label>SGPA</label><input type="number" step="0.01" name="sgpa" max="10" required style={{ padding: '8px', width: '100px' }} /></div>
                            <div><label>CGPA</label><input type="number" step="0.01" name="cgpa" max="10" required style={{ padding: '8px', width: '100px' }} /></div>
                            <div><label>Backlogs</label><input type="number" name="backlogs" defaultValue="0" min="0" required style={{ padding: '8px', width: '100px' }} /></div>
                            <button type="submit" className="btn-primary" style={{ padding: '8px 15px' }}>Add</button>
                        </form>
                    </div>

                    <table className="table" style={{ width: '100%', background: '#fff', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                                <th style={{ padding: '10px' }}>Semester</th>
                                <th style={{ padding: '10px' }}>SGPA</th>
                                <th style={{ padding: '10px' }}>CGPA</th>
                                <th style={{ padding: '10px' }}>Backlogs</th>
                                <th style={{ padding: '10px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {academics.map(rec => (
                                <tr key={rec._id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px' }}>{rec.semester}</td>
                                    <td style={{ padding: '10px' }}>{rec.sgpa}</td>
                                    <td style={{ padding: '10px' }}>{rec.cgpa}</td>
                                    <td style={{ padding: '10px' }}>{rec.backlogs}</td>
                                    <td style={{ padding: '10px' }}>
                                        <button onClick={() => handleDeleteAcademic(rec._id)} style={{ padding: '4px 8px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'achievements' && (
                <div>
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                        <h3>Add Achievement</h3>
                        <form onSubmit={handleAddAchievement} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ flex: 1 }}><label>Title</label><input type="text" name="title" required style={{ width: '100%', padding: '8px' }} /></div>
                                <div style={{ flex: 1 }}>
                                    <label>Category</label>
                                    <select name="category" required style={{ width: '100%', padding: '8px' }}>
                                        <option value="academic">Academic</option>
                                        <option value="sports">Sports</option>
                                        <option value="cultural">Cultural</option>
                                        <option value="technical">Technical</option>
                                        <option value="hackathon">Hackathon</option>
                                        <option value="internship">Internship</option>
                                        <option value="certification">Certification</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}><label>Date</label><input type="date" name="date" required style={{ width: '100%', padding: '8px' }} /></div>
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea name="description" style={{ width: '100%', padding: '8px', minHeight: '60px' }}></textarea>
                            </div>
                            <div>
                                <label>Certificate File (Image/PDF)</label>
                                <input type="file" name="certificateFile" style={{ width: '100%', padding: '8px' }} />
                            </div>
                            <div><button type="submit" className="btn-primary">Add Achievement</button></div>
                        </form>
                    </div>

                    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                        {achievements.map(ach => (
                            <div key={ach._id} style={{ padding: '15px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}>
                                <h4>{ach.title}</h4>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
                                    <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{ach.category}</span> | {new Date(ach.date).toLocaleDateString()}
                                </p>
                                <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>{ach.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {ach.certificateFile && (
                                        <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${ach.certificateFile}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--primary-blue)' }}>View Certificate</a>
                                    )}
                                    <button onClick={() => handleDeleteAchievement(ach._id)} style={{ padding: '4px 8px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
