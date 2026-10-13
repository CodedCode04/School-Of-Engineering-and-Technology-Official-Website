import React from 'react';

/**
 * Reusable FeatureCard component:
 * - 12px border radius, subtle border & soft shadow
 * - Indigo-100 icon circle with indigo-800 icon
 * - Title in Plus Jakarta Sans
 * - Description in body text
 * - Optional bottom tag pill pinned with margin-top: auto (cream-200 bg, maroon-700 text)
 * - Hover lift effect
 */
export default function FeatureCard({
    icon,
    title,
    description,
    tag,
    dark = false,
    className = ''
}) {
    const cardClass = `feature-card-root ${dark ? 'feature-card-dark' : ''} ${className}`.trim();

    return (
        <div data-card="" className={cardClass}>
            <div className="feature-card-header">
                {icon && (
                    <div className="feature-icon-circle" aria-hidden="true">
                        {typeof icon === 'string' ? <i className={icon}></i> : icon}
                    </div>
                )}
                {title && <h3 className="feature-card-title">{title}</h3>}
            </div>

            {description && (
                <div className="feature-card-body">
                    {typeof description === 'string' ? (
                        <p className="feature-card-desc">{description}</p>
                    ) : (
                        description
                    )}
                </div>
            )}

            {tag && (
                <div className="feature-card-footer">
                    <span className="feature-tag-pill">{tag}</span>
                </div>
            )}
        </div>
    );
}
