import React, { useState, useEffect, useRef } from 'react';

const STATS_DATA = [
    {
        id: 'est',
        target: 1957,
        suffix: '',
        label: 'Year Established',
        icon: 'fas fa-calendar-alt',
        ariaLabel: 'Established in 1957'
    },
    {
        id: 'prog',
        target: 11,
        suffix: '',
        label: 'B.Tech & M.Tech Programs',
        icon: 'fas fa-book',
        ariaLabel: '11 academic programs'
    },
    {
        id: 'stud',
        target: 2200,
        suffix: '+',
        label: 'Current Students',
        icon: 'fas fa-user-graduate',
        ariaLabel: 'Over 2200 current students'
    },
    {
        id: 'fac',
        target: 30,
        suffix: '',
        label: 'Faculty & Staff',
        icon: 'fas fa-chalkboard-teacher',
        ariaLabel: '30 faculty and staff members'
    },
    {
        id: 'alumn',
        target: 100,
        suffix: '+',
        label: 'Successful Alumni',
        icon: 'fas fa-briefcase',
        ariaLabel: 'Over 100 successful alumni'
    }
];

export default function StatsStrip({
    items,
    variant = 'default',
    overlap = false,
    ariaLabel = 'SoET Key Statistics',
    className = ''
}) {
    const data = items && items.length > 0 ? items : STATS_DATA;
    const containerRef = useRef(null);
    const [counts, setCounts] = useState(() => data.map(s => s.target));
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setCounts(data.map(s => s.target));
            return;
        }

        // Initialize with 0 for animation
        setCounts(data.map(() => 0));

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    observer.disconnect();

                    const duration = 1400; // ms
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // easeOutExpo curve
                        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                        setCounts(data.map(stat => Math.floor(stat.target * ease)));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCounts(data.map(stat => stat.target));
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated, data]);

    const wrapperClass = `stats-strip-wrapper ${overlap ? 'stats-strip-overlap' : 'stats-strip-no-overlap'} ${variant !== 'default' ? `stats-strip-${variant}` : ''} ${className}`.trim();

    return (
        <div className={wrapperClass} ref={containerRef}>
            <div className="container">
                <div 
                    className={`stats-strip-card stats-variant-${variant} stats-cols-${data.length}`} 
                    role="region" 
                    aria-label={ariaLabel}
                    style={{ '--stats-cols': data.length }}
                >
                    {data.map((stat, index) => (
                        <div key={stat.id || index} className="stat-column">
                            {stat.icon && (
                                <div className="stat-icon-wrapper" aria-hidden="true">
                                    {typeof stat.icon === 'string' ? <i className={stat.icon}></i> : stat.icon}
                                </div>
                            )}
                            <div className="stat-number-wrapper">
                                <span className="stat-number" aria-label={stat.ariaLabel || `${counts[index]}${stat.suffix} ${stat.label}`}>
                                    {counts[index]}
                                    {stat.suffix}
                                </span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
