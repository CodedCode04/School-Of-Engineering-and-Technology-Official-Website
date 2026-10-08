import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Announcements() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef(null);

    useEffect(() => {
        document.title = "Announcements - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    const submitWithRetry = async (payload, retryCount = 1) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/newsletter`, payload, {
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

    useEffect(() => {
        document.title = "Announcements - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            

    {/* Page Header */}
    <section className="page-header">
        <div className="container">
            <div className="page-header-content">
                <h1>Announcements</h1>
                <p>Stay updated with the latest news and important announcements from SoET</p>
                <div className="breadcrumb">
                    <Link to="/..index">Home</Link>
                    <span>/</span>
                    <span>Announcements</span>
                </div>
            </div>
        </div>
    </section>

    {/* Breaking News Banner */}
    <section className="breaking-news">
        <div className="container">
            <div className="news-banner">
                <div className="news-label">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>BREAKING</span>
                </div>
                <div className="news-content">
                    <marquee behavior="scroll" direction="left" scrollamount="3">
                        Semester Examination Schedule Released - Check your exam dates now | Fee Payment Deadline Extended to July 30, 2025 | Tech Fest 2025 Registration Open
                    </marquee>
                </div>
            </div>
        </div>
    </section>

    {/* Important Notices */}
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
                <div className="notice-card urgent">
                    <div className="notice-header">
                        <span className="notice-badge urgent">URGENT</span>
                        <span className="notice-date">July 21, 2025</span>
                    </div>
                    <h3>Semester Examination Schedule Released</h3>
                    <p>The examination schedule for Even Semester 2024-25 has been released. Students are advised to check their exam dates and prepare accordingly. Download the schedule from the university portal.</p>
                    <div className="notice-actions">
                        <a href="https://vikramuniv.ac.in/results/" target="_blank" className="btn-primary">
                            <i className="fas fa-download"></i>
                            View Schedule
                        </a>
                    </div>
                </div>

                <div className="notice-card high">
                    <div className="notice-header">
                        <span className="notice-badge high">HIGH PRIORITY</span>
                        <span className="notice-date">July 20, 2025</span>
                    </div>
                    <h3>Fee Payment Deadline Extended</h3>
                    <p>The last date for semester fee payment has been extended to July 30, 2025. Students can pay online through the university portal. Late fee charges will apply after the deadline.</p>
                    <div className="notice-actions">
                        <a href="https://vikram.mponline.gov.in/" target="_blank" className="btn-primary">
                            <i className="fas fa-credit-card"></i>
                            Pay Fees
                        </a>
                    </div>
                </div>

                <div className="notice-card medium">
                    <div className="notice-header">
                        <span className="notice-badge medium">NOTICE</span>
                        <span className="notice-date">July 19, 2025</span>
                    </div>
                    <h3>Library Renovation Schedule</h3>
                    <p>The central library will undergo renovation from July 25-30, 2025. Alternative study arrangements have been made in the computer labs during this period.</p>
                    <div className="notice-actions">
                        <Link to="/facilities" className="btn-secondary">
                            <i className="fas fa-info-circle"></i>
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>

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
                        <button className="filter-btn active" data-filter="all">All</button>
                        <button className="filter-btn" data-filter="academic">Academic</button>
                        <button className="filter-btn" data-filter="events">Events</button>
                        <button className="filter-btn" data-filter="admissions">Admissions</button>
                        <button className="filter-btn" data-filter="results">Results</button>
                    </div>
                    <div className="search-box">
                        <input type="text" id="searchInput" placeholder="Search announcements..." />
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            </div>

            <div className="announcements-grid" id="announcementsGrid">
                <div className="announcement-card" data-category="academic">
                    <div className="announcement-header">
                        <div className="announcement-icon academic">
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                        <div className="announcement-meta">
                            <span className="category academic">Academic</span>
                            <span className="date">July 18, 2025</span>
                        </div>
                    </div>
                    <div className="announcement-content">
                        <h3>New Course Registration Opens</h3>
                        <p>Registration for additional courses and skill development programs is now open for all students. Limited seats available for popular courses like AI, Machine Learning, and Data Science.</p>
                        <div className="announcement-details">
                            <span><i className="fas fa-calendar"></i> Registration Deadline: July 25, 2025</span>
                            <span><i className="fas fa-users"></i> Limited Seats</span>
                        </div>
                        <Link to="/academics" className="read-more">
                            Read More <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                <div className="announcement-card" data-category="events">
                    <div className="announcement-header">
                        <div className="announcement-icon events">
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="announcement-meta">
                            <span className="category events">Events</span>
                            <span className="date">July 17, 2025</span>
                        </div>
                    </div>
                    <div className="announcement-content">
                        <h3>Tech Fest 2025 - Call for Participation</h3>
                        <p>Annual technical festival featuring robotics competition, coding marathon, and innovation showcase. Register your teams now for exciting competitions and win amazing prizes!</p>
                        <div className="announcement-details">
                            <span><i className="fas fa-calendar"></i> Event Date: August 15-17, 2025</span>
                            <span><i className="fas fa-trophy"></i> Prize Pool: ₹2 Lakhs</span>
                        </div>
                        <Link to="/activities" className="read-more">
                            Register Now <i className="fas fa-external-link-alt"></i>
                        </Link>
                    </div>
                </div>

                <div className="announcement-card" data-category="admissions">
                    <div className="announcement-header">
                        <div className="announcement-icon admissions">
                            <i className="fas fa-user-plus"></i>
                        </div>
                        <div className="announcement-meta">
                            <span className="category admissions">Admissions</span>
                            <span className="date">July 16, 2025</span>
                        </div>
                    </div>
                    <div className="announcement-content">
                        <h3>M.Tech Admission Process Started</h3>
                        <p>Applications are now being accepted for M.Tech programs in all departments. Apply online before the deadline. Entrance exam scheduled for August 2025.</p>
                        <div className="announcement-details">
                            <span><i className="fas fa-calendar"></i> Application Deadline: August 10, 2025</span>
                            <span><i className="fas fa-clipboard-check"></i> Online Application</span>
                        </div>
                        <a href="https://vikram.mponline.gov.in/Portal/Services/VIKRAM/Entrance/UTD/Admission_Entrance_Form.aspx" target="_blank" className="read-more">
                            Apply Now <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>

                <div className="announcement-card" data-category="academic">
                    <div className="announcement-header">
                        <div className="announcement-icon academic">
                            <i className="fas fa-handshake"></i>
                        </div>
                        <div className="announcement-meta">
                            <span className="category academic">Academic</span>
                            <span className="date">July 15, 2025</span>
                        </div>
                    </div>
                    <div className="announcement-content">
                        <h3>Industry Collaboration Program</h3>
                        <p>New partnership with leading tech companies for internships and placement opportunities. Industry experts will conduct special sessions and workshops.</p>
                        <div className="announcement-details">
                            <span><i className="fas fa-building"></i> 15+ Partner Companies</span>
                            <span><i className="fas fa-briefcase"></i> Internship Opportunities</span>
                        </div>
                        <Link to="/about" className="read-more">
                            Learn More <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                <div className="announcement-card" data-category="results">
                    <div className="announcement-header">
                        <div className="announcement-icon results">
                            <i className="fas fa-file-alt"></i>
                        </div>
                        <div className="announcement-meta">
                            <span className="category results">Results</span>
                            <span className="date">July 14, 2025</span>
                        </div>
                    </div>
                    <div className="announcement-content">
                        <h3>Semester Results Published</h3>
                        <p>Results for Odd Semester 2024-25 examinations have been published. Students can check their results on the university portal using their enrollment number.</p>
                        <div className="announcement-details">
                            <span><i className="fas fa-percent"></i> 95% Pass Rate</span>
                            <span><i className="fas fa-medal"></i> Top Performers Listed</span>
                        </div>
                        <a href="https://vikramuniv.ac.in/results/" target="_blank" className="read-more">
                            Check Results <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>

                <div className="announcement-card" data-category="events">
                    <div className="announcement-header">
                        <div className="announcement-icon events">
                            <i className="fas fa-trophy"></i>
                        </div>
                        <div className="announcement-meta">
                            <span className="category events">Events</span>
                            <span className="date">July 12, 2025</span>
                        </div>
                    </div>
                    <div className="announcement-content">
                        <h3>Inter-Department Sports Meet</h3>
                        <p>Annual sports competition between all engineering departments. Registration open for cricket, football, basketball, and athletics. Show your department pride!</p>
                        <div className="announcement-details">
                            <span><i className="fas fa-calendar"></i> Tournament: July 28-30, 2025</span>
                            <span><i className="fas fa-users"></i> Team Registration Open</span>
                        </div>
                        <Link to="/activities" className="read-more">
                            Register Team <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Load More Button */}
            <div className="load-more-section">
                <button className="btn-secondary load-more-btn" id="loadMoreBtn">
                    <i className="fas fa-plus"></i>
                    Load More Announcements
                </button>
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
                    <form id="newsletterForm" onSubmit={handleNewsletterSubmit}>
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

    {/* Footer */}
    
        </>
    );
}
