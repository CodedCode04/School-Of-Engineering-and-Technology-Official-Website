import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../context/AuthContext';
import '../styles/admin-dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ManageAnnouncements() {
    const { user } = useAuth();
    const [announcements, setAnnouncements] = useState([]);
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        body: '',
        category: 'General',
        branch: 'All',
        isImportant: false,
        status: 'published',
        expiresAt: ''
    });
    const [coverImage, setCoverImage] = useState(null);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        fetchAnnouncements();
        fetchBranches();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            // Using all=true to get drafts and expired ones too for admin/hod
            const res = await axios.get(`${API_URL}/api/announcements?all=true`, { withCredentials: true });
            setAnnouncements(res.data.data);
        } catch (error) {
            toast.error('Failed to load announcements');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBranches = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/branches`);
            setBranches(res.data);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            title: '',
            body: '',
            category: user.role === 'tpo' ? 'Placement' : 'General',
            branch: 'All',
            isImportant: false,
            status: 'published',
            expiresAt: ''
        });
        setCoverImage(null);
        setAttachments([]);
        setIsEditing(false);
    };

    const handleEdit = (announcement) => {
        setFormData({
            id: announcement._id,
            title: announcement.title,
            body: announcement.body,
            category: announcement.category,
            branch: announcement.branch,
            isImportant: announcement.isImportant,
            status: announcement.status,
            expiresAt: announcement.expiresAt ? new Date(announcement.expiresAt).toISOString().split('T')[0] : ''
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        try {
            await axios.delete(`${API_URL}/api/announcements/${id}`, { withCredentials: true });
            toast.success('Announcement deleted');
            fetchAnnouncements();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.body) {
            toast.error('Title and content are required');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('body', formData.body);
        data.append('category', formData.category);
        data.append('branch', formData.branch);
        data.append('isImportant', formData.isImportant);
        data.append('status', formData.status);
        if (formData.expiresAt) data.append('expiresAt', formData.expiresAt);
        
        if (coverImage) data.append('coverImage', coverImage);
        for (let i = 0; i < attachments.length; i++) {
            data.append('attachments', attachments[i]);
        }

        try {
            if (isEditing) {
                await axios.put(`${API_URL}/api/announcements/${formData.id}`, data, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Announcement updated');
            } else {
                await axios.post(`${API_URL}/api/announcements`, data, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Announcement created');
            }
            resetForm();
            fetchAnnouncements();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save announcement');
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="admin-dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h2>Manage Announcements</h2>
                </div>

                <div className="dashboard-content" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                    {/* Form Section */}
                    <div className="card">
                        <h3>{isEditing ? 'Edit Announcement' : 'Create New'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                            <div className="form-group">
                                <label>Title *</label>
                                <input 
                                    type="text" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required 
                                    className="form-control"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Content *</label>
                                <ReactQuill 
                                    theme="snow" 
                                    value={formData.body} 
                                    onChange={(val) => setFormData({...formData, body: val})} 
                                    modules={modules}
                                    style={{ background: 'white' }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Category</label>
                                <select 
                                    value={formData.category} 
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="form-control"
                                    disabled={user.role === 'tpo'}
                                >
                                    <option value="General">General</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Exam">Exam</option>
                                    <option value="Event">Event</option>
                                    <option value="News">News</option>
                                    <option value="Placement">Placement</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Target Branch</label>
                                <select 
                                    value={formData.branch} 
                                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                                    className="form-control"
                                >
                                    <option value="All">All Branches</option>
                                    {branches.map(b => (
                                        <option key={b._id} value={b._id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input 
                                    type="checkbox" 
                                    id="isImportant"
                                    checked={formData.isImportant}
                                    onChange={(e) => setFormData({...formData, isImportant: e.target.checked})}
                                />
                                <label htmlFor="isImportant" style={{ margin: 0 }}>Pin as Important</label>
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select 
                                    value={formData.status} 
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="form-control"
                                >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Expires At (Optional)</label>
                                <input 
                                    type="date" 
                                    value={formData.expiresAt}
                                    onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Cover Image</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setCoverImage(e.target.files[0])}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Attachments (Multiple)</label>
                                <input 
                                    type="file" 
                                    multiple
                                    onChange={(e) => setAttachments(e.target.files)}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="submit" className="btn-primary">
                                    {isEditing ? 'Update' : 'Publish'}
                                </button>
                                {isEditing && (
                                    <button type="button" className="btn-secondary" onClick={resetForm}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* List Section */}
                    <div className="card">
                        <h3>Existing Announcements</h3>
                        {isLoading ? <p>Loading...</p> : (
                            <div className="table-responsive" style={{ marginTop: '15px' }}>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Status</th>
                                            <th>Pinned</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {announcements.map(item => (
                                            <tr key={item._id}>
                                                <td>{item.title}</td>
                                                <td>{item.category}</td>
                                                <td>
                                                    <span className={`status-badge ${item.status}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td>{item.isImportant ? 'Yes' : 'No'}</td>
                                                <td className="actions-cell">
                                                    <button onClick={() => handleEdit(item)} className="btn-secondary btn-sm" title="Edit">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button onClick={() => handleDelete(item._id)} className="btn-secondary btn-sm" style={{ backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fca5a5' }} title="Delete">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {announcements.length === 0 && (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center' }}>No announcements found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
