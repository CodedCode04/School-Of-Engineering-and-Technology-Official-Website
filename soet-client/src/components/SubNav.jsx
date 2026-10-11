import React, { useState, useEffect, useRef } from 'react';

/**
 * Reusable SubNav component:
 * - Sticky chip bar positioned right below the sticky main navbar
 * - Smooth-scrolls to target sections
 * - IntersectionObserver scroll-spy highlights the currently viewed section
 * - Horizontally scrollable on mobile devices with smooth behavior
 */
export default function SubNav({
    items = [],
    ariaLabel = 'In-page navigation',
    className = ''
}) {
    const [activeId, setActiveId] = useState(items[0]?.id || '');
    const navRef = useRef(null);
    const isManualClick = useRef(false);

    useEffect(() => {
        if (!items || items.length === 0) return;

        const handleIntersection = (entries) => {
            if (isManualClick.current) return;

            // Find visible sections sorted by intersection ratio and position
            const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
            if (intersectingEntries.length > 0) {
                // Pick the one closest to top or highest intersection ratio
                const topMost = intersectingEntries.reduce((prev, curr) => {
                    return curr.intersectionRatio > prev.intersectionRatio ? curr : prev;
                });
                if (topMost && topMost.target && topMost.target.id) {
                    setActiveId(topMost.target.id);
                }
            }
        };

        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -40% 0px',
            threshold: [0, 0.2, 0.5, 0.8]
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    }, [items]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const targetEl = document.getElementById(id);
        if (targetEl) {
            isManualClick.current = true;
            setActiveId(id);

            // Scroll the target element into view
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Allow observer to resume after scroll finishes
            setTimeout(() => {
                isManualClick.current = false;
            }, 800);
        }
    };

    return (
        <aside className={`subnav-sticky-wrapper ${className}`.trim()} aria-label={ariaLabel}>
            <div className="container subnav-container">
                <nav className="subnav-chip-bar" role="navigation" ref={navRef}>
                    <ul className="subnav-chip-list" role="tablist">
                        {items.map((item) => {
                            const isActive = activeId === item.id;
                            return (
                                <li key={item.id} role="presentation" className="subnav-chip-item">
                                    <a
                                        href={`#${item.id}`}
                                        role="tab"
                                        aria-selected={isActive}
                                        className={`subnav-chip-btn ${isActive ? 'active' : ''}`}
                                        onClick={(e) => scrollToSection(e, item.id)}
                                    >
                                        {item.icon && <i className={`${item.icon} subnav-icon`} aria-hidden="true" />}
                                        <span className="subnav-label">{item.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
