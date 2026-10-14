import React from 'react';
import './shared.css';

/**
 * Shared StatusBadge Component
 * Specs:
 * - Colour is NEVER the only signal (always icon + text)
 * - Approved / Verified / Active = indigo-100 bg + indigo-800 text + check icon
 * - Pending = cream-200 bg + maroon-900 text + clock icon
 * - Rejected / Blocked / Failed = maroon-100 bg + maroon-700 text + x icon
 * - Draft / Inactive = indigo-100 at 50% + muted text + circle icon
 * - 13px/600, 28px tall, pill
 */
const STATUS_CONFIGS = {
    approved: {
        className: 'soet-badge-approved',
        icon: 'fas fa-check-circle',
        label: 'Approved'
    },
    verified: {
        className: 'soet-badge-verified',
        icon: 'fas fa-check-circle',
        label: 'Verified'
    },
    active: {
        className: 'soet-badge-active',
        icon: 'fas fa-check-circle',
        label: 'Active'
    },
    pending: {
        className: 'soet-badge-pending',
        icon: 'fas fa-clock',
        label: 'Pending'
    },
    rejected: {
        className: 'soet-badge-rejected',
        icon: 'fas fa-times-circle',
        label: 'Rejected'
    },
    blocked: {
        className: 'soet-badge-blocked',
        icon: 'fas fa-ban',
        label: 'Blocked'
    },
    failed: {
        className: 'soet-badge-failed',
        icon: 'fas fa-times-circle',
        label: 'Failed'
    },
    draft: {
        className: 'soet-badge-draft',
        icon: 'fas fa-circle',
        label: 'Draft'
    },
    inactive: {
        className: 'soet-badge-inactive',
        icon: 'fas fa-minus-circle',
        label: 'Inactive'
    }
};

export default function StatusBadge({
    status = 'pending',
    label,
    className = ''
}) {
    const key = String(status).toLowerCase();
    const config = STATUS_CONFIGS[key] || {
        className: 'soet-badge-draft',
        icon: 'fas fa-info-circle',
        label: status
    };

    const displayLabel = label || config.label;

    return (
        <span className={`soet-badge ${config.className} ${className}`.trim()}>
            <i className={`${config.icon} soet-badge-icon`} aria-hidden="true"></i>
            <span>{displayLabel}</span>
        </span>
    );
}
