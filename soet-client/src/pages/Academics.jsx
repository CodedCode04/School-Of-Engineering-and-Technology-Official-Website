import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Academics() {
    useEffect(() => {
        document.title = "Academics - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            

    {/* Page Header */}
    <section className="page-header">
        <div className="container">
            <h1>Academic Programs</h1>
            <p>Comprehensive Engineering Education for Tomorrow's Leaders</p>
            <nav className="breadcrumb">
                <Link to="/..index">Home</Link> <span>/</span> Academics
            </nav>
        </div>
    </section>

    {/* Programs Overview */}
    <section className="programs-overview">
        <div className="container">
            <div className="section-header">
                <h2>Our Engineering Programs</h2>
                <p>World-class education across multiple engineering disciplines</p>
            </div>
            <div className="overview-content">
                <div className="overview-text">
                    <p>SoET offers comprehensive undergraduate and postgraduate programs in various engineering disciplines. Our curriculum is designed to meet industry standards while fostering innovation and research capabilities among students.</p>
                    <div className="program-stats">
                        <div className="stat">
                            <h3>6</h3>
                            <p>Engineering Departments</p>
                        </div>
                        <div className="stat">
                            <h3>15+</h3>
                            <p>Specialized Courses</p>
                        </div>
                        <div className="stat">
                            <h3>2000+</h3>
                            <p>Students Enrolled</p>
                        </div>
                    </div>
                </div>
                <div className="overview-image">
                    <img src="/assets/images/College Pics/College/IMG-20241226-WA0010.jpg" alt="Academic Excellence - SoET Engineering Campus" />
                </div>
            </div>
        </div>
    </section>

    {/* Undergraduate Programs */}
    <section className="undergraduate-programs">
        <div className="container">
            <div className="section-header">
                <h2>Undergraduate Programs (B.Tech)</h2>
                <p>Four-year Bachelor of Technology programs</p>
            </div>
            <div className="programs-grid">
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-building"></i>
                        <h3>Civil Engineering</h3>
                    </div>
                    <div className="program-content">
                        <p>Structural design, construction management, environmental engineering, and infrastructure development.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 54</span>
                        </div>
                    </div>
                </div>

                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-cogs"></i>
                        <h3>Mechanical Engineering</h3>
                    </div>
                    <div className="program-content">
                        <p>Design, manufacturing, thermal systems, and automation.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 54</span>
                        </div>
                    </div>
                </div>

                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-bolt"></i>
                        <h3>Electrical Engineering</h3>
                    </div>
                    <div className="program-content">
                        <p>Power systems, electrical machines, and control systems.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 54</span>
                        </div>
                    </div>
                </div>

                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-microchip"></i>
                        <h3>Electronics & Communication</h3>
                    </div>
                    <div className="program-content">
                        <p>Digital systems, communication networks, and VLSI design.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 54</span>
                        </div>
                    </div>
                </div>

                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-laptop-code"></i>
                        <h3>Electronics & Computer Science</h3>
                    </div>
                    <div className="program-content">
                        <p>Programming, AI, ML, and embedded systems.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 54</span>
                        </div>
                    </div>
                </div>

                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-seedling"></i>
                        <h3>Agricultural Engineering</h3>
                    </div>
                    <div className="program-content">
                        <p>Farm machinery, irrigation, and food processing.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 30</span>
                        </div>
                    </div>
                </div>

                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-briefcase"></i>
                        <h3>Computer Science & Business System</h3>
                    </div>
                    <div className="program-content">
                        <p>Bridging the gap between computer science and business requirements.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 30</span>
                        </div>
                    </div>
                </div>

                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-brain"></i>
                        <h3>CSE (AI & Machine Learning)</h3>
                    </div>
                    <div className="program-content">
                        <p>Focused on Artificial Intelligence and Machine Learning technologies.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 30</span>
                        </div>
                    </div>
                </div>

                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-cheese"></i>
                        <h3>Dairy Technology</h3>
                    </div>
                    <div className="program-content">
                        <p>Production, processing, and management of dairy products.</p>
                        <div className="program-info">
                            <span><i className="fas fa-clock"></i> Duration: 4 Years</span>
                            <span><i className="fas fa-users"></i> Intake: 30</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Postgraduate Programs */}
    <section className="postgraduate-programs">
        <div className="container">
            <div className="section-header">
                <h2>Postgraduate Programs (M.Tech)</h2>
                <p>Two-year Master of Technology programs for advanced technical expertise (Intake: 18 each)</p>
            </div>
            <div className="programs-grid">
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-microchip"></i>
                        <h3>Digital Communication</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-thermometer-half"></i>
                        <h3>Thermal Engineering</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-bolt"></i>
                        <h3>Power system and Automation</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-leaf"></i>
                        <h3>Energy Technology</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-network-wired"></i>
                        <h3>IoT and Sensor Systems</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-cloud"></i>
                        <h3>Cloud Computing</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-brain"></i>
                        <h3>Artificial Intelligence and Data Science</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-building"></i>
                        <h3>Structural Engineering</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-tasks"></i>
                        <h3>Construction Planning Management</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-recycle"></i>
                        <h3>Environmental Engineering</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Diploma Programs */}
    <section className="diploma-programs">
        <div className="container">
            <div className="section-header">
                <h2>Diploma in Engineering</h2>
                <p>New Diploma courses (Intake: 30 each)</p>
            </div>
            <div className="programs-grid">
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-building"></i>
                        <h3>Civil Engineering</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-laptop-code"></i>
                        <h3>Computer Science & Engineering</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-bolt"></i>
                        <h3>Electrical Engineering</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-microchip"></i>
                        <h3>Electronics & Communication Engineering</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-cogs"></i>
                        <h3>Mechanical Engineering</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* M.Tech for Working Professionals */}
    <section className="mtech-working-professionals">
        <div className="container">
            <div className="section-header">
                <h2>M.Tech for Working Professionals</h2>
                <p>Advanced programs tailored for industry professionals</p>
            </div>
            <div className="programs-grid">
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-building"></i>
                        <h3>Structural Engineering</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-thermometer-half"></i>
                        <h3>Thermal Engineering</h3>
                    </div>
                </div>
                <div className="program-card detailed">
                    <div className="program-header">
                        <i className="fas fa-bolt"></i>
                        <h3>Power System and Automation</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Admission Information */}
    <section className="admission-info">
        <div className="container">
            <div className="section-header">
                <h2>Admission Information</h2>
                <p>Your pathway to engineering excellence</p>
            </div>
            <div className="admission-content">
                <div className="admission-process">
                    <h3>Admission Process</h3>
                    <div className="process-steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h4>Online Application</h4>
                            <p>Submit your application through the university portal</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h4>Entrance Examination</h4>
                            <p>Appear for the engineering entrance exam</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h4>Counseling</h4>
                            <p>Participate in the counseling and seat allocation process</p>
                        </div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <h4>Admission Confirmation</h4>
                            <p>Complete documentation and fee payment</p>
                        </div>
                    </div>
                </div>
                <div className="admission-requirements">
                    <h3>Eligibility Criteria</h3>
                    <div className="requirements-list">
                        <div className="requirement-item">
                            <h4>For B.Tech Programs</h4>
                            <ul>
                                <li>12th Pass with Physics, Chemistry, Mathematics</li>
                                <li>Minimum 45% marks (40% for reserved categories)</li>
                                <li>Valid entrance exam score (JEE Main/State CET)</li>
                            </ul>
                        </div>
                        <div className="requirement-item">
                            <h4>For M.Tech Programs</h4>
                            <ul>
                                <li>B.Tech/B.E. in relevant discipline</li>
                                <li>Minimum 50% marks (45% for reserved categories)</li>
                                <li>Valid GATE score preferred</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    
        </>
    );
}
