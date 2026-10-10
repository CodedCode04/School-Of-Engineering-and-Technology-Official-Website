import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function ManageSyllabus() {
    const { user } = useAuth();
    const [syllabi, setSyllabi] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedSemester, setSelectedSemester] = useState(1);
    
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
            const res = await axios.get(`${API_URL}/api/branches`);
            setBranches(res.data);
            if (res.data.length > 0) {
                // Default to first branch if Admin, or own branch if HOD
                if (user?.role === 'hod' && user.branch) {
                    setSelectedBranch(user.branch);
                } else {
                    setSelectedBranch(res.data[0]._id);
                }
            }
        } catch (error) {
            toast.error('Failed to fetch branches');
        }
    };

    const fetchSyllabi = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/syllabus`, {
                params: { branch: selectedBranch, semester: selectedSemester }
            });
            setSyllabi(res.data);
        } catch (error) {
            toast.error('Failed to fetch syllabus data');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('branch', formData.branch);
            data.append('semester', formData.semester);
            data.append('subjectName', formData.subjectName);
            data.append('subjectCode', formData.subjectCode);
            data.append('content', formData.content);
            if (formData.file) {
                data.append('file', formData.file);
            }

            if (formData.id) {
                await axios.put(`${API_URL}/api/syllabus/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Syllabus updated successfully');
            } else {
                if (!formData.file) return toast.error('File is required for new syllabus');
                await axios.post(`${API_URL}/api/syllabus`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Syllabus added successfully');
            }
            setShowModal(false);
            fetchSyllabi();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save syllabus');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this syllabus?')) return;
        try {
            await axios.delete(`${API_URL}/api/syllabus/${id}`);
            toast.success('Syllabus deleted successfully');
            fetchSyllabi();
        } catch (error) {
            toast.error('Failed to delete syllabus');
        }
    };

    const openEditModal = (item) => {
        setFormData({
            id: item._id,
            branch: item.branch._id || item.branch,
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

    return (
        <div className="dashboard-content" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h2>Manage Syllabus</h2>
                <button onClick={() => window.history.back()} style={{ padding: '5px 10px', cursor: 'pointer' }}>Back to Dashboard</button>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
                <div>
                    <label>Branch: </label>
                    <select 
                        value={selectedBranch} 
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        style={{ padding: '8px', marginLeft: '10px' }}
                        disabled={user?.role === 'hod' && user.branch} // HOD restricted to own branch
                    >
                        {branches.map(b => (
                            <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                    </select>
                </div>
                <button className="btn-primary" onClick={openAddModal}>
                    <i className="fas fa-plus"></i> Add Subject
                </button>
            </div>

            {/* Semester Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <button
                        key={sem}
                        onClick={() => setSelectedSemester(sem)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: selectedSemester === sem ? 'var(--primary-blue)' : '#f0f0f0',
                            color: selectedSemester === sem ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Semester {sem}
                    </button>
                ))}
            </div>

            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px' }}>Subject Code</th>
                        <th style={{ padding: '10px' }}>Subject Name</th>
                        <th style={{ padding: '10px' }}>File</th>
                        <th style={{ padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {syllabi.map(item => (
                        <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{item.subjectCode}</td>
                            <td style={{ padding: '10px' }}>{item.subjectName}</td>
                            <td style={{ padding: '10px' }}>
                                <a href={`${API_URL}${item.file}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-blue)' }}>
                                    View PDF
                                </a>
                            </td>
                            <td style={{ padding: '10px' }}>
                                <button onClick={() => openEditModal(item)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(item._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {syllabi.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No syllabus records found for this semester.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '500px', maxWidth: '90%' }}>
                        <h3>{formData.id ? 'Edit Syllabus' : 'Add Syllabus'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                            <div>
                                <label>Subject Code</label>
                                <input type="text" value={formData.subjectCode} onChange={e => setFormData({...formData, subjectCode: e.target.value})} required style={{ width: '100%', padding: '8px' }} />
                            </div>
                            <div>
                                <label>Subject Name</label>
                                <input type="text" value={formData.subjectName} onChange={e => setFormData({...formData, subjectName: e.target.value})} required style={{ width: '100%', padding: '8px' }} />
                            </div>
                            <div>
                                <label>Content / Notes</label>
                                <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={{ width: '100%', padding: '8px', minHeight: '80px' }}></textarea>
                            </div>
                            <div>
                                <label>PDF File {formData.id && '(Leave empty to keep current)'}</label>
                                <input type="file" accept="application/pdf" onChange={e => setFormData({...formData, file: e.target.files[0]})} required={!formData.id} style={{ width: '100%', padding: '8px' }} />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 15px', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ padding: '8px 15px' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
