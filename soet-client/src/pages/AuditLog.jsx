import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function AuditLog() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        actor: '',
        action: '',
        startDate: '',
        endDate: '',
        entity: ''
    });

    const navItems = getRoleNavItems('admin', 'audit-logs');

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/audit-logs`, { params: filters });
            setLogs(res.data);
        } catch (error) {
            toast.error('Failed to fetch audit logs');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = (e) => {
        e.preventDefault();
        fetchLogs();
    };

    const clearFilters = () => {
        setFilters({ actor: '', action: '', startDate: '', endDate: '', entity: '' });
        setTimeout(fetchLogs, 100);
    };

    const getActionBadge = (action) => {
        switch (action) {
            case 'CREATE':
                return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' };
            case 'UPDATE':
                return { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' };
            case 'DELETE':
                return { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' };
            default:
                return { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB' };
        }
    };

    return (
        <DashboardLayout
            title="System Audit Logs"
            subtitle="Immutable security trail of administrative actions, curriculum updates, and user authorizations"
            navItems={navItems}
            activeKey="audit-logs"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="audit-chat-btn"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 14px',
                            background: '#10B981',
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none',
                            boxShadow: '0 2px 4px rgba(16, 185, 129, 0.25)',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <i className="fas fa-comments" />
                        <span>Chat Rooms</span>
                        <span style={{
                            background: '#047857',
                            color: '#fff',
                            fontSize: '10px',
                            padding: '2px 5px',
                            borderRadius: '10px',
                            textTransform: 'uppercase'
                        }}>Live</span>
                    </Link>
                </div>
            }
        >
            {/* Filter Bar */}
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid #E8E6FA',
                    padding: '20px 24px',
                    marginBottom: '24px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontWeight: 700, color: '#1E1760', fontSize: '15px' }}>
                    <i className="fas fa-filter" style={{ color: '#4F46E5' }} />
                    <span>Filter Security Audit Trail</span>
                </div>

                <form onSubmit={applyFilters} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Action Type</label>
                        <select
                            name="action"
                            value={filters.action}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        >
                            <option value="">All Actions</option>
                            <option value="CREATE">CREATE</option>
                            <option value="UPDATE">UPDATE</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Target Entity</label>
                        <select
                            name="entity"
                            value={filters.entity}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        >
                            <option value="">All Entities</option>
                            <option value="Syllabus">Syllabus</option>
                            <option value="Announcement">Announcement</option>
                            <option value="User">User Account</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: '9px 16px',
                                background: '#1E1760',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: 700,
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                            }}
                        >
                            <i className="fas fa-search" /> Filter
                        </button>
                        <button
                            type="button"
                            onClick={clearFilters}
                            style={{
                                padding: '9px 14px',
                                background: '#F3F4F6',
                                color: '#4B5563',
                                border: '1px solid #D1D5DB',
                                borderRadius: '6px',
                                fontWeight: 600,
                                fontSize: '13px',
                                cursor: 'pointer'
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            {/* Audit Log Table */}
            <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E1760' }}>
                        Showing {logs.length} logged system events
                    </span>
                    {loading && (
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            <i className="fas fa-circle-notch fa-spin" /> Querying logs...
                        </span>
                    )}
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontWeight: 700 }}>
                                <th style={{ padding: '12px 20px' }}>Timestamp</th>
                                <th style={{ padding: '12px 20px' }}>Actor</th>
                                <th style={{ padding: '12px 20px' }}>Action</th>
                                <th style={{ padding: '12px 20px' }}>Target Entity</th>
                                <th style={{ padding: '12px 20px' }}>Audit Payload &amp; Diffs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => {
                                const b = getActionBadge(log.action);
                                return (
                                    <tr key={log._id} style={{ borderBottom: '1px solid #F3F4F6', verticalAlign: 'top' }}>
                                        <td style={{ padding: '14px 20px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                                            <i className="fas fa-clock" style={{ marginRight: '6px', color: '#9CA3AF' }} />
                                            {new Date(log.createdAt).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '14px 20px' }}>
                                            {log.actor ? (
                                                <div>
                                                    <div style={{ fontWeight: 700, color: '#1E1760' }}>{log.actor.name}</div>
                                                    <span style={{ fontSize: '11px', color: '#4F46E5', background: '#EEF2FF', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, textTransform: 'uppercase' }}>
                                                        {log.actor.role}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span style={{ color: '#9CA3AF', fontStyle: 'italic' }}>System Automation</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <span
                                                style={{
                                                    padding: '3px 8px',
                                                    borderRadius: '6px',
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    background: b.bg,
                                                    color: b.color,
                                                    border: `1px solid ${b.border}`
                                                }}
                                            >
                                                {log.action}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 20px', fontWeight: 600, color: '#1E1760' }}>
                                            {log.entity}
                                        </td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <details style={{ cursor: 'pointer' }}>
                                                <summary style={{ color: '#4F46E5', fontWeight: 600, fontSize: '12px' }}>
                                                    Inspect Log Changes
                                                </summary>
                                                <div style={{ marginTop: '10px', background: '#F9FAFB', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }}>
                                                    {log.beforeSummary && (
                                                        <div style={{ marginBottom: '8px' }}>
                                                            <strong style={{ color: '#DC2626' }}>Previous State:</strong>
                                                            <pre style={{ margin: '4px 0 0 0', background: '#fff', padding: '8px', borderRadius: '4px', border: '1px solid #E5E7EB', overflowX: 'auto' }}>
                                                                {JSON.stringify(log.beforeSummary, null, 2)}
                                                            </pre>
                                                        </div>
                                                    )}
                                                    {log.afterSummary && (
                                                        <div>
                                                            <strong style={{ color: '#047857' }}>Updated State:</strong>
                                                            <pre style={{ margin: '4px 0 0 0', background: '#fff', padding: '8px', borderRadius: '4px', border: '1px solid #E5E7EB', overflowX: 'auto' }}>
                                                                {JSON.stringify(log.afterSummary, null, 2)}
                                                            </pre>
                                                        </div>
                                                    )}
                                                </div>
                                            </details>
                                        </td>
                                    </tr>
                                );
                            })}

                            {!loading && logs.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
                                        <i className="fas fa-clipboard-check fa-2x" style={{ marginBottom: '8px', display: 'block', color: '#D1D5DB' }} />
                                        No audit events found matching the specified parameters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
