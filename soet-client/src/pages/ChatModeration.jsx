import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

export default function ChatModeration() {
    const { api } = useAuth();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const navItems = getRoleNavItems('admin', 'chat-moderation');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleBlock = async (userId, blocked) => {
        try {
            await api.put(`/admin/users/${userId}/chat-block`, { 
                blocked, 
                reason: blocked ? 'Violated chat guidelines' : '',
                until: blocked ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null
            });
            toast.success(`User chat privileges ${blocked ? 'suspended' : 'restored'}`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update chat block');
        }
    };

    const filteredUsers = users.filter(u => {
        if (u.role === 'admin') return false;
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
            (u.name && u.name.toLowerCase().includes(q)) ||
            (u.email && u.email.toLowerCase().includes(q)) ||
            (u.role && u.role.toLowerCase().includes(q))
        );
    });

    return (
        <DashboardLayout
            title="Chat Moderation Console"
            subtitle="Manage room communication privileges, handle user suspensions, and enforce guidelines"
            navItems={navItems}
            activeKey="chat-moderation"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                        to="/chat"
                        id="chat-mod-open-btn"
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
                        <span>Open Chat Rooms</span>
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
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Search Bar */}
                <div
                    style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #E8E6FA',
                        padding: '18px 24px',
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '14px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#1E1760', fontSize: '15px' }}>
                        <i className="fas fa-user-shield" style={{ color: '#F59E0B' }} />
                        <span>User Chat Privileges Directory</span>
                    </div>

                    <div style={{ position: 'relative', minWidth: '280px' }}>
                        <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: '13px' }} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or role..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px 12px 8px 34px',
                                borderRadius: '8px',
                                border: '1px solid #D1D5DB',
                                fontSize: '13px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                </div>

                {/* Table */}
                <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E1760' }}>
                            Showing {filteredUsers.length} active users
                        </span>
                        {loading && (
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>
                                <i className="fas fa-circle-notch fa-spin" /> Updating...
                            </span>
                        )}
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontWeight: 700 }}>
                                    <th style={{ padding: '12px 20px' }}>User Details</th>
                                    <th style={{ padding: '12px 20px' }}>Email</th>
                                    <th style={{ padding: '12px 20px' }}>Portal Role</th>
                                    <th style={{ padding: '12px 20px' }}>Chat Room Access</th>
                                    <th style={{ padding: '12px 20px', textAlign: 'right' }}>Moderation Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(u => {
                                    const isBlocked = u.chatBlock?.blocked;
                                    return (
                                        <tr key={u._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                            <td style={{ padding: '14px 20px' }}>
                                                <div style={{ fontWeight: 700, color: '#1E1760' }}>{u.name}</div>
                                                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>ID: {u._id}</div>
                                            </td>
                                            <td style={{ padding: '14px 20px', color: '#4B5563' }}>
                                                {u.email}
                                            </td>
                                            <td style={{ padding: '14px 20px' }}>
                                                <span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 20px' }}>
                                                {isBlocked ? (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                                                        <i className="fas fa-ban" /> Blocked {u.chatBlock.until ? `until ${new Date(u.chatBlock.until).toLocaleDateString()}` : ''}
                                                    </span>
                                                ) : (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                                                        <i className="fas fa-check-circle" /> Full Privileges
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                                {isBlocked ? (
                                                    <button
                                                        onClick={() => handleBlock(u._id, false)}
                                                        style={{
                                                            padding: '6px 14px',
                                                            background: '#10B981',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontWeight: 600,
                                                            fontSize: '12px',
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '5px'
                                                        }}
                                                    >
                                                        <i className="fas fa-unlock" /> Restore Access
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleBlock(u._id, true)}
                                                        style={{
                                                            padding: '6px 14px',
                                                            background: '#EF4444',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontWeight: 600,
                                                            fontSize: '12px',
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '5px'
                                                        }}
                                                    >
                                                        <i className="fas fa-ban" /> Suspend Chat
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
                                            <i className="fas fa-user-check fa-2x" style={{ marginBottom: '8px', display: 'block', color: '#D1D5DB' }} />
                                            No user accounts match current search criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
