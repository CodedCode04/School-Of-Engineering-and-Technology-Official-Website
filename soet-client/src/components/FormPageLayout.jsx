import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from './Card';
import '../styles/form-pages.css';

/**
 * Shared FormPageLayout for all SoET student form pages:
 * - Top bar: 64px, indigo-950 background, full width.
 *   - Left: College logo asset & "SoET" lockup (bold SoET + 2-line institutional text, hidden on mobile).
 *   - Right: Logout button (using existing handler) as ghost-light, 40px tall, 16px logout icon.
 * - Header strip below bar:
 *   - Indigo-950 to Indigo-900 gradient with 4-6% faint blueprint grid, 160-200px tall.
 *   - Left-aligned in 960px container with h1 title (white, 800 weight) and helper sentence in cream-200.
 * - Body:
 *   - Cream-50 background, 40px gap below the strip, 64px bottom padding.
 *   - Form Card: max-width 960px, centered, padding 40px desktop / 24px mobile, 16px radius, soft shadow, data-card attribute.
 *   - No overlap between strip and card.
 */
export default function FormPageLayout({
    title,
    subtitle,
    children,
    onLogout,
    showLogout = true,
    topAction,
    cardMaxWidth = '960px',
    className = ''
}) {
    const auth = useAuth();
    const handleLogout = onLogout || auth?.logout;
    const canShowLogout = showLogout && Boolean(handleLogout);

    return (
        <div className={`form-page-root ${className}`.trim()}>
            {/* 1. TOP BAR (64px, indigo-950, full width) */}
            <header className="form-page-topbar" role="banner">
                <div className="form-page-topbar-inner">
                    <Link to="/" className="form-page-brand" aria-label="SoET Home">
                        <img 
                            src="/assets/images/Vikram-university_Logo.png" 
                            alt="Samrat Vikramaditya Vishwavidyalaya Logo" 
                            className="form-page-logo-img"
                            width="44"
                            height="44"
                        />
                        <span className="form-page-brand-name">SoET</span>
                        <span className="form-page-brand-divider" aria-hidden="true"></span>
                        <div className="form-page-brand-text">
                            <span className="form-page-brand-title">School of Engineering &amp; Technology</span>
                            <span className="form-page-brand-sub">Samrat Vikramaditya Vishwavidyalaya, Ujjain</span>
                        </div>
                    </Link>

                    {topAction ? (
                        topAction
                    ) : canShowLogout ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn-shared btn-ghost-light form-page-logout-btn"
                            aria-label="Logout of session"
                        >
                            <i className="fas fa-sign-out-alt form-page-logout-icon" aria-hidden="true"></i>
                            <span>Logout</span>
                        </button>
                    ) : null}
                </div>
            </header>

            {/* 2. HEADER STRIP (160-200px tall, indigo-950 to indigo-900 gradient with blueprint grid) */}
            <section className="form-page-header-strip" aria-label="Page Header">
                <div className="form-page-blueprint-grid" aria-hidden="true"></div>
                <div className="form-page-header-container">
                    <h1 className="form-page-title">{title}</h1>
                    {subtitle && (
                        <p className="form-page-subtitle">{subtitle}</p>
                    )}
                </div>
            </section>

            {/* 3. BODY (cream-50 background, 40px gap below strip, 64px bottom padding) */}
            <main className="form-page-body" role="main">
                <div className="form-page-body-container">
                    <Card
                        className="form-card-main"
                        padding="form"
                        style={{ maxWidth: cardMaxWidth }}
                        data-card=""
                    >
                        {children}
                    </Card>
                </div>
            </main>
        </div>
    );
}
