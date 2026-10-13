import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from './Button';
import '../styles/mobile.css';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Handle scroll state for navbar shadow
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 15) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle body scroll lock & Escape key
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    setIsMobileMenuOpen(false);
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const toggleMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    return (
        <>
            {/* 1. TOP UTILITY BAR (40px, non-sticky, indigo-950) */}
            <div className="top-bar" role="region" aria-label="Quick Contacts and Portal">
                <div className="container">
                    <div className="top-links">
                        <a href="mailto:soetvikramujn@gmail.com" aria-label="Email SoET: soetvikramujn@gmail.com">
                            <i className="fas fa-envelope" aria-hidden="true"></i>
                            <span className="top-link-text">soetvikramujn@gmail.com</span>
                        </a>
                        <a href="tel:+919893295134" aria-label="Call SoET: +91 9893295134">
                            <i className="fas fa-phone-alt" aria-hidden="true"></i>
                            <span className="top-link-text">+91 9893295134</span>
                        </a>
                    </div>
                    
                    <div className="utility-actions">
                        <div className="utility-text-links">
                            <Link to="/announcements" className="utility-link" aria-label="Announcements">
                                <i className="fas fa-bell" aria-hidden="true"></i>
                                <span>Announcements</span>
                            </Link>
                            <span className="utility-divider" aria-hidden="true"></span>
                            <Link to="/syllabus" className="utility-link" aria-label="Syllabus">
                                <i className="fas fa-book-open" aria-hidden="true"></i>
                                <span>Syllabus</span>
                            </Link>
                            <span className="utility-divider" aria-hidden="true"></span>
                        </div>
                        <Link 
                            to="/login" 
                            className="portal-login-btn" 
                            aria-label="Portal Login"
                        >
                            <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                            <span>Portal Login</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. NAVBAR (72px, sticky, backdrop-blur) */}
            <header className={`header ${isScrolled ? 'header-scrolled' : ''}`} role="banner">
                <div className="container header-container">
                    {/* Logo Lockup */}
                    <Link to="/" className="logo-lockup" aria-label="SoET Home">
                        <img 
                            src="/assets/images/Vikram-university_Logo.png" 
                            alt="Samrat Vikramaditya Vishwavidyalaya Logo" 
                            className="logo-lockup-img"
                            width="48"
                            height="48"
                            loading="lazy"
                        />
                        <span className="logo-lockup-brand">SoET</span>
                        <span className="logo-lockup-divider" aria-hidden="true"></span>
                        <div className="logo-lockup-text">
                            <span className="logo-lockup-name">School of Engineering &amp; Technology</span>
                            <span className="logo-lockup-sub">Samrat Vikramaditya Vishwavidyalaya, Ujjain</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav" role="navigation" aria-label="Primary Navigation">
                        <ul>
                            <li>
                                <NavLink to="/" end className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/academics" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                                    Academics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/facilities" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                                    Facilities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/activities" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                                    Activities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        <div className="nav-actions">
                            <Button
                                href="https://vikram.mponline.gov.in/Portal/Services/VIKRAM/Entrance/UTD/Admission_Entrance_Form.aspx"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                size="small"
                                icon={<i className="fas fa-arrow-right"></i>}
                                iconPosition="right"
                                ariaLabel="Apply for Admission"
                            >
                                Admission
                            </Button>
                        </div>
                    </nav>

                    {/* Mobile Hamburger Toggle */}
                    <button 
                        className="mobile-menu-toggle" 
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        onClick={toggleMenu}
                    >
                        <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"} aria-hidden="true"></i>
                    </button>
                </div>
            </header>

            {/* 3. MOBILE SLIDE-IN DRAWER */}
            <div 
                className={`drawer-backdrop ${isMobileMenuOpen ? 'active' : ''}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />
            <div 
                className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Drawer"
            >
                <div className="mobile-drawer-header">
                    <div className="logo-lockup">
                        <img 
                            src="/assets/images/Vikram-university_Logo.png" 
                            alt="SoET Logo" 
                            className="logo-lockup-img"
                            width="36"
                            height="36"
                        />
                        <span className="logo-lockup-brand" style={{ fontSize: '1.3rem' }}>SoET</span>
                    </div>
                    <button 
                        className="drawer-close-btn" 
                        aria-label="Close menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <i className="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="mobile-drawer-body">
                    <NavLink to="/" end className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}>
                        <span>Home</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '11px', opacity: 0.6 }}></i>
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}>
                        <span>About</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '11px', opacity: 0.6 }}></i>
                    </NavLink>
                    <NavLink to="/academics" className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}>
                        <span>Academics</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '11px', opacity: 0.6 }}></i>
                    </NavLink>
                    <NavLink to="/facilities" className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}>
                        <span>Facilities</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '11px', opacity: 0.6 }}></i>
                    </NavLink>
                    <NavLink to="/activities" className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}>
                        <span>Activities</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '11px', opacity: 0.6 }}></i>
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}>
                        <span>Contact</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: '11px', opacity: 0.6 }}></i>
                    </NavLink>

                    <div className="drawer-utility-section">
                        <NavLink to="/announcements" className="mobile-drawer-link">
                            <span><i className="fas fa-bell" style={{ marginRight: '8px' }}></i>Announcements</span>
                        </NavLink>
                        <NavLink to="/syllabus" className="mobile-drawer-link">
                            <span><i className="fas fa-book-open" style={{ marginRight: '8px' }}></i>Syllabus</span>
                        </NavLink>
                        <NavLink to="/login" className="mobile-drawer-link">
                            <span><i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i>Portal Login</span>
                        </NavLink>
                    </div>
                </div>

                <div className="mobile-drawer-footer">
                    <Button
                        href="https://vikram.mponline.gov.in/Portal/Services/VIKRAM/Entrance/UTD/Admission_Entrance_Form.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        icon={<i className="fas fa-arrow-right"></i>}
                        iconPosition="right"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        Admission 2026-27
                    </Button>
                </div>
            </div>
        </>
    );
}
