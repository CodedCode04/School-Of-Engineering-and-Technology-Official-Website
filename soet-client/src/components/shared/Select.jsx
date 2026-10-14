import React, { forwardRef } from 'react';
import './shared.css';

/**
 * Shared Select Component
 * Specs: 48px height, 12px radius, custom 16px SVG chevron, 16px text
 */
const Select = forwardRef(function Select({
    children,
    className = '',
    placeholder,
    value,
    ...props
}, ref) {
    const isPlaceholder = !value && value !== 0;

    return (
        <select
            ref={ref}
            value={value}
            className={`soet-control soet-select ${isPlaceholder ? 'is-placeholder' : ''} ${className}`.trim()}
            {...props}
        >
            {placeholder && (
                <option value="" disabled hidden>
                    {placeholder}
                </option>
            )}
            {children}
        </select>
    );
});

export default Select;
