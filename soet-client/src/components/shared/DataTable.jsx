import React from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import StateCard from './StateCard';
import './shared.css';

/**
 * Shared DataTable Component
 * Specs:
 * - White Card wrapper with 0 padding
 * - Toolbar (search input 44px, filter dropdowns, action buttons) with 20px padding
 * - Table inside overflow-x: auto container with min-width
 * - Sticky header row (indigo-100 at 50% bg, 13px/700 uppercase mono labels, indigo-900 text)
 * - 56px rows, 1px dividers, hover cream-50, text 15px, cell padding 16px
 * - Row actions as 36px icon buttons with aria-label
 * - Footer with pagination (secondary buttons, "Showing X-Y of Z")
 * - Empty / loading / error states
 */
export default function DataTable({
    columns = [],
    data = [],
    loading = false,
    error = null,
    emptyMessage = 'No records found.',
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search records...',
    filters,
    actions,
    pagination,
    minWidth = '700px',
    className = ''
}) {
    const hasToolbar = onSearchChange || filters || actions;

    return (
        <Card padding="none" className={`soet-datatable-wrapper ${className}`.trim()}>
            {hasToolbar && (
                <div className="soet-datatable-toolbar">
                    {onSearchChange && (
                        <div className="soet-datatable-search">
                            <Input
                                type="text"
                                value={searchValue || ''}
                                onChange={onSearchChange}
                                placeholder={searchPlaceholder}
                            />
                        </div>
                    )}
                    {filters && (
                        <div className="soet-datatable-filters">
                            {filters}
                        </div>
                    )}
                    {actions && (
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                            {actions}
                        </div>
                    )}
                </div>
            )}

            <div className="soet-datatable-container">
                <table className="soet-table" style={{ minWidth }}>
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={col.key || idx}
                                    style={{
                                        width: col.width,
                                        textAlign: col.align || (col.numeric ? 'right' : 'left')
                                    }}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} style={{ padding: '40px', height: 'auto' }}>
                                    <StateCard variant="loading" />
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={columns.length} style={{ padding: '40px', height: 'auto' }}>
                                    <StateCard
                                        variant="error"
                                        title="Failed to Load Data"
                                        description={typeof error === 'string' ? error : 'An error occurred while fetching table data.'}
                                    />
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} style={{ padding: '40px', height: 'auto' }}>
                                    <StateCard
                                        variant="empty"
                                        title="No Data Available"
                                        description={emptyMessage}
                                    />
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIdx) => (
                                <tr key={row._id || row.id || rowIdx}>
                                    {columns.map((col, colIdx) => {
                                        const value = col.render ? col.render(row, rowIdx) : row[col.key];
                                        return (
                                            <td
                                                key={col.key || colIdx}
                                                className={col.numeric ? 'soet-col-number' : ''}
                                                style={{ textAlign: col.align || (col.numeric ? 'right' : 'left') }}
                                            >
                                                {value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="soet-datatable-footer">
                    <span>
                        Showing {pagination.from || 1} to {pagination.to || data.length} of {pagination.total || data.length} entries
                    </span>
                    <div className="soet-datatable-pagination">
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={pagination.page <= 1}
                            onClick={pagination.onPrev}
                        >
                            Previous
                        </Button>
                        <span style={{ padding: '0 8px', fontWeight: 600 }}>
                            Page {pagination.page || 1} of {pagination.totalPages || 1}
                        </span>
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={pagination.page >= pagination.totalPages}
                            onClick={pagination.onNext}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}
