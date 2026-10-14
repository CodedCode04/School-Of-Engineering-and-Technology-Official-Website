import React, { forwardRef } from 'react';
import './shared.css';

/**
 * Shared Input Component
 * Specs: 48px height, 12px radius, 16px text, 1px border rgba(30,23,96,.2)
 */
const Input = forwardRef(function Input({
    type = 'text',
    className = '',
    ...props
}, ref) {
    return (
        <input
            ref={ref}
            type={type}
            className={`soet-control ${className}`.trim()}
            {...props}
        />
    );
});

export default Input;
