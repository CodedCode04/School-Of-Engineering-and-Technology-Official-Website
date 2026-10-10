import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AlumniProfileCompletion = ({ onComplete }) => {
    const { user, api } = useAuth();
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        enrollmentNo: '',
        branch: '',
        passingYear: new Date().getFullYear(),
        company: '',
        role: '',
        location: '',
        email: user?.email || '',
        phone: '',
        linkedin: ''
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        api.get('/branches').then(res => setBranches(res.data)).catch(() => {});

        api.get('/alumni/profile').then(res => {
            if (res.data) {
                setFormData({
                    enrollmentNo: res.data.enrollmentNo || '',
                    branch: res.data.branch?._id || res.data.branch || '',
                    passingYear: res.data.passingYear || new Date().getFullYear(),
                    company: res.data.company || '',
                    role: res.data.role || '',
                    location: res.data.location || '',
                    email: res.data.email || user?.email || '',
                    phone: res.data.phone || '',
                    linkedin: res.data.linkedin || ''
                });
                if (res.data.photo) setPhotoPreview(res.data.photo);
            }
        }).catch(() => {});
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { toast.error('File too large (max 5MB)'); return; }
        if (!file.type.match(/image\/(jpeg|png|gif)/)) { toast.error('Only JPG, PNG, GIF allowed'); return; }
        setPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (photo) data.append('photo', photo);

            await api.post('/alumni/profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Profile submitted for approval!');
            if (onComplete) onComplete();
            else navigate('/alumni');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Submission failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#003366', marginBottom: '8px', textAlign: 'center' }}>Complete Your Alumni Profile</h2>
                <p style={{ color: '#666', textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem' }}>
                    Please provide your details so we can verify your alumni status.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {[
                            { label: 'Enrollment No *', name: 'enrollmentNo', type: 'text', required: true },
                            { label: 'Passing Year *', name: 'passingYear', type: 'number', required: true },
                            { label: 'Phone *', name: 'phone', type: 'text', required: true },
                            { label: 'Email', name: 'email', type: 'email' },
                            { label: 'Current Company', name: 'company', type: 'text' },
                            { label: 'Job Role / Title', name: 'role', type: 'text' },
                            { label: 'Location / City', name: 'location', type: 'text' },
                            { label: 'LinkedIn URL', name: 'linkedin', type: 'url' },
                        ].map(field => (
                            <div key={field.name}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#444', marginBottom: '4px' }}>
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    required={field.required}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                                />
                            </div>
                        ))}

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#444', marginBottom: '4px' }}>
                                Branch *
                            </label>
                            <select
                                name="branch"
                                required
                                value={formData.branch}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                                <option value="">Select Branch</option>
                                {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                            </select>
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#444', marginBottom: '4px' }}>
                                Profile Photo (JPG/PNG/GIF, max 5MB)
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {photoPreview && (
                                    <img src={photoPreview.startsWith('blob:') ? photoPreview : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${photoPreview}`}
                                        alt="Preview"
                                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #003366' }}
                                    />
                                )}
                                <input type="file" accept="image/jpeg,image/png,image/gif" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            marginTop: '24px', width: '100%', padding: '12px',
                            background: submitting ? '#888' : '#003366', color: '#fff',
                            border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {submitting ? 'Submitting...' : 'Save Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AlumniProfileCompletion;
