import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function AwaitingApproval() {
    const { logout } = useAuth();
    
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Account Pending Approval</h2>
            <p>Your account has been registered but requires administrator or HOD approval before you can access the system.</p>
            <p>Please check back later.</p>
            <button onClick={logout} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Logout</button>
        </div>
    );
}
