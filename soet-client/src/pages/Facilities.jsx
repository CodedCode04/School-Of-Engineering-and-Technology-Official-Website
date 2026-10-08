import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Facilities() {
    useEffect(() => {
        document.title = "Facilities - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            

    {/* Page Header */}
    <section className="page-header">
        <div className="container">
            <h1>World-Class Facilities</h1>
            <p>State-of-the-art infrastructure for comprehensive learning</p>
            <nav className="breadcrumb">
                <Link to="/..index">Home</Link> <span>/</span> Facilities
            </nav>
        </div>
    </section>

    {/* Facilities Overview */}
    <section className="facilities-overview">
        <div className="container">
            <div className="section-header">
                <h2>Our Infrastructure</h2>
                <p>Modern facilities designed to enhance learning and research</p>
            </div>
            <div className="overview-stats">
                <div className="stat-item">
                    <i className="fas fa-flask"></i>
                    <h3>6</h3>
                    <p>Specialized Laboratories</p>
                </div>
                <div className="stat-item">
                    <i className="fas fa-desktop"></i>
                    <h3>250+</h3>
                    <p>Computer Systems</p>
                </div>
                <div className="stat-item">
                    <i className="fas fa-book"></i>
                    <h3>2500+</h3>
                    <p>Books & Journals</p>
                </div>
                <div className="stat-item">
                    <i className="fas fa-wifi"></i>
                    <h3>100%</h3>
                    <p>Campus Wi-Fi Coverage</p>
                </div>
            </div>
        </div>
    </section>

    {/* Laboratories Section */}
    <section className="laboratories-section">
        <div className="container">
            <div className="section-header">
                <h2>Advanced Laboratories</h2>
                <p>Hands-on learning with cutting-edge equipment</p>
            </div>
            <div className="facilities-grid">
                <div className="facility-item detailed">
                    <div className="facility-image">
                        <img src="/assets/images/College Pics/LAB/Computer Lab.jpg" alt="Computer Science Lab" />
                    </div>
                    <div className="facility-content">
                        <h3>Computer Science & IT Labs</h3>
                        <p>State-of-the-art computing facilities with latest hardware and software for programming, AI/ML, and software development.</p>
                        <ul className="facility-features">
                            <li><i className="fas fa-check"></i> High-performance workstations</li>
                            <li><i className="fas fa-check"></i> Latest development tools and IDEs</li>
                            <li><i className="fas fa-check"></i> AI/ML frameworks and GPUs</li>
                            <li><i className="fas fa-check"></i> Network and cybersecurity lab</li>
                        </ul>
                    </div>
                </div>

                <div className="facility-item detailed">
                    <div className="facility-image">
                        <img src="/assets/images/College Pics/LAB/Electronics Lab.jpg" alt="Electronics Lab" />
                    </div>
                    <div className="facility-content">
                        <h3>Electronics & Communication Labs</h3>
                        <p>Comprehensive facilities for digital electronics, communication systems, and VLSI design with modern testing equipment.</p>
                        <ul className="facility-features">
                            <li><i className="fas fa-check"></i> Digital oscilloscopes and analyzers</li>
                            <li><i className="fas fa-check"></i> RF and microwave test equipment</li>
                            <li><i className="fas fa-check"></i> VLSI design software and tools</li>
                            <li><i className="fas fa-check"></i> Embedded systems development kits</li>
                        </ul>
                    </div>
                </div>

                <div className="facility-item detailed">
                    <div className="facility-image">
                        <img src="/assets/images/College Pics/LAB/Mechenical Lab.jpg" alt="Mechanical Lab" />
                    </div>
                    <div className="facility-content">
                        <h3>Mechanical Engineering Labs</h3>
                        <p>Well-equipped workshops and laboratories for manufacturing, thermal engineering, and mechanical design studies.</p>
                        <ul className="facility-features">
                            <li><i className="fas fa-check"></i> CNC machines and 3D printers</li>
                            <li><i className="fas fa-check"></i> CAD/CAM workstations</li>
                            <li><i className="fas fa-check"></i> Materials testing equipment</li>
                            <li><i className="fas fa-check"></i> Thermal and fluid mechanics lab</li>
                        </ul>
                    </div>
                </div>

                <div className="facility-item detailed">
                    <div className="facility-image">
                        <img src="/assets/images/College Pics/LAB/Electronics Lab (2).jpg" alt="Electrical Engineering Lab" />
                    </div>
                    <div className="facility-content">
                        <h3>Electrical Engineering Labs</h3>
                        <p>Comprehensive facilities for power systems, control systems, and electrical machines with safety-certified equipment.</p>
                        <ul className="facility-features">
                            <li><i className="fas fa-check"></i> Power system simulation software</li>
                            <li><i className="fas fa-check"></i> Motor and generator test beds</li>
                            <li><i className="fas fa-check"></i> PLC and SCADA systems</li>
                            <li><i className="fas fa-check"></i> Renewable energy lab setup</li>
                        </ul>
                    </div>
                </div>

                <div className="facility-item detailed">
                    <div className="facility-image">
                        <img src="/assets/images/College Pics/LAB/Civil Lab.jpg" alt="Civil Engineering Lab" />
                    </div>
                    <div className="facility-content">
                        <h3>Civil Engineering Labs</h3>
                        <p>Complete testing facilities for construction materials, soil mechanics, and structural analysis.</p>
                        <ul className="facility-features">
                            <li><i className="fas fa-check"></i> Universal testing machine</li>
                            <li><i className="fas fa-check"></i> Concrete and materials testing</li>
                            <li><i className="fas fa-check"></i> Soil mechanics laboratory</li>
                            <li><i className="fas fa-check"></i> Surveying and CAD lab</li>
                        </ul>
                    </div>
                </div>

                <div className="facility-item detailed">
                    <div className="facility-image">
                        <img src="/assets/images/College Pics/LAB/Agricultral Lab.jpg" alt="Agricultural Engineering Lab" />
                    </div>
                    <div className="facility-content">
                        <h3>Agricultural Engineering Labs</h3>
                        <p>Specialized facilities for farm machinery, irrigation systems, and agricultural technology development.</p>
                        <ul className="facility-features">
                            <li><i className="fas fa-check"></i> Farm machinery testing equipment</li>
                            <li><i className="fas fa-check"></i> Irrigation system design tools</li>
                            <li><i className="fas fa-check"></i> Soil analysis instruments</li>
                            <li><i className="fas fa-check"></i> Agricultural processing equipment</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Lab Gallery Section */}
    <section className="lab-gallery-section">
        <div className="container">
            <div className="section-header">
                <h2>Laboratory Gallery</h2>
                <p>State-of-the-art laboratories equipped with modern technology</p>
            </div>
            <div className="lab-gallery-grid">
                <div className="gallery-item">
                    <img src="/assets/images/College Pics/LAB/Computer Lab (2).jpg" alt="Computer Lab" />
                    <div className="gallery-overlay">
                        <h4>Advanced Computer Lab</h4>
                        <p>Latest computing facilities for programming and software development</p>
                    </div>
                </div>
                <div className="gallery-item">
                    <img src="/assets/images/College Pics/LAB/Electronics Lab (3).jpg" alt="Electronics Lab" />
                    <div className="gallery-overlay">
                        <h4>Electronics Laboratory</h4>
                        <p>Digital electronics and communication systems testing</p>
                    </div>
                </div>
                <div className="gallery-item">
                    <img src="/assets/images/College Pics/LAB/Civil Lab (2).jpg" alt="Civil Lab" />
                    <div className="gallery-overlay">
                        <h4>Civil Engineering Lab</h4>
                        <p>Structural testing and materials analysis</p>
                    </div>
                </div>
                <div className="gallery-item">
                    <img src="/assets/images/College Pics/LAB/Electronics Lab (4).jpg" alt="Electronics Equipment" />
                    <div className="gallery-overlay">
                        <h4>Advanced Equipment</h4>
                        <p>Precision instruments for research and development</p>
                    </div>
                </div>
                <div className="gallery-item">
                    <img src="/assets/images/College Pics/LAB/Library (2).jpg" alt="Library Reading Hall" />
                    <div className="gallery-overlay">
                        <h4>Library Reading Hall</h4>
                        <p>Quiet study spaces with extensive resources</p>
                    </div>
                </div>
                <div className="gallery-item">
                    <img src="/assets/images/College Pics/LAB/Civil Lab (3).jpg" alt="Testing Equipment" />
                    <div className="gallery-overlay">
                        <h4>Testing Facilities</h4>
                        <p>Quality testing and analysis equipment</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Infrastructure Section */}
    <section className="infrastructure-section">
        <div className="container">
            <div className="section-header">
                <h2>Campus Infrastructure</h2>
                <p>Modern amenities for a complete educational experience</p>
            </div>
            <div className="infrastructure-grid">
                <div className="infra-item">
                    <img src="/assets/images/College Pics/Auditorium/Auditorium.jpg" alt="Auditorium" />
                    <div className="infra-content">
                        <h3>Main Auditorium</h3>
                        <p>A spacious 500-seat auditorium equipped with modern audio-visual systems for seminars, conferences, and cultural events.</p>
                        <div className="infra-features">
                            <span><i className="fas fa-users"></i> 500 Seating Capacity</span>
                            <span><i className="fas fa-microphone"></i> Advanced Sound System</span>
                            <span><i className="fas fa-video"></i> HD Projection</span>
                        </div>
                    </div>
                </div>

                <div className="infra-item">
                    <img src="/assets/images/College Pics/LAB/Library.jpg" alt="Library" />
                    <div className="infra-content">
                        <h3>Library</h3>
                        <p>A comprehensive library with extensive collection of books, journals, digital resources, and comfortable reading spaces.</p>
                        <div className="infra-features">
                            <span><i className="fas fa-book"></i> 2500+ Books</span>
                            <span><i className="fas fa-journal-whills"></i> 200+ Journals</span>
                            <span><i className="fas fa-database"></i> Digital Resources</span>
                        </div>
                    </div>
                </div>

                <div className="infra-item">
                    <img src="/assets/images/College Pics/Sport Area.jpg" alt="Sports & Recreation" />
                    <div className="infra-content">
                        <h3>Sports & Recreation</h3>
                        <p>Well-maintained sports facilities including outdoor courts, indoor games, and fitness center for physical wellness.</p>
                        <div className="infra-features">
                            <span><i className="fas fa-running"></i> Outdoor Courts</span>
                            <span><i className="fas fa-dumbbell"></i> Fitness Center</span>
                            <span><i className="fas fa-table-tennis"></i> Indoor Games</span>
                        </div>
                    </div>
                </div>

                <div className="infra-item">
                    <img src="/assets/images/College Pics/Hostel/Shaligram Tomar Hostel Side View.jpg" alt="Hostel Accommodation" />
                    <div className="infra-content">
                        <h3>Hostel Accommodation</h3>
                        <p>Comfortable and secure hostel facilities for both boys and girls with modern amenities and 24/7 security.</p>
                        <div className="infra-features">
                            <span><i className="fas fa-bed"></i> Furnished Rooms</span>
                            <span><i className="fas fa-shield-alt"></i> 24/7 Security</span>
                            <span><i className="fas fa-wifi"></i> Internet Access</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Technology Infrastructure */}
    <section className="tech-infrastructure">
        <div className="container">
            <div className="section-header">
                <h2>Technology Infrastructure</h2>
                <p>Digital backbone supporting modern education</p>
            </div>
            <div className="tech-features">
                <div className="tech-item">
                    <i className="fas fa-wifi"></i>
                    <h3>Campus-wide Wi-Fi</h3>
                    <p>High-speed internet connectivity across the entire campus with 24/7 availability</p>
                </div>
                <div className="tech-item">
                    <i className="fas fa-server"></i>
                    <h3>Data Center</h3>
                    <p>Modern server infrastructure supporting all academic and administrative systems</p>
                </div>
                <div className="tech-item">
                    <i className="fas fa-cloud"></i>
                    <h3>Cloud Services</h3>
                    <p>Cloud-based learning management system and digital resources access</p>
                </div>
                <div className="tech-item">
                    <i className="fas fa-mobile-alt"></i>
                    <h3>Mobile Learning</h3>
                    <p>Mobile applications for course access, assignments, and communication</p>
                </div>
                <div className="tech-item">
                    <i className="fas fa-shield-alt"></i>
                    <h3>Network Security</h3>
                    <p>Robust cybersecurity measures protecting all digital assets and data</p>
                </div>
                <div className="tech-item">
                    <i className="fas fa-tools"></i>
                    <h3>IT Support</h3>
                    <p>Dedicated IT support team providing 24/7 technical assistance</p>
                </div>
            </div>
        </div>
    </section>

    {/* Safety & Security */}
    <section className="safety-section">
        <div className="container">
            <div className="section-header">
                <h2>Safety & Security</h2>
                <p>Ensuring a safe and secure learning environment</p>
            </div>
            <div className="safety-grid">
                <div className="safety-item">
                    <i className="fas fa-video"></i>
                    <h3>CCTV Surveillance</h3>
                    <p>Comprehensive CCTV coverage across campus for enhanced security monitoring</p>
                </div>
                <div className="safety-item">
                    <i className="fas fa-user-shield"></i>
                    <h3>24/7 Security</h3>
                    <p>Round-the-clock security personnel ensuring campus safety</p>
                </div>
                <div className="safety-item">
                    <i className="fas fa-fire-extinguisher"></i>
                    <h3>Fire Safety</h3>
                    <p>Modern fire detection and suppression systems in all buildings</p>
                </div>
                <div className="safety-item">
                    <i className="fas fa-first-aid"></i>
                    <h3>Medical Facility</h3>
                    <p>On-campus medical center with qualified medical staff</p>
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    
        </>
    );
}
