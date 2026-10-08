import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="top-bar" role="banner">
                <div className="container">
                    <div className="top-links">
                        <a href="mailto:soetvikramujn@gmail.com" aria-label="Email SoET">
                            <i className="fas fa-envelope" aria-hidden="true"></i>
                            soetvikramujn@gmail.com
                        </a>
                        <a href="tel:+919893295134" aria-label="Call SoET">
                            <i className="fas fa-phone" aria-hidden="true"></i>
                            +91 9893295134
                        </a>
                    </div>
                    <div className="utility-actions">
                        <Link to="/announcements" className="announcements-btn" aria-label="View Announcements">
                            <i className="fas fa-bullhorn" aria-hidden="true"></i>
                            Announcements
                        </Link>
                        <Link to="/syllabus" className="syllabus-btn" aria-label="View Syllabus">
                            <i className="fas fa-book-open" aria-hidden="true"></i>
                            Syllabus
                        </Link>
                        <Link to="/admin-login" className="admin-login-btn" aria-label="Admin Login">
                            <i className="fas fa-user-shield" aria-hidden="true"></i>
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
            
            <header className="header">
                <div className="container header-container">
                    <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src="/assets/images/Vikram-university_Logo.png" alt="Samrat Vikramaditya Vishwavidyalaya Logo" style={{ height: '60px', width: 'auto' }} />
                        <div className="logo-text">
                            <h1>SoET</h1>
                            <p className="college-name">School of Engineering and Technology</p>
                            <p className="university-name">Samrat Vikramaditya Vishwavidyalaya</p>
                        </div>
                    </div>
                    
                    <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`} role="navigation" aria-label="Main navigation">
                        <ul>
                            <li><NavLink to="/" end>Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/academics">Academics</NavLink></li>
                            <li><NavLink to="/facilities">Facilities</NavLink></li>
                            <li><NavLink to="/activities">Activities</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li>
                                <a 
                                    href="https://vikram.mponline.gov.in/Portal/Services/VIKRAM/Entrance/UTD/Admission_Entrance_Form.aspx" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="admission-btn"
                                >
                                    Admission
                                </a>
                            </li>
                        </ul>
                    </nav>
                    
                    <button 
                        className="mobile-menu-toggle" 
                        aria-label="Toggle mobile menu" 
                        aria-expanded={isMobileMenuOpen}
                        onClick={toggleMenu}
                    >
                        <i className="fas fa-bars" aria-hidden="true"></i>
                    </button>
                </div>
            </header>
        </>
    );
}
