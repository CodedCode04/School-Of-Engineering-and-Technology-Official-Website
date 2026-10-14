import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/shared/DashboardLayout';
import Card from '../components/shared/Card';
import { getRoleNavItems, getRoleDashboardRoute } from '../utils/dashboardNav';

export default function ManageSyllabus() {
    const { user, api } = useAuth();
    const navigate = useNavigate();
    const [syllabi, setSyllabi] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        branch: '',
        semester: 1,
        subjectName: '',
        subjectCode: '',
        content: '',
        file: null
    });

    const role = user?.role || 'hod';
    const navItems = getRoleNavItems(role, 'syllabus');
    const dashboardRoute = getRoleDashboardRoute(role);

    useEffect(() => {
        fetchBranches();
    }, []);

    useEffect(() => {
        if (selectedBranch) {
            fetchSyllabi();
        } else {
            setSyllabi([]);
        }
    }, [selectedBranch, selectedSemester]);

    const fetchBranches = async () => {
        try {
            const res = await api.get('/branches');
            const data = Array.isArray(res.data) ? res.data : [];
            setBranches(data);
            if (data.length > 0) {
                if (user?.role === 'hod' && user.branch) {
                    const branchId = user.branch._id || user.branch;
                    setSelectedBranch(branchId);
                } else {
                    setSelectedBranch(data[0]._id);
                }
            }
        } catch (error) {
            toast.error('Failed to fetch branches');
        }
    };

    const fetchSyllabi = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/syllabus', {
                params: { branch: selectedBranch, semester: selectedSemester }
            });
            const data = Array.isArray(res.data) ? res.data : [];
            setSyllabi(data);
        } catch (error) {
            toast.error('Failed to fetch syllabus data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('branch', formData.branch || selectedBranch);
            data.append('semester', formData.semester);
            data.append('subjectName', formData.subjectName);
            data.append('subjectCode', formData.subjectCode);
            data.append('content', formData.content);
            if (formData.file) {
                data.append('file', formData.file);
            }

            if (formData.id) {
                await api.put(`/syllabus/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Syllabus updated successfully');
            } else {
                if (!formData.file) return toast.error('Syllabus document (PDF) is required');
                await api.post(`/syllabus`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Syllabus subject added successfully');
            }
            setShowModal(false);
            fetchSyllabi();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save syllabus');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this syllabus entry?')) return;
        try {
            await api.delete(`/syllabus/${id}`);
            toast.success('Syllabus entry deleted');
            fetchSyllabi();
        } catch (error) {
            toast.error('Failed to delete syllabus');
        }
    };

    const openEditModal = (item) => {
        setFormData({
            id: item._id,
            branch: item.branch?._id || item.branch,
            semester: item.semester,
            subjectName: item.subjectName,
            subjectCode: item.subjectCode,
            content: item.content || '',
            file: null
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setFormData({
            id: null,
            branch: selectedBranch,
            semester: selectedSemester,
            subjectName: '',
            subjectCode: '',
            content: '',
            file: null
        });
        setShowModal(true);
    };

    const selectedBranchObj = branches.find(b => b._id === selectedBranch);

    return (
        <DashboardLayout
            title="Curriculum & Syllabus"
            subtitle="Manage branch schemes, subjects, and course outlines"
            navItems={navItems}
            activeKey="syllabus"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/chat')}
                        className="soet-btn soet-btn-secondary soet-btn-sm"
                    >
                        <i className="fas fa-comments" style={{ color: '#8B1A3D' }}></i>
                        <span>Chat Rooms</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(dashboardRoute)}
                        className="soet-btn soet-btn-secondary soet-btn-sm"
                    >
                        <i className="fas fa-th-large"></i>
                        <span>Dashboard</span>
                    </button>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Branch & Action Controls */}
                <Card padding="compact">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E1760' }}>
                                Engineering Branch:
                            </span>
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                disabled={Boolean(user?.role === 'hod' && user?.branch)}
                                style={{
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    border: '1.5px solid rgba(30, 23, 96, 0.2)',
                                    backgroundColor: '#ffffff',
                                    color: '#1E1760',
                                    fontWeight: 600,
                                    fontSize: '13.5px',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {branches.map(b => (
                                    <option key={b._id} value={b._id}>{b.name} ({b.code})</option>
                                ))}
                            </select>
                            {selectedBranchObj && (
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    padding: '4px 10px',
                                    borderRadius: '999px',
                                    backgroundColor: '#E8E6FA',
                                    color: '#1E1760'
                                }}>
                                    Code: {selectedBranchObj.code}
                                </span>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={openAddModal}
                            className="soet-btn soet-btn-primary soet-btn-sm"
                        >
                            <i className="fas fa-plus"></i>
                            <span>Add Subject to Sem {selectedSemester}</span>
                        </button>
                    </div>
                </Card>

                {/* Semester Selector Tabs */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '4px'
                }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
                        const isSelected = selectedSemester === sem;
                        return (
                            <button
                                key={sem}
                                type="button"
                                onClick={() => setSelectedSemester(sem)}
                                style={{
                                    padding: '10px 18px',
                                    borderRadius: '10px',
                                    border: isSelected ? '1px solid #8B1A3D' : '1px solid rgba(30, 23, 96, 0.1)',
                                    backgroundColor: isSelected ? '#8B1A3D' : '#ffffff',
                                    color: isSelected ? '#ffffff' : '#1E1760',
                                    fontWeight: isSelected ? 700 : 600,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.15s ease',
                                    boxShadow: isSelected ? '0 4px 12px rgba(139, 26, 61, 0.2)' : 'none'
                                }}
                            >
                                Semester {sem}
                            </button>
                        );
                    })}
                </div>

                {/* Syllabi Grid / Table */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1E1760' }}>
                                Semester {selectedSemester} Subjects & Scheme
                            </h3>
                            <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#6B6787' }}>
                                {selectedBranchObj?.name || 'Department'} Curriculum
                            </p>
                        </div>
                        <span style={{ fontSize: '13px', color: '#6B6787' }}>
                            <strong>{syllabi.length}</strong> {syllabi.length === 1 ? 'subject registered' : 'subjects registered'}
                        </span>
                    </div>

                    {isLoading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#6B6787' }}>
                            <i className="fas fa-circle-notch fa-spin" style={{ color: '#8B1A3D', fontSize: '24px', marginBottom: '8px' }}></i>
                            <div>Loading syllabus curriculum...</div>
                        </div>
                    ) : syllabi.length === 0 ? (
                        <div style={{
                            padding: '48px 20px',
                            textAlign: 'center',
                            backgroundColor: '#FAFAFD',
                            borderRadius: '12px',
                            border: '1px dashed rgba(30, 23, 96, 0.15)',
                            color: '#6B6787'
                        }}>
                            <i className="fas fa-book" style={{ fontSize: '32px', color: '#9CA3AF', marginBottom: '12px' }}></i>
                            <h4 style={{ margin: '0 0 6px 0', color: '#1E1760', fontSize: '1rem', fontWeight: 700 }}>
                                No syllabus records for Semester {selectedSemester}
                            </h4>
                            <p style={{ margin: '0 0 16px 0', fontSize: '13px' }}>
                                Upload the course structure and syllabus PDF document for this semester.
                            </p>
                            <button
                                type="button"
                                onClick={openAddModal}
                                className="soet-btn soet-btn-primary soet-btn-sm"
                            >
                                <i className="fas fa-plus"></i>
                                <span>Upload First Subject</span>
                            </button>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(30,23,96,0.08)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#F8F7FC', borderBottom: '2px solid rgba(30,23,96,0.08)', color: '#1E1760', fontWeight: 700 }}>
                                        <th style={{ padding: '12px 16px' }}>Code</th>
                                        <th style={{ padding: '12px 16px' }}>Subject Name</th>
                                        <th style={{ padding: '12px 16px' }}>Description / Outline</th>
                                        <th style={{ padding: '12px 16px' }}>Syllabus PDF</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {syllabi.map(item => (
                                        <tr key={item._id} style={{ borderBottom: '1px solid rgba(30,23,96,0.06)' }}>
                                            <td style={{ padding: '14px 16px' }}>
                                                <span style={{
                                                    fontFamily: 'monospace',
                                                    fontWeight: 700,
                                                    backgroundColor: '#E8E6FA',
                                                    color: '#1E1760',
                                                    padding: '3px 8px',
                                                    borderRadius: '6px',
                                                    fontSize: '12.5px'
                                                }}>
                                                    {item.subjectCode}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1E1760' }}>
                                                {item.subjectName}
                                            </td>
                                            <td style={{ padding: '14px 16px', color: '#6B6787', maxWidth: '300px' }}>
                                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {item.content || 'Standard university scheme & topics'}
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 16px' }}>
                                                {item.fileUrl ? (
                                                    <a
                                                        href={item.fileUrl.startsWith('http') ? item.fileUrl : item.fileUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '6px',
                                                            color: '#8B1A3D',
                                                            fontWeight: 600,
                                                            fontSize: '13px',
                                                            textDecoration: 'none'
                                                        }}
                                                    >
                                                        <i className="fas fa-file-pdf"></i>
                                                        <span>Download Scheme</span>
                                                    </a>
                                                ) : (
                                                    <span style={{ color: '#aaa', fontSize: '12px' }}>No file attached</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                                                <div style={{ display: 'inline-flex', gap: '6px' }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(item)}
                                                        title="Edit Subject"
                                                        style={{
                                                            padding: '6px 10px',
                                                            borderRadius: '6px',
                                                            border: '1px solid rgba(30,23,96,0.15)',
                                                            backgroundColor: '#fff',
                                                            color: '#1E1760',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item._id)}
                                                        title="Delete Subject"
                                                        style={{
                                                            padding: '6px 10px',
                                                            borderRadius: '6px',
                                                            border: '1px solid #FCA5A5',
                                                            backgroundColor: '#FEE2E2',
                                                            color: '#B91C1C',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>

            {/* Add / Edit Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(20, 16, 58, 0.65)',
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
                        maxWidth: '560px',
                        width: '100%',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1E1760' }}>
                                {formData.id ? 'Edit Subject Details' : 'Add New Subject Scheme'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: '1px solid #eee',
                                    background: '#F8F7FC',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#1E1760', marginBottom: '4px' }}>
                                        Subject Code *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. CS-501"
                                        value={formData.subjectCode}
                                        onChange={e => setFormData({ ...formData, subjectCode: e.target.value })}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '9px 12px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(30,23,96,0.2)',
                                            fontSize: '13.5px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#1E1760', marginBottom: '4px' }}>
                                        Subject Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Database Management Systems"
                                        value={formData.subjectName}
                                        onChange={e => setFormData({ ...formData, subjectName: e.target.value })}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '9px 12px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(30,23,96,0.2)',
                                            fontSize: '13.5px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#1E1760', marginBottom: '4px' }}>
                                    Curriculum Overview / Units
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Enter course modules, textbook references, or prerequisites..."
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '9px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(30,23,96,0.2)',
                                        fontSize: '13px',
                                        outline: 'none',
                                        resize: 'vertical',
                                        boxSizing: 'border-box'
                                    }}
                                ></textarea>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#1E1760', marginBottom: '4px' }}>
                                    Syllabus PDF File {formData.id ? '(Leave empty to keep existing)' : '*'}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        border: '1px dashed rgba(30,23,96,0.3)',
                                        fontSize: '13px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="soet-btn soet-btn-secondary soet-btn-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="soet-btn soet-btn-primary soet-btn-sm"
                                >
                                    <i className="fas fa-check"></i>
                                    <span>{formData.id ? 'Save Changes' : 'Upload Subject'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
