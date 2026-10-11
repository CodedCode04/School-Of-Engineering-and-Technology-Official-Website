import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable PageBanner component:
 * - 240-280px tall hero banner for inner pages
 * - Indigo-950 to indigo-900 gradient with subtle blueprint grid motif
 * - Semantic <nav aria-label="Breadcrumb"> inside a pill container
 * - Title clamp(2rem, 4vw, 3rem) in 800 weight
 * - Subtitle in cream-200
 */
export default function PageBanner({
    title,
    subtitle,
    breadcrumbs = [],
    eyebrow,
    className = ''
}) {
    return (
        <section className={`page-banner-root ${className}`.trim()} aria-labelledby="banner-heading">
            <div className="page-banner-pattern" aria-hidden="true" />
            <div className="container page-banner-container">
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="page-banner-breadcrumb" aria-label="Breadcrumb">
                        <ol className="breadcrumb-list">
                            {breadcrumbs.map((crumb, idx) => {
                                const isLast = idx === breadcrumbs.length - 1;
                                return (
                                    <li key={idx} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                                        {crumb.to && !isLast ? (
                                            <Link to={crumb.to} className="breadcrumb-link">
                                                {crumb.label}
                                            </Link>
                                        ) : (
                                            <span className="breadcrumb-current" aria-current={isLast ? 'page' : undefined}>
                                                {crumb.label}
                                            </span>
                                        )}
                                        {!isLast && (
                                            <span className="breadcrumb-separator" aria-hidden="true">
                                                /
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                )}

                {eyebrow && (
                    <div className="page-banner-eyebrow" aria-hidden="true">
                        {eyebrow}
                    </div>
                )}

                <h1 id="banner-heading" className="page-banner-title">
                    {title}
                </h1>

                {subtitle && (
                    <p className="page-banner-subtitle">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
