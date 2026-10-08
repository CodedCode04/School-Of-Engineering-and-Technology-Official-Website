import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Activities() {
    useEffect(() => {
        document.title = "Activities - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            

    {/* Page Header */}
    <section className="page-header">
        <div className="container">
            <h1>Student Activities</h1>
            <p>Holistic Development Beyond Academics</p>
            <nav className="breadcrumb">
                <Link to="/..index">Home</Link> <span>/</span> Activities
            </nav>
        </div>
    </section>

    {/* Activities Overview */}
    <section className="activities-overview">
        <div className="container">
            <div className="section-header">
                <h2>Beyond the Classroom</h2>
                <p>Comprehensive development through diverse activities and experiences</p>
            </div>
            
            <div className="overview-content">
                <div className="overview-text">
                    <p>At SoET, we believe in the holistic development of our students. Our diverse range of activities ensures that students develop not only technical skills but also leadership qualities, creativity, and social responsibility.</p>
                </div>
                
                <div className="overview-image">
                    <img src="/assets/images/College Pics/College/IMG-20241226-WA0012.jpg" alt="Student Activities" />
                </div>
            </div>
        </div>
    </section>

    {/* Activities Tabs */}
    <section className="activities-tabs-section">
        <div className="container">
            <div className="activities-tabs">
                <div className="tab-buttons">
                    <button className="tab-btn active" data-tab="academic">Academic Activities</button>
                    <button className="tab-btn" data-tab="cultural">Cultural Events</button>
                    <button className="tab-btn" data-tab="social">Social Initiatives</button>
                    <button className="tab-btn" data-tab="sports">Sports & Recreation</button>
                </div>
                <div className="tab-content">
                    {/* Academic Activities Tab */}
                    <div className="tab-pane active" id="academic">
                        <div className="section-header">
                            <h2>Academic Activities</h2>
                            <p>Technical workshops, competitions, and skill development programs</p>
                        </div>
                        
                        {/* Featured Academic Events */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-star"></i>
                                Featured Academic Events
                            </h3>
                            <div className="activity-cards-grid">
                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/EAP 27-8-24.jpeg" alt="Entrepreneurship Awareness Program" />
                                        <div className="card-badge">Featured</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Entrepreneurship Awareness Program</h4>
                                        <p>Programs to foster innovation and startup culture among engineering students, encouraging entrepreneurial mindset.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-calendar"></i> August 2024
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-users"></i> 350+ Participants
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-lightbulb"></i> Innovation Focus
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/Viksit Bharat 02.jpeg" alt="Viksit Bharat Program" />
                                        <div className="card-badge">National Initiative</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Viksit Bharat@2047: Voice of Youth</h4>
                                        <p>National program focusing on youth perspectives for developed India by 2047, promoting sustainable development.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-calendar"></i> December 2023
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-users"></i> 350 Participants
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-flag"></i> National Program
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/Young Thinker Conclave.jpeg" alt="Young Thinker Conclave" />
                                        <div className="card-badge">Innovation</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Young Thinker Conclave</h4>
                                        <p>Platform for students to present innovative ideas and research projects, fostering creativity and innovation among young minds.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-lightbulb"></i> Innovation
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-presentation"></i> Presentations
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-trophy"></i> Awards
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Workshops */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-tools"></i>
                                Technical Workshops & Training
                            </h3>
                            <div className="activity-cards-grid">
                                <div className="activity-card">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/1 Week C AutoCAd Workshop.jpeg" alt="AutoCAD Workshop" />
                                    </div>
                                    <div className="card-content">
                                        <h4>AutoCAD Software Training</h4>
                                        <p>One-week intensive AutoCAD workshop for engineering design and drafting skills development.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-tools"></i> CAD Training
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-clock"></i> 1 Week Duration
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/Automation Workshop 01.jpeg" alt="Automation Workshop" />
                                    </div>
                                    <div className="card-content">
                                        <h4>Industrial Automation Workshop</h4>
                                        <p>Hands-on training in automation technologies and control systems for industrial applications.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-robot"></i> Automation
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-cogs"></i> Industrial Focus
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/Expert lect. 6-12-24.jpeg" alt="Expert Lectures" />
                                    </div>
                                    <div className="card-content">
                                        <h4>Expert Lecture Series</h4>
                                        <p>Regular lectures by industry experts and academicians on latest technologies and trends.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-chalkboard-teacher"></i> Expert Sessions
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-calendar-alt"></i> Regular Program
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Code Society & Certifications */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-code"></i>
                                Coding Society & Certifications
                            </h3>
                            <div className="activity-cards-grid">
                                <div className="activity-card">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/Code_d_Code Coding Society Poster - Made with PosterMyWall.jpg" alt="Coding Society" />
                                    </div>
                                    <div className="card-content">
                                        <h4>Code_d_Code Society Activities</h4>
                                        <p>Active coding community organizing programming competitions, hackathons, and coding workshops.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-code"></i> Programming
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-users"></i> 100+ Members
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-trophy"></i> Competitions
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/Amit 01-IIRS Cert.pdf" alt="IIRS Certification" />
                                    </div>
                                    <div className="card-content">
                                        <h4>IIRS Remote Sensing Certification</h4>
                                        <p>Students participating in Indian Institute of Remote Sensing certification programs.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-satellite"></i> Remote Sensing
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-certificate"></i> ISRO Certification
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Placement & Career Development */}
                        <div className="activity-section placement-section">
                            <h3 className="section-title">
                                <i className="fas fa-briefcase"></i>
                                Placement & Career Development
                            </h3>
                            <div className="placement-cards-grid">
                                <div className="placement-card">
                                    <div className="placement-icon">
                                        <i className="fas fa-briefcase"></i>
                                    </div>
                                    <div className="placement-content">
                                        <h4>Three Days Job Fair 2023</h4>
                                        <p>Major recruitment drive with multiple companies</p>
                                        <div className="placement-stats">
                                            <span>750 Participants</span>
                                            <span>May 29-31, 2023</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="placement-card">
                                    <div className="placement-icon">
                                        <i className="fas fa-handshake"></i>
                                    </div>
                                    <div className="placement-content">
                                        <h4>TCS Company Webinar</h4>
                                        <p>Industry insights and career guidance session</p>
                                        <div className="placement-stats">
                                            <span>150 Participants</span>
                                            <span>July 2022</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="placement-card">
                                    <div className="placement-icon">
                                        <i className="fas fa-laptop-code"></i>
                                    </div>
                                    <div className="placement-content">
                                        <h4>TCS Skill Development Seminar</h4>
                                        <p>Professional skill enhancement program</p>
                                        <div className="placement-stats">
                                            <span>100 Participants</span>
                                            <span>May 2023</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cultural Events Tab */}
                    <div className="tab-pane" id="cultural">
                        <div className="section-header">
                            <h2>Cultural Events</h2>
                            <p>Celebrating diversity and creativity through various cultural programs</p>
                        </div>

                        {/* Major Cultural Celebrations */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-calendar-alt"></i>
                                Major Cultural Celebrations
                            </h3>
                            <div className="activity-cards-grid">
                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Cultural Activities/Engineers Day News 01.jpeg" alt="Engineers Day" />
                                        <div className="card-badge">Annual Event</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Engineers Day Celebration</h4>
                                        <p>Annual celebration honoring the engineering profession with technical exhibitions and cultural programs.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-calendar"></i> September 15
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-award"></i> Awards Ceremony
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-display"></i> Tech Exhibition
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Cultural Activities/Viswakarma Diwas 17-9-24.jpeg" alt="Vishwakarma Day" />
                                        <div className="card-badge">Traditional</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Vishwakarma Day</h4>
                                        <p>Traditional celebration honoring the divine architect and patron of all craftsmen and engineers.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-calendar"></i> September 17
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-pray"></i> Traditional Rituals
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-tools"></i> Craftsmanship
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Cultural Activities/Bhasha Utsav 01.jpeg" alt="Bhasha Utsav" />
                                        <div className="card-badge">Cultural Heritage</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Bhasha Utsav</h4>
                                        <p>Celebration of Indian languages and literature promoting cultural diversity and linguistic heritage.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-book"></i> Literature
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-microphone"></i> Competitions
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-globe"></i> Diversity
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sports & Competitions */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-trophy"></i>
                                Sports & Competitions
                            </h3>
                            <div className="activity-cards-grid">
                                <div className="activity-card">
                                    <div className="card-image">
                                        <img src="/assets/images/Cultural Activities/Cricket Tounament.jpeg" alt="Sports Tournament" />
                                    </div>
                                    <div className="card-content">
                                        <h4>Annual Sports Tournament</h4>
                                        <p>Inter-departmental sports competitions including cricket, football, and indoor games fostering team spirit.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-users"></i> All Departments
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-medal"></i> Prizes
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-heart"></i> Team Spirit
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/Chess Comp 01.jpeg" alt="Chess Competition" />
                                    </div>
                                    <div className="card-content">
                                        <h4>Chess Competition</h4>
                                        <p>Strategic thinking development through inter-college chess championships promoting mental agility.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-chess"></i> Strategy
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-brain"></i> Mental Skills
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-trophy"></i> Championship
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cultural Performance Activities */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-music"></i>
                                Cultural Performance Activities
                            </h3>
                            <div className="cultural-activities-info">
                                <div className="cultural-info-card">
                                    <div className="cultural-icon">
                                        <i className="fas fa-microphone"></i>
                                    </div>
                                    <h4>Music & Dance Competitions</h4>
                                    <p>Showcasing talent in classical and contemporary music and dance forms</p>
                                </div>
                                <div className="cultural-info-card">
                                    <div className="cultural-icon">
                                        <i className="fas fa-theater-masks"></i>
                                    </div>
                                    <h4>Drama & Theatre</h4>
                                    <p>Student productions and theatrical performances promoting artistic expression</p>
                                </div>
                                <div className="cultural-info-card">
                                    <div className="cultural-icon">
                                        <i className="fas fa-paint-brush"></i>
                                    </div>
                                    <h4>Art & Craft Exhibitions</h4>
                                    <p>Displaying creative works and handicrafts by talented students</p>
                                </div>
                                <div className="cultural-info-card">
                                    <div className="cultural-icon">
                                        <i className="fas fa-book-open"></i>
                                    </div>
                                    <h4>Literary Events</h4>
                                    <p>Poetry recitations, essay competitions, and creative writing workshops</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Initiatives Tab */}
                    <div className="tab-pane" id="social">
                        <div className="section-header">
                            <h2>Social Initiatives</h2>
                            <p>Community service and environmental conservation programs</p>
                        </div>

                        {/* Environmental Conservation */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-leaf"></i>
                                Environmental Conservation
                            </h3>
                            <div className="activity-cards-grid">
                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Social Activities/Plantation 01 - 0410-24.jpeg" alt="Plantation Drive" />
                                        <div className="card-badge">Green Initiative</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Plantation Drive</h4>
                                        <p>Environmental conservation initiative focusing on increasing green cover and creating environmental awareness among students and community.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-tree"></i> 500+ Trees Planted
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-leaf"></i> Eco-Friendly
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-hands-helping"></i> Community Participation
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Academics Activities/Groundwater 01.jpeg" alt="Groundwater Conservation" />
                                        <div className="card-badge">Water Conservation</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Groundwater Conservation Workshop</h4>
                                        <p>Awareness programs on water conservation and sustainable water management practices for future generations.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-tint"></i> Water Conservation
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-recycle"></i> Sustainability
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-earth-americas"></i> Environment Protection
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Community Health & Sanitation */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-heart"></i>
                                Community Health & Sanitation
                            </h3>
                            <div className="activity-cards-grid">
                                <div className="activity-card featured">
                                    <div className="card-image">
                                        <img src="/assets/images/Social Activities/Swachta Abhiyan 01.jpeg" alt="Cleanliness Drive" />
                                        <div className="card-badge">Health Initiative</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>Swachta Abhiyan</h4>
                                        <p>Community cleanliness and sanitation awareness programs promoting hygiene and public health in surrounding areas.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-broom"></i> Cleanliness Drive
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-heart"></i> Public Health
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-users"></i> Community Outreach
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="activity-card">
                                    <div className="card-image">
                                        <img src="/assets/images/Social Activities/Swachta 02.jpeg" alt="Sanitation Awareness" />
                                    </div>
                                    <div className="card-content">
                                        <h4>Sanitation Awareness Campaign</h4>
                                        <p>Educational programs about proper waste management and hygiene practices for community welfare.</p>
                                        <div className="card-details">
                                            <span className="detail-item">
                                                <i className="fas fa-graduation-cap"></i> Education
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-recycle"></i> Waste Management
                                            </span>
                                            <span className="detail-item">
                                                <i className="fas fa-shield-alt"></i> Health Protection
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Impact Programs */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-hands-helping"></i>
                                Social Impact Programs
                            </h3>
                            <div className="social-impact-grid">
                                <div className="impact-card">
                                    <div className="impact-icon">
                                        <i className="fas fa-graduation-cap"></i>
                                    </div>
                                    <div className="impact-content">
                                        <h4>Digital Literacy Programs</h4>
                                        <p>Teaching basic computer skills to underprivileged communities</p>
                                        <div className="impact-stats">
                                            <span>200+ Beneficiaries</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="impact-card">
                                    <div className="impact-icon">
                                        <i className="fas fa-book"></i>
                                    </div>
                                    <div className="impact-content">
                                        <h4>Educational Support</h4>
                                        <p>Providing free tutoring and educational resources to local schools</p>
                                        <div className="impact-stats">
                                            <span>10+ Schools Supported</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="impact-card">
                                    <div className="impact-icon">
                                        <i className="fas fa-medkit"></i>
                                    </div>
                                    <div className="impact-content">
                                        <h4>Health Awareness Camps</h4>
                                        <p>Organizing medical check-ups and health awareness sessions</p>
                                        <div className="impact-stats">
                                            <span>500+ People Reached</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="impact-card">
                                    <div className="impact-icon">
                                        <i className="fas fa-gift"></i>
                                    </div>
                                    <div className="impact-content">
                                        <h4>Community Welfare</h4>
                                        <p>Supporting local communities through various welfare programs</p>
                                        <div className="impact-stats">
                                            <span>Year-round Activities</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sports & Recreation Tab */}
                    <div className="tab-pane" id="sports">
                        <div className="section-header">
                            <h2>Sports & Recreation</h2>
                            <p>Physical fitness and recreational activities for overall development</p>
                        </div>

                        {/* Outdoor Sports */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-sun"></i>
                                Outdoor Sports
                            </h3>
                            <div className="sports-cards-grid">
                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-futbol"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Football</h4>
                                        <p>Inter-departmental tournaments and regular practice sessions with professional coaching</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Championships</span>
                                            <span className="feature-tag">Coaching</span>
                                            <span className="feature-tag">Team Building</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-baseball-ball"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Cricket</h4>
                                        <p>Department-wise cricket tournaments fostering team spirit and sportsmanship</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Tournaments</span>
                                            <span className="feature-tag">Team Spirit</span>
                                            <span className="feature-tag">Regular Matches</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-basketball-ball"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Basketball</h4>
                                        <p>Professional courts with coaching and competitive matches for skill development</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Professional Courts</span>
                                            <span className="feature-tag">Training</span>
                                            <span className="feature-tag">Competition</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-running"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Athletics</h4>
                                        <p>Track and field events with proper training facilities for various athletic disciplines</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Track & Field</span>
                                            <span className="feature-tag">Training</span>
                                            <span className="feature-tag">Individual Sports</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-volleyball-ball"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Volleyball</h4>
                                        <p>Team sport fostering coordination, teamwork, and strategic thinking</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Teamwork</span>
                                            <span className="feature-tag">Coordination</span>
                                            <span className="feature-tag">Strategy</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-dumbbell"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Fitness Training</h4>
                                        <p>Outdoor fitness activities and calisthenics for physical conditioning</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Fitness</span>
                                            <span className="feature-tag">Strength</span>
                                            <span className="feature-tag">Conditioning</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Indoor Sports */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-home"></i>
                                Indoor Sports & Recreation
                            </h3>
                            <div className="sports-cards-grid">
                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-table-tennis"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Table Tennis</h4>
                                        <p>Multiple tables with regular tournaments and coaching for skill improvement</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Multiple Tables</span>
                                            <span className="feature-tag">Tournaments</span>
                                            <span className="feature-tag">Coaching</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-chess"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Chess</h4>
                                        <p>Strategic thinking development through chess competitions and tournaments</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Strategy</span>
                                            <span className="feature-tag">Mental Skills</span>
                                            <span className="feature-tag">Competitions</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-circle"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Carrom</h4>
                                        <p>Traditional indoor game promoting precision, concentration, and hand-eye coordination</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Precision</span>
                                            <span className="feature-tag">Concentration</span>
                                            <span className="feature-tag">Traditional</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sport-card">
                                    <div className="sport-icon">
                                        <i className="fas fa-gamepad"></i>
                                    </div>
                                    <div className="sport-content">
                                        <h4>Indoor Games</h4>
                                        <p>Various recreational indoor activities for relaxation and entertainment</p>
                                        <div className="sport-features">
                                            <span className="feature-tag">Recreation</span>
                                            <span className="feature-tag">Entertainment</span>
                                            <span className="feature-tag">Relaxation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fitness & Wellness */}
                        <div className="activity-section">
                            <h3 className="section-title">
                                <i className="fas fa-heartbeat"></i>
                                Fitness & Wellness
                            </h3>
                            <div className="wellness-cards-grid">
                                <div className="wellness-card">
                                    <div className="wellness-icon">
                                        <i className="fas fa-dumbbell"></i>
                                    </div>
                                    <div className="wellness-content">
                                        <h4>Fitness Center</h4>
                                        <p>Modern gym equipment for physical fitness and strength training</p>
                                        <ul className="wellness-features">
                                            <li>Modern Equipment</li>
                                            <li>Strength Training</li>
                                            <li>Cardio Machines</li>
                                            <li>Personal Training</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="wellness-card">
                                    <div className="wellness-icon">
                                        <i className="fas fa-leaf"></i>
                                    </div>
                                    <div className="wellness-content">
                                        <h4>Yoga & Meditation</h4>
                                        <p>Stress relief and mental wellness through yoga and meditation sessions</p>
                                        <ul className="wellness-features">
                                            <li>Stress Relief</li>
                                            <li>Mental Wellness</li>
                                            <li>Flexibility</li>
                                            <li>Mindfulness</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="wellness-card">
                                    <div className="wellness-icon">
                                        <i className="fas fa-trophy"></i>
                                    </div>
                                    <div className="wellness-content">
                                        <h4>Sports Competitions</h4>
                                        <p>Regular inter-department and inter-college sports competitions</p>
                                        <ul className="wellness-features">
                                            <li>Inter-Department</li>
                                            <li>Inter-College</li>
                                            <li>Annual Events</li>
                                            <li>Awards & Prizes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Skill Development Programs */}
    <section className="skill-development">
        <div className="container">
            <div className="section-header">
                <h2>Skill Development & Capability Enhancement</h2>
                <p>Industry-relevant certifications and professional development programs</p>
            </div>
            
            <div className="skill-programs">
                <div className="program-card major">
                    <div className="program-header">
                        <i className="fas fa-satellite"></i>
                        <h3>IIRS - ISRO Program</h3>
                    </div>
                    <div className="program-content">
                        <p>Collaboration with Indian Institute of Remote Sensing (ISRO) for advanced geospatial technology training.</p>
                        <div className="program-stats">
                            <span><i className="fas fa-calendar"></i> 2021</span>
                            <span><i className="fas fa-users"></i> 100 Students</span>
                            <span><i className="fas fa-certificate"></i> ISRO Certification</span>
                        </div>
                    </div>
                </div>

                <div className="program-card major">
                    <div className="program-header">
                        <i className="fas fa-graduation-cap"></i>
                        <h3>SWAYAM - NPTEL - MOOCS</h3>
                    </div>
                    <div className="program-content">
                        <p>Online certification courses through National Programme on Technology Enhanced Learning platform.</p>
                        <div className="program-stats">
                            <span><i className="fas fa-calendar"></i> 2024</span>
                            <span><i className="fas fa-users"></i> 500 Students</span>
                            <span><i className="fas fa-globe"></i> Online Learning</span>
                        </div>
                    </div>
                </div>

                <div className="program-card highlight">
                    <div className="program-header">
                        <i className="fas fa-laptop-code"></i>
                        <h3>Spoken Tutorial - IIT Bombay</h3>
                    </div>
                    <div className="program-content">
                        <p>Comprehensive IT skills development program in collaboration with IIT Bombay covering programming languages and software tools.</p>
                        <div className="program-stats">
                            <span><i className="fas fa-calendar"></i> July 2020 - December 2024</span>
                            <span><i className="fas fa-users"></i> 5000+ Students</span>
                            <span><i className="fas fa-award"></i> IIT Bombay Certified</span>
                        </div>
                        <div className="program-features">
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Programming Languages (C, C++, Java, Python)</li>
                                <li>Web Development Technologies</li>
                                <li>Database Management Systems</li>
                                <li>Office Productivity Tools</li>
                                <li>Open Source Software Training</li>
                                <li>Self-paced Online Learning</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="skill-benefits">
                <h3>Benefits of Our Skill Development Programs</h3>
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <i className="fas fa-certificate"></i>
                        <h4>Industry-Recognized Certifications</h4>
                        <p>Certificates from prestigious institutions like ISRO, IIT Bombay, and NPTEL.</p>
                    </div>
                    
                    <div className="benefit-item">
                        <i className="fas fa-chart-line"></i>
                        <h4>Enhanced Employability</h4>
                        <p>Improved job prospects with additional technical and soft skills.</p>
                    </div>
                    
                    <div className="benefit-item">
                        <i className="fas fa-users"></i>
                        <h4>Peer Learning</h4>
                        <p>Collaborative learning environment with fellow students and mentors.</p>
                    </div>
                    
                    <div className="benefit-item">
                        <i className="fas fa-clock"></i>
                        <h4>Flexible Learning</h4>
                        <p>Online and offline modes to accommodate academic schedules.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Code_d_Code Society - Dark Tech Theme */}
    <section className="code-d-code-dark-section">
        <div className="dark-bg-overlay"></div>
        <div className="matrix-rain"></div>
        <div className="container">
            {/* Hero Header */}
            <div className="dark-section-header">
                <div className="glitch-wrapper">
                    <h2 className="glitch-text" data-text="Code_d_Code">Code_d_Code</h2>
                </div>
                <div className="typing-animation">
                    <span className="typing-text">Where Code Meets Innovation...</span>
                    <span className="cursor">|</span>
                </div>
                <div className="terminal-prompt">
                    <span className="prompt-symbol">$</span>
                    <span className="prompt-text">codedcode --initialize --future</span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="dark-society-grid">
                {/* Left Panel - About & Stats */}
                <div className="dark-panel left-panel">
                    <div className="panel-header">
                        <div className="panel-icon">
                            <i className="fas fa-terminal"></i>
                        </div>
                        <h3>System.Info</h3>
                        <div className="status-indicator">
                            <span className="status-dot active"></span>
                            <span>ONLINE</span>
                        </div>
                    </div>
                    
                    <div className="panel-content">
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">JavaScript</span>
                                <div className="code-controls">
                                    <span className="control-dot red"></span>
                                    <span className="control-dot yellow"></span>
                                    <span className="control-dot green"></span>
                                </div>
                            </div>
                            <div className="code-content">
                                <pre><code><span className="keyword">const</span> <span className="variable">society</span> = {"{"}
  <span className="property">name</span>: <span className="string">"Code_d_Code"</span>,
  <span className="property">mission</span>: <span className="string">"Forge the future through code"</span>,
  <span className="property">members</span>: <span className="number">100</span>+,
  <span className="property">events</span>: <span className="number">50</span>+,
  <span className="property">innovations</span>: <span className="string">"∞"</span>
{"}"};</code></pre>
                            </div>
                        </div>
                        
                        <div className="dark-description">
                            <p>In the depths of SoET's digital realm, Code_d_Code emerges as the nexus where passionate minds converge to shape tomorrow's technology. We are the architects of digital dreams, the guardians of algorithmic innovation.</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Gallery */}
                <div className="dark-panel right-panel">
                    <div className="panel-header">
                        <div className="panel-icon">
                            <i className="fas fa-images"></i>
                        </div>
                        <h3>Gallery.exe</h3>
                        <div className="loading-bar">
                            <div className="loading-progress"></div>
                        </div>
                    </div>
                    
                    <div className="dark-gallery">
                        <div className="gallery-grid">
                            <div className="dark-gallery-item featured">
                                <img src="/assets/images/College Pics/Code_d_Code/Executive Team Code_d_Code Front.jpg" alt="Code_d_Code Executive Team" />
                                <div className="dark-overlay">
                                    <div className="overlay-content">
                                        <h4>Executive.core</h4>
                                        <p>System administrators of innovation</p>
                                        <div className="scan-line"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="dark-gallery-item">
                                <img src="/assets/images/College Pics/Code_d_Code/Code-d-Code Offline meet.jpg" alt="Offline Meetup" />
                                <div className="dark-overlay">
                                    <div className="overlay-content">
                                        <h4>Offline.sync</h4>
                                        <p>Real-world connections</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="dark-gallery-item">
                                <img src="/assets/images/College Pics/Code_d_Code/Code_d_Code online meet.png" alt="Online Sessions" />
                                <div className="dark-overlay">
                                    <div className="overlay-content">
                                        <h4>Virtual.matrix</h4>
                                        <p>Digital collaboration space</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="dark-gallery-item">
                                <img src="/assets/images/College Pics/Code_d_Code/Society Heads.png" alt="Society Heads" />
                                <div className="dark-overlay">
                                    <div className="overlay-content">
                                        <h4>Leaders.init</h4>
                                        <p>Command line visionaries</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activities Section */}
            <div className="dark-activities-section">
                <div className="section-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">ACTIVITIES.LOG</span>
                    <div className="divider-line"></div>
                </div>
                
                <div className="dark-activities-grid">
                    <div className="dark-activity-card">
                        <div className="card-header">
                            <div className="activity-icon">
                                <i className="fas fa-code"></i>
                            </div>
                            <h4>Code.workshops()</h4>
                            <div className="activity-status">
                                <span className="status-text">ACTIVE</span>
                            </div>
                        </div>
                        <div className="card-content">
                            <p>Intensive coding bootcamps where algorithms come alive and logic transforms into reality.</p>
                            <div className="tech-tags">
                                <span className="tag">Python</span>
                                <span className="tag">JavaScript</span>
                                <span className="tag">AI/ML</span>
                            </div>
                        </div>
                    </div>

                    <div className="dark-activity-card">
                        <div className="card-header">
                            <div className="activity-icon">
                                <i className="fas fa-trophy"></i>
                            </div>
                            <h4>Hackathon.execute()</h4>
                            <div className="activity-status">
                                <span className="status-text">LEGENDARY</span>
                            </div>
                        </div>
                        <div className="card-content">
                            <p>48-hour coding marathons where sleep is optional and innovation is mandatory.</p>
                            <div className="tech-tags">
                                <span className="tag">Problem Solving</span>
                                <span className="tag">Innovation</span>
                                <span className="tag">Team Work</span>
                            </div>
                        </div>
                    </div>

                    <div className="dark-activity-card">
                        <div className="card-header">
                            <div className="activity-icon">
                                <i className="fas fa-brain"></i>
                            </div>
                            <h4>TechTalks.stream()</h4>
                            <div className="activity-status">
                                <span className="status-text">LIVE</span>
                            </div>
                        </div>
                        <div className="card-content">
                            <p>Knowledge transfer protocols with industry experts and tech evangelists.</p>
                            <div className="tech-tags">
                                <span className="tag">Industry Insights</span>
                                <span className="tag">Future Tech</span>
                                <span className="tag">Career Guidance</span>
                            </div>
                        </div>
                    </div>

                    <div className="dark-activity-card">
                        <div className="card-header">
                            <div className="activity-icon">
                                <i className="fas fa-rocket"></i>
                            </div>
                            <h4>Project.deploy()</h4>
                            <div className="activity-status">
                                <span className="status-text">SCALING</span>
                            </div>
                        </div>
                        <div className="card-content">
                            <p>Mentorship programs that transform ideas into production-ready applications.</p>
                            <div className="tech-tags">
                                <span className="tag">Mentorship</span>
                                <span className="tag">Real Projects</span>
                                <span className="tag">Industry Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="dark-cta-section">
                <div className="cta-content">
                    <h3>Ready to Join the Matrix?</h3>
                    <p>Initialize your journey with us and become part of the digital revolution.</p>
                    <div className="cta-buttons">
                        <a href="https://www.codedcode.tech" target="_blank" className="dark-btn primary">
                            <span>Visit Our Universe</span>
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                        <Link to="/contact" className="dark-btn secondary">
                            <span>Connect.now()</span>
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Student Clubs */}
    <section className="student-clubs">
        <div className="container">
            <div className="section-header">
                <h2>Student Clubs & Societies</h2>
                <p>Join communities that match your interests and passions</p>
            </div>
            <div className="clubs-grid">
                <div className="club-card">
                    <i className="fas fa-code"></i>
                    <h3>Code Society</h3>
                    <p>Programming enthusiasts working on software development, competitive coding, and hackathons.</p>
                    <div className="club-stats">
                        <span>100+ Members</span>
                        <span>Weekly Meetups</span>
                    </div>
                </div>

                <div className="club-card">
                    <i className="fas fa-robot"></i>
                    <h3>Robotics Club</h3>
                    <p>Designing and building robots for competitions and practical applications in automation.</p>
                    <div className="club-stats">
                        <span>50+ Members</span>
                        <span>Monthly Projects</span>
                    </div>
                </div>

                <div className="club-card">
                    <i className="fas fa-lightbulb"></i>
                    <h3>Innovation Club</h3>
                    <p>Fostering creativity and entrepreneurship through innovative projects and startup initiatives.</p>
                    <div className="club-stats">
                        <span>75+ Members</span>
                        <span>Idea Incubation</span>
                    </div>
                </div>

                <div className="club-card">
                    <i className="fas fa-leaf"></i>
                    <h3>Environmental Club</h3>
                    <p>Promoting environmental awareness and sustainability through various green initiatives.</p>
                    <div className="club-stats">
                        <span>80+ Members</span>
                        <span>Eco Projects</span>
                    </div>
                </div>

                <div className="club-card">
                    <i className="fas fa-camera"></i>
                    <h3>Photography Club</h3>
                    <p>Capturing moments and developing artistic skills through photography workshops and exhibitions.</p>
                    <div className="club-stats">
                        <span>40+ Members</span>
                        <span>Photo Walks</span>
                    </div>
                </div>

                <div className="club-card">
                    <i className="fas fa-music"></i>
                    <h3>Cultural Society</h3>
                    <p>Organizing cultural events, music performances, and artistic celebrations throughout the year.</p>
                    <div className="club-stats">
                        <span>60+ Members</span>
                        <span>Annual Events</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    
        </>
    );
}
