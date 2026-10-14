import React, { useEffect, useRef } from 'react';
import Button from './Button';
import './shared.css';

/**
 * Shared Dialog Component (confirm and form modals)
 * Specs:
 * - Centered, max-width 520px (form dialogs 720px), 16px radius, 32px padding
 * - Overlay indigo-950/60, focus trap, Esc closes
 * - Buttons right-aligned (secondary left of primary)
 * - Destructive confirm uses danger button
 */
export default function Dialog({
    isOpen = false,
    onClose,
    title,
    children,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    isDestructive = false,
    isForm = false,
    loading = false,
    className = ''
}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen && onClose) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            dialogRef.current?.focus();
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="soet-dialog-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget && onClose) onClose();
            }}
            role="presentation"
        >
            <div
                ref={dialogRef}
                className={`soet-dialog-content ${isForm ? 'is-form' : ''} ${className}`.trim()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'soet-dialog-title' : undefined}
                tabIndex={-1}
            >
                <div className="soet-dialog-header">
                    {title && (
                        <h2 id="soet-dialog-title" className="soet-dialog-title">
                            {title}
                        </h2>
                    )}
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="soet-dialog-close"
                            aria-label="Close dialog"
                        >
                            <i className="fas fa-times" aria-hidden="true"></i>
                        </button>
                    )}
                </div>

                <div className="soet-dialog-body">
                    {children}
                </div>

                {(onConfirm || onClose) && (
                    <div className="soet-dialog-footer">
                        {onClose && (
                            <Button
                                variant="secondary"
                                onClick={onClose}
                                disabled={loading}
                            >
                                {cancelText}
                            </Button>
                        )}
                        {onConfirm && (
                            <Button
                                variant={isDestructive ? 'danger' : 'primary'}
                                onClick={onConfirm}
                                loading={loading}
                            >
                                {confirmText}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
