import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const [visitorCount, setVisitorCount] = useState(12345);

    useEffect(() => {
        // Mocking a visitor count increment
        setVisitorCount(prev => prev + Math.floor(Math.random() * 5));
    }, []);

    return (
        <footer className="footer" role="contentinfo">
            <div className="container">
                {/* Footer Logos Section */}
                <div className="footer-logos">
                    <div className="footer-logo-item">
                        <img src="/assets/images/Vikram-university_Logo.png" alt="Samrat Vikramaditya Vishwavidyalaya Logo" className="footer-logo" />
                        <div className="footer-logo-text">Samrat Vikramaditya Vishwavidyalaya</div>
                    </div>
                    <div className="footer-logo-item">
                        <a href="https://www.codedcode.tech" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/images/Code_D_Code Logo.png" alt="Code_d_Code Logo" className="footer-logo" />
                            <div className="footer-logo-text">Code_d_Code Society</div>
                        </a>
                    </div>
                </div>
                
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>SoET</h3>
                        <p>School of Engineering and Technology, Samrat Vikramaditya Vishwavidyalaya Ujjain - Excellence in Engineering Education since 1957.</p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/share/12J7Pi4TL3T/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                            <a href="https://x.com/vuujjain" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.linkedin.com/company/vikramuniversity/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/about">About SoET</Link></li>
                            <li><Link to="/academics">Academic Programs</Link></li>
                            <li><Link to="/facilities">Facilities</Link></li>
                            <li><Link to="/activities">Student Activities</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Important Links</h3>
                        <ul>
                            <li><a href="https://vikramuniv.ac.in/" target="_blank" rel="noopener noreferrer">Samrat Vikramaditya Vishwavidyalaya</a></li>
                            <li><a href="https://vikram.mponline.gov.in/" target="_blank" rel="noopener noreferrer">Online Services</a></li>
                            <li><a href="https://www.aicte-india.org/" target="_blank" rel="noopener noreferrer">AICTE</a></li>
                            <li><a href="https://www.ugc.ac.in/" target="_blank" rel="noopener noreferrer">UGC</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Info</h3>
                        <p><i className="fas fa-map-marker-alt"></i> School of Engineering & Technology (SoET), Samrat Vikramaditya Vishwavidyalaya, Vikram University Campus, Ujjain (M.P.) – 456010</p>
                        <p><i className="fas fa-phone"></i> +91 9893295134, 8770122362</p>
                        <p><i className="fas fa-envelope"></i> soetvikramujn@gmail.com</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026-27 School of Engineering and Technology, Samrat Vikramaditya Vishwavidyalaya Ujjain. All rights reserved.</p>
                    <div className="made-by-section">
                        <a href="https://www.codedcode.tech" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/images/Code_D_Code Logo.png" alt="Code_d_Code Logo" className="code-d-code-logo" />
                        </a>
                        <div className="made-by-text">
                            Made BY <a href="https://www.codedcode.tech" target="_blank" rel="noopener noreferrer"><span className="made-by-highlight">Code_d_Code</span></a> Samrat Vikramaditya Vishwavidyalaya
                        </div>
                    </div>
                    <p>Visitors Count: <span id="visitor-count">{visitorCount.toLocaleString()}</span></p>
                    <p>Last Updated: June 11, 2026</p>
                </div>
            </div>
        </footer>
    );
}
