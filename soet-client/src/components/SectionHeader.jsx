import React from 'react';

/**
 * Reusable SectionHeader component:
 * - Eyebrow label in JetBrains Mono uppercase with letter spacing
 * - Title 32-40px in Plus Jakarta Sans
 * - Subtitle below or split on right for desktop
 * - Optional align ('left' | 'center' | 'split')
 * - Optional dark theme variant
 */
export default function SectionHeader({
    eyebrow,
    title,
    subtitle,
    align = 'left',
    dark = false,
    className = '',
    id,
}) {
    const isSplit = align === 'split';
    const containerClasses = `section-header-root align-${align} ${dark ? 'section-header-dark' : ''} ${className}`.trim();

    return (
        <div className={containerClasses}>
            <div className="section-header-main">
                {eyebrow && (
                    <div className="section-eyebrow" aria-hidden="true">
                        {eyebrow}
                    </div>
                )}
                {title && (
                    <h2 className="section-title" id={id}>
                        {title}
                    </h2>
                )}
                {!isSplit && subtitle && (
                    <p className="section-subtitle">
                        {subtitle}
                    </p>
                )}
            </div>
            {isSplit && subtitle && (
                <div className="section-header-aside">
                    <p className="section-subtitle">
                        {subtitle}
                    </p>
                </div>
            )}
        </div>
    );
}
