import React from 'react';
import { Link } from 'react-router-dom';
import './shared.css';

/**
 * Shared Button Component
 * Specs:
 * - Min height 44px (40px "sm"), 12px radius, hover lift
 * - primary = maroon-700 bg + white text (hover maroon-900)
 * - secondary = 2px indigo-800 outline + indigo-800 text
 * - ghost = transparent + indigo-800 text
 * - danger = maroon-700 (for destructive confirms)
 * - ghost-light = 1px white/40 border + white text (for dark backgrounds)
 * - Loading and disabled states
 */
export default function Button({
    children,
    to,
    href,
    variant = 'primary',
    size = 'default',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    type = 'button',
    className = '',
    iconOnly = false,
    onClick,
    ...props
}) {
    const isSmall = size === 'sm' || size === 'small';
    const classes = [
        'soet-btn',
        `soet-btn-${variant}`,
        isSmall ? 'soet-btn-sm' : '',
        iconOnly ? 'soet-btn-icon-only' : '',
        className
    ].filter(Boolean).join(' ');

    const content = (
        <>
            {loading ? (
                <span className="soet-btn-spinner" aria-hidden="true"></span>
            ) : (
                icon && iconPosition === 'left' && (
                    <span className="soet-btn-icon" aria-hidden="true">
                        {typeof icon === 'string' ? <i className={icon}></i> : icon}
                    </span>
                )
            )}
            {children && <span>{children}</span>}
            {!loading && icon && iconPosition === 'right' && (
                <span className="soet-btn-icon" aria-hidden="true">
                    {typeof icon === 'string' ? <i className={icon}></i> : icon}
                </span>
            )}
        </>
    );

    if (to && !disabled) {
        return (
            <Link to={to} className={classes} onClick={onClick} {...props}>
                {content}
            </Link>
        );
    }

    if (href && !disabled) {
        return (
            <a href={href} className={classes} onClick={onClick} {...props}>
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {content}
        </button>
    );
}
