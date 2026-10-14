/**
 * Centralized dashboard navigation helper for all SoET portal roles
 */
export const getRoleNavItems = (role, activeKey = '') => {
    const r = (role || '').toLowerCase();

    switch (r) {
        case 'hod':
            return [
                { key: 'overview', label: 'Overview', path: '/hod-dashboard', icon: 'fas fa-home' },
                { key: 'verify-students', label: 'Verify Students', path: '/hod-dashboard?tab=verification', icon: 'fas fa-user-check' },
                { key: 'announcements', label: 'Announcements', path: '/manage-announcements', icon: 'fas fa-bullhorn' },
                { key: 'syllabus', label: 'Syllabus & Schemes', path: '/manage-syllabus', icon: 'fas fa-book' },
                { key: 'alumni-directory', label: 'Alumni Directory', path: '/alumni-directory', icon: 'fas fa-user-graduate' },
                { key: 'job-referrals', label: 'Job Referrals', path: '/job-referrals', icon: 'fas fa-briefcase' },
                { key: 'chat', label: 'Chat Rooms', path: '/chat', icon: 'fas fa-comments', badge: 'Live' },
                { key: 'send-notification', label: 'Send Alert', path: '/notifications/send', icon: 'fas fa-paper-plane' },
                { key: 'notifications', label: 'Notifications', path: '/notifications', icon: 'fas fa-bell' },
            ];

        case 'admin':
            return [
                { key: 'users', label: 'User Approvals', path: '/admin-dashboard', icon: 'fas fa-users-cog' },
                { key: 'student-verification', label: 'Student Profiles', path: '/admin-dashboard?tab=student-verification', icon: 'fas fa-user-graduate' },
                { key: 'alumni-directory', label: 'Alumni Directory', path: '/alumni-directory', icon: 'fas fa-landmark' },
                { key: 'success-stories', label: 'Success Stories', path: '/admin-dashboard?tab=success-stories', icon: 'fas fa-star' },
                { key: 'announcements', label: 'Announcements', path: '/manage-announcements', icon: 'fas fa-bullhorn' },
                { key: 'syllabus', label: 'Manage Syllabus', path: '/manage-syllabus', icon: 'fas fa-book' },
                { key: 'audit-logs', label: 'Audit Logs', path: '/audit-logs', icon: 'fas fa-clipboard-list' },
                { key: 'chat-moderation', label: 'Chat Moderation', path: '/admin/chat-moderation', icon: 'fas fa-shield-alt' },
                { key: 'chat', label: 'Chat Rooms', path: '/chat', icon: 'fas fa-comments', badge: 'Live' },
                { key: 'send-notification', label: 'Send Alert', path: '/notifications/send', icon: 'fas fa-paper-plane' },
                { key: 'notifications', label: 'Notifications', path: '/notifications', icon: 'fas fa-bell' },
            ];

        case 'teacher':
            return [
                { key: 'overview', label: 'Overview', path: '/teacher-dashboard', icon: 'fas fa-home' },
                { key: 'syllabus', label: 'My Branch Syllabus', path: '/syllabus', icon: 'fas fa-book-open' },
                { key: 'chat', label: 'Chat Rooms', path: '/chat', icon: 'fas fa-comments', badge: 'Live' },
                { key: 'announcements', label: 'Announcements', path: '/announcements', icon: 'fas fa-bullhorn' },
                { key: 'notifications', label: 'Notifications', path: '/notifications', icon: 'fas fa-bell' },
            ];

        case 'student':
            return [
                { key: 'overview', label: 'Overview', path: '/student-dashboard', icon: 'fas fa-home' },
                { key: 'portfolio', label: 'Academic & Portfolio', path: '/student/portfolio', icon: 'fas fa-award' },
                { key: 'docs', label: 'Digital ID Card', path: '/student/docs', icon: 'fas fa-id-card' },
                { key: 'syllabus', label: 'My Syllabus', path: '/syllabus', icon: 'fas fa-book-open' },
                { key: 'alumni-directory', label: 'Alumni Directory', path: '/alumni-directory', icon: 'fas fa-user-graduate' },
                { key: 'job-referrals', label: 'Job Referrals', path: '/job-referrals', icon: 'fas fa-briefcase' },
                { key: 'mentorship', label: 'Mentorship Requests', path: '/mentorship-requests', icon: 'fas fa-hands-helping' },
                { key: 'chat', label: 'Chat Rooms', path: '/chat', icon: 'fas fa-comments', badge: 'Live' },
                { key: 'announcements', label: 'Announcements', path: '/announcements', icon: 'fas fa-bullhorn' },
                { key: 'notifications', label: 'Notifications', path: '/notifications', icon: 'fas fa-bell' },
            ];

        case 'tpo':
            return [
                { key: 'directory', label: 'Student Directory', path: '/tpo-dashboard', icon: 'fas fa-user-graduate' },
                { key: 'alumni-directory', label: 'Alumni Directory', path: '/alumni-directory', icon: 'fas fa-landmark' },
                { key: 'job-referrals', label: 'Job Referrals', path: '/job-referrals', icon: 'fas fa-briefcase' },
                { key: 'announcements', label: 'Announcements', path: '/manage-announcements', icon: 'fas fa-bullhorn' },
                { key: 'chat', label: 'Chat Rooms', path: '/chat', icon: 'fas fa-comments', badge: 'Live' },
                { key: 'send-notification', label: 'Send Alert', path: '/notifications/send', icon: 'fas fa-paper-plane' },
                { key: 'notifications', label: 'Notifications', path: '/notifications', icon: 'fas fa-bell' },
            ];

        case 'alumni':
            return [
                { key: 'directory', label: 'Alumni Directory', path: '/alumni', icon: 'fas fa-user-graduate' },
                { key: 'jobs', label: 'Job Referrals', path: '/alumni/jobs', icon: 'fas fa-briefcase' },
                { key: 'mentorship', label: 'Mentorship Requests', path: '/alumni/mentorship', icon: 'fas fa-hands-helping' },
                { key: 'stories', label: 'Success Stories', path: '/alumni/stories', icon: 'fas fa-star' },
                { key: 'edit-profile', label: 'Edit Profile', path: '/alumni/edit-profile', icon: 'fas fa-user-edit' },
                { key: 'chat', label: 'Chat Rooms', path: '/chat', icon: 'fas fa-comments', badge: 'Live' },
                { key: 'announcements', label: 'Announcements', path: '/announcements', icon: 'fas fa-bullhorn' },
                { key: 'notifications', label: 'Notifications', path: '/notifications', icon: 'fas fa-bell' },
            ];

        default:
            return [
                { key: 'home', label: 'Home', path: '/', icon: 'fas fa-home' },
                { key: 'chat', label: 'Chat Rooms', path: '/chat', icon: 'fas fa-comments' },
                { key: 'announcements', label: 'Announcements', path: '/announcements', icon: 'fas fa-bullhorn' },
            ];
    }
};

export const getRoleDashboardRoute = (role) => {
    switch ((role || '').toLowerCase()) {
        case 'admin': return '/admin-dashboard';
        case 'hod': return '/hod-dashboard';
        case 'teacher': return '/teacher-dashboard';
        case 'student': return '/student-dashboard';
        case 'tpo': return '/tpo-dashboard';
        case 'alumni': return '/alumni';
        default: return '/';
    }
};
