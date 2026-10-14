import React from 'react';
import './shared.css';

/**
 * Shared Alert Component
 * Specs:
 * - 12px radius, 16px padding, 20px icon
 * - role="alert" for errors
 * - info/success = indigo-100 + indigo-800
 * - error = maroon-100 + maroon-700
 */
const ALERT_ICONS = {
    info: 'fas fa-info-circle',
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-triangle'
};

export default function Alert({
    variant = 'info',
    title,
    children,
    icon,
    className = '',
    ...props
}) {
    const isError = variant === 'error';
    const iconClass = icon || ALERT_ICONS[variant] || ALERT_ICONS.info;

    return (
        <div
            className={`soet-alert soet-alert-${variant} ${className}`.trim()}
            role={isError ? 'alert' : 'status'}
            {...props}
        >
            <i className={`${iconClass} soet-alert-icon`} aria-hidden="true"></i>
            <div className="soet-alert-body">
                {title && <strong style={{ display: 'block', marginBottom: '2px' }}>{title}</strong>}
                <div>{children}</div>
            </div>
        </div>
    );
}
