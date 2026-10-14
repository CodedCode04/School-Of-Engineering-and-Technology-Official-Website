import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Turnstile } from '@marsidev/react-turnstile';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Button from '../components/Button';

const BREADCRUMBS = [
    { label: 'Home', to: '/' },
    { label: 'Contact', to: null }
];

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
    const [touched, setTouched] = useState({});
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

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const isInvalid = (name, required = false) => {
        if (!touched[name]) return false;
        const val = formData[name];
        if (required && (!val || (typeof val === 'string' && !val.trim()))) return true;
        if (name === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return true;
        return false;
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
        
        const requiredEmpty = !formData.firstName?.trim() || !formData.lastName?.trim() || !formData.email?.trim() || !formData.inquiryType || !formData.subject?.trim() || !formData.message?.trim();
        if (requiredEmpty) {
            setStatus({ type: 'error', message: 'Please fill in all required fields.' });
            setTouched({
                firstName: true,
                lastName: true,
                email: true,
                inquiryType: true,
                subject: true,
                message: true
            });
            return;
        }

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
            setTouched({});
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
            {/* Page Banner */}
            <PageBanner
                title="Contact Us"
                subtitle="Get in touch with us for admissions, inquiries, and information"
                breadcrumbs={BREADCRUMBS}
            />

            {/* 1. Get in Touch (Contact Info + Form) */}
            <section className="contact-main-section contact-section-target reveal-fade-up" id="get-in-touch" aria-labelledby="heading-get-in-touch">
                <div className="container">
                    <SectionHeader
                        eyebrow="COMMUNICATION"
                        title="Get in Touch"
                        subtitle="We're here to help with all your queries and concerns"
                        id="heading-get-in-touch"
                    />

                    <div className="contact-columns-grid">
                        {/* Left Column: Contact Info Cards */}
                        <div className="contact-info-column">
                            {/* Address Card */}
                            <Card className="contact-info-card">
                                <div className="contact-info-card-inner">
                                    <div className="contact-info-icon-circle" aria-hidden="true">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <h3 className="contact-info-title">Address</h3>
                                        <p className="contact-info-details">
                                            School of Engineering &amp; Technology (SoET),<br />
                                            Samrat Vikramaditya Vishwavidyalaya,<br />
                                            Vikram University Campus, Ujjain (M.P.) – 456010
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Enquiry Numbers Card */}
                            <Card className="contact-info-card">
                                <div className="contact-info-card-inner">
                                    <div className="contact-info-icon-circle" aria-hidden="true">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <h3 className="contact-info-title">Enquiry Numbers</h3>
                                        <div className="contact-info-details contact-phones-list">
                                            <div>
                                                <a href="tel:9893295134" className="contact-link">9893295134</a>, <a href="tel:8770122362" className="contact-link">8770122362</a>
                                            </div>
                                            <div>
                                                <a href="tel:9179246393" className="contact-link">9179246393</a>, <a href="tel:8839593759" className="contact-link">8839593759</a>
                                            </div>
                                            <div>
                                                <a href="tel:8319453662" className="contact-link">8319453662</a>, <a href="tel:8770746596" className="contact-link">8770746596</a>
                                            </div>
                                            <div>
                                                <a href="tel:7566806353" className="contact-link">7566806353</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Email Address Card */}
                            <Card className="contact-info-card">
                                <div className="contact-info-card-inner">
                                    <div className="contact-info-icon-circle" aria-hidden="true">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <h3 className="contact-info-title">Email Address</h3>
                                        <p className="contact-info-details">
                                            <a href="mailto:soetvikramujn@gmail.com" className="contact-link">
                                                soetvikramujn@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Office Hours Card */}
                            <Card className="contact-info-card">
                                <div className="contact-info-card-inner">
                                    <div className="contact-info-icon-circle" aria-hidden="true">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <h3 className="contact-info-title">Office Hours</h3>
                                        <div className="contact-info-details office-hours-rows">
                                            <div className="office-hours-row">
                                                <span className="office-hours-label">Monday - Friday:</span>
                                                <span className="office-hours-value">9:00 AM - 5:00 PM</span>
                                            </div>
                                            <div className="office-hours-row">
                                                <span className="office-hours-label">Saturday:</span>
                                                <span className="office-hours-value">9:00 AM - 1:00 PM</span>
                                            </div>
                                            <div className="office-hours-row">
                                                <span className="office-hours-label">Sunday:</span>
                                                <span className="office-hours-value">Closed</span>
                                            </div>
                                            <div className="office-hours-row">
                                                <span className="office-hours-label">Admission Season:</span>
                                                <span className="office-hours-value">Extended Hours</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column: Contact Form Card */}
                        <div className="contact-form-column">
                            <Card padding="featured" className="contact-form-card">
                                <h3 className="contact-form-heading">Send us a Message</h3>
                                <p className="contact-form-subtitle">Fill out the form below and we'll get back to you as soon as possible</p>
                                
                                {status.message && (
                                    <div className={`contact-alert contact-alert-${status.type}`} role="alert" aria-live="polite">
                                        <i 
                                            className={`contact-alert-icon ${
                                                status.type === 'success' 
                                                    ? 'fas fa-check-circle' 
                                                    : status.type === 'error' 
                                                    ? 'fas fa-exclamation-circle' 
                                                    : 'fas fa-info-circle'
                                            }`} 
                                            aria-hidden="true"
                                        />
                                        <span>{status.message}</span>
                                    </div>
                                )}

                                <form className="contact-form-fields" onSubmit={handleSubmit} noValidate>
                                    <div className="contact-form-row">
                                        <div className="contact-form-group">
                                            <label htmlFor="firstName" className="contact-form-label">
                                                First Name <span className="contact-form-required" aria-hidden="true">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                id="firstName" 
                                                name="firstName" 
                                                required 
                                                value={formData.firstName} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                placeholder="e.g. Rahul"
                                                className="contact-form-control"
                                                aria-invalid={isInvalid('firstName', true)}
                                                aria-describedby={isInvalid('firstName', true) ? 'firstName-error' : undefined}
                                            />
                                            {isInvalid('firstName', true) && (
                                                <span id="firstName-error" className="contact-field-error" role="alert">
                                                    <i className="fas fa-exclamation-circle" aria-hidden="true" /> First name is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="contact-form-group">
                                            <label htmlFor="lastName" className="contact-form-label">
                                                Last Name <span className="contact-form-required" aria-hidden="true">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                id="lastName" 
                                                name="lastName" 
                                                required 
                                                value={formData.lastName} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                placeholder="e.g. Sharma"
                                                className="contact-form-control"
                                                aria-invalid={isInvalid('lastName', true)}
                                                aria-describedby={isInvalid('lastName', true) ? 'lastName-error' : undefined}
                                            />
                                            {isInvalid('lastName', true) && (
                                                <span id="lastName-error" className="contact-field-error" role="alert">
                                                    <i className="fas fa-exclamation-circle" aria-hidden="true" /> Last name is required
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="contact-form-row">
                                        <div className="contact-form-group">
                                            <label htmlFor="email" className="contact-form-label">
                                                Email Address <span className="contact-form-required" aria-hidden="true">*</span>
                                            </label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email" 
                                                required 
                                                value={formData.email} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                placeholder="e.g. rahul@example.com"
                                                className="contact-form-control"
                                                aria-invalid={isInvalid('email', true)}
                                                aria-describedby={isInvalid('email', true) ? 'email-error' : undefined}
                                            />
                                            {isInvalid('email', true) && (
                                                <span id="email-error" className="contact-field-error" role="alert">
                                                    <i className="fas fa-exclamation-circle" aria-hidden="true" /> Valid email address is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="contact-form-group">
                                            <label htmlFor="phone" className="contact-form-label">
                                                Phone Number
                                            </label>
                                            <input 
                                                type="tel" 
                                                id="phone" 
                                                name="phone" 
                                                value={formData.phone} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                placeholder="e.g. +91 98932 95134"
                                                className="contact-form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="contact-form-group">
                                        <label htmlFor="inquiryType" className="contact-form-label">
                                            Inquiry Type <span className="contact-form-required" aria-hidden="true">*</span>
                                        </label>
                                        <select 
                                            id="inquiryType" 
                                            name="inquiryType" 
                                            required 
                                            value={formData.inquiryType} 
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className="contact-form-control contact-form-select"
                                            aria-invalid={isInvalid('inquiryType', true)}
                                            aria-describedby={isInvalid('inquiryType', true) ? 'inquiryType-error' : undefined}
                                        >
                                            <option value="">Select Inquiry Type</option>
                                            <option value="admission">Admission Information</option>
                                            <option value="academic">Academic Programs</option>
                                            <option value="placement">Placement &amp; Career</option>
                                            <option value="facilities">Facilities &amp; Infrastructure</option>
                                            <option value="research">Research Opportunities</option>
                                            <option value="general">General Information</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {isInvalid('inquiryType', true) && (
                                            <span id="inquiryType-error" className="contact-field-error" role="alert">
                                                <i className="fas fa-exclamation-circle" aria-hidden="true" /> Please select an inquiry type
                                            </span>
                                        )}
                                    </div>

                                    <div className="contact-form-group">
                                        <label htmlFor="subject" className="contact-form-label">
                                            Subject <span className="contact-form-required" aria-hidden="true">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            id="subject" 
                                            name="subject" 
                                            required 
                                            value={formData.subject} 
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder="What is your inquiry regarding?"
                                            className="contact-form-control"
                                            aria-invalid={isInvalid('subject', true)}
                                            aria-describedby={isInvalid('subject', true) ? 'subject-error' : undefined}
                                        />
                                        {isInvalid('subject', true) && (
                                            <span id="subject-error" className="contact-field-error" role="alert">
                                                <i className="fas fa-exclamation-circle" aria-hidden="true" /> Subject is required
                                            </span>
                                        )}
                                    </div>

                                    <div className="contact-form-group">
                                        <label htmlFor="message" className="contact-form-label">
                                            Message <span className="contact-form-required" aria-hidden="true">*</span>
                                        </label>
                                        <textarea 
                                            id="message" 
                                            name="message" 
                                            rows="5" 
                                            required 
                                            placeholder="Please provide detailed information about your inquiry..." 
                                            value={formData.message} 
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className="contact-form-control contact-form-textarea"
                                            aria-invalid={isInvalid('message', true)}
                                            aria-describedby={isInvalid('message', true) ? 'message-error' : undefined}
                                        ></textarea>
                                        {isInvalid('message', true) && (
                                            <span id="message-error" className="contact-field-error" role="alert">
                                                <i className="fas fa-exclamation-circle" aria-hidden="true" /> Message is required
                                            </span>
                                        )}
                                    </div>

                                    <div className="contact-checkbox-group">
                                        <input 
                                            type="checkbox" 
                                            id="newsletter" 
                                            name="newsletter" 
                                            checked={formData.newsletter} 
                                            onChange={handleInputChange}
                                            className="contact-checkbox-input"
                                        />
                                        <label htmlFor="newsletter" className="contact-checkbox-label">
                                            Subscribe to our newsletter for updates and announcements
                                        </label>
                                    </div>

                                    <div className="contact-turnstile-wrapper">
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

                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        disabled={isLoading}
                                        icon={<i className="fas fa-paper-plane" aria-hidden="true"></i>}
                                        iconPosition="right"
                                        className="contact-submit-btn"
                                    >
                                        {isLoading ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Quick Actions */}
            <section className="contact-quick-actions-section contact-section-target reveal-fade-up" id="quick-actions" aria-labelledby="heading-quick-actions">
                <div className="container">
                    <SectionHeader
                        eyebrow="FAST ACCESS"
                        title="Quick Actions"
                        subtitle="Fast access to important services and information"
                        id="heading-quick-actions"
                    />
                    <div className="contact-actions-grid">
                        <Card
                            as="a"
                            href="https://vikram.mponline.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-action-card contact-action-card-featured"
                            aria-label="Fee Payment - Pay your fees online securely"
                        >
                            <div className="contact-action-card-header">
                                <div className="contact-action-icon-circle" aria-hidden="true">
                                    <i className="fas fa-credit-card"></i>
                                </div>
                            </div>
                            <div className="contact-action-body">
                                <h3 className="contact-action-title">Fee Payment</h3>
                                <p className="contact-action-desc">Pay your fees online securely</p>
                            </div>
                            <div className="contact-action-footer">
                                <i className="fas fa-arrow-right contact-action-arrow" aria-hidden="true"></i>
                            </div>
                        </Card>

                        <Card
                            as="a"
                            href="#"
                            className="contact-action-card"
                            aria-label="Download Brochure - Get detailed information about programs"
                        >
                            <div className="contact-action-card-header">
                                <div className="contact-action-icon-circle" aria-hidden="true">
                                    <i className="fas fa-file-download"></i>
                                </div>
                            </div>
                            <div className="contact-action-body">
                                <h3 className="contact-action-title">Download Brochure</h3>
                                <p className="contact-action-desc">Get detailed information about programs</p>
                            </div>
                            <div className="contact-action-footer">
                                <i className="fas fa-arrow-right contact-action-arrow" aria-hidden="true"></i>
                            </div>
                        </Card>

                        <Card
                            as="a"
                            href="#"
                            className="contact-action-card"
                            aria-label="Schedule Visit - Book a campus tour appointment"
                        >
                            <div className="contact-action-card-header">
                                <div className="contact-action-icon-circle" aria-hidden="true">
                                    <i className="fas fa-calendar-plus"></i>
                                </div>
                            </div>
                            <div className="contact-action-body">
                                <h3 className="contact-action-title">Schedule Visit</h3>
                                <p className="contact-action-desc">Book a campus tour appointment</p>
                            </div>
                            <div className="contact-action-footer">
                                <i className="fas fa-arrow-right contact-action-arrow" aria-hidden="true"></i>
                            </div>
                        </Card>

                        <Card
                            as="a"
                            href="#"
                            className="contact-action-card"
                            aria-label="FAQs - Find answers to common questions"
                        >
                            <div className="contact-action-card-header">
                                <div className="contact-action-icon-circle" aria-hidden="true">
                                    <i className="fas fa-question-circle"></i>
                                </div>
                            </div>
                            <div className="contact-action-body">
                                <h3 className="contact-action-title">FAQs</h3>
                                <p className="contact-action-desc">Find answers to common questions</p>
                            </div>
                            <div className="contact-action-footer">
                                <i className="fas fa-arrow-right contact-action-arrow" aria-hidden="true"></i>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 3. Department Contacts */}
            <section className="contact-departments-section contact-section-target reveal-fade-up" id="department-contacts" aria-labelledby="heading-department-contacts">
                <div className="container">
                    <SectionHeader
                        eyebrow="ACADEMIC DEPARTMENTS"
                        title="Department Contacts"
                        subtitle="Direct contact information for specific departments"
                        id="heading-department-contacts"
                    />
                    <div className="contact-dept-grid">
                        {/* Computer Science Engineering */}
                        <Card className="contact-dept-card">
                            <div className="contact-dept-header">
                                <div className="contact-dept-icon-circle" aria-hidden="true">
                                    <i className="fas fa-laptop-code"></i>
                                </div>
                                <h3 className="contact-dept-title">Computer Science Engineering</h3>
                            </div>
                            <div className="contact-dept-list">
                                <div className="contact-dept-hod">
                                    <span className="contact-dept-hod-label">Head of Department:</span>
                                    <span className="contact-dept-hod-value">Prof. (Dr.) Name</span>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-phone-alt contact-dept-icon" aria-hidden="true"></i>
                                    <a href="tel:+917342514275" className="contact-link">+91 734-2514275</a>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-envelope contact-dept-icon" aria-hidden="true"></i>
                                    <a href="mailto:cse.hod@vikramuniv.ac.in" className="contact-link">cse.hod@vikramuniv.ac.in</a>
                                </div>
                            </div>
                        </Card>

                        {/* Electronics & Communication */}
                        <Card className="contact-dept-card">
                            <div className="contact-dept-header">
                                <div className="contact-dept-icon-circle" aria-hidden="true">
                                    <i className="fas fa-microchip"></i>
                                </div>
                                <h3 className="contact-dept-title">Electronics &amp; Communication</h3>
                            </div>
                            <div className="contact-dept-list">
                                <div className="contact-dept-hod">
                                    <span className="contact-dept-hod-label">Head of Department:</span>
                                    <span className="contact-dept-hod-value">Prof. (Dr.) Name</span>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-phone-alt contact-dept-icon" aria-hidden="true"></i>
                                    <a href="tel:+917342514276" className="contact-link">+91 734-2514276</a>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-envelope contact-dept-icon" aria-hidden="true"></i>
                                    <a href="mailto:ece.hod@vikramuniv.ac.in" className="contact-link">ece.hod@vikramuniv.ac.in</a>
                                </div>
                            </div>
                        </Card>

                        {/* Mechanical Engineering */}
                        <Card className="contact-dept-card">
                            <div className="contact-dept-header">
                                <div className="contact-dept-icon-circle" aria-hidden="true">
                                    <i className="fas fa-cogs"></i>
                                </div>
                                <h3 className="contact-dept-title">Mechanical Engineering</h3>
                            </div>
                            <div className="contact-dept-list">
                                <div className="contact-dept-hod">
                                    <span className="contact-dept-hod-label">Head of Department:</span>
                                    <span className="contact-dept-hod-value">Prof. (Dr.) Name</span>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-phone-alt contact-dept-icon" aria-hidden="true"></i>
                                    <a href="tel:+917342514277" className="contact-link">+91 734-2514277</a>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-envelope contact-dept-icon" aria-hidden="true"></i>
                                    <a href="mailto:me.hod@vikramuniv.ac.in" className="contact-link">me.hod@vikramuniv.ac.in</a>
                                </div>
                            </div>
                        </Card>

                        {/* Electrical Engineering */}
                        <Card className="contact-dept-card">
                            <div className="contact-dept-header">
                                <div className="contact-dept-icon-circle" aria-hidden="true">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <h3 className="contact-dept-title">Electrical Engineering</h3>
                            </div>
                            <div className="contact-dept-list">
                                <div className="contact-dept-hod">
                                    <span className="contact-dept-hod-label">Head of Department:</span>
                                    <span className="contact-dept-hod-value">Prof. (Dr.) Name</span>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-phone-alt contact-dept-icon" aria-hidden="true"></i>
                                    <a href="tel:+917342514278" className="contact-link">+91 734-2514278</a>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-envelope contact-dept-icon" aria-hidden="true"></i>
                                    <a href="mailto:ee.hod@vikramuniv.ac.in" className="contact-link">ee.hod@vikramuniv.ac.in</a>
                                </div>
                            </div>
                        </Card>

                        {/* Civil Engineering */}
                        <Card className="contact-dept-card">
                            <div className="contact-dept-header">
                                <div className="contact-dept-icon-circle" aria-hidden="true">
                                    <i className="fas fa-road"></i>
                                </div>
                                <h3 className="contact-dept-title">Civil Engineering</h3>
                            </div>
                            <div className="contact-dept-list">
                                <div className="contact-dept-hod">
                                    <span className="contact-dept-hod-label">Head of Department:</span>
                                    <span className="contact-dept-hod-value">Prof. (Dr.) Name</span>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-phone-alt contact-dept-icon" aria-hidden="true"></i>
                                    <a href="tel:+917342514279" className="contact-link">+91 734-2514279</a>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-envelope contact-dept-icon" aria-hidden="true"></i>
                                    <a href="mailto:ce.hod@vikramuniv.ac.in" className="contact-link">ce.hod@vikramuniv.ac.in</a>
                                </div>
                            </div>
                        </Card>

                        {/* Chemical Engineering */}
                        <Card className="contact-dept-card">
                            <div className="contact-dept-header">
                                <div className="contact-dept-icon-circle" aria-hidden="true">
                                    <i className="fas fa-industry"></i>
                                </div>
                                <h3 className="contact-dept-title">Chemical Engineering</h3>
                            </div>
                            <div className="contact-dept-list">
                                <div className="contact-dept-hod">
                                    <span className="contact-dept-hod-label">Head of Department:</span>
                                    <span className="contact-dept-hod-value">Prof. (Dr.) Name</span>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-phone-alt contact-dept-icon" aria-hidden="true"></i>
                                    <a href="tel:+917342514280" className="contact-link">+91 734-2514280</a>
                                </div>
                                <div className="contact-dept-row">
                                    <i className="fas fa-envelope contact-dept-icon" aria-hidden="true"></i>
                                    <a href="mailto:che.hod@vikramuniv.ac.in" className="contact-link">che.hod@vikramuniv.ac.in</a>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 4. Location & Directions */}
            <section className="contact-location-section contact-section-target reveal-fade-up" id="location-directions" aria-labelledby="heading-location-directions">
                <div className="container">
                    <SectionHeader
                        eyebrow="CAMPUS LOCATION"
                        title="Location & Directions"
                        subtitle="Find us on the map and get directions to our campus"
                        id="heading-location-directions"
                    />
                    <div className="contact-location-grid">
                        {/* Left Column: Interactive Map Card */}
                        <Card className="contact-map-card">
                            <div className="contact-map-frame-wrapper">
                                <div className="contact-map-fallback" aria-hidden="true">
                                    <div className="contact-map-fallback-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--indigo-900)' }}>
                                        SoET Campus Map
                                    </span>
                                </div>
                                <iframe
                                    src={`https://www.google.com/maps?q=${encodeURIComponent("Samrat Vikramaditya Vishwavidyalaya, Dewas Road, Ujjain, MP 456010")}&output=embed`}
                                    className="contact-map-iframe"
                                    title="Google Map of SoET Campus"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                >
                                    Samrat Vikramaditya Vishwavidyalaya, Dewas Road, Ujjain, MP 456010
                                </iframe>
                            </div>
                            <div className="contact-map-info">
                                <h3 className="contact-map-title">Interactive Map</h3>
                                <p className="contact-map-address">
                                    Samrat Vikramaditya Vishwavidyalaya Campus<br />
                                    Dewas Road, Ujjain, MP 456010
                                </p>
                            </div>
                            <Button
                                href="https://maps.google.com/?q=Vikram+University+Ujjain"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                icon="fas fa-external-link-alt"
                                iconPosition="left"
                                className="contact-map-btn"
                            >
                                Open in Google Maps
                            </Button>
                        </Card>

                        {/* Right Column: How to Reach */}
                        <div className="contact-reach-column">
                            <div className="contact-reach-header">
                                <h3 className="contact-reach-heading">How to Reach</h3>
                                <p className="contact-reach-sub">Convenient transport options to visit our engineering campus</p>
                            </div>
                            <div className="contact-transport-list">
                                <Card className="contact-transport-card">
                                    <div className="contact-transport-row">
                                        <div className="contact-transport-icon-circle" aria-hidden="true">
                                            <i className="fas fa-plane"></i>
                                        </div>
                                        <div className="contact-transport-content">
                                            <h4 className="contact-transport-label">By Air</h4>
                                            <p className="contact-transport-desc">
                                                Nearest airport is Devi Ahilya Bai Holkar Airport, Indore (55 km from campus). Regular taxi and bus services available.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="contact-transport-card">
                                    <div className="contact-transport-row">
                                        <div className="contact-transport-icon-circle" aria-hidden="true">
                                            <i className="fas fa-train"></i>
                                        </div>
                                        <div className="contact-transport-content">
                                            <h4 className="contact-transport-label">By Train</h4>
                                            <p className="contact-transport-desc">
                                                Ujjain Junction Railway Station is 8 km from campus. Auto-rickshaws and buses available from the station.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="contact-transport-card">
                                    <div className="contact-transport-row">
                                        <div className="contact-transport-icon-circle" aria-hidden="true">
                                            <i className="fas fa-bus"></i>
                                        </div>
                                        <div className="contact-transport-content">
                                            <h4 className="contact-transport-label">By Bus</h4>
                                            <p className="contact-transport-desc">
                                                Regular bus services from major cities. Ujjain Bus Stand is 6 km from campus with connecting local transport.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="contact-transport-card">
                                    <div className="contact-transport-row">
                                        <div className="contact-transport-icon-circle" aria-hidden="true">
                                            <i className="fas fa-car"></i>
                                        </div>
                                        <div className="contact-transport-content">
                                            <h4 className="contact-transport-label">By Car</h4>
                                            <p className="contact-transport-desc">
                                                Well-connected by road networks. Campus located on Dewas Road with ample parking facilities available.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
