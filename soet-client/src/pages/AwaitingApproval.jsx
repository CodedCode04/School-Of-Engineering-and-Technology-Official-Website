import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    AuthLayout,
    StateCard,
    Button
} from '../components/shared';

export default function AwaitingApproval() {
    const { logout } = useAuth();

    useEffect(() => {
        document.title = "Account Pending Approval - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);
    
    return (
        <AuthLayout
            title="Account Pending Approval"
            subtitle="Institutional Account Clearance"
        >
            <StateCard
                icon="fas fa-hourglass-half"
                title="Account Pending Approval"
                description="Your account has been registered but requires administrator or HOD approval before you can access the system. Please check back later."
                actionButton={
                    <Button
                        variant="primary"
                        icon="fas fa-sign-out-alt"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                }
            />
        </AuthLayout>
    );
}
