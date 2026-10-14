import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import '../styles/syllabus.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BREADCRUMBS = [
    { label: 'Home', to: '/' },
    { label: 'Syllabus', to: null }
];

const DEPARTMENTS = [
    { id: 'all', label: 'All Departments' },
    { id: 'cse', label: 'Electronics & Computer Science' },
    { id: 'mechanical', label: 'Mechanical' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'civil', label: 'Civil' },
    { id: 'electronics', label: 'Electronics & Comm.' },
    { id: 'agricultural', label: 'Agricultural' },
    { id: 'mtech', label: 'Postgraduate (M.Tech)' }
];

const BTECH_SYLLABI = [
    {
        deptId: 'cse',
        title: 'Electronics & Computer Science',
        program: 'B.Tech',
        icon: 'fas fa-laptop-code',
        semesters: [
            { name: '1st Year (Common)', url: 'https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link' },
            { name: '3rd Semester', url: 'https://drive.google.com/file/d/13QGanvFARUQ2BB-QhrYwtU3gjCvMxr_I/view?usp=drive_link' },
            { name: '4th Semester', url: 'https://drive.google.com/file/d/1-l9jHprtHbf1EnPjDSeawAvUzJg2ztOc/view?usp=drive_link' },
            { name: '5th Semester', url: 'https://drive.google.com/file/d/1yN9lYTEITx5EQfeasm08N1jvpk5hHfii/view?usp=drive_link' },
            { name: '6th Semester', url: 'https://drive.google.com/file/d/1yMuJLiadlAv9RdhUhcLpwNRHRMRQMjWw/view?usp=drive_link' },
        ]
    },
    {
        deptId: 'mechanical',
        title: 'Mechanical Engineering',
        program: 'B.Tech',
        icon: 'fas fa-cogs',
        semesters: [
            { name: '1st Year (Common)', url: 'https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link' },
            { name: '3rd Semester', url: 'https://drive.google.com/file/d/1BS2b-X7fiRTQlbdusS6fH34-yPTbBtI0/view?usp=drive_link' },
            { name: '4th Semester', url: 'https://drive.google.com/file/d/1C50N1eAW9TD1kCnwxfE4LkS738KxbrA1/view?usp=drive_link' },
            { name: '5th Semester', url: 'https://drive.google.com/file/d/1G_bP2cGglf_vKLEmcV4lsyJlzgGDMsFv/view?usp=drive_link' },
            { name: '6th Semester', url: 'https://drive.google.com/file/d/1BGe5xjowv32Gj20hr8BdiXpMEfjmRbgZ/view?usp=drive_link' },
        ]
    },
    {
        deptId: 'electrical',
        title: 'Electrical Engineering',
        program: 'B.Tech',
        icon: 'fas fa-bolt',
        semesters: [
            { name: '1st Year (Common)', url: 'https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link' },
            { name: '3rd Semester', url: 'https://drive.google.com/file/d/1m8clAaRYgnfDXfjvZm-o3-YTtGXRxEk_/view?usp=drive_link' },
            { name: '4th Semester', url: 'https://drive.google.com/file/d/1pKG-DP5PMLvMMucV-_Z5ujV2loLFTyNj/view?usp=drive_link' },
            { name: '5th Semester', url: 'https://drive.google.com/file/d/147MYfYu_jYHBbmu0nnb4mobLdQQuzlC9/view?usp=drive_link' },
            { name: '6th Semester', url: 'https://drive.google.com/file/d/1I5eyOemd6RyVtLxnDochKEDHv2pYrx24/view?usp=drive_link' },
        ]
    },
    {
        deptId: 'civil',
        title: 'Civil Engineering',
        program: 'B.Tech',
        icon: 'fas fa-building',
        semesters: [
            { name: '1st Year (Common)', url: 'https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link' },
            { name: '3rd Semester', url: 'https://drive.google.com/file/d/1FJfQcs4wiJhO21NH46EDs2gynC3YQGYy/view?usp=drive_link' },
            { name: '4th Semester', url: 'https://drive.google.com/file/d/1WfF7YHIDUiKhHAD44QYTNy6o53uaV0qB/view?usp=drive_link' },
            { name: '5th Semester', url: 'https://drive.google.com/file/d/1A4JCwab6I6yVQjNwfGsugOU0g_ZqlUdc/view?usp=drive_link' },
            { name: '6th Semester', url: 'https://drive.google.com/file/d/12DsY2KmnGu0o80a2Bva3rDvq4E4y7vAA/view?usp=drive_link' },
        ]
    },
    {
        deptId: 'electronics',
        title: 'Electronics & Communication',
        program: 'B.Tech',
        icon: 'fas fa-microchip',
        semesters: [
            { name: '1st Year (Common)', url: 'https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link' },
            { name: '3rd Semester', url: 'https://drive.google.com/file/d/1dMt_7zw5YtTm-A2X5RMsQLn2aVr8jow5/view?usp=drive_link' },
            { name: '4th Semester', url: 'https://drive.google.com/file/d/1VJhglzBEhfkWrksUql5fMyAzAQqHKWWa/view?usp=drive_link' },
            { name: '5th Semester', url: 'https://drive.google.com/file/d/1sIs9PywHjXpebCoTICyyuDFWiusn_p_j/view?usp=drive_link' },
            { name: '6th Semester', url: 'https://drive.google.com/file/d/13ZA5DD751VkwPYX8SMpczPeuR-IkAMBk/view?usp=drive_link' },
        ]
    },
    {
        deptId: 'agricultural',
        title: 'Agricultural Engineering',
        program: 'B.Tech',
        icon: 'fas fa-seedling',
        semesters: [
            { name: '1st Year (Common)', url: 'https://drive.google.com/file/d/14dBkEfirmKVeEAVfGV_TuNS4q8tzlhn9/view?usp=drive_link' },
            { name: 'Other Semesters - Coming Soon', url: null }
        ]
    }
];

const MTECH_SYLLABI = [
    {
        title: 'M.Tech Structural Engineering',
        subtitle: 'Advanced Structural Analysis & Design',
        dept: 'Civil Engineering',
        icon: 'fas fa-building',
        description: 'Specialized program focusing on advanced structural analysis, earthquake engineering, and modern construction technologies.',
        semesters: [
            { name: 'Semester 1-2', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-structural-sem1.pdf' },
            { name: 'Semester 3-4', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-structural-sem3.pdf' }
        ]
    },
    {
        title: 'M.Tech Thermal Engineering',
        subtitle: 'Advanced Thermodynamics & Energy Systems',
        dept: 'Mechanical Engineering',
        icon: 'fas fa-thermometer-half',
        description: 'Advanced studies in heat transfer, computational fluid dynamics, renewable energy systems, and thermal power plants.',
        semesters: [
            { name: 'Semester 1-2', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-thermal-sem1.pdf' },
            { name: 'Semester 3-4', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-thermal-sem3.pdf' }
        ]
    },
    {
        title: 'M.Tech Power System & Automation',
        subtitle: 'Smart Grid & Energy Management',
        dept: 'Electrical Engineering',
        icon: 'fas fa-bolt',
        description: 'Cutting-edge program in smart grid technologies, power system protection, and industrial automation.',
        semesters: [
            { name: 'Semester 1-2', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-power-sem1.pdf' },
            { name: 'Semester 3-4', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-power-sem3.pdf' }
        ]
    },
    {
        title: 'M.Tech Digital Communication',
        subtitle: 'Advanced Communication Systems',
        dept: 'Electronics & Communication',
        icon: 'fas fa-wifi',
        description: 'Comprehensive study of digital signal processing, wireless communication, and 5G technologies.',
        semesters: [
            { name: 'Semester 1-2', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-digital-sem1.pdf' },
            { name: 'Semester 3-4', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-digital-sem3.pdf' }
        ]
    },
    {
        title: 'M.Tech IoT & Sensor Systems',
        subtitle: 'Internet of Things & Smart Systems',
        dept: 'Electronics & Computer Science',
        icon: 'fas fa-network-wired',
        description: 'Innovative program covering IoT architecture, sensor networks, and smart city technologies.',
        semesters: [
            { name: 'Semester 1-2', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-iot-sem1.pdf' },
            { name: 'Semester 3-4', url: 'https://vikramuniv.ac.in/uploads/syllabus/mtech-iot-sem3.pdf' }
        ]
    }
];

const ACADEMIC_RESOURCES = [
    {
        title: 'Academic Calendar',
        icon: 'fas fa-calendar-alt',
        desc: 'Important semester dates, schedule of teaching classes, mid-term tests, and examination windows.',
        action: 'View Calendar',
        url: 'https://vikramuniv.ac.in/academic-calendar/'
    },
    {
        title: 'Examination Results',
        icon: 'fas fa-file-alt',
        desc: 'Check semester end examination announcements, grade lists, and official notification documents.',
        action: 'Check Results',
        url: 'https://vikramuniv.ac.in/results/'
    },
    {
        title: 'Course Regulations',
        icon: 'fas fa-book',
        desc: 'Academic guidelines, university ordinance, minimum passing criteria, and attendance rules.',
        action: 'View Regulations',
        url: 'https://vikramuniv.ac.in/regulations/'
    },
    {
        title: 'Credit System (CBCS)',
        icon: 'fas fa-graduation-cap',
        desc: 'Choice Based Credit System grading scheme, credit distribution, and CGPA evaluation structure.',
        action: 'Learn More',
        url: 'https://vikramuniv.ac.in/credit-system/'
    }
];

export default function Syllabus() {
    const { user } = useAuth();
    const [selectedDept, setSelectedDept] = useState('all');
    const [dynamicSyllabi, setDynamicSyllabi] = useState([]);

    useEffect(() => {
        document.title = "Syllabus - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    // If user is authenticated, attempt to fetch any dynamic uploads without breaking public visitors
    useEffect(() => {
        if (user) {
            axios.get(`${API_URL}/api/syllabus`, { withCredentials: true })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setDynamicSyllabi(res.data);
                    }
                })
                .catch(() => {
                    // Fail silently for public viewing
                });
        }
    }, [user]);

    const filteredBTech = selectedDept === 'all'
        ? BTECH_SYLLABI
        : selectedDept === 'mtech'
            ? []
            : BTECH_SYLLABI.filter(item => item.deptId === selectedDept);

    const showMTech = selectedDept === 'all' || selectedDept === 'mtech';

    const getDeptCount = (deptId) => {
        if (deptId === 'all') return BTECH_SYLLABI.length + MTECH_SYLLABI.length;
        if (deptId === 'mtech') return MTECH_SYLLABI.length;
        return BTECH_SYLLABI.filter(b => b.deptId === deptId).length;
    };

    return (
        <>
            <PageBanner
                title="Academic Syllabus"
                subtitle="Comprehensive curriculum, semester structures, and syllabus downloads for all engineering programs"
                breadcrumbs={BREADCRUMBS}
            />

            {/* Undergraduate (B.Tech) Curriculum Section */}
            <section className="syllabus-btech-section" id="syllabus-content" aria-labelledby="btech-heading">
                <div className="container">
                    <SectionHeader
                        eyebrow="UNDERGRADUATE CURRICULUM"
                        title="Bachelor of Technology (B.Tech) Syllabi"
                        subtitle="Semester-wise curricula, course schemes, and laboratory syllabus files designed in accordance with AICTE model curriculum and CBCS standards."
                        align="left"
                        id="btech-heading"
                    />

                    {/* Department Filter Toolbar */}
                    <Card className="syllabus-toolbar-card" role="region" aria-label="Department filter toolbar">
                        <div className="syllabus-toolbar-inner">
                            <span className="syllabus-toolbar-label">
                                <i className="fas fa-filter" aria-hidden="true"></i> Filter by Department:
                            </span>
                            <div className="syllabus-toolbar-chips" role="group" aria-label="Department filter buttons">
                                {DEPARTMENTS.map(dept => {
                                    const count = getDeptCount(dept.id);
                                    return (
                                        <button
                                            key={dept.id}
                                            type="button"
                                            className={`syllabus-chip ${selectedDept === dept.id ? 'active' : ''}`}
                                            onClick={() => setSelectedDept(dept.id)}
                                            aria-pressed={selectedDept === dept.id}
                                        >
                                            <span>{dept.label}</span>
                                            <span className="syllabus-chip-count">{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </Card>

                    {/* Dynamic Logged-in Branch Syllabus (if available) */}
                    {user && dynamicSyllabi.length > 0 && (
                        <div style={{ marginBottom: '36px' }}>
                            <Card className="dynamic-syllabus-banner" style={{ borderLeft: '4px solid var(--maroon-700)', padding: '24px', backgroundColor: 'var(--cream-50)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                    <div className="syllabus-icon-circle">
                                        <i className="fas fa-graduation-cap" aria-hidden="true"></i>
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, color: 'var(--indigo-900)', fontSize: '20px', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                                            My Uploaded Course Syllabus ({user.branch?.name || 'Assigned Branch'})
                                        </h3>
                                        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '14px' }}>
                                            Latest syllabus files uploaded by your department faculty
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                                    {dynamicSyllabi.map(item => (
                                        <div key={item._id} style={{ background: '#fff', border: '1px solid rgba(30,23,96,0.1)', borderRadius: '12px', padding: '16px' }}>
                                            <div style={{ fontWeight: 700, color: 'var(--indigo-900)' }}>{item.subjectName}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0' }}>Code: {item.subjectCode} | Sem {item.semester}</div>
                                            {item.file && (
                                                <a 
                                                    href={`${API_URL}${item.file}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--maroon-700)', fontWeight: 600, textDecoration: 'none', marginTop: '8px' }}
                                                >
                                                    <i className="fas fa-file-pdf"></i> Download PDF
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* B.Tech Syllabus Grid */}
                    {filteredBTech.length > 0 && (
                        <div className="syllabus-grid">
                            {filteredBTech.map(dept => (
                                <Card key={dept.deptId} className="syllabus-program-card" data-dept={dept.deptId}>
                                    <div className="syllabus-card-header">
                                        <div className="syllabus-icon-circle" aria-hidden="true">
                                            <i className={dept.icon}></i>
                                        </div>
                                        <div className="syllabus-card-title-wrap">
                                            <div className="syllabus-card-badges">
                                                <span className="syllabus-program-badge">{dept.program}</span>
                                                <span className="syllabus-dept-badge">{dept.deptId.toUpperCase()}</span>
                                            </div>
                                            <h3 className="syllabus-card-title">{dept.title}</h3>
                                            <p className="syllabus-card-subtitle">4-Year Degree &bull; 8 Semesters</p>
                                        </div>
                                    </div>
                                    <p className="syllabus-card-desc">
                                        Full curriculum framework, semester course modules, theory subjects, and laboratory schemes approved by Vikram University.
                                    </p>
                                    <div className="syllabus-downloads-wrap">
                                        <div className="syllabus-downloads-label">
                                            <i className="fas fa-file-pdf" aria-hidden="true"></i>
                                            <span>Semester Documents</span>
                                        </div>
                                        {dept.semesters.map((sem, sIdx) => sem.url ? (
                                            <a
                                                key={sIdx}
                                                href={sem.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="syllabus-download-row"
                                                title={`Download ${sem.name} for ${dept.title}`}
                                            >
                                                <div className="syllabus-download-left">
                                                    <i className="fas fa-file-pdf syllabus-pdf-icon" aria-hidden="true"></i>
                                                    <span className="syllabus-download-name">{sem.name}</span>
                                                </div>
                                                <span className="syllabus-download-action">
                                                    <i className="fas fa-arrow-down" aria-hidden="true"></i> PDF
                                                </span>
                                            </a>
                                        ) : (
                                            <div key={sIdx} className="syllabus-download-row disabled" aria-disabled="true">
                                                <div className="syllabus-download-left">
                                                    <i className="fas fa-clock syllabus-pdf-icon" aria-hidden="true"></i>
                                                    <span className="syllabus-download-name">{sem.name}</span>
                                                </div>
                                                <span className="syllabus-status-pill">Pending</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Postgraduate Programs (M.Tech) Section */}
            {showMTech && (
                <section className="syllabus-mtech-section" aria-labelledby="mtech-heading">
                    <div className="container">
                        <SectionHeader
                            eyebrow="POSTGRADUATE STUDIES"
                            title="Master of Technology (M.Tech) Syllabi"
                            subtitle="Advanced engineering curricula, research domains, and specialization schemes authorized by Vikram University Ujjain."
                            align="left"
                            id="mtech-heading"
                        />

                        {/* M.Tech Highlights Banner */}
                        <Card className="mtech-highlights-card">
                            <div className="mtech-highlights-inner">
                                <div className="mtech-highlights-text">
                                    <h3>Master of Technology Curriculum Architecture</h3>
                                    <p>
                                        Our M.Tech programs are designed to provide advanced technical knowledge and research competencies in specialized engineering domains, combining rigorous theory with dissertation research.
                                    </p>
                                </div>
                                <div className="mtech-highlights-pills">
                                    <div className="mtech-pill-item">
                                        <i className="fas fa-graduation-cap" aria-hidden="true"></i>
                                        <span>2-Year Full-Time</span>
                                    </div>
                                    <div className="mtech-pill-item">
                                        <i className="fas fa-microscope" aria-hidden="true"></i>
                                        <span>Research Focused</span>
                                    </div>
                                    <div className="mtech-pill-item">
                                        <i className="fas fa-industry" aria-hidden="true"></i>
                                        <span>Industry Aligned</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* M.Tech Programs Grid */}
                        <div className="syllabus-grid">
                            {MTECH_SYLLABI.map((prog, pIdx) => (
                                <Card key={pIdx} className="syllabus-program-card">
                                    <div className="syllabus-card-header">
                                        <div className="syllabus-icon-circle indigo-variant" aria-hidden="true">
                                            <i className={prog.icon}></i>
                                        </div>
                                        <div className="syllabus-card-title-wrap">
                                            <div className="syllabus-card-badges">
                                                <span className="syllabus-program-badge">M.Tech</span>
                                                <span className="syllabus-dept-badge">{prog.dept}</span>
                                            </div>
                                            <h3 className="syllabus-card-title">{prog.title}</h3>
                                            <p className="syllabus-card-subtitle">{prog.subtitle}</p>
                                        </div>
                                    </div>
                                    <p className="syllabus-card-desc">{prog.description}</p>
                                    <div className="syllabus-downloads-wrap">
                                        <div className="syllabus-downloads-label">
                                            <i className="fas fa-file-pdf" aria-hidden="true"></i>
                                            <span>Curriculum PDFs</span>
                                        </div>
                                        {prog.semesters.map((sem, sIdx) => (
                                            <a
                                                key={sIdx}
                                                href={sem.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="syllabus-download-row"
                                                title={`Download ${sem.name} for ${prog.title}`}
                                            >
                                                <div className="syllabus-download-left">
                                                    <i className="fas fa-file-pdf syllabus-pdf-icon" aria-hidden="true"></i>
                                                    <span className="syllabus-download-name">{sem.name}</span>
                                                </div>
                                                <span className="syllabus-download-action">
                                                    <i className="fas fa-arrow-down" aria-hidden="true"></i> PDF
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* University Academic Resources Section */}
            <section className="syllabus-resources-section" aria-labelledby="resources-heading">
                <div className="container">
                    <SectionHeader
                        eyebrow="ACADEMIC PORTALS"
                        title="University Academic Resources"
                        subtitle="Direct links to Vikram University examination schedules, academic calendar, ordinances, and grading notifications."
                        align="left"
                        id="resources-heading"
                    />
                    <div className="resources-grid">
                        {ACADEMIC_RESOURCES.map((res, idx) => (
                            <Card key={idx} className="syllabus-resource-card">
                                <div className="syllabus-resource-icon" aria-hidden="true">
                                    <i className={res.icon}></i>
                                </div>
                                <h3 className="syllabus-resource-title">{res.title}</h3>
                                <p className="syllabus-resource-desc">{res.desc}</p>
                                <div className="syllabus-resource-action">
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        href={res.url}
                                        target="_blank"
                                        icon="fas fa-external-link-alt"
                                        iconPosition="right"
                                    >
                                        {res.action}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
