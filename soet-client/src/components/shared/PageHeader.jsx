import React from 'react';
import './shared.css';

/**
 * Shared PageHeader Component
 * Specs:
 * - h1 (28px/800 indigo-900)
 * - Optional description (15px muted) on left
 * - Page actions (Buttons) on right
 * - Wraps on mobile; 24px below
 */
export default function PageHeader({
    title,
    description,
    actions,
    children,
    className = ''
}) {
    return (
        <header className={`soet-page-header ${className}`.trim()}>
            <div className="soet-page-header-text">
                <h1 className="soet-page-header-title">{title}</h1>
                {description && (
                    <p className="soet-page-header-desc">{description}</p>
                )}
                {children}
            </div>

            {actions && (
                <div className="soet-page-header-actions">
                    {actions}
                </div>
            )}
        </header>
    );
}
