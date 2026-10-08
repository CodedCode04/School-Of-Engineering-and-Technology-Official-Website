import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
    useEffect(() => {
        document.title = "About - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            

    {/* Page Header */}
    <section className="page-header">
        <div className="container">
            <h1>About SoET</h1>
            <p>Building Tomorrow's Engineers Today</p>
            <nav className="breadcrumb">
                <Link to="/..index">Home</Link> <span>/</span> About
            </nav>
        </div>
    </section>

    {/* About Section */}
    <section className="about">
        <div className="container">
            <div className="about-content">
                <div className="about-text">
                    <h2>Our Legacy</h2>
                    <p>School of Engineering & Technology (SoET) is a University Teaching Department of Samrat Vikramaditya Vishwavidyalaya Ujjain established in 2011 under the faculty of Engineering. The institute provides technical education leading to the undergraduate degree of B.Tech. and the postgraduate degree of M.Tech.</p>
                    
                    <p>The courses offered are sanctioned by the AICTE and the Department of Technical Education of the Government of Madhya Pradesh, and the institute is affiliated with Samrat Vikramaditya Vishwavidyalaya in Ujjain. We are committed to ensuring that each student emerges as a valuable asset to themselves, their families, the college, society, and the nation as a whole.</p>
                    
                    <h3>Our Vision</h3>
                    <p>Basic philosophy of the Institute is to develop the technical culture through its programs by imparting the quality technical education of dynamic knowledge and practical skills to the students.</p>
                    
                    <h3>Our Mission</h3>
                    <p>Institute will mainly emphasize towards personality of students to enter the engineering profession and to develop quality of leadership and provide the social and moral values and pride for national heritage. SoET endeavors to produce top quality of technical professionals and provide them right platform for building engineers to acquire the knowledge in leading edge industries.</p>
                    
                    <h3>Core Values</h3>
                    <ul className="values-list">
                        <li><i className="fas fa-check-circle"></i> <strong>Quality Education:</strong> Dynamic knowledge and practical skills development</li>
                        <li><i className="fas fa-check-circle"></i> <strong>Leadership:</strong> Developing quality leadership among students</li>
                        <li><i className="fas fa-check-circle"></i> <strong>Social Values:</strong> Instilling social and moral values</li>
                        <li><i className="fas fa-check-circle"></i> <strong>National Heritage:</strong> Pride for national heritage and culture</li>
                        <li><i className="fas fa-check-circle"></i> <strong>Professional Excellence:</strong> Producing top quality technical professionals</li>
                    </ul>
                </div>
                <div className="about-image">
                    <img src="/assets/images/College Pics/College/IMG-20241226-WA0009.jpg" alt="SoET Campus" />
                    <div className="image-caption">
                        <p>SoET Campus - Where Innovation Meets Excellence since 2011</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Highlights Section */}
    <section className="highlights-section">
        <div className="container">
            <div className="section-header">
                <h2>Why Choose SoET?</h2>
                <p>Excellence in Every Aspect of Engineering Education</p>
            </div>
            <div className="why-choose-cards">
                <div className="why-choose-card">
                    <div className="card-icon">
                        <i className="fas fa-award"></i>
                    </div>
                    <div className="card-content">
                        <h4>AICTE Approved</h4>
                        <p>All our programs are approved by the All India Council for Technical Education (AICTE), ensuring quality and recognition.</p>
                        <div className="card-highlight">Nationally Recognized</div>
                    </div>
                </div>
                
                <div className="why-choose-card">
                    <div className="card-icon">
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="card-content">
                        <h4>Quality Education</h4>
                        <p>Industry-relevant curriculum designed to meet global engineering standards with practical learning approach.</p>
                        <div className="card-highlight">Global Standards</div>
                    </div>
                </div>
                
                <div className="why-choose-card">
                    <div className="card-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="card-content">
                        <h4>Experienced Faculty</h4>
                        <p>22 qualified professors and 7 dedicated staff members committed to student success and academic excellence.</p>
                        <div className="card-highlight">30 Expert Team</div>
                    </div>
                </div>
                
                <div className="why-choose-card">
                    <div className="card-icon">
                        <i className="fas fa-flask"></i>
                    </div>
                    <div className="card-content">
                        <h4>Research Focus</h4>
                        <p>Strong emphasis on research and development in emerging technologies like AI, IoT, and renewable energy.</p>
                        <div className="card-highlight">Innovation Hub</div>
                    </div>
                </div>
                
                <div className="why-choose-card">
                    <div className="card-icon">
                        <i className="fas fa-handshake"></i>
                    </div>
                    <div className="card-content">
                        <h4>Industry Partnerships</h4>
                        <p>Collaborations with leading industries for internships, projects, and practical exposure to real-world challenges.</p>
                        <div className="card-highlight">25+ Partners</div>
                    </div>
                </div>
                
                <div className="why-choose-card">
                    <div className="card-icon">
                        <i className="fas fa-cogs"></i>
                    </div>
                    <div className="card-content">
                        <h4>Modern Infrastructure</h4>
                        <p>State-of-the-art laboratories, well-equipped workshops, and modern facilities for comprehensive learning.</p>
                        <div className="card-highlight">Latest Technology</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* History Section */}
    <section className="history-section">
        <div className="container">
            <div className="section-header">
                <h2>Our Journey</h2>
                <p>A Rich Heritage of Engineering Excellence</p>
            </div>
            <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-year">1957</div>
                    <div className="timeline-content">
                        <h3>Foundation</h3>
                        <p>Samrat Vikramaditya Vishwavidyalaya was established, laying the foundation for engineering education in the region</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-year">1960s</div>
                    <div className="timeline-content">
                        <h3>Engineering Programs Launch</h3>
                        <p>Introduction of core engineering disciplines including Civil, Mechanical, and Electrical Engineering</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-year">1990s</div>
                    <div className="timeline-content">
                        <h3>Technology Integration</h3>
                        <p>Addition of Computer Science and Electronics programs to meet technological advancement</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-year">2000s</div>
                    <div className="timeline-content">
                        <h3>Modern Infrastructure</h3>
                        <p>Development of state-of-the-art laboratories and research facilities</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-year">2020s</div>
                    <div className="timeline-content">
                        <h3>Digital Transformation</h3>
                        <p>Integration of AI, IoT, and modern technologies in curriculum and research</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Leadership Section */}
    <section className="leadership-section">
        <div className="container">
            <div className="section-header">
                <h2>Leadership Team</h2>
                <p>Visionary Leaders Guiding Our Future</p>
            </div>
            <div className="leadership-grid">
                <div className="leader-card">
                    <div className="leader-image">
                        <i className="fas fa-user-tie"></i>
                    </div>
                    <h3>Prof. Dr. Sandeep Tiwari</h3>
                    <p className="designation">Director, School of Engineering and Technology</p>
                    <p>Leading SoET with over 2 years of experience in engineering education and research</p>
                </div>
                <div className="leader-card">
                    <div className="leader-image">
                        <i className="fas fa-user-graduate"></i>
                    </div>
                    <h3>Prof. Ashish Suryavanshi</h3>
                    <p className="designation">Head of Department - Electronics and Computer Science</p>
                    <p>Expert in AI and Machine Learning with numerous publications and patents</p>
                </div>
                <div className="leader-card">
                    <div className="leader-image">
                        <i className="fas fa-microchip"></i>
                    </div>
                    <h3>Prof. Amit Thakur</h3>
                    <p className="designation">Head of Department - Electronics & Communication Engineering</p>
                    <p>Specialist in communication systems, VLSI design, and embedded systems with 11 years experience</p>
                </div>
                <div className="leader-card">
                    <div className="leader-image">
                        <i className="fas fa-user-cog"></i>
                    </div>
                    <h3>Prof. Khemraj Bairagi</h3>
                    <p className="designation">Head of Department - Mechanical Engineering</p>
                    <p>Specialist in advanced manufacturing and automation technologies</p>
                </div>
                <div className="leader-card">
                    <div className="leader-image">
                        <i className="fas fa-hard-hat"></i>
                    </div>
                    <h3>Prof. Rajesh Chouhan</h3>
                    <p className="designation">Head of Department - Civil Engineering</p>
                    <p>Expert in structural engineering and infrastructure development with extensive experience</p>
                </div>
                <div className="leader-card">
                    <div className="leader-image">
                        <i className="fas fa-bolt"></i>
                    </div>
                    <h3>Prof. Raghunandan Bhagel</h3>
                    <p className="designation">Head of Department - Electrical Engineering</p>
                    <p>Specialist in power systems and renewable energy technologies</p>
                </div>
                <div className="leader-card">
                    <div className="leader-image">
                        <i className="fas fa-seedling"></i>
                    </div>
                    <h3>Prof. Dr. Sachin Sasodia</h3>
                    <p className="designation">Head of Department - Agricultural Engineering</p>
                    <p>Expert in sustainable farming technologies and agricultural automation systems</p>
                </div>
            </div>
        </div>
    </section>

    {/* Faculty Section */}
    <section id="faculty" className="faculty-section">
        <div className="container">
            <div className="section-header">
                <h2>Our Faculty</h2>
                <p>Dedicated Educators and Researchers Shaping Future Engineers</p>
            </div>
            <div className="faculty-overview">
                <div className="faculty-stats">
                    <div className="stat-card">
                        <h3>150+</h3>
                        <p>Research Publications</p>
                    </div>
                    <div className="stat-card">
                        <h3>30</h3>
                        <p>Faculty & Staff</p>
                    </div>
                    <div className="stat-card">
                        <h3>11</h3>
                        <p>Academic Programs</p>
                    </div>
                    <div className="stat-card">
                        <h3>2500+</h3>
                        <p>Library Books</p>
                    </div>
                </div>
            </div>
            
            {/* Faculty Details */}
            <div className="faculty-details">
                <h3>Faculty Directory</h3>
                <div className="faculty-tabs">
                    <button className="tab-btn active" onclick="showDepartment('all')">All Faculty</button>
                    <button className="tab-btn" onclick="showDepartment('ece')">Electronics & Communication</button>
                    <button className="tab-btn" onclick="showDepartment('mechanical')">Mechanical</button>
                    <button className="tab-btn" onclick="showDepartment('civil')">Civil</button>
                    <button className="tab-btn" onclick="showDepartment('electrical')">Electrical</button>
                    <button className="tab-btn" onclick="showDepartment('others')">Others</button>
                </div>
                
                <div className="faculty-grid" id="faculty-grid">
                    {/* Director */}
                    <div className="faculty-card director" data-dept="director">
                        <div className="faculty-info">
                            <h4>Dr. S. K. Tiwari</h4>
                            <p className="designation">Director</p>
                            <p className="qualification">Ph.D. in Mathematical Modelling</p>
                            <p className="experience">25 Years Experience</p>
                            <p className="contact">📞 9424958805</p>
                        </div>
                    </div>
                    
                    {/* ECE Faculty */}
                    <div className="faculty-card" data-dept="ece">
                        <div className="faculty-info">
                            <h4>Mr. Amit Thakur</h4>
                            <p className="department">Electronics & Communication</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">11 Years Experience</p>
                            <p className="contact">📞 9993741159</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="ece">
                        <div className="faculty-info">
                            <h4>Mr. Ashish Suryavanshi</h4>
                            <p className="department">Electronics & Communication</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">8 Years Experience</p>
                            <p className="contact">📞 9685583102</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="ece">
                        <div className="faculty-info">
                            <h4>Ms. Kanchan Thool</h4>
                            <p className="department">Electronics & Communication</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">8 Years Experience</p>
                            <p className="contact">📞 8982730277</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="ece">
                        <div className="faculty-info">
                            <h4>Mr. Amit Marmat</h4>
                            <p className="department">Electronics & Communication</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">7 Years Experience</p>
                            <p className="contact">📞 9981772520</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="ece">
                        <div className="faculty-info">
                            <h4>Mr. Yogesh Patidar</h4>
                            <p className="department">Electronics & Communication</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">7 Years Experience</p>
                            <p className="contact">📞 7566806353</p>
                        </div>
                    </div>
                    
                    {/* Mechanical Faculty */}
                    <div className="faculty-card" data-dept="mechanical">
                        <div className="faculty-info">
                            <h4>Mr. Khemraj Beragi</h4>
                            <p className="department">Mechanical Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">7 Years Experience</p>
                            <p className="contact">📞 7222926136</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="mechanical">
                        <div className="faculty-info">
                            <h4>Mrs. Anjali Upadhyay</h4>
                            <p className="department">Mechanical Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">8 Years Experience</p>
                            <p className="contact">📞 9826469362</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="mechanical">
                        <div className="faculty-info">
                            <h4>Mr. Shivam Sharma</h4>
                            <p className="department">Mechanical Engineering</p>
                            <p className="experience">7 Years Experience</p>
                            <p className="contact">📞 7909437291</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="mechanical">
                        <div className="faculty-info">
                            <h4>Mr. Dwarika Prasad Jaiswal</h4>
                            <p className="department">Mechanical Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">7 Years Experience</p>
                            <p className="contact">📞 8103098535</p>
                        </div>
                    </div>
                    
                    {/* Civil Faculty */}
                    <div className="faculty-card" data-dept="civil">
                        <div className="faculty-info">
                            <h4>Mr. Rajesh Chouhan</h4>
                            <p className="department">Civil Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">9 Years Experience</p>
                            <p className="contact">📞 9893295134</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="civil">
                        <div className="faculty-info">
                            <h4>Mr. Sachin Sironiya</h4>
                            <p className="department">Civil Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">9 Years Experience</p>
                            <p className="contact">📞 9179807955</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="civil">
                        <div className="faculty-info">
                            <h4>Mr. Chetan Gurjar</h4>
                            <p className="department">Civil Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">7 Years Experience</p>
                            <p className="contact">📞 9179246393</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="civil">
                        <div className="faculty-info">
                            <h4>Mr. Mohit Prajapati</h4>
                            <p className="department">Civil Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">7 Years Experience</p>
                            <p className="contact">📞 9039712959</p>
                        </div>
                    </div>
                    
                    {/* Electrical Faculty */}
                    <div className="faculty-card" data-dept="electrical">
                        <div className="faculty-info">
                            <h4>Mrs. Neha Singh</h4>
                            <p className="department">Electrical Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">9 Years Experience</p>
                            <p className="contact">📞 9827836188</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="electrical">
                        <div className="faculty-info">
                            <h4>Mr. Raghunandan Singh Baghel</h4>
                            <p className="department">Electrical Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">9 Years Experience</p>
                            <p className="contact">📞 8839593759</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="electrical">
                        <div className="faculty-info">
                            <h4>Mr. Ritesh Nagar</h4>
                            <p className="department">Electrical Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">8 Years Experience</p>
                            <p className="contact">📞 9827906627</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="electrical">
                        <div className="faculty-info">
                            <h4>Mrs. Garima Solanki</h4>
                            <p className="department">Electrical Engineering</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">11 Years Experience</p>
                            <p className="contact">📞 9893277603</p>
                        </div>
                    </div>
                    
                    {/* Other Faculty */}
                    <div className="faculty-card" data-dept="others">
                        <div className="faculty-info">
                            <h4>Mrs. Amrita Shukla</h4>
                            <p className="department">Environment</p>
                            <p className="qualification">M.Sc., M.Phil</p>
                            <p className="experience">15 Years Experience</p>
                            <p className="contact">📞 9770797977</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="others">
                        <div className="faculty-info">
                            <h4>Mrs. Garima Saxena</h4>
                            <p className="department">Engineering Mathematics</p>
                            <p className="qualification">M.Sc.</p>
                            <p className="experience">9 Years Experience</p>
                            <p className="contact">📞 6261814162</p>
                        </div>
                    </div>
                    
                    <div className="faculty-card" data-dept="others">
                        <div className="faculty-info">
                            <h4>Mrs. Pratibha Saraf</h4>
                            <p className="department">Computer Science</p>
                            <p className="qualification">M.Tech</p>
                            <p className="experience">6 Years Experience</p>
                            <p className="contact">📞 7024114848</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="research-areas">
                <h3>Research Thrust Areas</h3>
                <div className="research-grid">
                    <div className="research-item">
                        <i className="fas fa-building"></i>
                        <h4>Structural Engineering</h4>
                        <p>Advanced research in structural design and analysis</p>
                    </div>
                    <div className="research-item">
                        <i className="fas fa-solar-panel"></i>
                        <h4>Renewable Energy</h4>
                        <p>Sustainable energy solutions and green technology</p>
                    </div>
                    <div className="research-item">
                        <i className="fas fa-bolt"></i>
                        <h4>Power System Automation</h4>
                        <p>Smart grid and automated power systems</p>
                    </div>
                    <div className="research-item">
                        <i className="fas fa-wifi"></i>
                        <h4>Digital Communication</h4>
                        <p>Advanced communication systems and protocols</p>
                    </div>
                    <div className="research-item">
                        <i className="fas fa-microchip"></i>
                        <h4>VLSI Design</h4>
                        <p>Very Large Scale Integration and chip design</p>
                    </div>
                    <div className="research-item">
                        <i className="fas fa-network-wired"></i>
                        <h4>Wireless Sensor Networks</h4>
                        <p>IoT and sensor network technologies</p>
                    </div>
                    <div className="research-item">
                        <i className="fas fa-thermometer-half"></i>
                        <h4>Thermal Engineering</h4>
                        <p>Heat transfer and thermal systems optimization</p>
                    </div>
                    <div className="research-item">
                        <i className="fas fa-robot"></i>
                        <h4>IoT & Automation</h4>
                        <p>Internet of Things and industrial automation</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Alumni Section */}
    <section id="alumni" className="alumni-section">
        <div className="container">
            <div className="section-header">
                <h2>Our Alumni</h2>
                <p>Proud Graduates Making Impact Worldwide</p>
            </div>
            <div className="alumni-overview">
                <div className="alumni-stats">
                    <div className="stat-card">
                        <h3>41+</h3>
                        <p>Successful Placements</p>
                    </div>
                    <div className="stat-card">
                        <h3>35+</h3>
                        <p>Top Companies</p>
                    </div>
                    <div className="stat-card">
                        <h3>6</h3>
                        <p>Engineering Branches</p>
                    </div>
                    <div className="stat-card">
                        <h3>100%</h3>
                        <p>Industry Ready</p>
                    </div>
                </div>
            </div>
            
            {/* Notable Placements */}
            <div className="notable-placements">
                <h3>Notable Alumni Placements</h3>
                <div className="placements-grid">
                    <div className="placement-card highlight">
                        <h4>Shantanu Nigam</h4>
                        <p className="branch">Electronics Engineering</p>
                        <p className="company">Qualcomm Technologies Inc., Hyderabad</p>
                        <span className="company-tag premium">Premium Placement</span>
                    </div>
                    
                    <div className="placement-card">
                        <h4>Vikas Rathore</h4>
                        <p className="branch">Electrical Engineering</p>
                        <p className="company">H&R Johnson</p>
                        <span className="company-tag corporate">Corporate</span>
                    </div>
                    
                    <div className="placement-card">
                        <h4>Geetika Verma</h4>
                        <p className="branch">Electrical Engineering</p>
                        <p className="company">BPCL</p>
                        <span className="company-tag psu">PSU</span>
                    </div>
                    
                    <div className="placement-card">
                        <h4>Syed Danish Ali</h4>
                        <p className="branch">Civil Engineering</p>
                        <p className="company">Indian Railways - Central Railways</p>
                        <span className="company-tag government">Government</span>
                    </div>
                    
                    <div className="placement-card">
                        <h4>Shubham Sachan</h4>
                        <p className="branch">Electronics Engineering</p>
                        <p className="company">Wipro</p>
                        <span className="company-tag it">IT Sector</span>
                    </div>
                    
                    <div className="placement-card">
                        <h4>Ranveer Kumar</h4>
                        <p className="branch">Electronics Engineering</p>
                        <p className="company">Hitachi</p>
                        <span className="company-tag multinational">MNC</span>
                    </div>
                </div>
                
                <div className="more-placements">
                    <h4>Other Notable Companies</h4>
                    <div className="companies-list">
                        <span className="company-badge">L&T Construction</span>
                        <span className="company-badge">ICICI Bank</span>
                        <span className="company-badge">HDFC Bank</span>
                        <span className="company-badge">BYJU'S</span>
                        <span className="company-badge">PwC</span>
                        <span className="company-badge">Motherson Sumi</span>
                        <span className="company-badge">UCO Bank</span>
                        <span className="company-badge">LIC India</span>
                        <span className="company-badge">Max Life Insurance</span>
                        <span className="company-badge">ICICI Lombard</span>
                    </div>
                </div>
            </div>
            
            <div className="alumni-achievements">
                <h3>Alumni Success Stories</h3>
                <div className="achievements-grid">
                    <div className="achievement-item">
                        <i className="fas fa-trophy"></i>
                        <h4>Industry Leaders</h4>
                        <p>Our alumni hold leadership positions in top MNCs and Fortune 500 companies</p>
                    </div>
                    <div className="achievement-item">
                        <i className="fas fa-lightbulb"></i>
                        <h4>Innovators</h4>
                        <p>Successful entrepreneurs and startup founders creating innovative solutions</p>
                    </div>
                    <div className="achievement-item">
                        <i className="fas fa-graduation-cap"></i>
                        <h4>Academicians</h4>
                        <p>Professors and researchers contributing to academic excellence globally</p>
                    </div>
                    <div className="achievement-item">
                        <i className="fas fa-hands-helping"></i>
                        <h4>Social Impact</h4>
                        <p>Alumni working towards social causes and sustainable development</p>
                    </div>
                </div>
            </div>
            
            <div className="alumni-network">
                <h3>Stay Connected</h3>
                <p>Join our vibrant alumni network and stay connected with fellow SoET graduates. Participate in alumni events, mentorship programs, and contribute to the growth of current students.</p>
                <div className="alumni-actions">
                    <a href="#" className="btn-primary">Join Alumni Network</a>
                    <a href="#" className="btn-secondary">Alumni Portal</a>
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    
        </>
    );
}
