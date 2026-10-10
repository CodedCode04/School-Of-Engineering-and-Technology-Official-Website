import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProfileCompletion() {
    const { api, logout } = useAuth();
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [isResubmit, setIsResubmit] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    
    const [formData, setFormData] = useState({
        enrollmentNo: '',
        name: '',
        fatherName: '',
        course: '',
        department: '',
        sessionBatch: '',
        phone: '',
        validUntil: '',
        email: '',
        currentYear: '',
        semester: '',
        branch: ''
    });
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        // Fetch branches
        api.get('/branches').then(res => setBranches(res.data)).catch(console.error);
        
        // Check if profile exists (for resubmission)
        api.get('/student/profile').then(res => {
            if (res.data) {
                if (res.data.verificationStatus === 'rejected') {
                    setIsResubmit(true);
                    setRejectionReason(res.data.rejectionReason);
                    // Pre-fill
                    const { _id, user, photo, verificationStatus, rejectionReason, verifiedBy, verifiedAt, createdAt, updatedAt, __v, ...rest } = res.data;
                    
                    // Format date for input
                    if (rest.validUntil) {
                        rest.validUntil = new Date(rest.validUntil).toISOString().split('T')[0];
                    }
                    
                    if (rest.branch && rest.branch._id) {
                        rest.branch = rest.branch._id;
                    }
                    
                    setFormData(rest);
                } else {
                    // If it's pending or verified, they shouldn't be here
                    navigate('/student-dashboard');
                }
            }
        }).catch(err => {
            // 404 means not submitted, which is normal for first time
            console.log('No profile found, please submit');
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!photo && !isResubmit) {
            toast.error("Photo is required");
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (photo) {
            data.append('photo', photo);
        }

        try {
            await api.post('/student/profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Profile submitted successfully");
            navigate('/student/verification-pending');
        } catch (error) {
            toast.error(error.response?.data?.error || "Submission failed");
        }
    };

    return (
        <div style={{ background: '#f4f7f6', minHeight: '100vh', padding: '40px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ color: '#003366', margin: 0 }}>Student Profile Completion</h2>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </header>

                {isResubmit && (
                    <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
                        <strong>Your previous submission was rejected.</strong><br/>
                        Reason: {rejectionReason}
                    </div>
                )}
                
                <p style={{ marginBottom: '20px', color: '#666' }}>You must complete your profile before accessing the dashboard.</p>
                
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label>Enrollment Number *</label>
                        <input type="text" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Full Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Father's Name *</label>
                        <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Phone Number *</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Course *</label>
                        <input type="text" name="course" value={formData.course} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Department *</label>
                        <input type="text" name="department" value={formData.department} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Branch *</label>
                        <select name="branch" value={formData.branch} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <option value="">Select Branch</option>
                            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Session / Batch *</label>
                        <input type="text" name="sessionBatch" value={formData.sessionBatch} onChange={handleChange} required placeholder="e.g. 2023-2027" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Current Year *</label>
                        <input type="text" name="currentYear" value={formData.currentYear} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Semester *</label>
                        <input type="text" name="semester" value={formData.semester} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label>Valid Until *</label>
                        <input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label>Photo * (JPG/PNG/GIF, max 5MB)</label>
                        <input type="file" accept="image/jpeg, image/png, image/gif" onChange={e => setPhoto(e.target.files[0])} required={!isResubmit} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                        <button type="submit" style={{ width: '100%', padding: '12px', background: '#003366', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                            {isResubmit ? 'Resubmit Profile' : 'Submit Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
