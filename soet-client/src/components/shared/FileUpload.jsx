import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';
import './shared.css';

/**
 * Shared FileUpload Component
 * Specs:
 * - Real <input type="file"> visually hidden but accessible
 * - 1px dashed rgba(30,23,96,.3) box on cream-50
 * - 96x96 preview tile with object-URL rendering
 * - Secondary "Choose file" button
 * - Shows selected file name or "No file chosen"
 */
export default function FileUpload({
    id,
    name,
    accept,
    onChange,
    previewUrl: initialPreviewUrl,
    helperText,
    buttonText = 'Choose file',
    disabled = false,
    className = '',
    ...props
}) {
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [previewUrl, setPreviewUrl] = useState(initialPreviewUrl || null);

    useEffect(() => {
        if (initialPreviewUrl) {
            setPreviewUrl(initialPreviewUrl);
        }
    }, [initialPreviewUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            if (file.type.startsWith('image/')) {
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
            } else {
                setPreviewUrl(null);
            }
        } else {
            setFileName('');
            setPreviewUrl(initialPreviewUrl || null);
        }

        if (onChange) {
            onChange(e);
        }
    };

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className={`soet-file-box ${className}`.trim()}>
            <input
                ref={inputRef}
                id={id}
                name={name}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                disabled={disabled}
                className="visually-hidden-file-input"
                style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0
                }}
                {...props}
            />

            <div className="soet-file-preview-tile" aria-hidden="true">
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="soet-file-preview-img" />
                ) : (
                    <i className="fas fa-image soet-file-preview-icon"></i>
                )}
            </div>

            <div className="soet-file-content">
                <div className="soet-file-trigger-row">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        icon="fas fa-folder-open"
                        onClick={handleButtonClick}
                        disabled={disabled}
                    >
                        {buttonText}
                    </Button>
                    <span className={`soet-file-name ${!fileName ? 'is-empty' : ''}`}>
                        {fileName || 'No file chosen'}
                    </span>
                </div>
                {helperText && (
                    <span className="soet-field-helper" style={{ margin: 0 }}>
                        {helperText}
                    </span>
                )}
            </div>
        </div>
    );
}
