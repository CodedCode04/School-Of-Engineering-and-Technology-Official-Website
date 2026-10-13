import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import StatsStrip from '../components/StatsStrip';
import SectionHeader from '../components/SectionHeader';

export default function Home() {
    useEffect(() => {
        document.title = "Home - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            {/* ========================================
                 HERO SECTION
                 55/45 split, vertically centered, blueprint grid
                 ======================================== */}
            <section className="hero-section" aria-label="Hero Overview">
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <div className="hero-badge-pill">
                                <i className="fas fa-award" aria-hidden="true"></i>
                                <span>AICTE Approved | Academic Year 2026-27</span>
                            </div>
                            <h1 className="hero-title">
                                Build Your Future with <span className="hero-title-accent">SoET Ujjain</span>
                            </h1>
                            <p className="hero-description">
                                School of Engineering &amp; Technology (SoET), Samrat Vikramaditya Vishwavidyalaya Ujjain – Your premier destination for quality engineering education, industry exposure, and holistic development.
                            </p>
                            <div className="hero-ctas">
                                <Button 
                                    to="/about" 
                                    variant="primary" 
                                    icon={<i className="fas fa-arrow-right"></i>} 
                                    iconPosition="right" 
                                    ariaLabel="Discover SoET"
                                >
                                    Discover SoET
                                </Button>
                                <Button 
                                    to="/academics" 
                                    variant="secondary" 
                                    icon={<i className="fas fa-graduation-cap"></i>} 
                                    iconPosition="left" 
                                    ariaLabel="View Programs"
                                >
                                    View Programs
                                </Button>
                            </div>
                            <div className="hero-chips-row">
                                <div className="hero-chip">
                                    <i className="fas fa-users" aria-hidden="true"></i>
                                    <span>30+ Expert Faculty</span>
                                </div>
                                <div className="hero-chip">
                                    <i className="fas fa-building" aria-hidden="true"></i>
                                    <span>6 Engineering Departments</span>
                                </div>
                                <div className="hero-chip">
                                    <i className="fas fa-flask" aria-hidden="true"></i>
                                    <span>Modern Labs</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-image-wrapper">
                            <div className="hero-image-offset-block" aria-hidden="true"></div>
                            <div className="hero-image-frame">
                                <img 
                                    src="/assets/images/College Pics/College/IMG-20241226-WA0011.jpg" 
                                    alt="SoET Campus building - A modern engineering education facility at Samrat Vikramaditya Vishwavidyalaya Ujjain" 
                                    className="hero-campus-photo"
                                    loading="lazy"
                                />
                                <div className="hero-glass-overlay">
                                    <h3>SoET Campus</h3>
                                    <p>Samrat Vikramaditya Vishwavidyalaya, Ujjain</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS STRIP (overlapping hero bottom by 64px) */}
            <StatsStrip overlap={true} />

            {/* ========================================
                 IMPORTANT RESOURCES (QUICK ACCESS)
                 3x2 grid of equal-height tiles, left-aligned
                 ======================================== */}
            <section className="resources-section" aria-labelledby="resources-heading">
                <div className="container">
                    <SectionHeader
                        eyebrow="Quick Access"
                        title="Important Resources"
                        subtitle="Essential links and services for students and faculty"
                        id="resources-heading"
                    />
                    <div className="resources-grid">
                        <a 
                            href="https://vikram.mponline.gov.in/" 
                            className="resource-tile priority" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Online Fee Payment - Pay your fees online securely"
                        >
                            <div className="resource-tile-top">
                                <div className="resource-icon-square" aria-hidden="true">
                                    <i className="fas fa-credit-card"></i>
                                </div>
                                <span className="resource-tile-arrow" aria-hidden="true">
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </div>
                            <h3 className="resource-tile-title">Online Fee Payment</h3>
                            <p className="resource-tile-desc">Pay your fees online securely</p>
                        </a>

                        <a 
                            href="https://vikramuniv.ac.in/" 
                            className="resource-tile" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="University Portal - Samrat Vikramaditya Vishwavidyalaya official website"
                        >
                            <div className="resource-tile-top">
                                <div className="resource-icon-square" aria-hidden="true">
                                    <i className="fas fa-university"></i>
                                </div>
                                <span className="resource-tile-arrow" aria-hidden="true">
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </div>
                            <h3 className="resource-tile-title">University Portal</h3>
                            <p className="resource-tile-desc">Samrat Vikramaditya Vishwavidyalaya official website</p>
                        </a>

                        <a 
                            href="https://vikramuniv.ac.in/results/" 
                            className="resource-tile" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Examination Results - Check your exam results"
                        >
                            <div className="resource-tile-top">
                                <div className="resource-icon-square" aria-hidden="true">
                                    <i className="fas fa-file-alt"></i>
                                </div>
                                <span className="resource-tile-arrow" aria-hidden="true">
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </div>
                            <h3 className="resource-tile-title">Examination Results</h3>
                            <p className="resource-tile-desc">Check your exam results</p>
                        </a>

                        <a 
                            href="https://vikramuniv.ac.in/academic-calendar/" 
                            className="resource-tile" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Academic Calendar - Important dates and events"
                        >
                            <div className="resource-tile-top">
                                <div className="resource-icon-square" aria-hidden="true">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                                <span className="resource-tile-arrow" aria-hidden="true">
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </div>
                            <h3 className="resource-tile-title">Academic Calendar</h3>
                            <p className="resource-tile-desc">Important dates and events</p>
                        </a>

                        <Link 
                            to="/about#faculty" 
                            className="resource-tile"
                            aria-label="Faculty Directory - Meet our faculty members"
                        >
                            <div className="resource-tile-top">
                                <div className="resource-icon-square" aria-hidden="true">
                                    <i className="fas fa-users"></i>
                                </div>
                                <span className="resource-tile-arrow" aria-hidden="true">
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </div>
                            <h3 className="resource-tile-title">Faculty Directory</h3>
                            <p className="resource-tile-desc">Meet our faculty members</p>
                        </Link>

                        <Link 
                            to="/about#alumni" 
                            className="resource-tile"
                            aria-label="Alumni Network - Explore alumni success stories"
                        >
                            <div className="resource-tile-top">
                                <div className="resource-icon-square" aria-hidden="true">
                                    <i className="fas fa-user-graduate"></i>
                                </div>
                                <span className="resource-tile-arrow" aria-hidden="true">
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </div>
                            <h3 className="resource-tile-title">Alumni Network</h3>
                            <p className="resource-tile-desc">Explore alumni success stories</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========================================
                 FEATURED ACADEMIC PROGRAMS
                 3-column equal-height grid, mt-auto Learn More
                 ======================================== */}
            <section className="programs-section" aria-labelledby="programs-heading">
                <div className="container">
                    <SectionHeader
                        eyebrow="Our Programs"
                        title="Engineering Excellence"
                        subtitle="Cutting-edge programs designed for the future"
                        id="programs-heading"
                    />
                    <div className="programs-grid">
                        <div className="program-card-modern">
                            <div className="program-icon-box" aria-hidden="true">
                                <i className="fas fa-laptop-code"></i>
                            </div>
                            <h3>Electronics &amp; Computer Science</h3>
                            <p>AI, Machine Learning, IoT, and next-gen computing technologies</p>
                            <div className="program-chips-list">
                                <span className="program-tag-chip">AI Focus</span>
                                <span className="program-tag-chip">Industry 4.0</span>
                            </div>
                            <Link to="/academics" className="program-learn-more">
                                <span>Learn More</span>
                                <i className="fas fa-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>

                        <div className="program-card-modern">
                            <div className="program-icon-box" aria-hidden="true">
                                <i className="fas fa-cogs"></i>
                            </div>
                            <h3>Mechanical Engineering</h3>
                            <p>Advanced manufacturing, robotics, and automation systems</p>
                            <div className="program-chips-list">
                                <span className="program-tag-chip">Robotics</span>
                                <span className="program-tag-chip">CAD/CAM</span>
                            </div>
                            <Link to="/academics" className="program-learn-more">
                                <span>Learn More</span>
                                <i className="fas fa-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>

                        <div className="program-card-modern">
                            <div className="program-icon-box" aria-hidden="true">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h3>Electrical Engineering</h3>
                            <p>Power systems, renewable energy, and smart grid technologies</p>
                            <div className="program-chips-list">
                                <span className="program-tag-chip">Green Energy</span>
                                <span className="program-tag-chip">Smart Grid</span>
                            </div>
                            <Link to="/academics" className="program-learn-more">
                                <span>Learn More</span>
                                <i className="fas fa-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="programs-cta-wrapper">
                        <Button 
                            to="/academics" 
                            variant="primary" 
                            icon={<i className="fas fa-arrow-right"></i>} 
                            iconPosition="right"
                        >
                            View All Programs
                        </Button>
                    </div>
                </div>
            </section>

            {/* ========================================
                 WHY CHOOSE SOET
                 4x2 grid of white cards on cream-50
                 ======================================== */}
            <section className="why-choose-section" aria-labelledby="why-heading">
                <div className="container">
                    <SectionHeader
                        eyebrow="Why SoET?"
                        title="Why Choose Us?"
                        subtitle="Empowering your engineering journey with excellence"
                        id="why-heading"
                    />
                    <div className="why-features-grid">
                        <div className="why-feature-tile">
                            <div className="why-feature-icon-circle" aria-hidden="true">
                                <i className="fas fa-award"></i>
                            </div>
                            <h3>AICTE Approved Programs</h3>
                        </div>
                        <div className="why-feature-tile">
                            <div className="why-feature-icon-circle" aria-hidden="true">
                                <i className="fas fa-chalkboard-teacher"></i>
                            </div>
                            <h3>Experienced &amp; Qualified Faculty</h3>
                        </div>
                        <div className="why-feature-tile">
                            <div className="why-feature-icon-circle" aria-hidden="true">
                                <i className="fas fa-flask"></i>
                            </div>
                            <h3>Modern Labs &amp; Infrastructure</h3>
                        </div>
                        <div className="why-feature-tile">
                            <div className="why-feature-icon-circle" aria-hidden="true">
                                <i className="fas fa-book-reader"></i>
                            </div>
                            <h3>Industry Oriented Curriculum</h3>
                        </div>
                        <div className="why-feature-tile">
                            <div className="why-feature-icon-circle" aria-hidden="true">
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <h3>Internship &amp; Industry Exposure</h3>
                        </div>
                        <div className="why-feature-tile">
                            <div className="why-feature-icon-circle" aria-hidden="true">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <h3>Research &amp; Innovation Environment</h3>
                        </div>
                        <div className="why-feature-tile">
                            <div className="why-feature-icon-circle" aria-hidden="true">
                                <i className="fas fa-laptop"></i>
                            </div>
                            <h3>Smart Classrooms</h3>
                        </div>
                        <div className="why-feature-tile">
                            <div className="why-feature-icon-circle" aria-hidden="true">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                            <h3>Placement Assistance</h3>
                        </div>
                    </div>
                </div>
            </section>

    {/* ========================================
         CAMPUS LIFE & FACILITIES (BENTO GRID)
         Showcasing infrastructure and vibrant student life
         ======================================== */}
    <section className="campus-life-section" aria-labelledby="campus-heading">
        <div className="container">
            <div className="campus-life-grid">
                <div className="campus-life-text">
                    <SectionHeader
                        eyebrow="EXPERIENCE SOET"
                        title="Beyond Academics"
                        subtitle="Experience a vibrant campus life with state-of-the-art facilities, innovative labs, and exciting extracurricular activities that shape well-rounded engineers."
                        align="left"
                        id="campus-heading"
                    />
                    <div className="campus-features-grid">
                        <div className="campus-feature-chip">
                            <div className="campus-feature-icon" aria-hidden="true">
                                <i className="fas fa-flask"></i>
                            </div>
                            <span>Modern Laboratories</span>
                        </div>
                        <div className="campus-feature-chip">
                            <div className="campus-feature-icon" aria-hidden="true">
                                <i className="fas fa-book-open"></i>
                            </div>
                            <span>Digital Library</span>
                        </div>
                        <div className="campus-feature-chip">
                            <div className="campus-feature-icon" aria-hidden="true">
                                <i className="fas fa-users"></i>
                            </div>
                            <span>Student Societies</span>
                        </div>
                        <div className="campus-feature-chip">
                            <div className="campus-feature-icon" aria-hidden="true">
                                <i className="fas fa-trophy"></i>
                            </div>
                            <span>Competitions</span>
                        </div>
                    </div>
                    <div className="campus-cta-wrap">
                        <Button 
                            to="/facilities" 
                            variant="primary"
                            icon="fas fa-external-link-alt"
                            iconPosition="right"
                        >
                            Explore Facilities
                        </Button>
                    </div>
                </div>

                <div className="campus-bento-grid">
                    <div className="bento-card bento-main">
                        <img 
                            src="/assets/images/College Pics/College/IMG-20241226-WA0010.jpg" 
                            alt="SoET main academic building exterior view showing modern architecture" 
                            loading="lazy" 
                        />
                        <div className="bento-glass-bar">
                            <span>Academic Building</span>
                        </div>
                    </div>
                    <div className="bento-card">
                        <img 
                            src="/assets/images/College Pics/LAB/Computer Lab.jpg" 
                            alt="Computer laboratory featuring latest computers and software for programming" 
                            loading="lazy" 
                        />
                        <div className="bento-glass-bar">
                            <span>Computer Lab</span>
                        </div>
                    </div>
                    <div className="bento-card">
                        <img 
                            src="/assets/images/College Pics/LAB/Electronics Lab.jpg" 
                            alt="Electronics laboratory with modern equipment and workstations for students" 
                            loading="lazy" 
                        />
                        <div className="bento-glass-bar">
                            <span>Electronics Lab</span>
                        </div>
                    </div>
                    <div className="bento-card">
                        <img 
                            src="/assets/images/College Pics/LAB/Civil Lab.jpg" 
                            alt="Civil engineering laboratory with testing equipment and materials" 
                            loading="lazy" 
                        />
                        <div className="bento-glass-bar">
                            <span>Civil Engineering Lab</span>
                        </div>
                    </div>
                    <div className="bento-card">
                        <img 
                            src="/assets/images/College Pics/LAB/Mechenical Lab.jpg" 
                            alt="Mechanical engineering laboratory with machines and tools for hands-on learning" 
                            loading="lazy" 
                        />
                        <div className="bento-glass-bar">
                            <span>Mechanical Lab</span>
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
    <section className="society-section pattern-dots-dark" aria-labelledby="society-heading">
        <div className="society-watermark-code" aria-hidden="true">&lt;/&gt;</div>
        <div className="container">
            <SectionHeader
                eyebrow="STUDENT COMMUNITY"
                title="Code_d_Code Society"
                subtitle="Empowering the next generation of developers through innovation and collaboration."
                align="center"
                dark={true}
                id="society-heading"
            />
            <div className="society-glass-card">
                <div className="society-card-body">
                    <div className="society-left-block">
                        <div className="society-logo-wrapper">
                            <img 
                                src="/assets/images/Code_D_Code Logo.png" 
                                alt="Code_d_Code Society Logo" 
                                className="society-logo-img"
                                loading="lazy"
                            />
                        </div>
                        <div className="society-desc-block">
                            <h3 className="society-block-title">About the Society</h3>
                            <p className="society-block-text">
                                Code_d_Code Society is a vibrant community of passionate coders and tech enthusiasts. We focus on building coding skills, fostering innovation, and preparing students for successful careers in technology.
                            </p>
                        </div>
                    </div>

                    <div className="society-stats-grid">
                        <div className="society-stat-card">
                            <span className="society-stat-number">100+</span>
                            <span className="society-stat-label">Active Members</span>
                        </div>
                        <div className="society-stat-card">
                            <span className="society-stat-number">50+</span>
                            <span className="society-stat-label">Projects</span>
                        </div>
                        <div className="society-stat-card">
                            <span className="society-stat-number">25+</span>
                            <span className="society-stat-label">Events</span>
                        </div>
                    </div>
                </div>

                <div className="society-action-row">
                    <Button 
                        href="https://www.codedcode.tech" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="cream"
                        icon="fas fa-external-link-alt"
                        iconPosition="right"
                    >
                        Visit Our Website
                    </Button>
                </div>
            </div>
        </div>
    </section>
    </>
    );
}
