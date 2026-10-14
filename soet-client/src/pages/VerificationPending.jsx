import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    AuthLayout,
    StateCard,
    Button
} from '../components/shared';

export default function VerificationPending() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Verification Pending - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);
    
    return (
        <AuthLayout
            title="Verification Pending"
            subtitle="Departmental Review in Progress"
        >
            <StateCard
                icon="fas fa-user-clock"
                title="Profile Under Review"
                description="Your profile has been submitted successfully and is currently under review by your HOD. You will gain full access to the dashboard once your profile is verified."
                actionButton={
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button 
                            variant="secondary"
                            icon="fas fa-id-card"
                            onClick={() => navigate('/student/profile-completion')}
                        >
                            View Profile Status
                        </Button>
                        <Button 
                            variant="primary"
                            icon="fas fa-sign-out-alt"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                }
            />
        </AuthLayout>
    );
}
