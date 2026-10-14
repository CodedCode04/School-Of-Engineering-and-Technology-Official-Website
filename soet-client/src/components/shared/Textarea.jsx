import React, { forwardRef } from 'react';
import './shared.css';

/**
 * Shared Textarea Component
 * Specs: 12px radius, 16px text, 1px border rgba(30,23,96,.2), auto-growing / min-height 100px
 */
const Textarea = forwardRef(function Textarea({
    className = '',
    rows = 4,
    ...props
}, ref) {
    return (
        <textarea
            ref={ref}
            rows={rows}
            className={`soet-control soet-textarea ${className}`.trim()}
            {...props}
        />
    );
});

export default Textarea;
