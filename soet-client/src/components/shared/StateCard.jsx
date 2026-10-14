import React from 'react';
import Card from './Card';
import Button from './Button';
import './shared.css';

/**
 * Shared StateCard Component (loading / empty / error)
 * Specs:
 * - Centered card with a 64px icon circle
 * - 20px/700 title, 15px muted text, optional action button
 * - Loading = skeleton blocks (indigo-100, pulse off for reduced motion)
 */
export default function StateCard({
    variant = 'empty', // 'empty' | 'error' | 'loading'
    icon,
    title,
    description,
    actionText,
    onAction,
    actionButton,
    children,
    className = ''
}) {
    if (variant === 'loading') {
        return (
            <Card className={`soet-state-card ${className}`.trim()}>
                <div
                    className="soet-skeleton-block"
                    style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '20px' }}
                    aria-hidden="true"
                ></div>
                <div
                    className="soet-skeleton-block"
                    style={{ width: '200px', height: '24px', marginBottom: '12px' }}
                    aria-hidden="true"
                ></div>
                <div
                    className="soet-skeleton-block"
                    style={{ width: '300px', height: '16px', marginBottom: '8px' }}
                    aria-hidden="true"
                ></div>
                <div
                    className="soet-skeleton-block"
                    style={{ width: '240px', height: '16px' }}
                    aria-hidden="true"
                ></div>
                <span className="sr-only">Loading content...</span>
            </Card>
        );
    }

    const defaultIcon = variant === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-folder-open';
    const finalIcon = icon || defaultIcon;

    return (
        <Card className={`soet-state-card ${className}`.trim()}>
            <div className="soet-state-icon-circle" aria-hidden="true">
                <i className={finalIcon}></i>
            </div>
            {title && <h3 className="soet-state-title">{title}</h3>}
            {description && <p className="soet-state-text">{description}</p>}
            {children}
            {actionButton ? (
                actionButton
            ) : actionText && onAction ? (
                <Button variant={variant === 'error' ? 'secondary' : 'primary'} onClick={onAction}>
                    {actionText}
                </Button>
            ) : null}
        </Card>
    );
}
