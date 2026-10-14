import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/shared/DashboardLayout';
import ChatLayout from '../components/ChatLayout';
import { getRoleNavItems, getRoleDashboardRoute } from '../utils/dashboardNav';

export default function ChatPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const role = user?.role || 'student';
    const navItems = getRoleNavItems(role, 'chat');
    const dashboardRoute = getRoleDashboardRoute(role);

    return (
        <DashboardLayout
            title="Campus Chat Rooms"
            subtitle="Real-time Academic & Departmental Discussions"
            navItems={navItems}
            activeKey="chat"
            headerActions={
                <button
                    type="button"
                    onClick={() => navigate(dashboardRoute)}
                    className="soet-btn soet-btn-secondary soet-btn-sm"
                >
                    <i className="fas fa-th-large" aria-hidden="true"></i>
                    <span>Dashboard</span>
                </button>
            }
        >
            <ChatLayout />
        </DashboardLayout>
    );
}
