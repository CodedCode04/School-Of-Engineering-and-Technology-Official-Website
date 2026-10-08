import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('notices');
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Notice',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const token = window.adminJwtToken;

    useEffect(() => {
        document.title = "Admin Dashboard - SoET";
        if (!token) {
            navigate('/admin-login');
        } else {
            fetchRecords(activeTab);
        }
    }, [navigate, token, activeTab]);

    const fetchRecords = async (type) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${apiUrl}/api/${type}`);
            setRecords(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        window.adminJwtToken = null;
        navigate('/');
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Starting upload...' });
        setIsLoading(true);

        try {
            let fileUrl = '';
            
            // 1. If file selected, get presigned URL and upload to R2
            if (file) {
                const presignRes = await axios.post(`${apiUrl}/api/admin/uploads/presign`, {
                    fileName: file.name,
                    contentType: file.type,
                    fileSize: file.size,
                    folder: activeTab
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { uploadUrl, key } = presignRes.data;
                
                setStatus({ type: 'info', message: 'Uploading file to storage...' });
                
                await axios.put(uploadUrl, file, {
                    headers: {
                        'Content-Type': file.type
                    }
                });
                
                fileUrl = `https://assets.soet.ac.in/${key}`;
            }

            // 2. Post metadata to backend
            setStatus({ type: 'info', message: 'Saving record...' });
            const payload = {
                title: formData.title,
                content: formData.description,
                category: formData.category,
                date: formData.date,
                link: fileUrl
            };
            
            // Wait, Syllabus schema might be different. 
            // In Stage 2, Notice: title, content, category, date, link.
            // Syllabus: department, semester, title, link, year.
            // For simplicity, let's just make it a Notice.
            
            await axios.post(`${apiUrl}/api/admin/${activeTab}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setStatus({ type: 'success', message: 'Record created successfully!' });
            setFormData({ title: '', category: 'Notice', description: '', date: new Date().toISOString().split('T')[0] });
            setFile(null);
            fetchRecords(activeTab);
            
            setTimeout(() => setStatus({ type: '', message: '' }), 3000);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.error || 'Operation failed.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            await axios.delete(`${apiUrl}/api/admin/${activeTab}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchRecords(activeTab);
        } catch (error) {
            alert('Failed to delete record.');
        }
    };

    if (!token) return null;

    return (
        <div style={{ padding: '100px 0', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
            <div className="container">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1><i className="fas fa-user-shield"></i> Admin Dashboard</h1>
                    <button onClick={handleLogout} className="btn-logout" style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </header>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => setActiveTab('notices')} className={`btn-primary ${activeTab === 'notices' ? '' : 'btn-secondary'}`} style={{ opacity: activeTab === 'notices' ? 1 : 0.7 }}>Manage Notices</button>
                    <button onClick={() => setActiveTab('syllabus')} className={`btn-primary ${activeTab === 'syllabus' ? '' : 'btn-secondary'}`} style={{ opacity: activeTab === 'syllabus' ? 1 : 0.7 }}>Manage Syllabus</button>
                </div>

                <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                    <h2>Create New {activeTab === 'notices' ? 'Notice' : 'Syllabus'}</h2>
                    {status.message && (
                        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: status.type === 'error' ? '#f8d7da' : '#d4edda', color: status.type === 'error' ? '#721c24' : '#155724' }}>
                            {status.message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }} />
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description (optional)</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Attachment File *</label>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} required style={{ width: '100%' }} />
                            <small style={{ color: '#666' }}>File will be uploaded directly to Cloudflare R2 object storage.</small>
                        </div>

                        <button type="submit" disabled={isLoading} className="btn-primary" style={{ alignSelf: 'flex-start', opacity: isLoading ? 0.7 : 1 }}>
                            {isLoading ? 'Processing...' : 'Upload & Save'}
                        </button>
                    </form>
                </div>

                <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    <h2>Existing Records</h2>
                    {records.length === 0 ? <p>No records found.</p> : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                                    <th style={{ padding: '0.5rem' }}>Title</th>
                                    <th style={{ padding: '0.5rem' }}>Date</th>
                                    <th style={{ padding: '0.5rem' }}>Link</th>
                                    <th style={{ padding: '0.5rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map(record => (
                                    <tr key={record._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '0.5rem' }}>{record.title}</td>
                                        <td style={{ padding: '0.5rem' }}>{new Date(record.createdAt || record.date).toLocaleDateString()}</td>
                                        <td style={{ padding: '0.5rem' }}>
                                            {record.link && <a href={record.link} target="_blank" rel="noreferrer">View File</a>}
                                        </td>
                                        <td style={{ padding: '0.5rem' }}>
                                            <button onClick={() => handleDelete(record._id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
