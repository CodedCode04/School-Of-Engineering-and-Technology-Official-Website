import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function Syllabus() {
    const { user } = useAuth();
    const [syllabi, setSyllabi] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(user?.semester || 1);
    
    useEffect(() => {
        fetchSyllabi();
    }, [selectedSemester]);

    const fetchSyllabi = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/syllabus`, {
                params: { semester: selectedSemester }
            });
            setSyllabi(res.data);
        } catch (error) {
            toast.error('Failed to fetch syllabus data');
        }
    };

    return (
        <div className="dashboard-content" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h2>My Branch Syllabus</h2>
                <button onClick={() => window.history.back()} style={{ padding: '5px 10px', cursor: 'pointer' }}>Back to Dashboard</button>
            </div>
            <p>Branch: {user?.branch?.name || 'Unknown'}</p>

            {/* Semester Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', marginTop: '20px' }}>
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

            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {syllabi.map(item => (
                    <div key={item._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ color: 'var(--primary-blue)', margin: '0 0 10px 0' }}>{item.subjectName}</h3>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Code: {item.subjectCode}</p>
                        {item.content && (
                            <p style={{ margin: '10px 0', color: '#666', fontSize: '0.9rem' }}>{item.content}</p>
                        )}
                        <a 
                            href={`${API_URL}${item.file}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn-primary" 
                            style={{ display: 'inline-block', marginTop: '15px', textDecoration: 'none', textAlign: 'center' }}
                        >
                            <i className="fas fa-file-pdf"></i> View / Download PDF
                        </a>
                    </div>
                ))}
            </div>

            {syllabi.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <p>No syllabus records found for this semester.</p>
                </div>
            )}
        </div>
    );
}
