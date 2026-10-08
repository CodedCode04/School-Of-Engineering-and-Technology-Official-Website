import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        subject: '',
        message: '',
        newsletter: false
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef(null);

    useEffect(() => {
        document.title = "Contact - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const submitWithRetry = async (payload, retryCount = 1) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/enquiries`, payload, {
                timeout: 10000 // 10 seconds timeout
            });
        } catch (error) {
            if (retryCount > 0 && error.code === 'ECONNABORTED') {
                setStatus({ type: 'info', message: 'Waking up the server... please wait.' });
                // wait 2 seconds before retry
                await new Promise(resolve => setTimeout(resolve, 2000));
                return submitWithRetry(payload, retryCount - 1);
            }
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!turnstileToken) {
            setStatus({ type: 'error', message: 'Please complete the CAPTCHA.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: 'info', message: 'Sending message...' });

        try {
            const payload = { ...formData, turnstileToken };
            await submitWithRetry(payload);
            
            setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
            setFormData({
                firstName: '', lastName: '', email: '', phone: '',
                inquiryType: '', subject: '', message: '', newsletter: false
            });
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to send message. Please try again.' });
        } finally {
            setIsLoading(false);
            setTurnstileToken('');
            if (turnstileRef.current) {
                turnstileRef.current.reset();
            }
        }
    };

    return (
        <>
            

    {/* Page Header */}
    <section className="page-header">
        <div className="container">
            <h1>Contact Us</h1>
            <p>Get in touch with us for admissions, inquiries, and information</p>
            <nav className="breadcrumb">
                <Link to="/..index">Home</Link> <span>/</span> Contact
            </nav>
        </div>
    </section>

    {/* Contact Section */}
    <section className="contact-main">
        <div className="container">
            <div className="contact-content">
                {/* Contact Information */}
                <div className="contact-info-section">
                    <div className="section-header">
                        <h2>Get in Touch</h2>
                        <p>We're here to help with all your queries and concerns</p>
                    </div>
                    
                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="contact-details">
                                <h3>Address</h3>
                                <p>School of Engineering & Technology (SoET),<br />
                                Samrat Vikramaditya Vishwavidyalaya,<br />
                                Vikram University Campus, Ujjain (M.P.) – 456010</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div className="contact-details">
                                <h3>Enquiry Numbers</h3>
                                <p>9893295134, 8770122362<br />
                                   9179246393, 8839593759<br />
                                   8319453662, 8770746596<br />
                                   7566806353</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="contact-details">
                                <h3>Email Address</h3>
                                <p>soetvikramujn@gmail.com</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className="contact-details">
                                <h3>Office Hours</h3>
                                <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM<br />
                                <strong>Saturday:</strong> 9:00 AM - 1:00 PM<br />
                                <strong>Sunday:</strong> Closed<br />
                                <strong>Admission Season:</strong> Extended Hours</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-section">
                    <div className="contact-form">
                        <h3>Send us a Message</h3>
                        <p>Fill out the form below and we'll get back to you as soon as possible</p>
                        
                        <form className="contact-form-fields" onSubmit={handleSubmit}>
                            {status.message && (
                                <div className={`alert alert-${status.type}`} style={{ padding: '15px', marginBottom: '20px', borderRadius: '5px', backgroundColor: status.type === 'success' ? '#d4edda' : status.type === 'error' ? '#f8d7da' : '#e2e3e5', color: status.type === 'success' ? '#155724' : status.type === 'error' ? '#721c24' : '#383d41' }}>
                                    {status.message}
                                </div>
                            )}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inquiryType">Inquiry Type *</label>
                                <select id="inquiryType" name="inquiryType" required value={formData.inquiryType} onChange={handleInputChange}>
                                    <option value="">Select Inquiry Type</option>
                                    <option value="admission">Admission Information</option>
                                    <option value="academic">Academic Programs</option>
                                    <option value="placement">Placement & Career</option>
                                    <option value="facilities">Facilities & Infrastructure</option>
                                    <option value="research">Research Opportunities</option>
                                    <option value="general">General Information</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject *</label>
                                <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea id="message" name="message" rows="6" required placeholder="Please provide detailed information about your inquiry..." value={formData.message} onChange={handleInputChange}></textarea>
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleInputChange} />
                                    <span className="checkmark"></span>
                                    Subscribe to our newsletter for updates and announcements
                                </label>
                            </div>

                            <div className="form-group">
                                <Turnstile 
                                    ref={turnstileRef}
                                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    onError={() => setStatus({ type: 'error', message: 'CAPTCHA error. Please try again.' })}
                                    onExpire={() => {
                                        setTurnstileToken('');
                                        setStatus({ type: 'error', message: 'CAPTCHA expired. Please complete it again.' });
                                    }}
                                />
                            </div>

                            <button type="submit" className="btn-primary" disabled={isLoading || !turnstileToken}>
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Department Contacts */}
    <section className="department-contacts">
        <div className="container">
            <div className="section-header">
                <h2>Department Contacts</h2>
                <p>Direct contact information for specific departments</p>
            </div>
            <div className="departments-grid">
                <div className="department-card">
                    <div className="dept-icon">
                        <i className="fas fa-laptop-code"></i>
                    </div>
                    <h3>Computer Science Engineering</h3>
                    <div className="dept-contact">
                        <p><strong>Head of Department:</strong> Prof. (Dr.) Name</p>
                        <p><i className="fas fa-phone"></i> +91 734-2514275</p>
                        <p><i className="fas fa-envelope"></i> cse.hod@vikramuniv.ac.in</p>
                    </div>
                </div>

                <div className="department-card">
                    <div className="dept-icon">
                        <i className="fas fa-microchip"></i>
                    </div>
                    <h3>Electronics & Communication</h3>
                    <div className="dept-contact">
                        <p><strong>Head of Department:</strong> Prof. (Dr.) Name</p>
                        <p><i className="fas fa-phone"></i> +91 734-2514276</p>
                        <p><i className="fas fa-envelope"></i> ece.hod@vikramuniv.ac.in</p>
                    </div>
                </div>

                <div className="department-card">
                    <div className="dept-icon">
                        <i className="fas fa-cogs"></i>
                    </div>
                    <h3>Mechanical Engineering</h3>
                    <div className="dept-contact">
                        <p><strong>Head of Department:</strong> Prof. (Dr.) Name</p>
                        <p><i className="fas fa-phone"></i> +91 734-2514277</p>
                        <p><i className="fas fa-envelope"></i> me.hod@vikramuniv.ac.in</p>
                    </div>
                </div>

                <div className="department-card">
                    <div className="dept-icon">
                        <i className="fas fa-bolt"></i>
                    </div>
                    <h3>Electrical Engineering</h3>
                    <div className="dept-contact">
                        <p><strong>Head of Department:</strong> Prof. (Dr.) Name</p>
                        <p><i className="fas fa-phone"></i> +91 734-2514278</p>
                        <p><i className="fas fa-envelope"></i> ee.hod@vikramuniv.ac.in</p>
                    </div>
                </div>

                <div className="department-card">
                    <div className="dept-icon">
                        <i className="fas fa-road"></i>
                    </div>
                    <h3>Civil Engineering</h3>
                    <div className="dept-contact">
                        <p><strong>Head of Department:</strong> Prof. (Dr.) Name</p>
                        <p><i className="fas fa-phone"></i> +91 734-2514279</p>
                        <p><i className="fas fa-envelope"></i> ce.hod@vikramuniv.ac.in</p>
                    </div>
                </div>

                <div className="department-card">
                    <div className="dept-icon">
                        <i className="fas fa-industry"></i>
                    </div>
                    <h3>Chemical Engineering</h3>
                    <div className="dept-contact">
                        <p><strong>Head of Department:</strong> Prof. (Dr.) Name</p>
                        <p><i className="fas fa-phone"></i> +91 734-2514280</p>
                        <p><i className="fas fa-envelope"></i> che.hod@vikramuniv.ac.in</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Map and Directions */}
    <section className="map-section">
        <div className="container">
            <div className="section-header">
                <h2>Location & Directions</h2>
                <p>Find us on the map and get directions to our campus</p>
            </div>
            <div className="map-content">
                <div className="map-container">
                    <div className="map-placeholder">
                        <i className="fas fa-map-marked-alt"></i>
                        <h3>Interactive Map</h3>
                        <p>Samrat Vikramaditya Vishwavidyalaya Campus<br />Dewas Road, Ujjain, MP 456010</p>
                        <a href="https://maps.google.com/?q=Vikram+University+Ujjain" target="_blank" className="btn-secondary">
                            <i className="fas fa-external-link-alt"></i> Open in Google Maps
                        </a>
                    </div>
                </div>
                <div className="directions-info">
                    <h3>How to Reach</h3>
                    <div className="transport-options">
                        <div className="transport-item">
                            <i className="fas fa-plane"></i>
                            <h4>By Air</h4>
                            <p>Nearest airport is Devi Ahilya Bai Holkar Airport, Indore (55 km from campus). Regular taxi and bus services available.</p>
                        </div>
                        <div className="transport-item">
                            <i className="fas fa-train"></i>
                            <h4>By Train</h4>
                            <p>Ujjain Junction Railway Station is 8 km from campus. Auto-rickshaws and buses available from the station.</p>
                        </div>
                        <div className="transport-item">
                            <i className="fas fa-bus"></i>
                            <h4>By Bus</h4>
                            <p>Regular bus services from major cities. Ujjain Bus Stand is 6 km from campus with connecting local transport.</p>
                        </div>
                        <div className="transport-item">
                            <i className="fas fa-car"></i>
                            <h4>By Car</h4>
                            <p>Well-connected by road networks. Campus located on Dewas Road with ample parking facilities available.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Quick Actions */}
    <section className="quick-actions">
        <div className="container">
            <div className="section-header">
                <h2>Quick Actions</h2>
                <p>Fast access to important services and information</p>
            </div>
            <div className="actions-grid">
                <a href="https://vikram.mponline.gov.in/" className="action-card" target="_blank">
                    <i className="fas fa-credit-card"></i>
                    <h3>Fee Payment</h3>
                    <p>Pay your fees online securely</p>
                </a>
                <a href="#" className="action-card">
                    <i className="fas fa-file-download"></i>
                    <h3>Download Brochure</h3>
                    <p>Get detailed information about programs</p>
                </a>
                <a href="#" className="action-card">
                    <i className="fas fa-calendar-plus"></i>
                    <h3>Schedule Visit</h3>
                    <p>Book a campus tour appointment</p>
                </a>
                <a href="#" className="action-card">
                    <i className="fas fa-question-circle"></i>
                    <h3>FAQs</h3>
                    <p>Find answers to common questions</p>
                </a>
            </div>
        </div>
    </section>

    {/* Footer */}
    
        </>
    );
}
