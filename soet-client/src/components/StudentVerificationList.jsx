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
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCourse, setFilterCourse] = useState('');
    const [tab, setTab] = useState('pending');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (tab === 'pending') {
            fetchPending();
        } else {
            fetchVerified();
        }
    }, [tab]);

    const fetchPending = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/staff/students/pending');
            setStudents(res.data || []);
            setSelectedStudents([]);
        } catch (error) {
            toast.error("Failed to load pending students");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchVerified = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/staff/students/verified');
            setStudents(res.data || []);
            setSelectedStudents([]);
        } catch (error) {
            toast.error("Failed to load verified students");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudents(filteredStudents.map(s => s._id));
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
            toast.success("Student approved and ID card activated");
            if (tab === 'pending') fetchPending(); else fetchVerified();
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to approve student");
        }
    };

    const handleReject = async (id) => {
        if (!rejectionReason.trim()) {
            toast.error("Rejection reason is required");
            return;
        }
        try {
            await api.put(`/staff/students/${id}/verify`, { status: 'rejected', reason: rejectionReason });
            toast.success("Student registration rejected");
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
            toast.success(`Successfully approved ${selectedStudents.length} students`);
            fetchPending();
        } catch (error) {
            toast.error("Bulk approval failed");
        }
    };

    const filteredStudents = students.filter(s => {
        const name = (s.name || '').toLowerCase();
        const enrollment = (s.enrollmentNo || '').toLowerCase();
        const term = searchTerm.toLowerCase();
        const matchesSearch = name.includes(term) || enrollment.includes(term);
        const matchesCourse = filterCourse ? s.course === filterCourse : true;
        return matchesSearch && matchesCourse;
    });

    const uniqueCourses = [...new Set(students.map(s => s.course).filter(Boolean))];

    return (
        <div>
            {/* Tabs Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid rgba(30, 23, 96, 0.08)',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        type="button"
                        onClick={() => setTab('pending')}
                        style={{
                            padding: '12px 20px',
                            border: 'none',
                            background: 'transparent',
                            borderBottom: tab === 'pending' ? '3px solid #8B1A3D' : '3px solid transparent',
                            color: tab === 'pending' ? '#8B1A3D' : '#6B6787',
                            fontWeight: tab === 'pending' ? 800 : 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fas fa-clock"></i>
                        <span>Pending Verifications</span>
                        {tab === 'pending' && students.length > 0 && (
                            <span style={{
                                backgroundColor: '#8B1A3D',
                                color: '#ffffff',
                                borderRadius: '999px',
                                padding: '1px 7px',
                                fontSize: '11px',
                                fontWeight: 700
                            }}>
                                {students.length}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setTab('verified')}
                        style={{
                            padding: '12px 20px',
                            border: 'none',
                            background: 'transparent',
                            borderBottom: tab === 'verified' ? '3px solid #8B1A3D' : '3px solid transparent',
                            color: tab === 'verified' ? '#8B1A3D' : '#6B6787',
                            fontWeight: tab === 'verified' ? 800 : 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fas fa-check-circle"></i>
                        <span>Verified Students</span>
                    </button>
                </div>

                {/* Bulk Action Button */}
                {tab === 'pending' && selectedStudents.length > 0 && (
                    <button
                        type="button"
                        onClick={handleBulkApprove}
                        className="soet-btn soet-btn-primary soet-btn-sm"
                        style={{ backgroundColor: '#047857', border: 'none' }}
                    >
                        <i className="fas fa-check-double"></i>
                        <span>Approve Selected ({selectedStudents.length})</span>
                    </button>
                )}
            </div>

            {/* Filter Controls Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                backgroundColor: '#F8F7FC',
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(30, 23, 96, 0.08)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
                    <div style={{
                        position: 'relative',
                        flex: 1
                    }}>
                        <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888', fontSize: '13px' }}></i>
                        <input
                            type="text"
                            placeholder="Search by student name or enrollment number..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '9px 12px 9px 34px',
                                borderRadius: '8px',
                                border: '1px solid rgba(30, 23, 96, 0.15)',
                                fontSize: '13.5px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <select
                        value={filterCourse}
                        onChange={e => setFilterCourse(e.target.value)}
                        style={{
                            padding: '9px 14px',
                            borderRadius: '8px',
                            border: '1px solid rgba(30, 23, 96, 0.15)',
                            fontSize: '13.5px',
                            backgroundColor: '#ffffff',
                            color: '#1E1760',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="">All Programs / Courses</option>
                        {uniqueCourses.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div style={{ fontSize: '13px', color: '#6B6787', fontWeight: 500 }}>
                    Showing <strong>{filteredStudents.length}</strong> {filteredStudents.length === 1 ? 'student' : 'students'}
                </div>
            </div>

            {/* Students Table */}
            {isLoading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#6B6787' }}>
                    <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '24px', color: '#8B1A3D', marginBottom: '10px' }}></i>
                    <div>Loading records...</div>
                </div>
            ) : filteredStudents.length === 0 ? (
                <div style={{
                    padding: '48px 20px',
                    textAlign: 'center',
                    backgroundColor: '#FAFAFD',
                    borderRadius: '12px',
                    border: '1px dashed rgba(30, 23, 96, 0.15)',
                    color: '#6B6787'
                }}>
                    <i className="fas fa-user-slash" style={{ fontSize: '32px', color: '#9CA3AF', marginBottom: '12px' }}></i>
                    <h3 style={{ margin: '0 0 4px 0', color: '#1E1760', fontSize: '1rem', fontWeight: 700 }}>
                        {tab === 'pending' ? 'No pending student verifications' : 'No verified students found'}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px' }}>
                        {searchTerm || filterCourse ? 'Try clearing your search filters above.' : 'All incoming student registrations have been reviewed.'}
                    </p>
                </div>
            ) : (
                <div style={{
                    overflowX: 'auto',
                    borderRadius: '12px',
                    border: '1px solid rgba(30, 23, 96, 0.1)'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#ffffff',
                        textAlign: 'left',
                        fontSize: '13.5px'
                    }}>
                        <thead>
                            <tr style={{
                                backgroundColor: '#F8F7FC',
                                borderBottom: '2px solid rgba(30, 23, 96, 0.08)',
                                color: '#1E1760',
                                fontWeight: 700,
                                fontSize: '12.5px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em'
                            }}>
                                {tab === 'pending' && (
                                    <th style={{ padding: '14px 16px', width: '40px' }}>
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                                        />
                                    </th>
                                )}
                                <th style={{ padding: '14px 16px' }}>Student Photo</th>
                                <th style={{ padding: '14px 16px' }}>Name & Enrollment</th>
                                <th style={{ padding: '14px 16px' }}>Course & Branch</th>
                                <th style={{ padding: '14px 16px' }}>Session / Batch</th>
                                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(s => {
                                const isSelected = selectedStudents.includes(s._id);
                                const photoUrl = s.photo ? (s.photo.startsWith('http') ? s.photo : (s.photo.startsWith('/') ? s.photo : `/${s.photo}`)) : null;

                                return (
                                    <tr
                                        key={s._id}
                                        style={{
                                            borderBottom: '1px solid rgba(30, 23, 96, 0.06)',
                                            backgroundColor: isSelected ? '#FFF8F9' : 'transparent',
                                            transition: 'background-color 0.15s ease'
                                        }}
                                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(30, 23, 96, 0.02)'; }}
                                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        {tab === 'pending' && (
                                            <td style={{ padding: '14px 16px' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleSelect(s._id)}
                                                />
                                            </td>
                                        )}
                                        <td style={{ padding: '14px 16px' }}>
                                            {photoUrl ? (
                                                <img
                                                    src={photoUrl}
                                                    alt={s.name}
                                                    style={{
                                                        width: '44px',
                                                        height: '44px',
                                                        borderRadius: '8px',
                                                        objectFit: 'cover',
                                                        border: '1px solid rgba(0,0,0,0.1)'
                                                    }}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                style={{
                                                    width: '44px',
                                                    height: '44px',
                                                    borderRadius: '8px',
                                                    backgroundColor: '#E8E6FA',
                                                    color: '#2B2185',
                                                    display: photoUrl ? 'none' : 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 700,
                                                    fontSize: '16px'
                                                }}
                                            >
                                                {(s.name || 'S').charAt(0).toUpperCase()}
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <div style={{ fontWeight: 700, color: '#1E1760', fontSize: '14px' }}>
                                                {s.name}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#6B6787', marginTop: '2px', fontFamily: 'monospace' }}>
                                                {s.enrollmentNo || 'No Enrollment No'}
                                            </div>
                                            {s.fatherName && (
                                                <div style={{ fontSize: '11px', color: '#888', marginTop: '1px' }}>
                                                    S/D of {s.fatherName}
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <div style={{ fontWeight: 600, color: '#1E1760' }}>
                                                {s.course || 'B.Tech'}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#6B6787', marginTop: '1px' }}>
                                                {s.branch?.name || s.department || 'Engineering'}
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 16px', color: '#3F3B5C' }}>
                                            <div>{s.sessionBatch || '2023-2027'}</div>
                                            <div style={{ fontSize: '11px', color: '#888' }}>
                                                Sem: {s.semester || 1}
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                                            {rejectingId === s._id ? (
                                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                    <input
                                                        type="text"
                                                        placeholder="Specify rejection reason..."
                                                        value={rejectionReason}
                                                        onChange={e => setRejectionReason(e.target.value)}
                                                        style={{
                                                            padding: '6px 10px',
                                                            borderRadius: '6px',
                                                            border: '1px solid #E11D48',
                                                            fontSize: '12px',
                                                            outline: 'none',
                                                            width: '180px'
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReject(s._id)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            backgroundColor: '#E11D48',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '12px',
                                                            fontWeight: 600,
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setRejectingId(null); setRejectionReason(''); }}
                                                        style={{
                                                            padding: '6px 10px',
                                                            backgroundColor: '#eee',
                                                            color: '#333',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '12px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                                    {tab === 'pending' && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleApprove(s._id)}
                                                                title="Approve & Verify"
                                                                style={{
                                                                    padding: '7px 14px',
                                                                    backgroundColor: '#047857',
                                                                    color: '#ffffff',
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    fontSize: '12.5px',
                                                                    fontWeight: 600,
                                                                    cursor: 'pointer',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '6px',
                                                                    transition: 'background 0.15s ease'
                                                                }}
                                                            >
                                                                <i className="fas fa-check"></i>
                                                                <span>Approve</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setRejectingId(s._id)}
                                                                title="Reject registration"
                                                                style={{
                                                                    padding: '7px 12px',
                                                                    backgroundColor: '#FEE2E2',
                                                                    color: '#B91C1C',
                                                                    border: '1px solid #FCA5A5',
                                                                    borderRadius: '8px',
                                                                    fontSize: '12.5px',
                                                                    fontWeight: 600,
                                                                    cursor: 'pointer',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}
                                                            >
                                                                <i className="fas fa-times"></i>
                                                                <span>Reject</span>
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewStudent(s)}
                                                        title="Preview Digital ID Card"
                                                        style={{
                                                            padding: '7px 14px',
                                                            backgroundColor: '#E8E6FA',
                                                            color: '#1E1760',
                                                            border: '1px solid rgba(30, 23, 96, 0.15)',
                                                            borderRadius: '8px',
                                                            fontSize: '12.5px',
                                                            fontWeight: 600,
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '6px'
                                                        }}
                                                    >
                                                        <i className="fas fa-id-card"></i>
                                                        <span>Preview ID</span>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ID Card Modal */}
            {previewStudent && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(20, 16, 58, 0.7)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '28px',
                        borderRadius: '20px',
                        maxWidth: '820px',
                        width: '100%',
                        position: 'relative',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#1E1760' }}>
                                    Official Student Digital ID Card
                                </h3>
                                <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6B6787' }}>
                                    Verifying credentials for {previewStudent.name} ({previewStudent.enrollmentNo})
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreviewStudent(null)}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    border: '1px solid #ddd',
                                    background: '#F8F7FC',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <IdCard student={previewStudent} />
                    </div>
                </div>
            )}
        </div>
    );
}
