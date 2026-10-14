import React from 'react';
import Card from './Card';
import './shared.css';

/**
 * Shared StatCard Component
 * Specs:
 * - Card with a 44px indigo-100 circle icon
 * - Big number (32px/800 indigo-800)
 * - Label (14px muted)
 * - Left-aligned, optional trend badge
 */
export default function StatCard({
    icon,
    value,
    label,
    trend,
    className = '',
    ...props
}) {
    return (
        <Card className={`soet-stat-card ${className}`.trim()} padding="compact" {...props}>
            {icon && (
                <div className="soet-stat-icon-circle" aria-hidden="true">
                    {typeof icon === 'string' ? <i className={icon}></i> : icon}
                </div>
            )}
            <div className="soet-stat-info">
                <div className="soet-stat-number">{value}</div>
                <div className="soet-stat-label">{label}</div>
                {trend && (
                    <div style={{ marginTop: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--indigo-600, #4A3FC0)' }}>
                        {trend}
                    </div>
                )}
            </div>
        </Card>
    );
}
