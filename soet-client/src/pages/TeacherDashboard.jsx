import React from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from '../components/NotificationBell';

import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
    const { logout } = useAuth();
    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Teacher Panel</h2>
                <nav>
                    <ul>
                        <li><a href="#">Overview</a></li>
                        <li><Link to="/syllabus">My Branch Syllabus</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="dashboard-main">
                <header>
                    <h1>Teacher Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}><NotificationBell /><button onClick={logout} className="logout-btn">Logout</button></div>
                </header>
                <div className="dashboard-content">
                    <p>Welcome to the Teacher Dashboard.</p>
                </div>
            </main>
        </div>
    );
}
