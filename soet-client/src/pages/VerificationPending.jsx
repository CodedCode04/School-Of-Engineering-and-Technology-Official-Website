import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function VerificationPending() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    return (
        <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#003366', marginBottom: '20px' }}>Verification Pending</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555', marginBottom: '30px' }}>
                    Your profile has been submitted successfully and is currently under review by your HOD. 
                    You will gain full access to the dashboard once your profile is verified.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button 
                        onClick={() => navigate('/student/profile-completion')} 
                        style={{ padding: '10px 20px', cursor: 'pointer', background: '#e9ecef', border: 'none', borderRadius: '4px', color: '#333' }}
                    >
                        View Profile Status
                    </button>
                    <button 
                        onClick={logout} 
                        style={{ padding: '10px 20px', cursor: 'pointer', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
