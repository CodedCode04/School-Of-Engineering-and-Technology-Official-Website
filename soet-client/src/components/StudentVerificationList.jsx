import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import IdCard from './IdCard';

export default function StudentVerificationList() {
    const { api } = useAuth();
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [rejectionReason, setRejectionReason] = useState('');
    const [rejectingId, setRejectingId] = useState(null);
    const [previewStudent, setPreviewStudent] = useState(null);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = async () => {
        try {
            const res = await api.get('/staff/students/pending');
            setStudents(res.data);
            setSelectedStudents([]);
        } catch (error) {
            toast.error("Failed to load pending students");
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudents(students.map(s => s._id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelect = (id) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(selectedStudents.filter(sid => sid !== id));
        } else {
            setSelectedStudents([...selectedStudents, id]);
        }
    };

    const handleApprove = async (id) => {
        try {
            await api.put(`/staff/students/${id}/verify`, { status: 'verified' });
            toast.success("Student approved");
            fetchPending();
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to approve");
        }
    };

    const handleReject = async (id) => {
        if (!rejectionReason.trim()) {
            toast.error("Rejection reason is required");
            return;
        }
        try {
            await api.put(`/staff/students/${id}/verify`, { status: 'rejected', reason: rejectionReason });
            toast.success("Student rejected");
            setRejectingId(null);
            setRejectionReason('');
            fetchPending();
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to reject");
        }
    };

    const handleBulkApprove = async () => {
        if (selectedStudents.length === 0) return;
        try {
            await api.put(`/staff/students/bulk-verify`, { studentIds: selectedStudents });
            toast.success("Bulk approval successful");
            fetchPending();
        } catch (error) {
            toast.error("Bulk approval failed");
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCourse, setFilterCourse] = useState('');
    const [tab, setTab] = useState('pending');

    useEffect(() => {
        if (tab === 'pending') {
            fetchPending();
        } else {
            fetchVerified();
        }
    }, [tab]);

    const fetchVerified = async () => {
        try {
            const res = await api.get('/staff/students/verified');
            setStudents(res.data);
            setSelectedStudents([]);
        } catch (error) {
            toast.error("Failed to load verified students");
        }
    };

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              s.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = filterCourse ? s.course === filterCourse : true;
        return matchesSearch && matchesCourse;
    });

    const uniqueCourses = [...new Set(students.map(s => s.course))];

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '2px solid #ccc' }}>
                <button 
                    onClick={() => setTab('pending')}
                    style={{ padding: '10px 20px', border: 'none', background: 'none', borderBottom: tab === 'pending' ? '3px solid #8B1F41' : 'none', fontWeight: tab === 'pending' ? 'bold' : 'normal', cursor: 'pointer' }}>
                    Pending Verifications
                </button>
                <button 
                    onClick={() => setTab('verified')}
                    style={{ padding: '10px 20px', border: 'none', background: 'none', borderBottom: tab === 'verified' ? '3px solid #8B1F41' : 'none', fontWeight: tab === 'verified' ? 'bold' : 'normal', cursor: 'pointer' }}>
                    Verified Students
                </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h3>{tab === 'pending' ? 'Pending Verifications' : 'Verified Students'}</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Search name or enrollment..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <select 
                        value={filterCourse} 
                        onChange={e => setFilterCourse(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        <option value="">All Courses</option>
                        {uniqueCourses.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {tab === 'pending' && (
                        <button 
                            onClick={handleBulkApprove}
                            disabled={selectedStudents.length === 0}
                            style={{ padding: '8px 16px', background: selectedStudents.length > 0 ? '#28a745' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px', cursor: selectedStudents.length > 0 ? 'pointer' : 'not-allowed' }}
                        >
                            Approve Selected ({selectedStudents.length})
                        </button>
                    )}
                </div>
            </div>

            {filteredStudents.length === 0 ? (
                <p>No students match your criteria.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                            <th style={{ padding: '12px' }}>
                                <input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0} />
                            </th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Photo</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Details</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Branch</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(s => (
                            <tr key={s._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}>
                                    <input type="checkbox" checked={selectedStudents.includes(s._id)} onChange={() => handleSelect(s._id)} />
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <img src={`/api${s.photo}`} alt={s.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <strong>{s.name}</strong> ({s.enrollmentNo})<br/>
                                    <small>{s.course} - {s.department} (Batch: {s.sessionBatch})</small>
                                </td>
                                <td style={{ padding: '12px' }}>{s.branch?.name}</td>
                                <td style={{ padding: '12px' }}>
                                    {rejectingId === s._id ? (
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type="text" placeholder="Reason..." value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} style={{ padding: '4px' }} />
                                            <button onClick={() => handleReject(s._id)} style={{ padding: '4px 8px', background: '#dc3545', color: '#fff', border: 'none' }}>Confirm</button>
                                            <button onClick={() => setRejectingId(null)} style={{ padding: '4px 8px' }}>Cancel</button>
                                        </div>
                                    ) : (
                                        <>
                                            {tab === 'pending' && (
                                                <>
                                                    <button onClick={() => handleApprove(s._id)} style={{ marginRight: '5px', padding: '6px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
                                                    <button onClick={() => setRejectingId(s._id)} style={{ marginRight: '5px', padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reject</button>
                                                </>
                                            )}
                                            <button onClick={() => setPreviewStudent(s)} style={{ padding: '6px 12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Preview ID</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {previewStudent && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '800px', width: '100%', position: 'relative' }}>
                        <button onClick={() => setPreviewStudent(null)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
                        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>ID Card Preview</h2>
                        <IdCard student={previewStudent} />
                    </div>
                </div>
            )}
        </div>
    );
}
