import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const STATUS_BADGE = {
    pending:   { background: '#fff3cd', color: '#856404' },
    published: { background: '#d4edda', color: '#155724' },
    rejected:  { background: '#f8d7da', color: '#721c24' },
};

export default function SuccessStories() {
    const { user, api } = useAuth();
    const [stories, setStories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', body: '' });
    const [submitting, setSubmitting] = useState(false);

    const fetchStories = async () => {
        try {
            const res = await api.get('/alumni/stories');
            setStories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchStories(); }, [user]);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/alumni/stories/${id}/status`, { status });
            toast.success(`Story ${status}!`);
            fetchStories();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/alumni/stories', formData);
            toast.success('Story submitted for admin approval!');
            setShowForm(false);
            setFormData({ title: '', body: '' });
            fetchStories();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Submission failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#003366', margin: 0 }}>Alumni Success Stories</h2>
                {user?.role === 'alumni' && (
                    <button onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px', background: '#003366', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {showForm ? 'Cancel' : '+ Share My Story'}
                    </button>
                )}
            </div>

            {showForm && (
                <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginTop: 0, color: '#003366' }}>Share Your Success Story</h3>
                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '16px' }}>Your story will be reviewed by an admin before publishing.</p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Title *</label>
                            <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Your Story *</label>
                            <textarea required value={formData.body} onChange={e => setFormData({ ...formData, body: e.target.value })} rows={8} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <button type="submit" disabled={submitting} style={{ padding: '10px 24px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer' }}>
                                {submitting ? 'Submitting...' : 'Submit for Review'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {stories.map(story => (
                    <div key={story._id} style={{ background: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #ffc107' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                                <h3 style={{ margin: 0, color: '#1a202c' }}>{story.title}</h3>
                                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#888' }}>
                                    By: {story.alumni?.name} · {new Date(story.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            {user?.role === 'admin' && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', ...(STATUS_BADGE[story.status] || {}) }}>
                                        {story.status.toUpperCase()}
                                    </span>
                                    {story.status === 'pending' && (
                                        <button onClick={() => updateStatus(story._id, 'published')}
                                            style={{ padding: '5px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                                            ✓ Publish
                                        </button>
                                    )}
                                    {story.status === 'published' && (
                                        <button onClick={() => updateStatus(story._id, 'rejected')}
                                            style={{ padding: '5px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                                            Unpublish
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#333' }}>{story.body}</p>
                    </div>
                ))}
                {stories.length === 0 && <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No published success stories yet.</p>}
            </div>
        </div>
    );
}
