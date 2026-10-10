import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Register() {
    const { role } = useParams(); // student, teacher, hod, alumni
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([]);

    // Allowed registration roles
    if (!['student', 'teacher', 'hod', 'alumni'].includes(role)) {
        return <div style={{ textAlign: 'center', marginTop: '100px' }}>Invalid registration role.</div>;
    }

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await axios.get('/api/branches');
                setBranches(res.data);
            } catch (error) {
                console.error('Failed to fetch branches');
            }
        };
        fetchBranches();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password, role, branch });
            toast.success('Registration successful. Pending approval.');
            navigate('/awaiting-approval');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f4f7f6', padding: '20px' }}>
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#003366', textTransform: 'capitalize' }}>{role} Registration</h2>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Branch</label>
                    <select value={branch} onChange={e => setBranch(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="">Select Branch</option>
                        {branches.map(b => (
                            <option key={b._id} value={b._id}>{b.name} ({b.code})</option>
                        ))}
                    </select>
                </div>
                
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#003366', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                    Register
                </button>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a href="/login" style={{ color: '#003366', textDecoration: 'none' }}>Back to Login</a>
                </div>
            </form>
        </div>
    );
}
