import React, { useRef } from 'react';
import './shared.css';

/**
 * Shared Tabs Component
 * Specs:
 * - Pill tab list in a white container with 1px border and 6px padding
 * - Active = maroon-700 bg + explicit white text
 * - Inactive = indigo-800 text
 * - Arrow-key navigation, aria-selected, role="tablist"
 */
export default function Tabs({
    tabs = [],
    activeTab,
    onChange,
    className = ''
}) {
    const listRef = useRef(null);

    const handleKeyDown = (e, index) => {
        let nextIndex = index;
        if (e.key === 'ArrowRight') {
            nextIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
            nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else {
            return;
        }

        e.preventDefault();
        const nextTab = tabs[nextIndex];
        if (nextTab && onChange) {
            onChange(nextTab.key);
            const buttons = listRef.current?.querySelectorAll('button');
            buttons?.[nextIndex]?.focus();
        }
    };

    return (
        <div
            ref={listRef}
            className={`soet-tabs-container ${className}`.trim()}
            role="tablist"
            aria-orientation="horizontal"
        >
            {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.key;
                return (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        className={`soet-tab-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => onChange && onChange(tab.key)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                    >
                        {tab.icon && (
                            <span aria-hidden="true">
                                {typeof tab.icon === 'string' ? <i className={tab.icon}></i> : tab.icon}
                            </span>
                        )}
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                            <span
                                style={{
                                    fontSize: '11px',
                                    padding: '2px 6px',
                                    borderRadius: '999px',
                                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--indigo-100, #E8E6FA)',
                                    color: isActive ? '#ffffff' : 'var(--indigo-900, #1E1760)'
                                }}
                            >
                                {tab.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
