import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import DashboardLayout from '../components/shared/DashboardLayout';
import { getRoleNavItems } from '../utils/dashboardNav';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function TpoDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
    const [filters, setFilters] = useState({
        search: '',
        branch: '',
        currentYear: '',
        semester: '',
        sessionBatch: '',
        minCgpa: '',
        maxCgpa: '',
        placementStatus: '',
        hasInternship: '',
        achievementCategory: ''
    });
    const [sort, setSort] = useState({ field: 'name', order: 'asc' });

    // Column visibility toggle
    const [columns, setColumns] = useState({
        enrollmentNo: true,
        name: true,
        branch: true,
        currentYear: true,
        cgpa: true,
        placementStatus: true,
        email: false,
        phone: false,
        skills: false
    });

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);

    const navItems = getRoleNavItems('tpo', 'directory');

    useEffect(() => {
        axios.get(`${API_URL}/api/branches`, { withCredentials: true })
            .then(res => setBranches(res.data))
            .catch(() => toast.error('Failed to load branches'));
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [pagination.page, sort.field, sort.order]);

    const fetchStudents = async () => {
        setLoadingStudents(true);
        try {
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                sort: sort.field,
                order: sort.order,
                ...filters
            };
            const res = await axios.get(`${API_URL}/api/tpo/students`, { params, withCredentials: true });
            setStudents(res.data.data);
            setPagination(res.data.pagination);
        } catch (error) {
            toast.error('Failed to fetch students');
        } finally {
            setLoadingStudents(false);
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchStudents();
    };

    const handleSort = (field) => {
        setSort(prev => ({
            field,
            order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const exportData = (type) => {
        axios.get(`${API_URL}/api/tpo/students`, {
            params: { ...filters, limit: 10000 },
            withCredentials: true
        }).then(res => {
            const data = res.data.data.map(s => ({
                'Enrollment No': s.enrollmentNo,
                'Name': s.name,
                'Email': s.email,
                'Phone': s.phone,
                'Branch': s.branch?.name,
                'Year': s.currentYear,
                'Semester': s.semester,
                'Session': s.sessionBatch,
                'CGPA': s.currentCgpa,
                'Placement Status': s.placementStatus,
                'Skills': (s.skills || []).join(', ')
            }));
            
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Students");
            
            if (type === 'csv') {
                XLSX.writeFile(wb, 'students_export.csv');
            } else {
                XLSX.writeFile(wb, 'students_export.xlsx');
            }
            toast.success(`Exported ${data.length} records`);
        }).catch(() => toast.error('Export failed'));
    };

    const openStudentDetails = async (id) => {
        setSelectedStudent(id);
        try {
            const res = await axios.get(`${API_URL}/api/tpo/students/${id}`, { withCredentials: true });
            setStudentDetails(res.data);
        } catch (error) {
            toast.error('Failed to load student details');
            setSelectedStudent(null);
        }
    };

    return (
        <DashboardLayout
            title="Training & Placement Console"
            subtitle="Student talent directory, recruitment criteria, and verified skill profiles"
            navItems={navItems}
            activeKey="directory"
            headerActions={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <Link
                        to="/chat"
                        id="tpo-chat-btn"
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

                    <Link
                        to="/notifications/send"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 14px',
                            background: '#1E1760',
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '13px',
                            textDecoration: 'none'
                        }}
                    >
                        <i className="fas fa-paper-plane" />
                        <span>Send Alert</span>
                    </Link>
                </div>
            }
        >
            {/* Filter Card */}
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid #E8E6FA',
                    padding: '20px 24px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#1E1760', fontSize: '15px' }}>
                        <i className="fas fa-filter" style={{ color: '#4F46E5' }} />
                        <span>Filter &amp; Query Student Profiles</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            type="button"
                            onClick={() => exportData('xlsx')}
                            style={{
                                padding: '6px 14px',
                                background: '#10B981',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <i className="fas fa-file-excel" /> Excel
                        </button>
                        <button
                            type="button"
                            onClick={() => exportData('csv')}
                            style={{
                                padding: '6px 14px',
                                background: '#3B82F6',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <i className="fas fa-file-csv" /> CSV
                        </button>
                    </div>
                </div>

                <form onSubmit={handleFilterSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Keyword Search</label>
                        <input
                            type="text"
                            value={filters.search}
                            onChange={e => setFilters({ ...filters, search: e.target.value })}
                            placeholder="Name, Email, EN..."
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Branch</label>
                        <select
                            value={filters.branch}
                            onChange={e => setFilters({ ...filters, branch: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        >
                            <option value="">All Branches</option>
                            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Year of Study</label>
                        <select
                            value={filters.currentYear}
                            onChange={e => setFilters({ ...filters, currentYear: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        >
                            <option value="">All Years</option>
                            {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Min CGPA</label>
                        <input
                            type="number"
                            step="0.01"
                            value={filters.minCgpa}
                            onChange={e => setFilters({ ...filters, minCgpa: e.target.value })}
                            placeholder="e.g. 7.5"
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Placement Status</label>
                        <select
                            value={filters.placementStatus}
                            onChange={e => setFilters({ ...filters, placementStatus: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        >
                            <option value="">All Statuses</option>
                            <option value="Unplaced">Unplaced</option>
                            <option value="Placed">Placed</option>
                            <option value="Not Interested">Not Interested</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Internship Experience</label>
                        <select
                            value={filters.hasInternship}
                            onChange={e => setFilters({ ...filters, hasInternship: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
                        >
                            <option value="">Any</option>
                            <option value="true">Has Completed Internship</option>
                            <option value="false">No Prior Internship</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
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
                            <i className="fas fa-search" /> Apply Filter
                        </button>
                    </div>
                </form>

                {/* Column Visibility Toggles */}
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>Visible Columns:</span>
                    {Object.keys(columns).map(col => (
                        <label key={col} style={{ fontSize: '12px', color: '#4B5563', display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={columns[col]}
                                onChange={() => setColumns({ ...columns, [col]: !columns[col] })}
                                style={{ accentColor: '#1E1760' }}
                            />
                            <span style={{ textTransform: 'capitalize' }}>{col}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Students Table */}
            <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #E8E6FA', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E1760' }}>
                        Showing {students.length} of {pagination.total} registered student profiles
                    </span>
                    {loadingStudents && (
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            <i className="fas fa-circle-notch fa-spin" /> Querying...
                        </span>
                    )}
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontWeight: 700 }}>
                                {columns.enrollmentNo && (
                                    <th style={{ padding: '12px 20px', cursor: 'pointer' }} onClick={() => handleSort('enrollmentNo')}>
                                        EN No {sort.field === 'enrollmentNo' && (sort.order === 'asc' ? '▲' : '▼')}
                                    </th>
                                )}
                                {columns.name && (
                                    <th style={{ padding: '12px 20px', cursor: 'pointer' }} onClick={() => handleSort('name')}>
                                        Student Name {sort.field === 'name' && (sort.order === 'asc' ? '▲' : '▼')}
                                    </th>
                                )}
                                {columns.branch && <th style={{ padding: '12px 20px' }}>Department</th>}
                                {columns.currentYear && (
                                    <th style={{ padding: '12px 20px', cursor: 'pointer' }} onClick={() => handleSort('currentYear')}>
                                        Year {sort.field === 'currentYear' && (sort.order === 'asc' ? '▲' : '▼')}
                                    </th>
                                )}
                                {columns.cgpa && (
                                    <th style={{ padding: '12px 20px', cursor: 'pointer' }} onClick={() => handleSort('currentCgpa')}>
                                        CGPA {sort.field === 'currentCgpa' && (sort.order === 'asc' ? '▲' : '▼')}
                                    </th>
                                )}
                                {columns.placementStatus && (
                                    <th style={{ padding: '12px 20px', cursor: 'pointer' }} onClick={() => handleSort('placementStatus')}>
                                        Placement {sort.field === 'placementStatus' && (sort.order === 'asc' ? '▲' : '▼')}
                                    </th>
                                )}
                                {columns.email && <th style={{ padding: '12px 20px' }}>Email</th>}
                                {columns.phone && <th style={{ padding: '12px 20px' }}>Phone</th>}
                                {columns.skills && <th style={{ padding: '12px 20px' }}>Skills</th>}
                                <th style={{ padding: '12px 20px', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr
                                    key={s._id}
                                    onClick={() => openStudentDetails(s.user?._id || s.user)}
                                    style={{ borderBottom: '1px solid #F3F4F6', cursor: 'pointer', transition: 'background 0.1s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                                >
                                    {columns.enrollmentNo && <td style={{ padding: '14px 20px', fontWeight: 600, color: '#1E1760' }}>{s.enrollmentNo}</td>}
                                    {columns.name && (
                                        <td style={{ padding: '14px 20px' }}>
                                            <div style={{ fontWeight: 700, color: '#1E1760' }}>{s.name}</div>
                                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Roll: {s.rollNo || 'N/A'}</div>
                                        </td>
                                    )}
                                    {columns.branch && (
                                        <td style={{ padding: '14px 20px' }}>
                                            <span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                                                {s.branch?.name || '-'}
                                            </span>
                                        </td>
                                    )}
                                    {columns.currentYear && <td style={{ padding: '14px 20px', color: '#4B5563' }}>Year {s.currentYear} (Sem {s.semester})</td>}
                                    {columns.cgpa && (
                                        <td style={{ padding: '14px 20px' }}>
                                            <span style={{ fontWeight: 800, color: (s.currentCgpa || 0) >= 8 ? '#047857' : (s.currentCgpa || 0) >= 6.5 ? '#1E1760' : '#DC2626' }}>
                                                {s.currentCgpa ? s.currentCgpa.toFixed(2) : 'N/A'}
                                            </span>
                                        </td>
                                    )}
                                    {columns.placementStatus && (
                                        <td style={{ padding: '14px 20px' }}>
                                            <span
                                                style={{
                                                    padding: '3px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    background: s.placementStatus === 'Placed' ? '#ECFDF5' : s.placementStatus === 'Unplaced' ? '#FFFBEB' : '#F3F4F6',
                                                    color: s.placementStatus === 'Placed' ? '#047857' : s.placementStatus === 'Unplaced' ? '#B45309' : '#4B5563',
                                                    border: `1px solid ${s.placementStatus === 'Placed' ? '#A7F3D0' : '#FDE68A'}`
                                                }}
                                            >
                                                {s.placementStatus || 'Unplaced'}
                                            </span>
                                        </td>
                                    )}
                                    {columns.email && <td style={{ padding: '14px 20px', color: '#4B5563' }}>{s.email}</td>}
                                    {columns.phone && <td style={{ padding: '14px 20px', color: '#4B5563' }}>{s.phone}</td>}
                                    {columns.skills && (
                                        <td style={{ padding: '14px 20px', color: '#4B5563' }}>
                                            {(s.skills || []).slice(0, 3).join(', ')}{(s.skills?.length > 3 ? '...' : '')}
                                        </td>
                                    )}
                                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                        <button
                                            type="button"
                                            style={{
                                                padding: '5px 10px',
                                                background: '#EEF2FF',
                                                color: '#4F46E5',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            View Dossier
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {students.length === 0 && (
                                <tr>
                                    <td colSpan="10" style={{ padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
                                        <i className="fas fa-search fa-2x" style={{ marginBottom: '8px', display: 'block', color: '#D1D5DB' }} />
                                        No student records match the active criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination footer */}
                <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>
                        Page {pagination.page} of {pagination.pages || 1} ({pagination.total} records total)
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                            disabled={pagination.page === 1}
                            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                background: pagination.page === 1 ? '#F3F4F6' : '#ffffff',
                                color: pagination.page === 1 ? '#9CA3AF' : '#1E1760',
                                cursor: pagination.page === 1 ? 'not-allowed' : 'pointer',
                                fontSize: '12px',
                                fontWeight: 600
                            }}
                        >
                            Previous
                        </button>
                        <button
                            disabled={pagination.page === pagination.pages || pagination.pages === 0}
                            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                background: (pagination.page === pagination.pages || pagination.pages === 0) ? '#F3F4F6' : '#ffffff',
                                color: (pagination.page === pagination.pages || pagination.pages === 0) ? '#9CA3AF' : '#1E1760',
                                cursor: (pagination.page === pagination.pages || pagination.pages === 0) ? 'not-allowed' : 'pointer',
                                fontSize: '12px',
                                fontWeight: 600
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Student Detail Modal */}
            {selectedStudent && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(20, 16, 58, 0.65)',
                        backdropFilter: 'blur(3px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '16px',
                            width: '850px',
                            maxWidth: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            padding: '28px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E8E6FA', paddingBottom: '16px', marginBottom: '20px' }}>
                            <div>
                                <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 800, color: '#1E1760' }}>
                                    Comprehensive Student Dossier
                                </h2>
                                <span style={{ fontSize: '12px', color: '#6B7280' }}>
                                    Verified training &amp; placement background check
                                </span>
                            </div>
                            <button
                                onClick={() => { setSelectedStudent(null); setStudentDetails(null); }}
                                style={{
                                    background: '#F3F4F6',
                                    border: 'none',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                    color: '#4B5563',
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>
                        </div>
                        
                        {!studentDetails ? (
                            <div style={{ padding: '40px', textAlign: 'center' }}>
                                <i className="fas fa-circle-notch fa-spin fa-2x" style={{ color: '#1E1760', marginBottom: '12px' }} />
                                <p style={{ margin: 0, fontWeight: 600 }}>Loading comprehensive dossier...</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Profile Info */}
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#F9FAFB', padding: '16px', borderRadius: '12px' }}>
                                    {studentDetails.profile?.photo ? (
                                        <img
                                            src={`${API_URL}${studentDetails.profile.photo}`}
                                            alt="Student"
                                            style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '10px', border: '2px solid #E5E7EB' }}
                                        />
                                    ) : (
                                        <div style={{ width: '90px', height: '90px', borderRadius: '10px', background: '#1E1760', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 800 }}>
                                            {(studentDetails.profile?.name || 'S').charAt(0)}
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#1E1760' }}>
                                            {studentDetails.profile?.name} ({studentDetails.profile?.enrollmentNo})
                                        </h3>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#4B5563' }}>
                                            {studentDetails.profile?.course} • {studentDetails.profile?.department} | Batch: {studentDetails.profile?.sessionBatch}
                                        </p>
                                        <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280' }}>
                                            Email: {studentDetails.profile?.email} | Phone: {studentDetails.profile?.phone}
                                        </p>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {studentDetails.profile?.resumeFile && (
                                                <a href={`${API_URL}${studentDetails.profile.resumeFile}`} target="_blank" rel="noreferrer" style={{ background: '#1E1760', color: '#fff', padding: '5px 12px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>
                                                    <i className="fas fa-file-pdf" /> View Resume
                                                </a>
                                            )}
                                            {studentDetails.profile?.linkedin && (
                                                <a href={studentDetails.profile.linkedin} target="_blank" rel="noreferrer" style={{ background: '#0A66C2', color: '#fff', padding: '5px 12px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>
                                                    <i className="fab fa-linkedin" /> LinkedIn
                                                </a>
                                            )}
                                            {studentDetails.profile?.github && (
                                                <a href={studentDetails.profile.github} target="_blank" rel="noreferrer" style={{ background: '#24292F', color: '#fff', padding: '5px 12px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>
                                                    <i className="fab fa-github" /> GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    {/* Academics */}
                                    <div style={{ background: '#ffffff', border: '1px solid #E8E6FA', borderRadius: '12px', padding: '16px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#1E1760', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                                            Academic Semester Performance
                                        </h4>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                            <tbody>
                                                {studentDetails.academics.map(a => (
                                                    <tr key={a._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                                        <td style={{ padding: '6px 4px', fontWeight: 600 }}>Sem {a.semester}</td>
                                                        <td style={{ padding: '6px 4px' }}>SGPA: <strong>{a.sgpa}</strong></td>
                                                        <td style={{ padding: '6px 4px' }}>CGPA: <strong>{a.cgpa}</strong></td>
                                                        <td style={{ padding: '6px 4px', color: a.backlogs > 0 ? '#DC2626' : '#047857' }}>
                                                            Backlogs: {a.backlogs}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {studentDetails.academics.length === 0 && (
                                                    <tr><td colSpan="4" style={{ padding: '12px 0', color: '#9CA3AF' }}>No academic records on file.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Internships & Skills */}
                                    <div style={{ background: '#ffffff', border: '1px solid #E8E6FA', borderRadius: '12px', padding: '16px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#1E1760', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                                            Internships &amp; Practical Experience
                                        </h4>
                                        <div style={{ fontSize: '12px' }}>
                                            <ul style={{ paddingLeft: '18px', margin: '0 0 12px 0', color: '#4B5563' }}>
                                                {studentDetails.profile?.internships?.map((i, idx) => (
                                                    <li key={idx} style={{ marginBottom: '4px' }}>
                                                        <strong>{i.role}</strong> at {i.company} ({i.duration})
                                                    </li>
                                                ))}
                                                {(!studentDetails.profile?.internships || studentDetails.profile.internships.length === 0) && (
                                                    <li style={{ color: '#9CA3AF' }}>No industry internships reported</li>
                                                )}
                                            </ul>
                                            
                                            <strong style={{ color: '#1E1760' }}>Technical Skills:</strong>
                                            <p style={{ margin: '4px 0 0 0', color: '#6B7280' }}>
                                                {(studentDetails.profile?.skills || []).join(', ') || 'No skills listed'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements */}
                                <div style={{ background: '#ffffff', border: '1px solid #E8E6FA', borderRadius: '12px', padding: '16px' }}>
                                    <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#1E1760', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                                        Verified Co-Curricular &amp; Hackathon Achievements
                                    </h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                                        {studentDetails.achievements.map(ach => (
                                            <div key={ach._id} style={{ border: '1px solid #E5E7EB', padding: '12px', borderRadius: '8px', background: '#F9FAFB' }}>
                                                <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 700, color: '#1E1760' }}>{ach.title}</h5>
                                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>
                                                    {ach.category} • {new Date(ach.date).toLocaleDateString()}
                                                </p>
                                                <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#4B5563' }}>{ach.description}</p>
                                                {ach.certificateFile && (
                                                    <a href={`${API_URL}${ach.certificateFile}`} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: '#4F46E5', fontWeight: 600 }}>
                                                        <i className="fas fa-certificate" /> View Certificate
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                        {studentDetails.achievements.length === 0 && (
                                            <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>No verified achievements on file.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
