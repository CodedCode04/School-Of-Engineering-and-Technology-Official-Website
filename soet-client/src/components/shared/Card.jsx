import React from 'react';
import './shared.css';

/**
 * Shared Card Component
 * Specs:
 * - Built-in padding: 24px (20px mobile) default
 * - 16px radius, white bg, 1px border rgba(30,23,96,.12), soft shadow
 * - Always renders data-card attribute
 * - Supports padding="none" | "compact" | "form"
 */
export default function Card({
    children,
    padding = 'default',
    as: Component = 'div',
    className = '',
    style,
    ...props
}) {
    const padClass = `soet-card-pad-${padding}`;
    const classes = ['soet-card', padClass, className].filter(Boolean).join(' ');

    return (
        <Component data-card="" className={classes} style={style} {...props}>
            {children}
        </Component>
    );
}
