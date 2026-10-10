import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function AuditLog() {
    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({
        actor: '',
        action: '',
        startDate: '',
        endDate: '',
        entity: ''
    });

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/audit-logs`, { params: filters });
            setLogs(res.data);
        } catch (error) {
            toast.error('Failed to fetch audit logs');
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

    return (
        <div className="dashboard-content" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h2>System Audit Logs</h2>
                <button onClick={() => window.history.back()} style={{ padding: '5px 10px', cursor: 'pointer' }}>Back to Dashboard</button>
            </div>
            
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <form onSubmit={applyFilters} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Action</label>
                        <select name="action" value={filters.action} onChange={handleFilterChange} style={{ padding: '8px' }}>
                            <option value="">All Actions</option>
                            <option value="CREATE">CREATE</option>
                            <option value="UPDATE">UPDATE</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Entity</label>
                        <select name="entity" value={filters.entity} onChange={handleFilterChange} style={{ padding: '8px' }}>
                            <option value="">All Entities</option>
                            <option value="Syllabus">Syllabus</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Start Date</label>
                        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} style={{ padding: '8px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>End Date</label>
                        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} style={{ padding: '8px' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className="btn-primary" style={{ padding: '8px 15px' }}>Filter</button>
                        <button type="button" onClick={clearFilters} style={{ padding: '8px 15px', cursor: 'pointer' }}>Clear</button>
                    </div>
                </form>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}>Date</th>
                            <th style={{ padding: '10px' }}>Actor</th>
                            <th style={{ padding: '10px' }}>Action</th>
                            <th style={{ padding: '10px' }}>Entity</th>
                            <th style={{ padding: '10px' }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log._id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>{new Date(log.createdAt).toLocaleString()}</td>
                                <td style={{ padding: '10px' }}>
                                    {log.actor ? (
                                        <div>
                                            <strong>{log.actor.name}</strong><br/>
                                            <small className="text-muted">{log.actor.role}</small>
                                        </div>
                                    ) : 'System'}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <span style={{ 
                                        padding: '3px 8px', 
                                        borderRadius: '12px', 
                                        fontSize: '0.8rem',
                                        backgroundColor: log.action === 'CREATE' ? '#d4edda' : log.action === 'UPDATE' ? '#fff3cd' : '#f8d7da',
                                        color: log.action === 'CREATE' ? '#155724' : log.action === 'UPDATE' ? '#856404' : '#721c24'
                                    }}>
                                        {log.action}
                                    </span>
                                </td>
                                <td style={{ padding: '10px' }}>{log.entity}</td>
                                <td style={{ padding: '10px' }}>
                                    <details>
                                        <summary style={{ cursor: 'pointer', color: 'var(--primary-blue)' }}>View Changes</summary>
                                        <div style={{ marginTop: '10px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
                                            {log.beforeSummary && (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <strong>Before:</strong>
                                                    <pre style={{ margin: 0, fontSize: '0.8rem', overflowX: 'auto' }}>
                                                        {JSON.stringify(log.beforeSummary, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                            {log.afterSummary && (
                                                <div>
                                                    <strong>After:</strong>
                                                    <pre style={{ margin: 0, fontSize: '0.8rem', overflowX: 'auto' }}>
                                                        {JSON.stringify(log.afterSummary, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </details>
                                </td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No audit logs found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
