import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from '../components/NotificationBell';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function TpoDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('directory');
    const [branches, setBranches] = useState([]);
    
    const [students, setStudents] = useState([]);
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

    useEffect(() => {
        axios.get(`${API_URL}/api/branches`, { withCredentials: true })
            .then(res => setBranches(res.data))
            .catch(() => toast.error('Failed to load branches'));
    }, []);

    useEffect(() => {
        if (activeTab === 'directory') {
            fetchStudents();
        }
    }, [pagination.page, sort.field, sort.order, activeTab]);

    const fetchStudents = async () => {
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
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, page: 1 });
        fetchStudents();
    };

    const handleSort = (field) => {
        setSort(prev => ({
            field,
            order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const exportData = (type) => {
        // Fetch ALL matching data for export (using limit=1000 or a specific export endpoint, but for now we fetch up to 1000)
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
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>TPO Panel</h2>
                <nav>
                    <ul>
                        <li><a href="#" onClick={() => setActiveTab('directory')} className={activeTab === 'directory' ? 'active' : ''}>🎓 Student Directory</a></li>
                        <li><a href="#" onClick={() => navigate('/alumni-directory')}>🏛️ Alumni Directory</a></li>
                        <li><a href="#" onClick={() => navigate('/job-referrals')}>💼 Job Referrals</a></li>
                        <li><a href="#" onClick={() => navigate('/manage-announcements')}>📢 Announcements</a></li>
                    </ul>
                </nav>
            </aside>
            <main className="dashboard-main">
                <header>
                    <h1>TPO Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button onClick={() => navigate('/chat')} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Chat Rooms</button>
                        <button onClick={() => navigate('/notifications/send')} style={{ background: '#0056b3', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Send Notification</button>
                        <NotificationBell />
                        <button onClick={logout} className="logout-btn">Logout</button>
                    </div>
                </header>
                <div className="dashboard-content" style={{ padding: '20px' }}>
                    {activeTab === 'directory' && (
                        <div>
                            {/* Filters */}
                            <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                <form onSubmit={handleFilterSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
                                    <div><label>Search</label><br/><input type="text" value={filters.search} onChange={e=>setFilters({...filters, search: e.target.value})} placeholder="Name, Email, EN..." style={{padding:'5px'}} /></div>
                                    <div><label>Branch</label><br/>
                                        <select value={filters.branch} onChange={e=>setFilters({...filters, branch: e.target.value})} style={{padding:'5px'}}>
                                            <option value="">All</option>
                                            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                                        </select>
                                    </div>
                                    <div><label>Year</label><br/>
                                        <select value={filters.currentYear} onChange={e=>setFilters({...filters, currentYear: e.target.value})} style={{padding:'5px'}}>
                                            <option value="">All</option>
                                            {[1,2,3,4].map(y => <option key={y} value={y}>Year {y}</option>)}
                                        </select>
                                    </div>
                                    <div><label>Semester</label><br/><input type="number" value={filters.semester} onChange={e=>setFilters({...filters, semester: e.target.value})} style={{padding:'5px', width:'60px'}} /></div>
                                    <div><label>Min CGPA</label><br/><input type="number" step="0.01" value={filters.minCgpa} onChange={e=>setFilters({...filters, minCgpa: e.target.value})} style={{padding:'5px', width:'70px'}} /></div>
                                    <div><label>Max CGPA</label><br/><input type="number" step="0.01" value={filters.maxCgpa} onChange={e=>setFilters({...filters, maxCgpa: e.target.value})} style={{padding:'5px', width:'70px'}} /></div>
                                    <div><label>Placement</label><br/>
                                        <select value={filters.placementStatus} onChange={e=>setFilters({...filters, placementStatus: e.target.value})} style={{padding:'5px'}}>
                                            <option value="">All</option>
                                            <option value="Unplaced">Unplaced</option>
                                            <option value="Placed">Placed</option>
                                            <option value="Not Interested">Not Interested</option>
                                        </select>
                                    </div>
                                    <div><label>Internships</label><br/>
                                        <select value={filters.hasInternship} onChange={e=>setFilters({...filters, hasInternship: e.target.value})} style={{padding:'5px'}}>
                                            <option value="">Any</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div><label>Achievement</label><br/>
                                        <select value={filters.achievementCategory} onChange={e=>setFilters({...filters, achievementCategory: e.target.value})} style={{padding:'5px'}}>
                                            <option value="">Any</option>
                                            <option value="academic">Academic</option>
                                            <option value="hackathon">Hackathon</option>
                                            <option value="technical">Technical</option>
                                            <option value="sports">Sports</option>
                                            <option value="cultural">Cultural</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn-primary" style={{padding:'6px 12px'}}>Filter</button>
                                </form>
                            </div>

                            {/* Toolbar */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => exportData('xlsx')} style={{ padding:'5px 10px', background:'#28a745', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer' }}>Export Excel</button>
                                    <button onClick={() => exportData('csv')} style={{ padding:'5px 10px', background:'#17a2b8', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer' }}>Export CSV</button>
                                </div>
                                <div className="column-chooser" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <strong style={{ fontSize: '0.9rem' }}>Columns:</strong>
                                    {Object.keys(columns).map(col => (
                                        <label key={col} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                            <input type="checkbox" checked={columns[col]} onChange={() => setColumns({...columns, [col]: !columns[col]})} />
                                            {col}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Table */}
                            <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #ddd' }}>
                                <table className="table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ background: '#f4f4f4', textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                                            {columns.enrollmentNo && <th style={{ padding: '10px', cursor:'pointer' }} onClick={()=>handleSort('enrollmentNo')}>EN No {sort.field==='enrollmentNo' && (sort.order==='asc'?'▲':'▼')}</th>}
                                            {columns.name && <th style={{ padding: '10px', cursor:'pointer' }} onClick={()=>handleSort('name')}>Name {sort.field==='name' && (sort.order==='asc'?'▲':'▼')}</th>}
                                            {columns.branch && <th style={{ padding: '10px' }}>Branch</th>}
                                            {columns.currentYear && <th style={{ padding: '10px', cursor:'pointer' }} onClick={()=>handleSort('currentYear')}>Year {sort.field==='currentYear' && (sort.order==='asc'?'▲':'▼')}</th>}
                                            {columns.cgpa && <th style={{ padding: '10px', cursor:'pointer' }} onClick={()=>handleSort('currentCgpa')}>CGPA {sort.field==='currentCgpa' && (sort.order==='asc'?'▲':'▼')}</th>}
                                            {columns.placementStatus && <th style={{ padding: '10px', cursor:'pointer' }} onClick={()=>handleSort('placementStatus')}>Placement {sort.field==='placementStatus' && (sort.order==='asc'?'▲':'▼')}</th>}
                                            {columns.email && <th style={{ padding: '10px' }}>Email</th>}
                                            {columns.phone && <th style={{ padding: '10px' }}>Phone</th>}
                                            {columns.skills && <th style={{ padding: '10px' }}>Skills</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(s => (
                                            <tr key={s._id} onClick={() => openStudentDetails(s.user._id || s.user)} style={{ borderBottom: '1px solid #eee', cursor: 'pointer' }} className="table-row-hover">
                                                {columns.enrollmentNo && <td style={{ padding: '10px' }}>{s.enrollmentNo}</td>}
                                                {columns.name && <td style={{ padding: '10px' }}>{s.name}</td>}
                                                {columns.branch && <td style={{ padding: '10px' }}>{s.branch?.name}</td>}
                                                {columns.currentYear && <td style={{ padding: '10px' }}>{s.currentYear} (Sem {s.semester})</td>}
                                                {columns.cgpa && <td style={{ padding: '10px', fontWeight: 'bold', color: s.currentCgpa >= 8 ? 'green' : 'inherit' }}>{s.currentCgpa?.toFixed(2) || 'N/A'}</td>}
                                                {columns.placementStatus && <td style={{ padding: '10px' }}>{s.placementStatus}</td>}
                                                {columns.email && <td style={{ padding: '10px' }}>{s.email}</td>}
                                                {columns.phone && <td style={{ padding: '10px' }}>{s.phone}</td>}
                                                {columns.skills && <td style={{ padding: '10px' }}>{(s.skills||[]).slice(0,3).join(', ')}{(s.skills?.length > 3 ? '...' : '')}</td>}
                                            </tr>
                                        ))}
                                        {students.length === 0 && (
                                            <tr><td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>No students found matching filters.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                                <span>Showing {students.length} of {pagination.total}</span>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <button disabled={pagination.page === 1} onClick={() => setPagination({...pagination, page: pagination.page - 1})} style={{ padding: '5px 10px' }}>Prev</button>
                                    <span style={{ padding: '5px 10px' }}>Page {pagination.page} of {pagination.pages}</span>
                                    <button disabled={pagination.page === pagination.pages || pagination.pages === 0} onClick={() => setPagination({...pagination, page: pagination.page + 1})} style={{ padding: '5px 10px' }}>Next</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Student Detail Modal */}
            {selectedStudent && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: '8px', width: '900px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '20px' }}>
                            <h2>Student Details</h2>
                            <button onClick={() => { setSelectedStudent(null); setStudentDetails(null); }} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>
                        
                        {!studentDetails ? <p>Loading details...</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                {/* Profile Info */}
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <img src={`${API_URL}${studentDetails.profile.photo}`} alt="Student" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ccc' }} />
                                    <div>
                                        <h3 style={{ margin: '0 0 5px 0' }}>{studentDetails.profile.name} ({studentDetails.profile.enrollmentNo})</h3>
                                        <p style={{ margin: '0 0 5px 0' }}>{studentDetails.profile.course} - {studentDetails.profile.department} | Batch: {studentDetails.profile.sessionBatch}</p>
                                        <p style={{ margin: '0 0 5px 0' }}>Email: {studentDetails.profile.email} | Phone: {studentDetails.profile.phone}</p>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: 'var(--primary-blue)' }}>Current CGPA: {studentDetails.profile.currentCgpa?.toFixed(2)} | Status: {studentDetails.profile.placementStatus}</p>
                                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                            {studentDetails.profile.resumeFile && <a href={`${API_URL}${studentDetails.profile.resumeFile}`} target="_blank" rel="noreferrer" style={{ background: '#0056b3', color: '#fff', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem' }}>Resume</a>}
                                            {studentDetails.profile.linkedin && <a href={studentDetails.profile.linkedin} target="_blank" rel="noreferrer" style={{ background: '#0077b5', color: '#fff', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem' }}>LinkedIn</a>}
                                            {studentDetails.profile.github && <a href={studentDetails.profile.github} target="_blank" rel="noreferrer" style={{ background: '#333', color: '#fff', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem' }}>GitHub</a>}
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                    {/* Academics */}
                                    <div style={{ flex: '1 1 300px' }}>
                                        <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Academic Records (SGPA/CGPA)</h4>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                            <tbody>
                                                {studentDetails.academics.map(a => (
                                                    <tr key={a._id} style={{ borderBottom: '1px solid #eee' }}>
                                                        <td style={{ padding: '5px' }}>Sem {a.semester}</td>
                                                        <td style={{ padding: '5px' }}>SGPA: <strong>{a.sgpa}</strong></td>
                                                        <td style={{ padding: '5px' }}>CGPA: <strong>{a.cgpa}</strong></td>
                                                        <td style={{ padding: '5px' }}>Backlogs: {a.backlogs}</td>
                                                    </tr>
                                                ))}
                                                {studentDetails.academics.length === 0 && <tr><td>No academic records provided.</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Internships & Projects */}
                                    <div style={{ flex: '1 1 300px' }}>
                                        <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Internships & Projects</h4>
                                        <div style={{ fontSize: '0.85rem' }}>
                                            <strong>Internships:</strong>
                                            <ul style={{ paddingLeft: '20px', margin: '5px 0 15px 0' }}>
                                                {studentDetails.profile.internships?.map((i, idx) => (
                                                    <li key={idx}><strong>{i.role}</strong> at {i.company} ({i.duration})</li>
                                                ))}
                                                {(!studentDetails.profile.internships || studentDetails.profile.internships.length === 0) && <li>None</li>}
                                            </ul>
                                            
                                            <strong>Skills:</strong>
                                            <p style={{ margin: '5px 0 15px 0' }}>{(studentDetails.profile.skills || []).join(', ') || 'None listed'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements */}
                                <div>
                                    <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Achievements</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        {studentDetails.achievements.map(ach => (
                                            <div key={ach._id} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '4px', background: '#fdfdfd' }}>
                                                <h5 style={{ margin: '0 0 5px 0' }}>{ach.title}</h5>
                                                <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: '#666' }}>{ach.category.toUpperCase()} | {new Date(ach.date).toLocaleDateString()}</p>
                                                <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem' }}>{ach.description}</p>
                                                {ach.certificateFile && <a href={`${API_URL}${ach.certificateFile}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary-red)' }}>Certificate</a>}
                                            </div>
                                        ))}
                                        {studentDetails.achievements.length === 0 && <p style={{ fontSize: '0.85rem' }}>No achievements listed.</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{__html:`
                .table-row-hover:hover {
                    background-color: #f1f8ff !important;
                }
            `}} />
        </div>
    );
}
