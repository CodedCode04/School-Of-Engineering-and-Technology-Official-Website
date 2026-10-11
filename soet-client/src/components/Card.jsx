import React from 'react';

/**
 * Reusable Card primitive adhering to SoET Design Tokens:
 * - 16px border-radius
 * - box-sizing: border-box
 * - overflow: visible
 * - Spacing scale padding:
 *   - 'default': 24px (20px mobile)
 *   - 'featured': 32px (24px mobile)
 *   - 'compact': 20px (16px mobile)
 *   - 'none': 0px (for cards with full-bleed media headers)
 * - Variants: 'default', 'vision', 'mission', 'director', 'glass', 'dark-featured'
 */
export default function Card({
    children,
    variant = 'default',
    padding = 'default',
    as: Component = 'div',
    className = '',
    style,
    ...props
}) {
    const cardClasses = [
        'card-root',
        `card-padding-${padding}`,
        `card-variant-${variant}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <Component data-card="" className={cardClasses} style={style} {...props}>
            {children}
        </Component>
    );
}
