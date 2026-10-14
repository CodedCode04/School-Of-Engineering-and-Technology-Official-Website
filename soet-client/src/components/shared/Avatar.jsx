import React, { useState } from 'react';
import './shared.css';

/**
 * Shared Avatar Component
 * Specs:
 * - Circle with photo or indigo-gradient initials (cream text)
 * - Sizes: 'sm' (32px), 'md' (40px), 'lg' (48px), 'xl' (64px)
 */
export default function Avatar({
    src,
    name = '',
    size = 'md',
    alt = '',
    className = ''
}) {
    const [hasError, setHasError] = useState(false);

    const getInitials = (str) => {
        if (!str) return 'U';
        const parts = str.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const sizeClass = `soet-avatar-${size}`;

    return (
        <div className={`soet-avatar ${sizeClass} ${className}`.trim()} aria-label={alt || name}>
            {src && !hasError ? (
                <img
                    src={src}
                    alt={alt || name}
                    onError={() => setHasError(true)}
                />
            ) : (
                <span aria-hidden="true">{getInitials(name)}</span>
            )}
        </div>
    );
}
