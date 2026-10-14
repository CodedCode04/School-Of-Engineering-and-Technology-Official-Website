import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Alert from './Alert';
import './auth-layout.css';

/**
 * Shared AuthLayout Component
 * Specs:
 * - Two-column split on lg and above:
 *   - Left panel: Indigo-950 to Indigo-900 gradient, blueprint grid 4-6%,
 *     Vikram University logo asset, bold "SoET" lockup, full college name in white / cream-200.
 *   - Right panel: Cream-50 background, vertically centered form Card (max-width 560px, padding 40px desktop / 24px mobile).
 * - Mobile (< 1024px): Left panel collapses into 72px branded top bar.
 * - Card header: h1 in indigo-900, helper sentence in muted text.
 */
export default function AuthLayout({
    title,
    subtitle,
    children,
    error,
    topAction,
    cardMaxWidth = '560px',
    padding = 'form',
    className = ''
}) {
    return (
        <div className={`soet-auth-root ${className}`.trim()}>
            {/* 1. LEFT BRANDING PANEL (Collapses to 72px top bar on mobile) */}
            <aside className="soet-auth-brand-panel" aria-label="Institutional Branding">
                <div className="soet-auth-grid-pattern" aria-hidden="true"></div>

                <div className="soet-auth-brand-content">
                    <Link to="/" className="soet-auth-logo-row" aria-label="SoET Home">
                        <img
                            src="/assets/images/Vikram-university_Logo.png"
                            alt="Samrat Vikramaditya Vishwavidyalaya Logo"
                            className="soet-auth-logo-img"
                            width="56"
                            height="56"
                        />
                        <div className="soet-auth-lockup-text">
                            <span className="soet-auth-brand-acronym">SoET</span>
                        </div>
                    </Link>

                    <div>
                        <div className="soet-auth-brand-divider" aria-hidden="true"></div>
                        <div className="soet-auth-college-name">
                            School of Engineering &amp; Technology
                        </div>
                        <div className="soet-auth-univ-name">
                            Samrat Vikramaditya Vishwavidyalaya, Ujjain
                        </div>
                    </div>
                </div>

                <div className="soet-auth-brand-footer">
                    {topAction ? (
                        topAction
                    ) : (
                        <Link to="/" className="soet-auth-back-link">
                            <i className="fas fa-arrow-left" aria-hidden="true"></i>
                            <span>Back to Homepage</span>
                        </Link>
                    )}
                </div>
            </aside>

            {/* 2. RIGHT FORM PANEL */}
            <main className="soet-auth-form-panel" role="main">
                <div className="soet-auth-card-container" style={{ maxWidth: cardMaxWidth }}>
                    <Card padding={padding} data-card="" style={{ width: '100%' }}>
                        {(title || subtitle) && (
                            <header className="soet-auth-card-header">
                                {title && <h1 className="soet-auth-h1">{title}</h1>}
                                {subtitle && <p className="soet-auth-subtitle">{subtitle}</p>}
                            </header>
                        )}

                        {error && (
                            <div style={{ marginBottom: '20px' }}>
                                <Alert variant="error">
                                    {error}
                                </Alert>
                            </div>
                        )}

                        {children}
                    </Card>
                </div>
            </main>
        </div>
    );
}
