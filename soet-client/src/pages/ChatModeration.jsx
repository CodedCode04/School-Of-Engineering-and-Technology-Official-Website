import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

export default function ChatModeration() {
    const { api, user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    const handleBlock = async (userId, blocked) => {
        try {
            await api.put(`/admin/users/${userId}/chat-block`, { 
                blocked, 
                reason: blocked ? 'Violated chat guidelines' : '',
                until: blocked ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null // 7 days block by default, can be extended
            });
            toast.success(`User chat access ${blocked ? 'blocked' : 'restored'}`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update chat block');
        }
    };

    return (
        <Layout>
            <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ marginBottom: '20px' }}>Chat Moderation</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Chat Status</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(u => u.role !== 'admin').map(u => (
                            <tr key={u._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}>{u.name}</td>
                                <td style={{ padding: '12px' }}>{u.email}</td>
                                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{u.role}</td>
                                <td style={{ padding: '12px' }}>
                                    {u.chatBlock?.blocked ? (
                                        <span style={{ color: 'red' }}>
                                            Blocked {u.chatBlock.until ? `until ${new Date(u.chatBlock.until).toLocaleDateString()}` : ''}
                                        </span>
                                    ) : (
                                        <span style={{ color: 'green' }}>Active</span>
                                    )}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {u.chatBlock?.blocked ? (
                                        <button onClick={() => handleBlock(u._id, false)} style={{ padding: '4px 8px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>Unblock Chat</button>
                                    ) : (
                                        <button onClick={() => handleBlock(u._id, true)} style={{ padding: '4px 8px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>Block Chat</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
