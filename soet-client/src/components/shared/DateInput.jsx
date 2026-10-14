import React, { forwardRef } from 'react';
import './shared.css';

/**
 * Shared DateInput Component
 * Specs: 48px height, 12px radius, color-scheme: light, font-family: inherit
 */
const DateInput = forwardRef(function DateInput({
    className = '',
    ...props
}, ref) {
    return (
        <input
            ref={ref}
            type="date"
            className={`soet-control soet-date ${className}`.trim()}
            {...props}
        />
    );
});

export default DateInput;
