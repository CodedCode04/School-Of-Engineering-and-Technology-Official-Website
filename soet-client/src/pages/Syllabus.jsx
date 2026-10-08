import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Syllabus() {
    useEffect(() => {
        document.title = "Syllabus - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            

    {/* Page Header */}
    <section className="page-header">
        <div className="container">
            <div className="page-header-content">
                <h1>Academic Syllabus</h1>
                <p>Comprehensive curriculum for all engineering programs</p>
                <div className="breadcrumb">
                    <Link to="/..index">Home</Link>
                    <span>/</span>
                    <span>Syllabus</span>
                </div>
            </div>
        </div>
    </section>

    {/* Syllabus Section */}
    <section className="syllabus-section">
        <div className="container">
            {/* Department Filter */}
            <div className="department-filter">
                <h2>Select Department</h2>
                <div className="filter-tabs">
                    <button className="filter-btn active" data-dept="all">All Departments</button>
                    <button className="filter-btn" data-dept="cse">Electronics and Computer Science</button>
                    <button className="filter-btn" data-dept="mechanical">Mechanical</button>
                    <button className="filter-btn" data-dept="electrical">Electrical</button>
                    <button className="filter-btn" data-dept="civil">Civil</button>
                    <button className="filter-btn" data-dept="electronics">Electronics</button>
                    <button className="filter-btn" data-dept="agricultural">Agricultural</button>
                </div>
            </div>

            {/* Syllabus Cards */}
            <div className="syllabus-grid">
                {/* Electronics and Computer Science Department */}
                <div className="syllabus-card" data-dept="cse">
                    <div className="card-header">
                        <div className="dept-icon">
                            <i className="fas fa-laptop-code"></i>
                        </div>
                        <h3>Electronics & Computer Science</h3>
                        <span className="program-type">B.Tech</span>
                    </div>
                    <div className="card-content">
                        <div className="syllabus-links">
                            <h4>B.Tech Electronics & Computer Science</h4>
                            <div className="semester-links">
                                <a href="https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>1st Year (Common)</span>
                                </a>
                                <a href="https://drive.google.com/file/d/13QGanvFARUQ2BB-QhrYwtU3gjCvMxr_I/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>3rd Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1-l9jHprtHbf1EnPjDSeawAvUzJg2ztOc/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>4th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1yN9lYTEITx5EQfeasm08N1jvpk5hHfii/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>5th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1yMuJLiadlAv9RdhUhcLpwNRHRMRQMjWw/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>6th Semester</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mechanical Engineering */}
                <div className="syllabus-card" data-dept="mechanical">
                    <div className="card-header">
                        <div className="dept-icon">
                            <i className="fas fa-cogs"></i>
                        </div>
                        <h3>Mechanical Engineering</h3>
                        <span className="program-type">B.Tech</span>
                    </div>
                    <div className="card-content">
                        <div className="syllabus-links">
                            <h4>B.Tech Mechanical Engineering</h4>
                            <div className="semester-links">
                                <a href="https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>1st Year (Common)</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1BS2b-X7fiRTQlbdusS6fH34-yPTbBtI0/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>3rd Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1C50N1eAW9TD1kCnwxfE4LkS738KxbrA1/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>4th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1G_bP2cGglf_vKLEmcV4lsyJlzgGDMsFv/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>5th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1BGe5xjowv32Gj20hr8BdiXpMEfjmRbgZ/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>6th Semester</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Electrical Engineering */}
                <div className="syllabus-card" data-dept="electrical">
                    <div className="card-header">
                        <div className="dept-icon">
                            <i className="fas fa-bolt"></i>
                        </div>
                        <h3>Electrical Engineering</h3>
                        <span className="program-type">B.Tech</span>
                    </div>
                    <div className="card-content">
                        <div className="syllabus-links">
                            <h4>B.Tech Electrical Engineering</h4>
                            <div className="semester-links">
                                <a href="https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>1st Year (Common)</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1m8clAaRYgnfDXfjvZm-o3-YTtGXRxEk_/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>3rd Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1pKG-DP5PMLvMMucV-_Z5ujV2loLFTyNj/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>4th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/147MYfYu_jYHBbmu0nnb4mobLdQQuzlC9/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>5th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1I5eyOemd6RyVtLxnDochKEDHv2pYrx24/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>6th Semester</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Civil Engineering */}
                <div className="syllabus-card" data-dept="civil">
                    <div className="card-header">
                        <div className="dept-icon">
                            <i className="fas fa-building"></i>
                        </div>
                        <h3>Civil Engineering</h3>
                        <span className="program-type">B.Tech</span>
                    </div>
                    <div className="card-content">
                        <div className="syllabus-links">
                            <h4>B.Tech Civil Engineering</h4>
                            <div className="semester-links">
                                <a href="https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>1st Year (Common)</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1FJfQcs4wiJhO21NH46EDs2gynC3YQGYy/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>3rd Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1WfF7YHIDUiKhHAD44QYTNy6o53uaV0qB/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>4th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1A4JCwab6I6yVQjNwfGsugOU0g_ZqlUdc/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>5th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/12DsY2KmnGu0o80a2Bva3rDvq4E4y7vAA/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>6th Semester</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Electronics Engineering */}
                <div className="syllabus-card" data-dept="electronics">
                    <div className="card-header">
                        <div className="dept-icon">
                            <i className="fas fa-microchip"></i>
                        </div>
                        <h3>Electronics & Communication</h3>
                        <span className="program-type">B.Tech</span>
                    </div>
                    <div className="card-content">
                        <div className="syllabus-links">
                            <h4>B.Tech Electronics & Communication</h4>
                            <div className="semester-links">
                                <a href="https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>1st Year (Common)</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1dMt_7zw5YtTm-A2X5RMsQLn2aVr8jow5/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>3rd Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1VJhglzBEhfkWrksUql5fMyAzAQqHKWWa/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>4th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/1sIs9PywHjXpebCoTICyyuDFWiusn_p_j/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>5th Semester</span>
                                </a>
                                <a href="https://drive.google.com/file/d/13ZA5DD751VkwPYX8SMpczPeuR-IkAMBk/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>6th Semester</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Agricultural Engineering */}
                <div className="syllabus-card" data-dept="agricultural">
                    <div className="card-header">
                        <div className="dept-icon">
                            <i className="fas fa-seedling"></i>
                        </div>
                        <h3>Agricultural Engineering</h3>
                        <span className="program-type">B.Tech</span>
                    </div>
                    <div className="card-content">
                        <div className="syllabus-links">
                            <h4>B.Tech Agricultural Engineering</h4>
                            <div className="semester-links">
                                <a href="https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link" target="_blank" className="syllabus-link">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>1st Year (Common)</span>
                                </a>
                                <div className="syllabus-link unavailable">
                                    <i className="fas fa-clock"></i>
                                    <span>Other Semesters - Coming Soon</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="additional-resources">
                <h2>Additional Academic Resources</h2>
                <div className="resource-grid">
                    <div className="resource-card">
                        <div className="resource-icon">
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                        <h3>Academic Calendar</h3>
                        <p>Important dates and examination schedule</p>
                        <a href="https://vikramuniv.ac.in/academic-calendar/" target="_blank" className="resource-link">
                            View Calendar
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>

                    <div className="resource-card">
                        <div className="resource-icon">
                            <i className="fas fa-file-alt"></i>
                        </div>
                        <h3>Examination Results</h3>
                        <p>Check your latest examination results</p>
                        <a href="https://vikramuniv.ac.in/results/" target="_blank" className="resource-link">
                            Check Results
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>

                    <div className="resource-card">
                        <div className="resource-icon">
                            <i className="fas fa-book"></i>
                        </div>
                        <h3>Course Regulations</h3>
                        <p>Academic regulations and guidelines</p>
                        <a href="https://vikramuniv.ac.in/regulations/" target="_blank" className="resource-link">
                            View Regulations
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>

                    <div className="resource-card">
                        <div className="resource-icon">
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                        <h3>Credit System</h3>
                        <p>Understanding the credit-based system</p>
                        <a href="https://vikramuniv.ac.in/credit-system/" target="_blank" className="resource-link">
                            Learn More
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Postgraduate Programs Section */}
    <section className="postgraduate-syllabus">
        <div className="container">
            <div className="section-header">
                <h2>Postgraduate Programs (M.Tech)</h2>
                <p>Advanced Engineering Syllabi for Master's Programs</p>
            </div>
            
            <div className="mtech-intro">
                <div className="intro-content">
                    <h3>Master of Technology Programs</h3>
                    <p>Our M.Tech programs are designed to provide advanced technical knowledge and research skills in specialized engineering domains. Each program follows a comprehensive curriculum with both theoretical foundations and practical applications.</p>
                    <div className="mtech-highlights">
                        <div className="highlight-item">
                            <i className="fas fa-graduation-cap"></i>
                            <span>2-Year Duration</span>
                        </div>
                        <div className="highlight-item">
                            <i className="fas fa-microscope"></i>
                            <span>Research Focused</span>
                        </div>
                        <div className="highlight-item">
                            <i className="fas fa-industry"></i>
                            <span>Industry Aligned</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mtech-programs-grid">
                {/* Structural Engineering */}
                <div className="mtech-program-card">
                    <div className="program-header">
                        <div className="header-content">
                            <div className="program-icon">
                                <i className="fas fa-building"></i>
                            </div>
                            <div className="program-title">
                                <h3>M.Tech Structural Engineering</h3>
                                <p>Advanced Structural Analysis & Design</p>
                            </div>
                        </div>
                        <div className="program-badge">Civil Engineering</div>
                    </div>
                    <div className="program-content">
                        <div className="program-description">
                            <p>Specialized program focusing on advanced structural analysis, earthquake engineering, and modern construction technologies.</p>
                        </div>
                        <div className="syllabus-section">
                            <h4><i className="fas fa-book"></i> Syllabus Downloads</h4>
                            <div className="semester-grid">
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-structural-sem1.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 1-2</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-structural-sem3.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 3-4</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thermal Engineering */}
                <div className="mtech-program-card">
                    <div className="program-header">
                        <div className="header-content">
                            <div className="program-icon">
                                <i className="fas fa-thermometer-half"></i>
                            </div>
                            <div className="program-title">
                                <h3>M.Tech Thermal Engineering</h3>
                                <p>Heat Transfer & Energy Systems</p>
                            </div>
                        </div>
                        <div className="program-badge">Mechanical Engineering</div>
                    </div>
                    <div className="program-content">
                        <div className="program-description">
                            <p>Advanced study of thermal systems, computational fluid dynamics, and renewable energy technologies.</p>
                        </div>
                        <div className="syllabus-section">
                            <h4><i className="fas fa-book"></i> Syllabus Downloads</h4>
                            <div className="semester-grid">
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-thermal-sem1.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 1-2</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-thermal-sem3.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 3-4</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Power System & Automation */}
                <div className="mtech-program-card">
                    <div className="program-header">
                        <div className="header-content">
                            <div className="program-icon">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <div className="program-title">
                                <h3>M.Tech Power System & Automation</h3>
                                <p>Smart Grid & Energy Management</p>
                            </div>
                        </div>
                        <div className="program-badge">Electrical Engineering</div>
                    </div>
                    <div className="program-content">
                        <div className="program-description">
                            <p>Cutting-edge program in smart grid technologies, power system protection, and industrial automation.</p>
                        </div>
                        <div className="syllabus-section">
                            <h4><i className="fas fa-book"></i> Syllabus Downloads</h4>
                            <div className="semester-grid">
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-power-sem1.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 1-2</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-power-sem3.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 3-4</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Digital Communication */}
                <div className="mtech-program-card">
                    <div className="program-header">
                        <div className="header-content">
                            <div className="program-icon">
                                <i className="fas fa-wifi"></i>
                            </div>
                            <div className="program-title">
                                <h3>M.Tech Digital Communication</h3>
                                <p>Advanced Communication Systems</p>
                            </div>
                        </div>
                        <div className="program-badge">Electronics & Communication</div>
                    </div>
                    <div className="program-content">
                        <div className="program-description">
                            <p>Comprehensive study of digital signal processing, wireless communication, and 5G technologies.</p>
                        </div>
                        <div className="syllabus-section">
                            <h4><i className="fas fa-book"></i> Syllabus Downloads</h4>
                            <div className="semester-grid">
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-digital-sem1.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 1-2</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-digital-sem3.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 3-4</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IoT & Sensor Systems */}
                <div className="mtech-program-card">
                    <div className="program-header">
                        <div className="header-content">
                            <div className="program-icon">
                                <i className="fas fa-network-wired"></i>
                            </div>
                            <div className="program-title">
                                <h3>M.Tech IoT & Sensor Systems</h3>
                                <p>Internet of Things & Smart Systems</p>
                            </div>
                        </div>
                        <div className="program-badge">Electronics & Computer Science</div>
                    </div>
                    <div className="program-content">
                        <div className="program-description">
                            <p>Innovative program covering IoT architecture, sensor networks, and smart city technologies.</p>
                        </div>
                        <div className="syllabus-section">
                            <h4><i className="fas fa-book"></i> Syllabus Downloads</h4>
                            <div className="semester-grid">
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-iot-sem1.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 1-2</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                                <a href="https://vikramuniv.ac.in/uploads/syllabus/mtech-iot-sem3.pdf" target="_blank" className="semester-card">
                                    <div className="semester-info">
                                        <i className="fas fa-file-pdf"></i>
                                        <span>Semester 3-4</span>
                                    </div>
                                    <div className="download-icon">
                                        <i className="fas fa-download"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mtech-footer-info">
                <div className="info-card">
                    <i className="fas fa-info-circle"></i>
                    <div className="info-content">
                        <h4>Program Information</h4>
                        <p>All M.Tech programs are 2-year full-time courses with research components. Admission is based on GATE scores or university entrance examination.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    
        </>
    );
}
