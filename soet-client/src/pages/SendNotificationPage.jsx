import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

export default function SendNotificationPage() {
    const { user, api } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('official');
    const [scope, setScope] = useState('all');
    const [targetRole, setTargetRole] = useState('student');
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [targetUserId, setTargetUserId] = useState('');

    useEffect(() => {
        if (!['admin', 'hod', 'tpo'].includes(user?.role)) {
            navigate('/');
        }
        api.get('/branches').then(res => setBranches(res.data)).catch(console.error);
    }, [user, navigate, api]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const target = { scope };
            if (scope === 'role') target.role = targetRole;
            if (scope === 'branch') target.branch = user.role === 'hod' ? user.branch : selectedBranch;
            if (scope === 'user') target.user = targetUserId;

            await api.post('/notifications', {
                title,
                message,
                type,
                target
            });

            toast.success("Notification sent!");
            navigate('/notifications');
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to send notification");
        }
    };

    return (
        <Layout>
            <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ marginBottom: '20px' }}>Send Notification</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Message</label>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} required rows="4" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Type</label>
                        <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <option value="official">Official</option>
                            <option value="branch">Branch Specific</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Target Scope</label>
                        <select value={scope} onChange={e => setScope(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <option value="all">Everyone</option>
                            <option value="role">By Role</option>
                            <option value="branch">By Branch</option>
                            <option value="user">Specific User ID</option>
                        </select>
                    </div>

                    {scope === 'role' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Target Role</label>
                            <select value={targetRole} onChange={e => setTargetRole(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                                <option value="student">Students</option>
                                <option value="teacher">Teachers</option>
                                <option value="alumni">Alumni</option>
                            </select>
                        </div>
                    )}

                    {scope === 'branch' && user?.role !== 'hod' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Target Branch</label>
                            <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                                <option value="">Select Branch...</option>
                                {branches.map(b => (
                                    <option key={b._id} value={b._id}>{b.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {scope === 'user' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Target User ID</label>
                            <input type="text" value={targetUserId} onChange={e => setTargetUserId(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </div>
                    )}

                    <button type="submit" style={{ padding: '12px', background: '#8B1F41', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
                        Send Notification
                    </button>
                </form>
            </div>
        </Layout>
    );
}
