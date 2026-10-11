import React, { useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import SubNav from '../components/SubNav';
import SectionHeader from '../components/SectionHeader';
import StatsStrip from '../components/StatsStrip';
import Card from '../components/Card';
import Button from '../components/Button';

const BREADCRUMBS = [
    { label: 'Home', to: '/' },
    { label: 'Academics', to: null },
];

const SUBNAV_ITEMS = [
    { id: 'programs-overview', label: 'Overview' },
    { id: 'btech-programs', label: 'B.Tech' },
    { id: 'mtech-programs', label: 'M.Tech' },
    { id: 'mtech-working-professionals', label: 'Working Professionals' },
    { id: 'diploma-programs', label: 'Diploma' },
    { id: 'admission-info', label: 'Admission' },
];

const OVERVIEW_STATS = [
    {
        id: 'dept',
        target: 6,
        suffix: '',
        label: 'Engineering Departments',
        icon: 'fas fa-building',
        ariaLabel: '6 Engineering Departments'
    },
    {
        id: 'courses',
        target: 15,
        suffix: '+',
        label: 'Specialized Courses',
        icon: 'fas fa-graduation-cap',
        ariaLabel: '15 plus Specialized Courses'
    },
    {
        id: 'students',
        target: 2000,
        suffix: '+',
        label: 'Students Enrolled',
        icon: 'fas fa-users',
        ariaLabel: '2000 plus Students Enrolled'
    }
];

const BTECH_PROGRAMS = [
    {
        title: 'Civil Engineering',
        icon: 'fas fa-building',
        description: 'Structural design, construction management, environmental engineering, and infrastructure development.',
        duration: '4 Years',
        intake: '54',
    },
    {
        title: 'Mechanical Engineering',
        icon: 'fas fa-cogs',
        description: 'Design, manufacturing, thermal systems, and automation.',
        duration: '4 Years',
        intake: '54',
    },
    {
        title: 'Electrical Engineering',
        icon: 'fas fa-bolt',
        description: 'Power systems, electrical machines, and control systems.',
        duration: '4 Years',
        intake: '54',
    },
    {
        title: 'Electronics & Communication',
        icon: 'fas fa-microchip',
        description: 'Digital systems, communication networks, and VLSI design.',
        duration: '4 Years',
        intake: '54',
    },
    {
        title: 'Electronics & Computer Science',
        icon: 'fas fa-laptop-code',
        description: 'Programming, AI, ML, and embedded systems.',
        duration: '4 Years',
        intake: '54',
    },
    {
        title: 'Agricultural Engineering',
        icon: 'fas fa-seedling',
        description: 'Farm machinery, irrigation, and food processing.',
        duration: '4 Years',
        intake: '30',
    },
    {
        title: 'Computer Science & Business System',
        icon: 'fas fa-briefcase',
        description: 'Bridging the gap between computer science and business requirements.',
        duration: '4 Years',
        intake: '30',
    },
    {
        title: 'CSE (AI & Machine Learning)',
        icon: 'fas fa-brain',
        description: 'Focused on Artificial Intelligence and Machine Learning technologies.',
        duration: '4 Years',
        intake: '30',
    },
    {
        title: 'Dairy Technology',
        icon: 'fas fa-cheese',
        description: 'Production, processing, and management of dairy products.',
        duration: '4 Years',
        intake: '30',
    },
];

const MTECH_PROGRAMS = [
    { title: 'Digital Communication', icon: 'fas fa-microchip' },
    { title: 'Thermal Engineering', icon: 'fas fa-thermometer-half' },
    { title: 'Power System and Automation', icon: 'fas fa-bolt' },
    { title: 'Energy Technology', icon: 'fas fa-leaf' },
    { title: 'IoT and Sensor Systems', icon: 'fas fa-network-wired' },
    { title: 'Cloud Computing', icon: 'fas fa-cloud' },
    { title: 'Artificial Intelligence and Data Science', icon: 'fas fa-brain' },
    { title: 'Structural Engineering', icon: 'fas fa-building' },
    { title: 'Construction Planning Management', icon: 'fas fa-tasks' },
    { title: 'Environmental Engineering', icon: 'fas fa-recycle' },
];

const WORKING_PROFESSIONALS_PROGRAMS = [
    { title: 'Structural Engineering', icon: 'fas fa-building' },
    { title: 'Thermal Engineering', icon: 'fas fa-thermometer-half' },
    { title: 'Power System and Automation', icon: 'fas fa-bolt' },
];

const DIPLOMA_PROGRAMS = [
    { title: 'Civil Engineering', icon: 'fas fa-building' },
    { title: 'Computer Science & Engineering', icon: 'fas fa-laptop-code' },
    { title: 'Electrical Engineering', icon: 'fas fa-bolt' },
    { title: 'Electronics & Communication Engineering', icon: 'fas fa-microchip' },
    { title: 'Mechanical Engineering', icon: 'fas fa-cogs' },
];

const ADMISSION_STEPS = [
    {
        number: 1,
        title: 'Online Application',
        description: 'Submit your application through the university portal',
    },
    {
        number: 2,
        title: 'Entrance Examination',
        description: 'Appear for the engineering entrance exam',
    },
    {
        number: 3,
        title: 'Counseling',
        description: 'Participate in the counseling and seat allocation process',
    },
    {
        number: 4,
        title: 'Admission Confirmation',
        description: 'Complete documentation and fee payment',
    },
];

const ELIGIBILITY_BTECH = [
    '12th Pass with Physics, Chemistry, Mathematics',
    'Minimum 45% marks (40% for reserved categories)',
    'Valid entrance exam score (JEE Main/State CET)',
];

const ELIGIBILITY_MTECH = [
    'B.Tech/B.E. in relevant discipline',
    'Minimum 50% marks (45% for reserved categories)',
    'Valid GATE score preferred',
];

export default function Academics() {
    useEffect(() => {
        document.title = "Academics - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <>
            {/* Page Banner */}
            <PageBanner
                title="Academic Programs"
                subtitle="Comprehensive Engineering Education for Tomorrow's Leaders"
                breadcrumbs={BREADCRUMBS}
            />

            {/* In-page sticky sub-navigation */}
            <SubNav items={SUBNAV_ITEMS} />

            {/* Our Engineering Programs (Overview) */}
            <section
                id="programs-overview"
                className="academics-overview-section academics-section-target reveal-fade-up"
                aria-labelledby="heading-programs-overview"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="ACADEMIC EXCELLENCE"
                        title="Our Engineering Programs"
                        subtitle="World-class education across multiple engineering disciplines"
                        id="heading-programs-overview"
                    />
                    <div className="academics-overview-grid">
                        <div className="academics-overview-left">
                            <p className="academics-overview-text">
                                SoET offers comprehensive undergraduate and postgraduate programs in various engineering disciplines. Our curriculum is designed to meet industry standards while fostering innovation and research capabilities among students.
                            </p>
                            <StatsStrip
                                items={OVERVIEW_STATS}
                                overlap={false}
                                className="stats-strip-inline"
                                ariaLabel="SoET Academic Key Statistics"
                            />
                        </div>
                        <div className="academics-overview-right">
                            <div className="academics-image-wrapper">
                                <div className="academics-image-backdrop" aria-hidden="true" />
                                <div className="academics-image-frame">
                                    <img
                                        src="/assets/images/College Pics/College/IMG-20241226-WA0010.jpg"
                                        alt="Academic Excellence - SoET Engineering Campus"
                                        className="academics-campus-img"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Undergraduate Programs (B.Tech) */}
            <section
                id="btech-programs"
                className="academics-btech-section academics-section-target reveal-fade-up"
                aria-labelledby="heading-btech-programs"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="UNDERGRADUATE STUDIES"
                        title="Undergraduate Programs (B.Tech)"
                        subtitle="Four-year Bachelor of Technology programs"
                        id="heading-btech-programs"
                    />
                    <div className="btech-programs-grid">
                        {BTECH_PROGRAMS.map((prog, idx) => (
                            <Card
                                key={idx}
                                padding="default"
                                className="program-card-btech"
                            >
                                <div className="program-card-header">
                                    <div className="program-icon-circle-btech" aria-hidden="true">
                                        <i className={prog.icon}></i>
                                    </div>
                                    <h3 className="program-title-btech">{prog.title}</h3>
                                </div>
                                <p className="program-desc-btech">{prog.description}</p>
                                <div className="program-card-footer">
                                    <div className="program-meta-row">
                                        <span className="program-meta-chip">
                                            <i className="fas fa-clock" aria-hidden="true"></i>
                                            Duration: {prog.duration}
                                        </span>
                                        <span className="program-meta-chip">
                                            <i className="fas fa-users" aria-hidden="true"></i>
                                            Intake: {prog.intake}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            {/* Postgraduate Programs (M.Tech) */}
            <section
                id="mtech-programs"
                className="academics-mtech-section academics-section-target reveal-fade-up"
                aria-labelledby="heading-mtech-programs"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="POSTGRADUATE STUDIES"
                        title="Postgraduate Programs (M.Tech)"
                        subtitle="Two-year Master of Technology programs for advanced technical expertise (Intake: 18 each)"
                        id="heading-mtech-programs"
                        dark={true}
                    />
                    <div className="mtech-programs-grid">
                        {MTECH_PROGRAMS.map((prog, idx) => (
                            <Card
                                key={idx}
                                variant="glass"
                                padding="default"
                                className="program-tile program-tile-dark"
                            >
                                <div className="program-tile-icon-dark" aria-hidden="true">
                                    <i className={prog.icon}></i>
                                </div>
                                <h3 className="program-tile-title-dark">{prog.title}</h3>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* M.Tech for Working Professionals */}
            <section
                id="mtech-working-professionals"
                className="academics-wp-section academics-section-target reveal-fade-up"
                aria-labelledby="heading-mtech-wp"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="CONTINUING EDUCATION"
                        title="M.Tech for Working Professionals"
                        subtitle="Advanced programs tailored for industry professionals"
                        id="heading-mtech-wp"
                    />
                    <div className="wp-programs-grid">
                        {WORKING_PROFESSIONALS_PROGRAMS.map((prog, idx) => (
                            <Card
                                key={idx}
                                padding="default"
                                className="program-tile program-tile-light"
                            >
                                <div className="program-tile-icon-light" aria-hidden="true">
                                    <i className={prog.icon}></i>
                                </div>
                                <h3 className="program-tile-title-light">{prog.title}</h3>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Diploma in Engineering */}
            <section
                id="diploma-programs"
                className="academics-diploma-section academics-section-target reveal-fade-up"
                aria-labelledby="heading-diploma-programs"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="TECHNICAL DIPLOMA"
                        title="Diploma in Engineering"
                        subtitle="New Diploma courses (Intake: 30 each)"
                        id="heading-diploma-programs"
                    />
                    <div className="diploma-programs-flex">
                        {DIPLOMA_PROGRAMS.map((prog, idx) => (
                            <Card
                                key={idx}
                                padding="default"
                                className="program-tile program-tile-light"
                            >
                                <div className="program-tile-icon-light" aria-hidden="true">
                                    <i className={prog.icon}></i>
                                </div>
                                <h3 className="program-tile-title-light">{prog.title}</h3>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Admission Information */}
            <section
                id="admission-info"
                className="academics-admission-section academics-section-target reveal-fade-up"
                aria-labelledby="heading-admission-info"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="ENROLLMENT & ADMISSIONS"
                        title="Admission Information"
                        subtitle="Your pathway to engineering excellence"
                        id="heading-admission-info"
                    />
                    <div className="admission-cards-grid">
                        {/* Admission Process Card */}
                        <Card padding="featured" className="admission-info-card">
                            <h3 className="admission-card-title">Admission Process</h3>
                            <div className="admission-stepper">
                                {ADMISSION_STEPS.map((step, idx) => (
                                    <div key={step.number} className="stepper-step">
                                        <div className="stepper-marker-col">
                                            <div className="stepper-number-circle" aria-label={`Step ${step.number}`}>
                                                {step.number}
                                            </div>
                                            {idx < ADMISSION_STEPS.length - 1 && (
                                                <div className="stepper-connector-line" aria-hidden="true" />
                                            )}
                                        </div>
                                        <div className="stepper-content">
                                            <h4 className="stepper-step-title">{step.title}</h4>
                                            <p className="stepper-step-desc">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Eligibility Criteria Card */}
                        <Card padding="featured" className="admission-info-card">
                            <h3 className="admission-card-title">Eligibility Criteria</h3>
                            <div className="eligibility-groups">
                                <div className="eligibility-group">
                                    <div className="eligibility-chip">For B.Tech Programs</div>
                                    <ul className="eligibility-checklist">
                                        {ELIGIBILITY_BTECH.map((item, idx) => (
                                            <li key={idx} className="eligibility-check-item">
                                                <span className="check-icon-circle" aria-hidden="true">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                                <span className="eligibility-item-text">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <hr className="eligibility-divider" aria-hidden="true" />

                                <div className="eligibility-group">
                                    <div className="eligibility-chip">For M.Tech Programs</div>
                                    <ul className="eligibility-checklist">
                                        {ELIGIBILITY_MTECH.map((item, idx) => (
                                            <li key={idx} className="eligibility-check-item">
                                                <span className="check-icon-circle" aria-hidden="true">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                                <span className="eligibility-item-text">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Primary CTA Button */}
                    <div className="admission-cta-container">
                        <Button
                            href="https://vikram.mponline.gov.in/Portal/Services/VIKRAM/Entrance/UTD/Admission_Entrance_Form.aspx"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="default"
                            icon={<i className="fas fa-arrow-right"></i>}
                            iconPosition="right"
                            ariaLabel="Apply for Admission on University Portal"
                        >
                            Apply for Admission
                        </Button>
                    </div>
                </div>
            </section>

    {/* Footer */}
    
        </>
    );
}
