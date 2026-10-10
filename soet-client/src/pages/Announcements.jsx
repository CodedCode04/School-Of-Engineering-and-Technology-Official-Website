import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Turnstile } from '@marsidev/react-turnstile';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Announcements() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef(null);

    const [announcements, setAnnouncements] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        document.title = "Announcements - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/announcements`);
            setAnnouncements(res.data.data);
        } catch (error) {
            console.error('Failed to load announcements', error);
        }
    };

    const submitWithRetry = async (payload, retryCount = 1) => {
        try {
            return await axios.post(`${API_URL}/api/newsletter`, payload, {
                timeout: 10000
            });
        } catch (error) {
            if (retryCount > 0 && error.code === 'ECONNABORTED') {
                setStatus({ type: 'info', message: 'Waking up the server... please wait.' });
                await new Promise(resolve => setTimeout(resolve, 2000));
                return submitWithRetry(payload, retryCount - 1);
            }
            throw error;
        }
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        
        if (!turnstileToken) {
            setStatus({ type: 'error', message: 'Please complete the CAPTCHA.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: 'info', message: 'Subscribing...' });

        try {
            await submitWithRetry({ email, turnstileToken });
            setStatus({ type: 'success', message: 'Successfully subscribed to the newsletter!' });
            setEmail('');
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to subscribe. Please try again.' });
        } finally {
            setIsLoading(false);
            setTurnstileToken('');
            if (turnstileRef.current) {
                turnstileRef.current.reset();
            }
        }
    };

    const importantNotices = announcements.filter(a => a.isImportant);
    
    // Derived filtered list for normal announcements
    const filteredAnnouncements = announcements
        .filter(a => !a.isImportant)
        .filter(a => filter === 'all' || a.category.toLowerCase() === filter.toLowerCase())
        .filter(a => search === '' || a.title.toLowerCase().includes(search.toLowerCase()) || a.body.toLowerCase().includes(search.toLowerCase()));

    const getIconClass = (category) => {
        switch(category.toLowerCase()) {
            case 'academic': return 'fas fa-graduation-cap';
            case 'events': return 'fas fa-calendar-alt';
            case 'admissions': return 'fas fa-user-plus';
            case 'results': return 'fas fa-file-alt';
            case 'placement': return 'fas fa-briefcase';
            case 'news': return 'fas fa-newspaper';
            default: return 'fas fa-bullhorn';
        }
    };

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <div className="page-header-content">
                        <h1>Announcements</h1>
                        <p>Stay updated with the latest news and important announcements from SoET</p>
                        <div className="breadcrumb">
                            <Link to="/">Home</Link>
                            <span>/</span>
                            <span>Announcements</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Breaking News Banner (Keep static or dynamic based on latest pinned) */}
            {importantNotices.length > 0 && (
                <section className="breaking-news">
                    <div className="container">
                        <div className="news-banner">
                            <div className="news-label">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span>BREAKING</span>
                            </div>
                            <div className="news-content">
                                <marquee behavior="scroll" direction="left" scrollamount="3">
                                    {importantNotices.map(n => n.title).join(' | ')}
                                </marquee>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Important Notices */}
            {importantNotices.length > 0 && (
                <section className="important-notices">
                    <div className="container">
                        <div className="section-header">
                            <h2>
                                <i className="fas fa-exclamation-triangle"></i>
                                Important Notices
                            </h2>
                            <p>Critical updates requiring immediate attention</p>
                        </div>
                        <div className="notices-grid">
                            {importantNotices.map(notice => (
                                <div key={notice._id} className="notice-card urgent">
                                    <div className="notice-header">
                                        <span className="notice-badge urgent">IMPORTANT</span>
                                        <span className="notice-date">{new Date(notice.publishAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3>{notice.title}</h3>
                                    <div dangerouslySetInnerHTML={{ __html: notice.body }} />
                                    {notice.coverImage && (
                                        <img src={`${API_URL}${notice.coverImage}`} alt="Cover" style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '5px' }} />
                                    )}
                                    {notice.attachments && notice.attachments.length > 0 && (
                                        <div className="notice-actions" style={{ marginTop: '15px' }}>
                                            {notice.attachments.map((att, idx) => (
                                                <a key={idx} href={`${API_URL}${att.url}`} target="_blank" rel="noreferrer" className="btn-primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                                    <i className="fas fa-download"></i>
                                                    {att.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Announcements */}
            <section className="announcements-section">
                <div className="container">
                    <div className="section-header">
                        <h2>
                            <i className="fas fa-bullhorn"></i>
                            Latest Announcements
                        </h2>
                        <div className="filter-controls">
                            <div className="filter-buttons">
                                {['all', 'academic', 'events', 'admissions', 'results', 'placement'].map(cat => (
                                    <button 
                                        key={cat}
                                        className={`filter-btn ${filter === cat ? 'active' : ''}`} 
                                        onClick={() => setFilter(cat)}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <div className="search-box">
                                <input 
                                    type="text" 
                                    placeholder="Search announcements..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>

                    <div className="announcements-grid">
                        {filteredAnnouncements.length === 0 ? (
                            <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>No announcements found matching your criteria.</p>
                        ) : (
                            filteredAnnouncements.map(item => (
                                <div key={item._id} className="announcement-card">
                                    <div className="announcement-header">
                                        <div className={`announcement-icon ${item.category.toLowerCase()}`} style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}>
                                            <i className={getIconClass(item.category)}></i>
                                        </div>
                                        <div className="announcement-meta">
                                            <span className={`category ${item.category.toLowerCase()}`}>{item.category}</span>
                                            <span className="date">{new Date(item.publishAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="announcement-content">
                                        <h3>{item.title}</h3>
                                        <div className="body-preview" style={{ maxHeight: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }} dangerouslySetInnerHTML={{ __html: item.body }} />
                                        
                                        {item.coverImage && (
                                            <img src={`${API_URL}${item.coverImage}`} alt="Cover" style={{ maxWidth: '100%', height: '150px', objectFit: 'cover', marginTop: '10px', borderRadius: '5px' }} />
                                        )}
                                        
                                        {item.attachments && item.attachments.length > 0 && (
                                            <div className="announcement-details" style={{ marginTop: '15px' }}>
                                                {item.attachments.map((att, idx) => (
                                                    <a key={idx} href={`${API_URL}${att.url}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginRight: '10px', fontSize: '0.9rem', color: 'var(--primary-red)' }}>
                                                        <i className="fas fa-paperclip"></i> {att.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-card">
                        <div className="newsletter-content">
                            <div className="newsletter-icon">
                                <i className="fas fa-bell"></i>
                            </div>
                            <div className="newsletter-text">
                                <h3>Stay Updated</h3>
                                <p>Subscribe to receive the latest announcements and updates directly in your inbox</p>
                            </div>
                        </div>
                        <div className="newsletter-form">
                            <form onSubmit={handleNewsletterSubmit}>
                                {status.message && (
                                    <div className={`alert alert-${status.type}`} style={{ padding: '10px', marginBottom: '15px', borderRadius: '5px', backgroundColor: status.type === 'success' ? '#d4edda' : status.type === 'error' ? '#f8d7da' : '#e2e3e5', color: status.type === 'success' ? '#155724' : status.type === 'error' ? '#721c24' : '#383d41' }}>
                                        {status.message}
                                    </div>
                                )}
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email address" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button type="submit" className="btn-primary" disabled={isLoading || !turnstileToken}>
                                        <i className="fas fa-paper-plane"></i>
                                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <Turnstile 
                                        ref={turnstileRef}
                                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                                        onSuccess={(token) => setTurnstileToken(token)}
                                        onError={() => setStatus({ type: 'error', message: 'CAPTCHA error.' })}
                                        onExpire={() => {
                                            setTurnstileToken('');
                                            setStatus({ type: 'error', message: 'CAPTCHA expired.' });
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
