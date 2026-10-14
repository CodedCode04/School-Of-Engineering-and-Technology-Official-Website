import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/shared/DashboardLayout';
import Card from '../components/shared/Card';
import { getRoleNavItems, getRoleDashboardRoute } from '../utils/dashboardNav';

export default function ManageAnnouncements() {
    const { user, api } = useAuth();
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [filterCategory, setFilterCategory] = useState('All');
    
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        body: '',
        category: user?.role === 'tpo' ? 'Placement' : 'General',
        branch: 'All',
        isImportant: false,
        status: 'published',
        expiresAt: ''
    });
    const [coverImage, setCoverImage] = useState(null);
    const [attachments, setAttachments] = useState([]);

    const role = user?.role || 'admin';
    const navItems = getRoleNavItems(role, 'announcements');
    const dashboardRoute = getRoleDashboardRoute(role);

    useEffect(() => {
        fetchAnnouncements();
        fetchBranches();
    }, []);

    const fetchAnnouncements = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/announcements?all=true');
            const data = res.data?.data || res.data || [];
            setAnnouncements(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Failed to load announcements');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBranches = async () => {
        try {
            const res = await api.get('/branches');
            setBranches(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            title: '',
            body: '',
            category: user?.role === 'tpo' ? 'Placement' : 'General',
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
            category: announcement.category || 'General',
            branch: announcement.branch || 'All',
            isImportant: Boolean(announcement.isImportant),
            status: announcement.status || 'published',
            expiresAt: announcement.expiresAt ? new Date(announcement.expiresAt).toISOString().split('T')[0] : ''
        });
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this announcement?')) return;
        try {
            await api.delete(`/announcements/${id}`);
            toast.success('Announcement deleted');
            fetchAnnouncements();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete announcement');
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
                await api.put(`/announcements/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Announcement updated');
            } else {
                await api.post(`/announcements`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Announcement published');
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
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    const filteredAnnouncements = announcements.filter(item => {
        if (filterCategory === 'All') return true;
        return item.category === filterCategory;
    });

    return (
        <DashboardLayout
            title="Manage Announcements"
            subtitle="Publish, edit, and schedule official circulars & notices"
            navItems={navItems}
            activeKey="announcements"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/chat')}
                        className="soet-btn soet-btn-secondary soet-btn-sm"
                    >
                        <i className="fas fa-comments" style={{ color: '#8B1A3D' }}></i>
                        <span>Chat Rooms</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(dashboardRoute)}
                        className="soet-btn soet-btn-secondary soet-btn-sm"
                    >
                        <i className="fas fa-th-large"></i>
                        <span>Dashboard</span>
                    </button>
                </div>
            }
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(320px, 420px) 1fr',
                gap: '24px',
                alignItems: 'start'
            }}>
                {/* Form Section */}
                <Card style={{ position: 'sticky', top: '80px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1E1760' }}>
                            {isEditing ? 'Edit Announcement' : 'Compose Notice'}
                        </h3>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                style={{
                                    border: 'none',
                                    background: '#F1F0F5',
                                    color: '#666',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                Notice Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Mid-Semester Examination Schedule"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(30, 23, 96, 0.2)',
                                    fontSize: '14px',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E1760', marginBottom: '6px' }}>
                                Content & Body *
                            </label>
                            <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.body}
                                    onChange={(val) => setFormData({ ...formData, body: val })}
                                    modules={modules}
                                    style={{ height: '180px', marginBottom: '45px' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#1E1760', marginBottom: '4px' }}>
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    disabled={user?.role === 'tpo'}
                                    style={{
                                        width: '100%',
                                        padding: '9px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(30, 23, 96, 0.2)',
                                        fontSize: '13px',
                                        outline: 'none',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    <option value="General">General</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Exam">Exam</option>
                                    <option value="Event">Event</option>
                                    <option value="News">News</option>
                                    <option value="Placement">Placement</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#1E1760', marginBottom: '4px' }}>
                                    Target Branch
                                </label>
                                <select
                                    value={formData.branch}
                                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '9px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(30, 23, 96, 0.2)',
                                        fontSize: '13px',
                                        outline: 'none',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    <option value="All">All Branches</option>
                                    {branches.map(b => (
                                        <option key={b._id} value={b._id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                id="isImportant"
                                checked={formData.isImportant}
                                onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                                style={{ width: '16px', height: '16px', accentColor: '#8B1A3D', cursor: 'pointer' }}
                            />
                            <label htmlFor="isImportant" style={{ fontSize: '13px', fontWeight: 600, color: '#1E1760', cursor: 'pointer' }}>
                                Pin as High-Priority Notice 📌
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="soet-btn soet-btn-primary"
                            style={{ width: '100%', marginTop: '6px' }}
                        >
                            <i className={isEditing ? 'fas fa-save' : 'fas fa-paper-plane'}></i>
                            <span>{isEditing ? 'Update Announcement' : 'Publish Notice'}</span>
                        </button>
                    </form>
                </Card>

                {/* List Section */}
                <Card>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                        flexWrap: 'wrap',
                        gap: '12px'
                    }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1E1760' }}>
                                Published Announcements
                            </h3>
                            <span style={{ fontSize: '12px', color: '#6B6787' }}>
                                Showing {filteredAnnouncements.length} records
                            </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: '#6B6787' }}>Filter:</label>
                            <select
                                value={filterCategory}
                                onChange={e => setFilterCategory(e.target.value)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(30,23,96,0.15)',
                                    fontSize: '12px',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <option value="All">All Categories</option>
                                <option value="General">General</option>
                                <option value="Academic">Academic</option>
                                <option value="Exam">Exam</option>
                                <option value="Event">Event</option>
                                <option value="News">News</option>
                                <option value="Placement">Placement</option>
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#6B6787' }}>
                            <i className="fas fa-circle-notch fa-spin" style={{ color: '#8B1A3D', fontSize: '24px', marginBottom: '8px' }}></i>
                            <div>Loading announcements...</div>
                        </div>
                    ) : filteredAnnouncements.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#6B6787', backgroundColor: '#FBFBFE', borderRadius: '12px' }}>
                            <i className="fas fa-bullhorn" style={{ fontSize: '32px', color: '#9CA3AF', marginBottom: '8px' }}></i>
                            <div style={{ fontSize: '14px', fontWeight: 600 }}>No announcements found</div>
                            <div style={{ fontSize: '12px', marginTop: '4px' }}>Compose and publish a notice to broadcast to the institution.</div>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(30,23,96,0.08)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#F8F7FC', borderBottom: '2px solid rgba(30,23,96,0.08)', color: '#1E1760', fontWeight: 700 }}>
                                        <th style={{ padding: '12px 14px' }}>Notice</th>
                                        <th style={{ padding: '12px 14px' }}>Category</th>
                                        <th style={{ padding: '12px 14px' }}>Status</th>
                                        <th style={{ padding: '12px 14px' }}>Pinned</th>
                                        <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAnnouncements.map(item => (
                                        <tr
                                            key={item._id}
                                            style={{
                                                borderBottom: '1px solid rgba(30,23,96,0.06)',
                                                backgroundColor: item.isImportant ? '#FFFDF5' : 'transparent'
                                            }}
                                        >
                                            <td style={{ padding: '12px 14px' }}>
                                                <div style={{ fontWeight: 700, color: '#1E1760', fontSize: '13.5px' }}>
                                                    {item.title}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px 14px' }}>
                                                <span style={{
                                                    backgroundColor: '#EFF6FF',
                                                    color: '#1D4ED8',
                                                    padding: '3px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: 600
                                                }}>
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 14px' }}>
                                                <span style={{
                                                    backgroundColor: item.status === 'published' ? '#ECFDF5' : '#FFFBEB',
                                                    color: item.status === 'published' ? '#047857' : '#B45309',
                                                    padding: '3px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: 600,
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 14px' }}>
                                                {item.isImportant ? (
                                                    <span style={{ color: '#8B1A3D', fontWeight: 700, fontSize: '12px' }}>
                                                        <i className="fas fa-thumbtack"></i> Pinned
                                                    </span>
                                                ) : (
                                                    <span style={{ color: '#aaa', fontSize: '12px' }}>Standard</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                                                <div style={{ display: 'inline-flex', gap: '6px' }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(item)}
                                                        title="Edit"
                                                        style={{
                                                            padding: '5px 10px',
                                                            borderRadius: '6px',
                                                            border: '1px solid rgba(30,23,96,0.15)',
                                                            background: '#ffffff',
                                                            color: '#1E1760',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item._id)}
                                                        title="Delete"
                                                        style={{
                                                            padding: '5px 10px',
                                                            borderRadius: '6px',
                                                            border: '1px solid #FCA5A5',
                                                            background: '#FEE2E2',
                                                            color: '#B91C1C',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
}
