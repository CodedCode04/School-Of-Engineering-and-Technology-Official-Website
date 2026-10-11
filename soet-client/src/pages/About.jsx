import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import SubNav from '../components/SubNav';
import SectionHeader from '../components/SectionHeader';
import FeatureCard from '../components/FeatureCard';
import Button from '../components/Button';
import StatsStrip from '../components/StatsStrip';
import Card from '../components/Card';

const SUBNAV_ITEMS = [
    { id: 'overview', label: 'Overview' },
    { id: 'journey', label: 'Our Journey' },
    { id: 'why-soet', label: 'Why SoET' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'research', label: 'Research' },
    { id: 'alumni', label: 'Alumni' },
];

const BREADCRUMBS = [
    { label: 'Home', to: '/' },
    { label: 'About', to: null },
];

const CORE_VALUES_DATA = [
    {
        icon: 'fas fa-graduation-cap',
        title: 'Quality Education',
        description: 'Dynamic knowledge and practical skills development'
    },
    {
        icon: 'fas fa-users-cog',
        title: 'Leadership',
        description: 'Developing quality leadership among students'
    },
    {
        icon: 'fas fa-hands-helping',
        title: 'Social Values',
        description: 'Instilling social and moral values'
    },
    {
        icon: 'fas fa-monument',
        title: 'National Heritage',
        description: 'Pride for national heritage and culture'
    },
    {
        icon: 'fas fa-trophy',
        title: 'Professional Excellence',
        description: 'Producing top quality technical professionals'
    }
];

const JOURNEY_DATA = [
    {
        year: '1957',
        title: 'Foundation',
        description: 'Samrat Vikramaditya Vishwavidyalaya was established, laying the foundation for engineering education in the region.'
    },
    {
        year: '1960s',
        title: 'Engineering Programs Launch',
        description: 'Introduction of core engineering disciplines including Civil, Mechanical, and Electrical Engineering.'
    },
    {
        year: '1990s',
        title: 'Technology Integration',
        description: 'Addition of Computer Science and Electronics programs to meet technological advancement.'
    },
    {
        year: '2000s',
        title: 'Modern Infrastructure',
        description: 'Development of state-of-the-art laboratories and research facilities.'
    },
    {
        year: '2020s',
        title: 'Digital Transformation',
        description: 'Integration of AI, IoT, and modern technologies in curriculum and research.'
    }
];

const WHY_CHOOSE_DATA = [
    {
        icon: 'fas fa-award',
        title: 'AICTE Approved',
        description: 'All our programs are approved by the All India Council for Technical Education (AICTE), ensuring quality and recognition.',
        tag: 'Nationally Recognized'
    },
    {
        icon: 'fas fa-graduation-cap',
        title: 'Quality Education',
        description: 'Industry-relevant curriculum designed to meet global engineering standards with practical learning approach.',
        tag: 'Global Standards'
    },
    {
        icon: 'fas fa-users',
        title: 'Experienced Faculty',
        description: '22 qualified professors and 7 dedicated staff members committed to student success and academic excellence.',
        tag: '30 Expert Team'
    },
    {
        icon: 'fas fa-flask',
        title: 'Research Focus',
        description: 'Strong emphasis on research and development in emerging technologies like AI, IoT, and renewable energy.',
        tag: 'Innovation Hub'
    },
    {
        icon: 'fas fa-handshake',
        title: 'Industry Partnerships',
        description: 'Collaborations with leading industries for internships, projects, and practical exposure to real-world challenges.',
        tag: '25+ Partners'
    },
    {
        icon: 'fas fa-cogs',
        title: 'Modern Infrastructure',
        description: 'State-of-the-art laboratories, well-equipped workshops, and modern facilities for comprehensive learning.',
        tag: 'Latest Technology'
    }
];

function getInitials(name) {
    if (!name) return 'ET';
    const cleaned = name.replace(/^(Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s+/gi, '').trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return cleaned.slice(0, 2).toUpperCase();
}

const DIRECTOR_DATA = {
    name: 'Prof. Dr. Sandeep Tiwari',
    role: 'Director, School of Engineering and Technology',
    desc: 'Leading SoET with over 25 years of distinguished experience in engineering education, mathematical modelling, and research excellence, guiding future innovators toward national development and technological self-reliance.'
};

const HODS_DATA = [
    {
        name: 'Prof. Ashish Suryavanshi',
        role: 'Head of Department',
        dept: 'Electronics and Computer Science',
        desc: 'Expert in AI and Machine Learning with numerous publications and patents.'
    },
    {
        name: 'Prof. Amit Thakur',
        role: 'Head of Department',
        dept: 'Electronics & Communication Engineering',
        desc: 'Specialist in communication systems, VLSI design, and embedded systems with 11 years experience.'
    },
    {
        name: 'Prof. Khemraj Bairagi',
        role: 'Head of Department',
        dept: 'Mechanical Engineering',
        desc: 'Specialist in advanced manufacturing and automation technologies.'
    },
    {
        name: 'Prof. Rajesh Chouhan',
        role: 'Head of Department',
        dept: 'Civil Engineering',
        desc: 'Expert in structural engineering and infrastructure development with extensive experience.'
    },
    {
        name: 'Prof. Raghunandan Bhagel',
        role: 'Head of Department',
        dept: 'Electrical Engineering',
        desc: 'Specialist in power systems and renewable energy technologies.'
    },
    {
        name: 'Prof. Dr. Sachin Sasodia',
        role: 'Head of Department',
        dept: 'Agricultural Engineering',
        desc: 'Expert in sustainable farming technologies and agricultural automation systems.'
    }
];

const FACULTY_STATS = [
    {
        id: 'pub',
        target: 150,
        suffix: '+',
        label: 'Research Publications',
        icon: 'fas fa-book-open',
        ariaLabel: 'Over 150 research publications'
    },
    {
        id: 'fac',
        target: 30,
        suffix: '',
        label: 'Faculty & Staff',
        icon: 'fas fa-chalkboard-teacher',
        ariaLabel: '30 faculty and staff members'
    },
    {
        id: 'prog',
        target: 11,
        suffix: '',
        label: 'Academic Programs',
        icon: 'fas fa-graduation-cap',
        ariaLabel: '11 academic programs'
    },
    {
        id: 'lib',
        target: 2500,
        suffix: '+',
        label: 'Library Books',
        icon: 'fas fa-book',
        ariaLabel: 'Over 2500 library books'
    }
];

const FACULTY_TABS = [
    { key: 'all', label: 'All Faculty' },
    { key: 'ece', label: 'Electronics & Communication' },
    { key: 'mechanical', label: 'Mechanical' },
    { key: 'civil', label: 'Civil' },
    { key: 'electrical', label: 'Electrical' },
    { key: 'others', label: 'Sciences & Others' },
];

const FACULTY_MEMBERS_DATA = [
    {
        id: 'fac-director',
        name: 'Dr. S. K. Tiwari',
        designation: 'Director',
        department: 'Institute Administration & Mathematical Modelling',
        deptKey: 'others',
        qualification: 'Ph.D. in Mathematical Modelling',
        experience: '25 Years Experience',
        contact: '9424958805',
        isDirector: true
    },
    {
        id: 'fac-ece-1',
        name: 'Mr. Amit Thakur',
        department: 'Electronics & Communication',
        deptKey: 'ece',
        qualification: 'M.Tech',
        experience: '11 Years Experience',
        contact: '9993741159'
    },
    {
        id: 'fac-ece-2',
        name: 'Mr. Ashish Suryavanshi',
        department: 'Electronics & Communication',
        deptKey: 'ece',
        qualification: 'M.Tech',
        experience: '8 Years Experience',
        contact: '9685583102'
    },
    {
        id: 'fac-ece-3',
        name: 'Ms. Kanchan Thool',
        department: 'Electronics & Communication',
        deptKey: 'ece',
        qualification: 'M.Tech',
        experience: '8 Years Experience',
        contact: '8982730277'
    },
    {
        id: 'fac-ece-4',
        name: 'Mr. Amit Marmat',
        department: 'Electronics & Communication',
        deptKey: 'ece',
        qualification: 'M.Tech',
        experience: '7 Years Experience',
        contact: '9981772520'
    },
    {
        id: 'fac-ece-5',
        name: 'Mr. Yogesh Patidar',
        department: 'Electronics & Communication',
        deptKey: 'ece',
        qualification: 'M.Tech',
        experience: '7 Years Experience',
        contact: '7566806353'
    },
    {
        id: 'fac-mech-1',
        name: 'Mr. Khemraj Beragi',
        department: 'Mechanical Engineering',
        deptKey: 'mechanical',
        qualification: 'M.Tech',
        experience: '7 Years Experience',
        contact: '7222926136'
    },
    {
        id: 'fac-mech-2',
        name: 'Mrs. Anjali Upadhyay',
        department: 'Mechanical Engineering',
        deptKey: 'mechanical',
        qualification: 'M.Tech',
        experience: '8 Years Experience',
        contact: '9826469362'
    },
    {
        id: 'fac-mech-3',
        name: 'Mr. Shivam Sharma',
        department: 'Mechanical Engineering',
        deptKey: 'mechanical',
        qualification: 'M.Tech',
        experience: '7 Years Experience',
        contact: '7909437291'
    },
    {
        id: 'fac-mech-4',
        name: 'Mr. Dwarika Prasad Jaiswal',
        department: 'Mechanical Engineering',
        deptKey: 'mechanical',
        qualification: 'M.Tech',
        experience: '7 Years Experience',
        contact: '8103098535'
    },
    {
        id: 'fac-civ-1',
        name: 'Mr. Rajesh Chouhan',
        department: 'Civil Engineering',
        deptKey: 'civil',
        qualification: 'M.Tech',
        experience: '9 Years Experience',
        contact: '9893295134'
    },
    {
        id: 'fac-civ-2',
        name: 'Mr. Sachin Sironiya',
        department: 'Civil Engineering',
        deptKey: 'civil',
        qualification: 'M.Tech',
        experience: '9 Years Experience',
        contact: '9179807955'
    },
    {
        id: 'fac-civ-3',
        name: 'Mr. Chetan Gurjar',
        department: 'Civil Engineering',
        deptKey: 'civil',
        qualification: 'M.Tech',
        experience: '7 Years Experience',
        contact: '9179246393'
    },
    {
        id: 'fac-civ-4',
        name: 'Mr. Mohit Prajapati',
        department: 'Civil Engineering',
        deptKey: 'civil',
        qualification: 'M.Tech',
        experience: '7 Years Experience',
        contact: '9039712959'
    },
    {
        id: 'fac-elec-1',
        name: 'Mrs. Neha Singh',
        department: 'Electrical Engineering',
        deptKey: 'electrical',
        qualification: 'M.Tech',
        experience: '9 Years Experience',
        contact: '9827836188'
    },
    {
        id: 'fac-elec-2',
        name: 'Mr. Raghunandan Singh Baghel',
        department: 'Electrical Engineering',
        deptKey: 'electrical',
        qualification: 'M.Tech',
        experience: '9 Years Experience',
        contact: '8839593759'
    },
    {
        id: 'fac-elec-3',
        name: 'Mr. Ritesh Nagar',
        department: 'Electrical Engineering',
        deptKey: 'electrical',
        qualification: 'M.Tech',
        experience: '8 Years Experience',
        contact: '9827906627'
    },
    {
        id: 'fac-elec-4',
        name: 'Mrs. Garima Solanki',
        department: 'Electrical Engineering',
        deptKey: 'electrical',
        qualification: 'M.Tech',
        experience: '11 Years Experience',
        contact: '9893277603'
    },
    {
        id: 'fac-oth-1',
        name: 'Mrs. Amrita Shukla',
        department: 'Environment',
        deptKey: 'others',
        qualification: 'M.Sc., M.Phil',
        experience: '15 Years Experience',
        contact: '9770797977'
    },
    {
        id: 'fac-oth-2',
        name: 'Mrs. Garima Saxena',
        department: 'Engineering Mathematics',
        deptKey: 'others',
        qualification: 'M.Sc.',
        experience: '9 Years Experience',
        contact: '6261814162'
    },
    {
        id: 'fac-oth-3',
        name: 'Mrs. Pratibha Saraf',
        department: 'Computer Science',
        deptKey: 'others',
        qualification: 'M.Tech',
        experience: '6 Years Experience',
        contact: '7024114848'
    }
];

const RESEARCH_AREAS_DATA = [
    {
        icon: 'fas fa-building',
        title: 'Structural Engineering',
        description: 'Advanced research in structural design and analysis.',
        tag: 'Civil Engg'
    },
    {
        icon: 'fas fa-solar-panel',
        title: 'Renewable Energy',
        description: 'Sustainable energy solutions and green technology.',
        tag: 'Clean Tech'
    },
    {
        icon: 'fas fa-bolt',
        title: 'Power System Automation',
        description: 'Smart grid and automated power systems.',
        tag: 'Electrical'
    },
    {
        icon: 'fas fa-wifi',
        title: 'Digital Communication',
        description: 'Advanced communication systems and protocols.',
        tag: 'Telecom'
    },
    {
        icon: 'fas fa-microchip',
        title: 'VLSI Design',
        description: 'Very Large Scale Integration and chip design.',
        tag: 'Semiconductor'
    },
    {
        icon: 'fas fa-network-wired',
        title: 'Wireless Sensor Networks',
        description: 'IoT and sensor network technologies.',
        tag: 'Networking'
    },
    {
        icon: 'fas fa-thermometer-half',
        title: 'Thermal Engineering',
        description: 'Heat transfer and thermal systems optimization.',
        tag: 'Mechanical'
    },
    {
        icon: 'fas fa-robot',
        title: 'IoT & Automation',
        description: 'Internet of Things and industrial automation.',
        tag: 'Automation'
    }
];

const ALUMNI_STATS = [
    {
        id: 'alumni-placements',
        target: 41,
        suffix: '+',
        label: 'Successful Placements',
        icon: 'fas fa-user-check',
        ariaLabel: 'Over 41 successful placements'
    },
    {
        id: 'alumni-companies',
        target: 35,
        suffix: '+',
        label: 'Top Companies',
        icon: 'fas fa-building',
        ariaLabel: 'Over 35 top recruiting companies'
    },
    {
        id: 'alumni-branches',
        target: 6,
        suffix: '',
        label: 'Engineering Branches',
        icon: 'fas fa-code-branch',
        ariaLabel: '6 engineering branches'
    },
    {
        id: 'alumni-ready',
        target: 100,
        suffix: '%',
        label: 'Industry Ready',
        icon: 'fas fa-award',
        ariaLabel: '100% industry ready curriculum'
    }
];

const NOTABLE_PLACEMENTS_DATA = [
    {
        name: 'Shantanu Nigam',
        branch: 'Electronics Engineering',
        company: 'Qualcomm Technologies Inc., Hyderabad',
        tag: 'Premium Placement'
    },
    {
        name: 'Vikas Rathore',
        branch: 'Electrical Engineering',
        company: 'H&R Johnson',
        tag: 'Corporate'
    },
    {
        name: 'Geetika Verma',
        branch: 'Electrical Engineering',
        company: 'BPCL',
        tag: 'PSU'
    },
    {
        name: 'Syed Danish Ali',
        branch: 'Civil Engineering',
        company: 'Indian Railways - Central Railways',
        tag: 'Government'
    },
    {
        name: 'Shubham Sachan',
        branch: 'Electronics Engineering',
        company: 'Wipro',
        tag: 'IT Sector'
    },
    {
        name: 'Ranveer Kumar',
        branch: 'Electronics Engineering',
        company: 'Hitachi',
        tag: 'MNC'
    }
];

const OTHER_COMPANIES_DATA = [
    'L&T Construction',
    'ICICI Bank',
    'HDFC Bank',
    "BYJU'S",
    'PwC',
    'Motherson Sumi',
    'UCO Bank',
    'LIC India',
    'Max Life Insurance',
    'ICICI Lombard'
];

const ALUMNI_STORIES_DATA = [
    {
        icon: 'fas fa-trophy',
        title: 'Industry Leaders',
        description: 'Our alumni hold leadership positions in top MNCs and Fortune 500 companies.'
    },
    {
        icon: 'fas fa-lightbulb',
        title: 'Innovators & Founders',
        description: 'Successful entrepreneurs and startup founders creating innovative solutions.'
    },
    {
        icon: 'fas fa-graduation-cap',
        title: 'Academicians & Researchers',
        description: 'Professors and researchers contributing to academic excellence globally.'
    },
    {
        icon: 'fas fa-hands-helping',
        title: 'Social Impact Champions',
        description: 'Alumni working towards social causes, nation building, and sustainable development.'
    }
];

export default function About() {
    const [selectedDept, setSelectedDept] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleFacultyCount, setVisibleFacultyCount] = useState(12);

    useEffect(() => {
        document.title = "About - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    const filteredFaculty = useMemo(() => {
        return FACULTY_MEMBERS_DATA.filter((member) => {
            const matchesDept = selectedDept === 'all' || member.deptKey === selectedDept;
            const query = searchQuery.trim().toLowerCase();
            const matchesSearch = !query ||
                member.name.toLowerCase().includes(query) ||
                member.department.toLowerCase().includes(query) ||
                (member.qualification && member.qualification.toLowerCase().includes(query));
            return matchesDept && matchesSearch;
        });
    }, [selectedDept, searchQuery]);

    const getTabCount = (key) => {
        if (key === 'all') return FACULTY_MEMBERS_DATA.length;
        return FACULTY_MEMBERS_DATA.filter(m => m.deptKey === key).length;
    };

    const handleDeptChange = (key) => {
        setSelectedDept(key);
        setVisibleFacultyCount(12);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setVisibleFacultyCount(12);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setVisibleFacultyCount(12);
    };

    const handleShowMore = () => {
        setVisibleFacultyCount(prev => prev + 12);
    };

    return (
        <>
            {/* Page Banner */}
            <PageBanner
                title="About SoET"
                subtitle="Building Tomorrow's Engineers Today"
                breadcrumbs={BREADCRUMBS}
            />

            {/* In-page sticky sub-navigation */}
            <SubNav items={SUBNAV_ITEMS} />

            {/* Overview Section */}
            <section id="overview" className="about-overview-section about-section-target" aria-labelledby="heading-legacy">
                <div className="container">
                    <SectionHeader
                        eyebrow="INSTITUTIONAL OVERVIEW"
                        title="Our Legacy"
                        subtitle="Pioneering excellence in engineering education and technical research since 2011"
                        id="heading-legacy"
                    />

                    <div className="overview-legacy-grid">
                        <div className="overview-legacy-text">
                            <p>
                                School of Engineering & Technology (SoET) is a University Teaching Department of Samrat Vikramaditya Vishwavidyalaya Ujjain established in 2011 under the faculty of Engineering. The institute provides technical education leading to the undergraduate degree of B.Tech. and the postgraduate degree of M.Tech.
                            </p>
                            <p>
                                The courses offered are sanctioned by the AICTE and the Department of Technical Education of the Government of Madhya Pradesh, and the institute is affiliated with Samrat Vikramaditya Vishwavidyalaya in Ujjain. We are committed to ensuring that each student emerges as a valuable asset to themselves, their families, the college, society, and the nation as a whole.
                            </p>
                            <div className="overview-badges-row">
                                <span className="overview-badge">
                                    <i className="fas fa-check-circle" aria-hidden="true" />
                                    AICTE Sanctioned
                                </span>
                                <span className="overview-badge">
                                    <i className="fas fa-check-circle" aria-hidden="true" />
                                    DTE Govt. of MP Approved
                                </span>
                                <span className="overview-badge">
                                    <i className="fas fa-check-circle" aria-hidden="true" />
                                    Established 2011
                                </span>
                            </div>
                        </div>

                        <div className="overview-image-wrapper">
                            <div className="overview-image-backdrop" aria-hidden="true" />
                            <div className="overview-image-frame">
                                <img
                                    src="/assets/images/College Pics/College/IMG-20241226-WA0009.jpg"
                                    alt="SoET Campus - School of Engineering and Technology Vikram University"
                                    loading="lazy"
                                    className="overview-campus-img"
                                />
                                <div className="overview-image-caption">
                                    <i className="fas fa-map-marker-alt" aria-hidden="true" />
                                    <span>SoET Campus - Where Innovation Meets Excellence since 2011</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vision & Mission Cards */}
                    <div className="overview-vm-grid">
                        <Card variant="vision" padding="featured" className="vm-card vm-card-vision">
                            <div className="vm-card-header">
                                <div className="vm-icon-circle" aria-hidden="true">
                                    <i className="fas fa-eye" />
                                </div>
                                <h3 className="vm-card-title">Our Vision</h3>
                            </div>
                            <p className="vm-card-text">
                                Basic philosophy of the Institute is to develop the technical culture through its programs by imparting the quality technical education of dynamic knowledge and practical skills to the students.
                            </p>
                        </Card>

                        <Card variant="mission" padding="featured" className="vm-card vm-card-mission">
                            <div className="vm-card-header">
                                <div className="vm-icon-circle" aria-hidden="true">
                                    <i className="fas fa-bullseye" />
                                </div>
                                <h3 className="vm-card-title">Our Mission</h3>
                            </div>
                            <p className="vm-card-text">
                                Institute will mainly emphasize towards personality of students to enter the engineering profession and to develop quality of leadership and provide the social and moral values and pride for national heritage. SoET endeavors to produce top quality of technical professionals and provide them right platform for building engineers to acquire the knowledge in leading edge industries.
                            </p>
                        </Card>
                    </div>

                    {/* Core Values */}
                    <div className="core-values-wrapper">
                        <SectionHeader
                            eyebrow="GUIDING PRINCIPLES"
                            title="Core Values"
                            subtitle="The institutional tenets underpinning academic culture, ethics, and innovation at SoET."
                            align="center"
                        />
                        <div className="values-cards-grid">
                            {CORE_VALUES_DATA.map((val, idx) => (
                                <Card key={idx} padding="default" className="value-card">
                                    <div className="value-card-icon" aria-hidden="true">
                                        <i className={val.icon} />
                                    </div>
                                    <h4 className="value-card-title">{val.title}</h4>
                                    <p className="value-card-desc">{val.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Journey (Timeline) */}
            <section id="journey" className="about-journey-section about-section-target" aria-labelledby="heading-journey">
                <div className="container">
                    <SectionHeader
                        eyebrow="HISTORICAL MILESTONES"
                        title="Our Journey"
                        subtitle="A Rich Heritage of Engineering Excellence"
                        align="center"
                        id="heading-journey"
                    />

                    <div className="journey-timeline-container">
                        <div className="journey-timeline-line" aria-hidden="true" />
                        {JOURNEY_DATA.map((item, idx) => {
                            const isLeft = idx % 2 === 0;
                            return (
                                <div key={idx} className={`journey-timeline-item ${isLeft ? 'item-left' : 'item-right'}`}>
                                    <div className="journey-timeline-node" aria-hidden="true" />
                                    <div className="journey-card">
                                        <div className="journey-card-header">
                                            <span className="timeline-year-chip">{item.year}</span>
                                            <h3 className="journey-card-title">{item.title}</h3>
                                        </div>
                                        <p className="journey-card-desc">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose SoET */}
            <section id="why-soet" className="about-why-section about-section-target" aria-labelledby="heading-why-soet">
                <div className="container">
                    <SectionHeader
                        eyebrow="THE SoET ADVANTAGE"
                        title="Why Choose SoET?"
                        subtitle="Excellence in Every Aspect of Engineering Education"
                        align="center"
                        id="heading-why-soet"
                    />

                    <div className="why-choose-grid">
                        {WHY_CHOOSE_DATA.map((item, idx) => (
                            <FeatureCard
                                key={idx}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                tag={item.tag}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section id="leadership" className="about-leadership-section about-section-target" aria-labelledby="heading-leadership">
                <div className="container">
                    <SectionHeader
                        eyebrow="ACADEMIC GOVERNANCE"
                        title="Leadership Team"
                        subtitle="Visionary Leaders Guiding Our Academic & Technical Future"
                        align="center"
                        id="heading-leadership"
                    />

                    {/* Featured Director Card */}
                    <Card variant="director" padding="featured" className="leadership-director-card">
                        <div className="director-avatar-wrapper">
                            <div className="initials-avatar initials-avatar-director" aria-label="Prof. Dr. Sandeep Tiwari Avatar">
                                {getInitials(DIRECTOR_DATA.name)}
                            </div>
                        </div>
                        <div className="director-info">
                            <div className="director-badge-row">
                                <span className="director-role-chip">Executive Leadership</span>
                            </div>
                            <h3 className="director-name">{DIRECTOR_DATA.name}</h3>
                            <p className="director-designation">{DIRECTOR_DATA.role}</p>
                            <p className="director-desc">{DIRECTOR_DATA.desc}</p>
                        </div>
                    </Card>

                    {/* 6 HODs Grid */}
                    <div className="leadership-hods-grid">
                        {HODS_DATA.map((hod, idx) => (
                            <Card key={idx} padding="default" className="hod-card">
                                <div className="initials-avatar initials-avatar-hod" aria-label={`${hod.name} Avatar`}>
                                    {getInitials(hod.name)}
                                </div>
                                <h4 className="hod-name">{hod.name}</h4>
                                <span className="hod-dept-chip">{hod.dept}</span>
                                <p className="hod-desc">{hod.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Faculty Section */}
            <section id="faculty" className="about-faculty-section about-section-target" aria-labelledby="heading-faculty">
                <div className="container">
                    <SectionHeader
                        eyebrow="TEACHING & MENTORSHIP"
                        title="Our Faculty"
                        subtitle="Dedicated Educators and Researchers Shaping Future Engineers"
                        align="center"
                        id="heading-faculty"
                    />

                    {/* Faculty Key Stats */}
                    <div className="faculty-stats-wrapper">
                        <StatsStrip
                            items={FACULTY_STATS}
                            overlap={false}
                            ariaLabel="Faculty and Academic Resources Statistics"
                        />
                    </div>

                    {/* Faculty Directory Toolbar */}
                    <div className="faculty-directory-toolbar">
                        <div className="faculty-search-box">
                            <i className="fas fa-search faculty-search-icon" aria-hidden="true" />
                            <input
                                type="search"
                                className="faculty-search-input"
                                placeholder="Search by faculty name, qualification, or department..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                aria-label="Search faculty by name, qualification, or department"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="faculty-search-clear"
                                    onClick={handleClearSearch}
                                    aria-label="Clear search query"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            )}
                        </div>

                        <div className="faculty-tabs-row" role="tablist" aria-label="Filter faculty by department">
                            {FACULTY_TABS.map((tab) => {
                                const isActive = selectedDept === tab.key;
                                const count = getTabCount(tab.key);
                                return (
                                    <button
                                        key={tab.key}
                                        role="tab"
                                        aria-selected={isActive}
                                        className={`faculty-tab-btn ${isActive ? 'active' : ''}`}
                                        onClick={() => handleDeptChange(tab.key)}
                                    >
                                        <span>{tab.label}</span>
                                        <span className="faculty-tab-count">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Live results count */}
                    <div className="faculty-results-meta" aria-live="polite">
                        <span>
                            Showing {Math.min(visibleFacultyCount, filteredFaculty.length)} of {filteredFaculty.length} faculty members
                        </span>
                        {selectedDept !== 'all' && (
                            <span>Filtered by: {FACULTY_TABS.find(t => t.key === selectedDept)?.label}</span>
                        )}
                    </div>

                    {/* Faculty Grid or Empty State */}
                    {filteredFaculty.length === 0 ? (
                        <div className="faculty-empty-state">
                            <i className="fas fa-user-slash faculty-empty-icon" aria-hidden="true" />
                            <p className="faculty-empty-text">No faculty members found matching your search criteria.</p>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => {
                                    setSelectedDept('all');
                                    setSearchQuery('');
                                    setVisibleFacultyCount(12);
                                }}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="faculty-cards-grid">
                                {filteredFaculty.slice(0, visibleFacultyCount).map((member) => (
                                    <Card
                                        key={member.id}
                                        padding="compact"
                                        className={`faculty-card-modern ${member.isDirector ? 'faculty-card-featured-modern' : ''}`}
                                    >
                                        <div className="faculty-card-header">
                                            <div className="initials-avatar initials-avatar-faculty" aria-hidden="true">
                                                {getInitials(member.name)}
                                            </div>
                                            <div className="faculty-identity">
                                                <h4 className="faculty-member-name">{member.name}</h4>
                                                <span className="faculty-member-dept">
                                                    {member.designation ? member.designation : member.department}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="faculty-member-details">
                                            {member.department && member.designation && (
                                                <div className="faculty-detail-item">
                                                    <i className="fas fa-university" aria-hidden="true" />
                                                    <span>{member.department}</span>
                                                </div>
                                            )}
                                            <div className="faculty-detail-item">
                                                <i className="fas fa-graduation-cap" aria-hidden="true" />
                                                <span>{member.qualification}</span>
                                            </div>
                                            <div className="faculty-detail-item">
                                                <i className="fas fa-clock" aria-hidden="true" />
                                                <span>{member.experience}</span>
                                            </div>
                                        </div>

                                        <div className="faculty-card-footer">
                                            <a
                                                href={`tel:${member.contact}`}
                                                className="faculty-tel-btn"
                                                aria-label={`Call ${member.name} at ${member.contact}`}
                                            >
                                                <i className="fas fa-phone-alt" aria-hidden="true" />
                                                <span>{member.contact}</span>
                                            </a>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {filteredFaculty.length > visibleFacultyCount && (
                                <div className="faculty-pagination-row">
                                    <Button
                                        variant="secondary"
                                        onClick={handleShowMore}
                                        icon={<i className="fas fa-chevron-down" />}
                                        iconPosition="right"
                                    >
                                        Show More ({filteredFaculty.length - visibleFacultyCount} remaining)
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
            
            {/* Research Thrust Areas */}
            <section id="research" className="about-research-section about-section-target" aria-labelledby="heading-research">
                <div className="container">
                    <SectionHeader
                        eyebrow="INNOVATION & DISCOVERY"
                        title="Research Thrust Areas"
                        subtitle="Fostering cutting-edge engineering research and technological innovation across diverse technical disciplines."
                        align="center"
                        id="heading-research"
                    />
                    <div className="research-thrust-grid">
                        {RESEARCH_AREAS_DATA.map((area, index) => (
                            <FeatureCard
                                key={index}
                                icon={area.icon}
                                title={area.title}
                                description={area.description}
                                tag={area.tag}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Alumni Section */}
            <section id="alumni" className="about-alumni-section about-section-target" aria-labelledby="heading-alumni">
                <div className="alumni-dots-pattern" aria-hidden="true" />
                <div className="container alumni-container">
                    <SectionHeader
                        eyebrow="GLOBAL FOOTPRINT"
                        title="Our Alumni"
                        subtitle="Proud graduates making significant impact across leading global enterprises, public sectors, and research organizations."
                        align="center"
                        dark={true}
                        id="heading-alumni"
                    />

                    {/* Alumni Stats Strip - Glass Variant */}
                    <StatsStrip
                        items={ALUMNI_STATS}
                        variant="glass"
                        overlap={false}
                        ariaLabel="Alumni Career and Placement Highlights"
                    />

                    {/* Notable Alumni Placements */}
                    <div className="alumni-placements-block">
                        <h3 className="alumni-subheading-dark">Notable Alumni Placements</h3>
                        <div className="placements-grid-modern">
                            {NOTABLE_PLACEMENTS_DATA.map((item, index) => (
                                <Card key={index} padding="default" className="placement-card-modern">
                                    <div className="placement-card-header">
                                        <div className="initials-avatar-circle initials-avatar-alumni" aria-hidden="true">
                                            {getInitials(item.name)}
                                        </div>
                                        <div className="placement-identity">
                                            <h4 className="placement-name">{item.name}</h4>
                                            <p className="placement-branch">{item.branch}</p>
                                        </div>
                                    </div>
                                    <div className="placement-company-row">
                                        <span className="placement-company-label">Recruited At</span>
                                        <p className="placement-company-name" title={item.company}>
                                            {item.company}
                                        </p>
                                    </div>
                                    <div className="placement-card-footer">
                                        <span className="placement-tag-badge">{item.tag}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Other Notable Companies */}
                    <div className="companies-chip-block">
                        <h4 className="companies-chip-heading">Other Notable Recruiting Partners</h4>
                        <div className="companies-chip-list">
                            {OTHER_COMPANIES_DATA.map((company, index) => (
                                <span key={index} className="company-chip-item">
                                    <i className="fas fa-building" aria-hidden="true" />
                                    <span>{company}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Alumni Success Stories */}
                    <div className="stories-block">
                        <h3 className="alumni-subheading-dark">Alumni Success Stories</h3>
                        <div className="stories-grid-modern">
                            {ALUMNI_STORIES_DATA.map((story, index) => (
                                <Card key={index} variant="glass" padding="default" className="story-glass-card">
                                    <div className="story-icon-circle" aria-hidden="true">
                                        <i className={story.icon} />
                                    </div>
                                    <h4 className="story-card-title">{story.title}</h4>
                                    <p className="story-card-desc">{story.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Stay Connected CTA */}
                    <div className="stay-connected-block">
                        <h3 className="stay-connected-title">Stay Connected</h3>
                        <p className="stay-connected-desc">
                            Join our vibrant alumni network and stay connected with fellow SoET graduates. Participate in alumni events, mentorship programs, and contribute to the growth of current students.
                        </p>
                        <div className="stay-connected-actions">
                            <Button
                                variant="primary"
                                href="#alumni-join"
                                icon={<i className="fas fa-user-plus" />}
                            >
                                Join Alumni Network
                            </Button>
                            <Button
                                variant="ghost-light"
                                href="#alumni-portal"
                                icon={<i className="fas fa-external-link-alt" />}
                                iconPosition="right"
                            >
                                Alumni Portal
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

    {/* Footer */}
    
        </>
    );
}
