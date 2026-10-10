import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            toast.success('Login successful!');
            
            if (user.status !== 'approved' && user.role !== 'admin') {
                navigate('/awaiting-approval');
                return;
            }

            switch(user.role) {
                case 'admin': navigate('/admin-dashboard'); break;
                case 'hod': navigate('/hod-dashboard'); break;
                case 'teacher': navigate('/teacher-dashboard'); break;
                case 'student': navigate('/student-dashboard'); break;
                case 'tpo': navigate('/tpo-dashboard'); break;
                case 'alumni': navigate('/alumni-dashboard'); break;
                default: navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f7f6' }}>
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#003366' }}>SOET Portal Login</h2>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#003366', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                    Login
                </button>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>Don't have an account?</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                        <a href="/register/student" style={{ color: '#003366', textDecoration: 'none', fontSize: '14px' }}>Register Student</a>
                        <a href="/register/teacher" style={{ color: '#003366', textDecoration: 'none', fontSize: '14px' }}>Register Teacher</a>
                        <a href="/register/hod" style={{ color: '#003366', textDecoration: 'none', fontSize: '14px' }}>Register HOD</a>
                        <a href="/register/alumni" style={{ color: '#003366', textDecoration: 'none', fontSize: '14px' }}>Register Alumni</a>
                    </div>
                </div>
            </form>
        </div>
    );
}
