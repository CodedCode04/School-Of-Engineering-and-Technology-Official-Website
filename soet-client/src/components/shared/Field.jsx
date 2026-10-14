import React from 'react';
import './shared.css';

/**
 * Shared Field Wrapper Component
 * Specs:
 * - Label: 14px/600 indigo-900 above control (8px gap)
 * - Required asterisk: maroon-600 (aria-hidden)
 * - Helper text: 13px muted below control
 * - Error text: 13px maroon-700 below control (role="alert")
 */
export default function Field({
    label,
    id,
    required = false,
    error,
    helper,
    children,
    className = ''
}) {
    const errorId = id && error ? `${id}-error` : undefined;
    const helperId = id && helper ? `${id}-helper` : undefined;

    return (
        <div className={`soet-field-group ${className}`.trim()}>
            {label && (
                <label htmlFor={id} className="soet-field-label">
                    <span>{label}</span>
                    {required && (
                        <span className="soet-field-required" aria-hidden="true">*</span>
                    )}
                </label>
            )}

            {React.isValidElement(children)
                ? React.cloneElement(children, {
                    id: id || children.props.id,
                    required: required || children.props.required,
                    'aria-invalid': error ? true : undefined,
                    'aria-describedby': [errorId, helperId].filter(Boolean).join(' ') || undefined,
                    className: `${children.props.className || ''} ${error ? 'is-invalid' : ''}`.trim()
                })
                : children
            }

            {error && (
                <div id={errorId} className="soet-field-error" role="alert">
                    {error}
                </div>
            )}

            {!error && helper && (
                <div id={helperId} className="soet-field-helper">
                    {helper}
                </div>
            )}
        </div>
    );
}
