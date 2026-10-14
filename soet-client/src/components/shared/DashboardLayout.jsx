import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../NotificationBell';
import Avatar from './Avatar';
import './dashboard-layout.css';

/**
 * Shared DashboardLayout Component
 * Specs:
 * - 264px Indigo-950 sidebar on desktop (>= 1024px)
 * - Mobile off-canvas drawer with backdrop (< 1024px)
 * - 64px white topbar with hamburger, breadcrumbs, actions, and notification bell
 * - Cream-50 main workspace with zero horizontal overflow
 */
export default function DashboardLayout({
    title,
    subtitle,
    navItems = [],
    activeKey,
    headerActions,
    children,
    className = ''
}) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Update document title
    useEffect(() => {
        if (title) {
            document.title = `${title} - SoET | Samrat Vikramaditya Vishwavidyalaya`;
        }
    }, [title]);

    // Auto-close drawer on location change
    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname]);

    // Handle Escape key to close mobile drawer
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && drawerOpen) {
                setDrawerOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [drawerOpen]);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [drawerOpen]);

    const roleName = user?.role ? user.role.toUpperCase() : 'PORTAL';
    const homeRoute = user?.role ? `/${user.role}-dashboard` : '/';

    const renderNavIcon = (icon) => {
        if (!icon) return <i className="fas fa-circle-notch" aria-hidden="true"></i>;
        if (typeof icon === 'string') {
            if (icon.startsWith('fa') || icon.includes('fa-')) {
                return <i className={icon} aria-hidden="true"></i>;
            }
            return <span aria-hidden="true" style={{ fontSize: '16px' }}>{icon}</span>;
        }
        return icon;
    };

    return (
        <div className={`soet-dash-root ${className}`.trim()}>
            {/* Mobile Backdrop Overlay */}
            <div
                className={`soet-dash-backdrop ${drawerOpen ? 'drawer-open' : ''}`}
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
            />

            {/* SIDEBAR (Desktop sticky / Mobile off-canvas drawer) */}
            <aside
                className={`soet-dash-sidebar ${drawerOpen ? 'drawer-open' : ''}`}
                aria-label="Portal Navigation"
            >
                {/* Brand Lockup */}
                <Link to={homeRoute} className="soet-dash-brand" aria-label="SoET Portal Home">
                    <img
                        src="/assets/images/Vikram-university_Logo.png"
                        alt="SoET Crest"
                        className="soet-dash-logo"
                    />
                    <div className="soet-dash-brand-text">
                        <span className="soet-dash-brand-title">SoET Portal</span>
                        <span className="soet-dash-brand-subtitle">{roleName} CONSOLE</span>
                    </div>
                </Link>

                {/* Navigation Items */}
                <nav className="soet-dash-nav" role="navigation">
                    {navItems.map((item, index) => {
                        const isActive = activeKey 
                            ? activeKey === item.key 
                            : (item.path && location.pathname === item.path);

                        const handleClick = (e) => {
                            if (item.onClick) {
                                e.preventDefault();
                                item.onClick(item);
                            } else if (item.navigate) {
                                e.preventDefault();
                                navigate(item.navigate);
                            } else if (item.path && !item.path.startsWith('http')) {
                                // regular navigation
                            }
                            setDrawerOpen(false);
                        };

                        return (
                            <React.Fragment key={item.key || index}>
                                {item.sectionTitle && (
                                    <div className="soet-dash-nav-section-title">
                                        {item.sectionTitle}
                                    </div>
                                )}

                                {item.path ? (
                                    <Link
                                        to={item.path}
                                        onClick={handleClick}
                                        className={`soet-dash-nav-item ${isActive ? 'active' : ''}`}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <span className="soet-dash-nav-icon">
                                            {renderNavIcon(item.icon)}
                                        </span>
                                        <span className="soet-dash-nav-label">{item.label}</span>
                                        {item.badge && (
                                            <span className="soet-dash-nav-badge">{item.badge}</span>
                                        )}
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleClick}
                                        className={`soet-dash-nav-item ${isActive ? 'active' : ''}`}
                                        aria-current={isActive ? 'true' : undefined}
                                    >
                                        <span className="soet-dash-nav-icon">
                                            {renderNavIcon(item.icon)}
                                        </span>
                                        <span className="soet-dash-nav-label">{item.label}</span>
                                        {item.badge && (
                                            <span className="soet-dash-nav-badge">{item.badge}</span>
                                        )}
                                    </button>
                                )}
                            </React.Fragment>
                        );
                    })}
                </nav>

                {/* User Card at bottom of sidebar */}
                <div className="soet-dash-user-card">
                    <Avatar name={user?.name || 'User'} size="sm" />
                    <div className="soet-dash-user-info">
                        <span className="soet-dash-user-name" title={user?.name}>
                            {user?.name || 'Authorized User'}
                        </span>
                        <span className="soet-dash-user-role">
                            {user?.role || 'Guest'}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={logout}
                        className="soet-dash-logout-btn"
                        title="Sign Out"
                        aria-label="Sign Out of Portal"
                    >
                        <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                    </button>
                </div>
            </aside>

            {/* MAIN WORKSPACE */}
            <div className="soet-dash-main">
                {/* 64px Topbar */}
                <header className="soet-dash-topbar" role="banner">
                    <div className="soet-dash-topbar-left">
                        <button
                            type="button"
                            onClick={() => setDrawerOpen(true)}
                            className="soet-dash-hamburger"
                            aria-label="Open navigation menu"
                            aria-expanded={drawerOpen}
                        >
                            <i className="fas fa-bars" aria-hidden="true"></i>
                        </button>

                        <div className="soet-dash-topbar-title-wrap">
                            <h1 className="soet-dash-topbar-h1">{title || 'Dashboard'}</h1>
                            {subtitle && (
                                <p className="soet-dash-topbar-crumb">{subtitle}</p>
                            )}
                        </div>
                    </div>

                    <div className="soet-dash-topbar-right">
                        {headerActions && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {headerActions}
                            </div>
                        )}
                        <NotificationBell />
                    </div>
                </header>

                {/* Content Area */}
                <main className="soet-dash-content" role="main">
                    {children}
                </main>
            </div>
        </div>
    );
}
