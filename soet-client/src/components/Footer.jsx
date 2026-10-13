import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const [visitorCount, setVisitorCount] = useState(12345);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        // Mocking a visitor count increment
        setVisitorCount(prev => prev + Math.floor(Math.random() * 5));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    };

    return (
        <footer className="footer-root" role="contentinfo">
            <div className="container">
                <div className="footer-main-grid">
                    {/* Brand Column (1.5fr) */}
                    <div className="footer-col footer-col-brand">
                        <div className="footer-brand-logos">
                            <img 
                                src="/assets/images/Vikram-university_Logo.png" 
                                alt="Samrat Vikramaditya Vishwavidyalaya Logo" 
                                className="footer-brand-logo"
                                loading="lazy"
                            />
                            <div className="footer-brand-divider" aria-hidden="true"></div>
                            <img 
                                src="/assets/images/Code_D_Code Logo.png" 
                                alt="Code_d_Code Society Logo" 
                                className="footer-brand-logo"
                                loading="lazy"
                            />
                        </div>
                        <h3 className="footer-brand-heading">School of Engineering &amp; Technology</h3>
                        <p className="footer-brand-desc">
                            Samrat Vikramaditya Vishwavidyalaya, Ujjain. Premier engineering institution committed to technical excellence, research, and holistic student development.
                        </p>
                        <div className="footer-social-links" aria-label="Official Social Media Links">
                            <a 
                                href="https://www.facebook.com/share/12J7Pi4TL3T/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Facebook (opens in new tab)"
                                className="footer-social-btn"
                            >
                                <i className="fab fa-facebook-f" aria-hidden="true"></i>
                            </a>
                            <a 
                                href="https://x.com/vuujjain" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="X / Twitter (opens in new tab)"
                                className="footer-social-btn"
                            >
                                <i className="fab fa-twitter" aria-hidden="true"></i>
                            </a>
                            <a 
                                href="https://www.linkedin.com/company/vikramuniversity/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="LinkedIn (opens in new tab)"
                                className="footer-social-btn"
                            >
                                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column (1fr) */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-nav-list">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/academics">Academic Programs</Link></li>
                            <li><a href="https://vikram.mponline.gov.in/" target="_blank" rel="noopener noreferrer">Admissions <i className="fas fa-external-link-alt" aria-hidden="true"></i></a></li>
                            <li><Link to="/facilities">Facilities</Link></li>
                            <li><Link to="/activities">Training &amp; Placement</Link></li>
                        </ul>
                    </div>

                    {/* Important Links Column (1fr) */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Important Links</h4>
                        <ul className="footer-nav-list">
                            <li><a href="https://vikramuniv.ac.in/" target="_blank" rel="noopener noreferrer">University Portal <i className="fas fa-external-link-alt" aria-hidden="true"></i></a></li>
                            <li><a href="https://vikram.mponline.gov.in/" target="_blank" rel="noopener noreferrer">Online Fee Payment <i className="fas fa-external-link-alt" aria-hidden="true"></i></a></li>
                            <li><a href="https://vikramuniv.ac.in/results/" target="_blank" rel="noopener noreferrer">Examination Results <i className="fas fa-external-link-alt" aria-hidden="true"></i></a></li>
                            <li><a href="https://vikramuniv.ac.in/academic-calendar/" target="_blank" rel="noopener noreferrer">Academic Calendar <i className="fas fa-external-link-alt" aria-hidden="true"></i></a></li>
                            <li><a href="https://www.aicte-india.org/" target="_blank" rel="noopener noreferrer">AICTE Approvals <i className="fas fa-external-link-alt" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>

                    {/* Contact Info Column (1.5fr) */}
                    <div className="footer-col footer-col-contact">
                        <h4 className="footer-col-title">Contact Info</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <div className="footer-contact-icon-wrap" aria-hidden="true">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <span>School of Engineering &amp; Technology (SoET), Vikram University Campus, Ujjain (M.P.) – 456010</span>
                            </li>
                            <li>
                                <div className="footer-contact-icon-wrap" aria-hidden="true">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <a href="mailto:soetvikramujn@gmail.com">soetvikramujn@gmail.com</a>
                            </li>
                            <li>
                                <div className="footer-contact-icon-wrap" aria-hidden="true">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <a href="tel:+919893295134">+91 9893295134, 8770122362</a>
                            </li>
                            <li>
                                <div className="footer-contact-icon-wrap" aria-hidden="true">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <span>Mon – Sat: 10:00 AM – 5:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="footer-bottom-bar">
                    <p className="footer-copyright">
                        &copy; 2026 School of Engineering &amp; Technology, SVVU Ujjain. All rights reserved.
                    </p>
                    <div className="footer-credit">
                        <a href="https://www.codedcode.tech" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
                            Crafted with care by <span className="footer-credit-highlight">Code_d_Code Society</span>
                        </a>
                    </div>
                    <div className="footer-meta">
                        <span>Visitors: <strong id="visitor-count">{visitorCount.toLocaleString()}</strong></span>
                        <span className="footer-meta-sep" aria-hidden="true">•</span>
                        <span>Updated: June 11, 2026</span>
                    </div>
                </div>
            </div>

            {/* Back to top floating button */}
            <button
                type="button"
                className={`back-to-top-btn ${showBackToTop ? 'is-visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                tabIndex={showBackToTop ? 0 : -1}
            >
                <i className="fas fa-chevron-up" aria-hidden="true"></i>
            </button>
        </footer>
    );
}
