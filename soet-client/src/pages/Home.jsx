import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    useEffect(() => {
        document.title = "Home - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            

    {/* ========================================
         HERO SECTION
         Primary landing section with key messaging and statistics
         Showcases SoET's mission, vision, and impact
         ======================================== */}
    <main id="main-content" className="hero" role="main">
        <div className="hero-container">
            <div className="hero-content">
                <div className="hero-badge">
                    <i className="fas fa-award" aria-hidden="true"></i>
                    <span>AICTE Approved | Academic Year 2026-27</span>
                </div>
                <h1 className="hero-title">
                    <span className="title-gradient">Build Your Future</span>
                    <span className="title-highlight">with SoET Ujjain</span>
                </h1>
                <p className="hero-description">School of Engineering & Technology (SoET), Samrat Vikramaditya Vishwavidyalaya Ujjain – Your premier destination for quality engineering education, industry exposure, and holistic development.</p>
                <div className="cta-buttons">
                    <Link to="/about" className="btn-primary" aria-label="Learn more about SoET">
                        <span>Discover SoET</span>
                        <i className="fas fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                    <Link to="/academics" className="btn-secondary" aria-label="View academic programs">
                        <i className="fas fa-graduation-cap" aria-hidden="true"></i>
                        <span>View Programs</span>
                    </Link>
                </div>
                <div className="hero-features">
                    <div className="feature-item">
                        <i className="fas fa-users" aria-hidden="true"></i>
                        <span>30+ Expert Faculty</span>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-building" aria-hidden="true"></i>
                        <span>6 Engineering Departments</span>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-flask" aria-hidden="true"></i>
                        <span>Modern Labs</span>
                    </div>
                </div>
            </div>
            <div className="hero-image">
                <div className="image-container">
                    <img src="/assets/images/College Pics/College/IMG-20241226-WA0011.jpg" alt="SoET Campus building - A modern engineering education facility at Samrat Vikramaditya Vishwavidyalaya Ujjain" className="college-hero-photo" />
                </div>
                <div className="hero-image-overlay">
                    <h3>SoET Campus</h3>
                    <p>Samrat Vikramaditya Vishwavidyalaya, Ujjain</p>
                </div>
            </div>
        </div>
        <div className="hero-stats" role="region" aria-label="SoET Statistics">
            <div className="stat-item">
                <div className="stat-icon">
                    <i className="fas fa-calendar" aria-hidden="true"></i>
                </div>
                <h3 data-count="1957" aria-label="Established in 1957">1957</h3>
                <p>Year Established</p>
            </div>
            <div className="stat-item">
                <div className="stat-icon">
                    <i className="fas fa-book" aria-hidden="true"></i>
                </div>
                <h3 data-count="11" aria-label="11 academic programs">11</h3>
                <p>B.Tech & M.Tech Programs</p>
            </div>
            <div className="stat-item">
                <div className="stat-icon">
                    <i className="fas fa-user-graduate" aria-hidden="true"></i>
                </div>
                <h3 data-count="2200" aria-label="Over 2200 current students">2200+</h3>
                <p>Current Students</p>
            </div>
            <div className="stat-item">
                <div className="stat-icon">
                    <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
                </div>
                <h3 data-count="30" aria-label="30 faculty and staff members">30</h3>
                <p>Faculty & Staff</p>
            </div>
            <div className="stat-item">
                <div className="stat-icon">
                    <i className="fas fa-briefcase" aria-hidden="true"></i>
                </div>
                <h3 data-count="100" aria-label="Over 100 successful alumni">100+</h3>
                <p>Successful Alumni</p>
            </div>
        </div>
        <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <i className="fas fa-chevron-down" aria-hidden="true"></i>
        </div>
    </main>

    {/* ========================================
         FEATURED ACADEMIC PROGRAMS
         Highlighting our premier engineering programs
         ======================================== */}
    <section className="featured-programs" aria-labelledby="programs-heading">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Our Programs</span>
                <h2 id="programs-heading">Engineering Excellence</h2>
                <p>Cutting-edge programs designed for the future</p>
            </div>
            <div className="programs-showcase">
                <div className="program-card featured">
                    <div className="program-icon">
                        <i className="fas fa-laptop-code"></i>
                    </div>
                    <h3>Electronics & Computer Science</h3>
                    <p>AI, Machine Learning, IoT, and next-gen computing technologies</p>
                    <div className="program-highlights">
                        <span>AI Focus</span>
                        <span>Industry 4.0</span>
                    </div>
                    <Link to="/academics" className="program-link">
                        <span>Learn More</span>
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
                
                <div className="program-card">
                    <div className="program-icon">
                        <i className="fas fa-cogs"></i>
                    </div>
                    <h3>Mechanical Engineering</h3>
                    <p>Advanced manufacturing, robotics, and automation systems</p>
                    <div className="program-highlights">
                        <span>Robotics</span>
                        <span>CAD/CAM</span>
                    </div>
                    <Link to="/academics" className="program-link">
                        <span>Learn More</span>
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
                
                <div className="program-card">
                    <div className="program-icon">
                        <i className="fas fa-bolt"></i>
                    </div>
                    <h3>Electrical Engineering</h3>
                    <p>Power systems, renewable energy, and smart grid technologies</p>
                    <div className="program-highlights">
                        <span>Green Energy</span>
                        <span>Smart Grid</span>
                    </div>
                    <Link to="/academics" className="program-link">
                        <span>Learn More</span>
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
            
            {/* View All Programs Button */}
            <div className="programs-cta">
                <Link to="/academics" className="btn-primary programs-btn">
                    <span>View All Programs</span>
                    <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    </section>

    {/* ========================================
         WHY CHOOSE SOET
         Key features and highlights from the brochure
         ======================================== */}
    <section className="why-choose-soet" aria-labelledby="why-heading">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Why SoET?</span>
                <h2 id="why-heading">Why Choose Us?</h2>
                <p>Empowering your engineering journey with excellence</p>
            </div>
            <div className="features-grid">
                <div className="feature-card">
                    <i className="fas fa-award" aria-hidden="true"></i>
                    <h3>AICTE Approved Programs</h3>
                </div>
                <div className="feature-card">
                    <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
                    <h3>Experienced & Qualified Faculty</h3>
                </div>
                <div className="feature-card">
                    <i className="fas fa-flask" aria-hidden="true"></i>
                    <h3>Modern Labs & Infrastructure</h3>
                </div>
                <div className="feature-card">
                    <i className="fas fa-book-reader" aria-hidden="true"></i>
                    <h3>Industry Oriented Curriculum</h3>
                </div>
                <div className="feature-card">
                    <i className="fas fa-briefcase" aria-hidden="true"></i>
                    <h3>Internship & Industry Exposure</h3>
                </div>
                <div className="feature-card">
                    <i className="fas fa-lightbulb" aria-hidden="true"></i>
                    <h3>Research & Innovation Environment</h3>
                </div>
                <div className="feature-card">
                    <i className="fas fa-laptop" aria-hidden="true"></i>
                    <h3>Smart Classrooms</h3>
                </div>
                <div className="feature-card">
                    <i className="fas fa-user-graduate" aria-hidden="true"></i>
                    <h3>Placement Assistance</h3>
                </div>
            </div>
        </div>
    </section>

    {/* ========================================
         CAMPUS LIFE & FACILITIES
         Showcasing our world-class infrastructure and vibrant student life
         ======================================== */}
    <section className="campus-life" aria-labelledby="campus-heading">
        <div className="container">
            <div className="campus-content">
                <div className="campus-text">
                    <span className="section-badge">Campus Life</span>
                    <h2 id="campus-heading">Beyond Academics</h2>
                    <p>Experience a vibrant campus life with state-of-the-art facilities, innovative labs, and exciting extracurricular activities that shape well-rounded engineers.</p>
                    <div className="campus-features">
                        <div className="feature">
                            <i className="fas fa-flask"></i>
                            <span>Modern Laboratories</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-book-open"></i>
                            <span>Digital Library</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-users"></i>
                            <span>Student Societies</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-trophy"></i>
                            <span>Competitions</span>
                        </div>
                    </div>
                    <Link to="/facilities" className="btn-primary">
                        <span>Explore Facilities</span>
                        <i className="fas fa-external-link-alt"></i>
                    </Link>
                </div>
                <div className="campus-gallery">
                    <div className="gallery-grid">
                        <div className="gallery-item main">
                            <img src="/assets/images/College Pics/College/IMG-20241226-WA0010.jpg" alt="SoET main academic building exterior view showing modern architecture" loading="lazy" />
                            <div className="gallery-overlay">
                                <h4>Academic Building</h4>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="/assets/images/College Pics/LAB/Electronics Lab.jpg" alt="Electronics laboratory with modern equipment and workstations for students" loading="lazy" />
                            <div className="gallery-overlay">
                                <h4>Electronics Lab</h4>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="/assets/images/College Pics/LAB/Computer Lab.jpg" alt="Computer laboratory featuring latest computers and software for programming" loading="lazy" />
                            <div className="gallery-overlay">
                                <h4>Computer Lab</h4>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="/assets/images/College Pics/LAB/Civil Lab.jpg" alt="Civil engineering laboratory with testing equipment and materials" loading="lazy" />
                            <div className="gallery-overlay">
                                <h4>Civil Engineering Lab</h4>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="/assets/images/College Pics/LAB/Mechenical Lab.jpg" alt="Mechanical engineering laboratory with machines and tools for hands-on learning" loading="lazy" />
                            <div className="gallery-overlay">
                                <h4>Mechanical Lab</h4>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="/assets/images/College Pics/LAB/Library.jpg" alt="Digital library with study spaces, computers, and extensive book collection" loading="lazy" />
                            <div className="gallery-overlay">
                                <h4>Digital Library</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* ========================================
         CODE_D_CODE SOCIETY
         Student-led coding and technology community
         ======================================== */}
    <section className="code-society" aria-labelledby="society-heading">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Student Society</span>
                <h2 id="society-heading">Code_d_Code Society</h2>
                <p>Empowering the next generation of developers through innovation and collaboration.</p>
            </div>
            <div className="society-content">
                <div className="society-info">
                    <div className="society-logo">
                        <img src="/assets/images/Code_D_Code Logo.png" alt="Code_d_Code Society Logo" />
                    </div>
                    <div className="society-description">
                        <h3>About the Society</h3>
                        <p>Code_d_Code Society is a vibrant community of passionate coders and tech enthusiasts. We focus on building coding skills, fostering innovation, and preparing students for successful careers in technology.</p>
                        <div className="society-stats">
                            <div className="stat">
                                <h4>100+</h4>
                                <p>Active Members</p>
                            </div>
                            <div className="stat">
                                <h4>50+</h4>
                                <p>Projects</p>
                            </div>
                            <div className="stat">
                                <h4>25+</h4>
                                <p>Events</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="society-cta">
                    <a href="https://www.codedcode.tech" target="_blank" className="btn-primary">
                        <span>Visit Our Website</span>
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    {/* ========================================
         QUICK LINKS & RESOURCES
         Easy access to essential services and information
         ======================================== */}
    <section className="quick-links" aria-labelledby="resources-heading">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Quick Access</span>
                <h2 id="resources-heading">Important Resources</h2>
                <p>Essential links and services for students and faculty</p>
            </div>
            <div className="links-grid">
                <a href="https://vikram.mponline.gov.in/" className="link-card priority" target="_blank">
                    <div className="link-icon">
                        <i className="fas fa-credit-card"></i>
                    </div>
                    <div className="link-content">
                        <h3>Online Fee Payment</h3>
                        <p>Pay your fees online securely</p>
                    </div>
                    <div className="link-arrow">
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </a>
                
                <a href="https://vikramuniv.ac.in/" className="link-card" target="_blank">
                    <div className="link-icon">
                        <i className="fas fa-university"></i>
                    </div>
                    <div className="link-content">
                        <h3>Samrat Vikramaditya Vishwavidyalaya Portal</h3>
                        <p>Official university website</p>
                    </div>
                    <div className="link-arrow">
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </a>
                
                <a href="https://vikramuniv.ac.in/results/" className="link-card" target="_blank">
                    <div className="link-icon">
                        <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="link-content">
                        <h3>Examination Results</h3>
                        <p>Check your exam results</p>
                    </div>
                    <div className="link-arrow">
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </a>
                
                <a href="https://vikramuniv.ac.in/academic-calendar/" className="link-card" target="_blank">
                    <div className="link-icon">
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className="link-content">
                        <h3>Academic Calendar</h3>
                        <p>Important dates and events</p>
                    </div>
                    <div className="link-arrow">
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </a>
                
                <Link to="/about#faculty" className="link-card">
                    <div className="link-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="link-content">
                        <h3>Faculty Directory</h3>
                        <p>Meet our faculty members</p>
                    </div>
                    <div className="link-arrow">
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </Link>
                
                <Link to="/about#alumni" className="link-card">
                    <div className="link-icon">
                        <i className="fas fa-user-graduate"></i>
                    </div>
                    <div className="link-content">
                        <h3>Alumni Network</h3>
                        <p>Explore alumni success stories</p>
                    </div>
                    <div className="link-arrow">
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </Link>
            </div>
        </div>
    </section>

    {/* ========================================
         FOOTER
         Contact information, links, and credits
         ======================================== */}
    
        </>
    );
}
