import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component adhering to SoET Design Tokens:
 * - 44px min height
 * - 600 font weight
 * - 12px border radius
 * - Hover lift + color shift
 * - Visible :focus-visible rings
 * - Variants: 'primary' | 'secondary' | 'ghost-light' | 'cream'
 */
export default function Button({
    children,
    to,
    href,
    variant = 'primary',
    size = 'default',
    icon,
    iconPosition = 'right',
    className = '',
    onClick,
    type = 'button',
    target,
    rel,
    ariaLabel,
    disabled = false,
    ...props
}) {
    const baseClasses = `btn-shared btn-${variant} ${size === 'small' ? 'btn-sm' : ''} ${className}`.trim();
    const finalRel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;

    const content = (
        <>
            {icon && iconPosition === 'left' && (
                <span className="btn-icon-wrapper btn-icon-left" aria-hidden="true">
                    {typeof icon === 'string' ? <i className={icon}></i> : icon}
                </span>
            )}
            <span className="btn-text">{children}</span>
            {icon && iconPosition === 'right' && (
                <span className="btn-icon-wrapper btn-icon-right" aria-hidden="true">
                    {typeof icon === 'string' ? <i className={icon}></i> : icon}
                </span>
            )}
        </>
    );

    if (to) {
        return (
            <Link
                to={to}
                className={baseClasses}
                aria-label={ariaLabel}
                onClick={onClick}
                {...props}
            >
                {content}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                href={href}
                className={baseClasses}
                target={target}
                rel={finalRel}
                aria-label={ariaLabel}
                onClick={onClick}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={baseClasses}
            disabled={disabled}
            aria-label={ariaLabel}
            onClick={onClick}
            {...props}
        >
            {content}
        </button>
    );
}
