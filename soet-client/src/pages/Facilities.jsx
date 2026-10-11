import React, { useState, useEffect, useRef } from 'react';
import PageBanner from '../components/PageBanner';
import SubNav from '../components/SubNav';
import SectionHeader from '../components/SectionHeader';
import StatsStrip from '../components/StatsStrip';
import Card from '../components/Card';

const BREADCRUMBS = [
    { label: 'Home', to: '/' },
    { label: 'Facilities', to: null },
];

const SUBNAV_ITEMS = [
    { id: 'facilities-overview', label: 'Overview' },
    { id: 'laboratories', label: 'Laboratories' },
    { id: 'laboratory-gallery', label: 'Gallery' },
    { id: 'campus-infrastructure', label: 'Campus' },
    { id: 'safety-security', label: 'Safety' },
    { id: 'technology-infrastructure', label: 'Technology' },
];

const INFRASTRUCTURE_STATS = [
    {
        id: 'labs',
        target: 6,
        suffix: '',
        label: 'Specialized Laboratories',
        icon: 'fas fa-flask',
        ariaLabel: '6 Specialized Laboratories'
    },
    {
        id: 'systems',
        target: 250,
        suffix: '+',
        label: 'Computer Systems',
        icon: 'fas fa-desktop',
        ariaLabel: '250 plus Computer Systems'
    },
    {
        id: 'books',
        target: 2500,
        suffix: '+',
        label: 'Books & Journals',
        icon: 'fas fa-book',
        ariaLabel: '2500 plus Books and Journals'
    },
    {
        id: 'wifi',
        target: 100,
        suffix: '%',
        label: 'Campus Wi-Fi Coverage',
        icon: 'fas fa-wifi',
        ariaLabel: '100% Campus Wi-Fi Coverage'
    }
];

const LABORATORIES_DATA = [
    {
        title: 'Computer Science & IT Labs',
        image: '/assets/images/College Pics/LAB/Computer Lab.jpg',
        alt: 'Computer Science Lab',
        description: 'State-of-the-art computing facilities with latest hardware and software for programming, AI/ML, and software development.',
        features: [
            'High-performance workstations',
            'Latest development tools and IDEs',
            'AI/ML frameworks and GPUs',
            'Network and cybersecurity lab'
        ]
    },
    {
        title: 'Electronics & Communication Labs',
        image: '/assets/images/College Pics/LAB/Electronics Lab.jpg',
        alt: 'Electronics Lab',
        description: 'Comprehensive facilities for digital electronics, communication systems, and VLSI design with modern testing equipment.',
        features: [
            'Digital oscilloscopes and analyzers',
            'RF and microwave test equipment',
            'VLSI design software and tools',
            'Embedded systems development kits'
        ]
    },
    {
        title: 'Mechanical Engineering Labs',
        image: '/assets/images/College Pics/LAB/Mechenical Lab.jpg',
        alt: 'Mechanical Lab',
        description: 'Well-equipped workshops and laboratories for manufacturing, thermal engineering, and mechanical design studies.',
        features: [
            'CNC machines and 3D printers',
            'CAD/CAM workstations',
            'Materials testing equipment',
            'Thermal and fluid mechanics lab'
        ]
    },
    {
        title: 'Electrical Engineering Labs',
        image: '/assets/images/College Pics/LAB/Electronics Lab (2).jpg',
        alt: 'Electrical Engineering Lab',
        description: 'Comprehensive facilities for power systems, control systems, and electrical machines with safety-certified equipment.',
        features: [
            'Power system simulation software',
            'Motor and generator test beds',
            'PLC and SCADA systems',
            'Renewable energy lab setup'
        ]
    },
    {
        title: 'Civil Engineering Labs',
        image: '/assets/images/College Pics/LAB/Civil Lab.jpg',
        alt: 'Civil Engineering Lab',
        description: 'Complete testing facilities for construction materials, soil mechanics, and structural analysis.',
        features: [
            'Universal testing machine',
            'Concrete and materials testing',
            'Soil mechanics laboratory',
            'Surveying and CAD lab'
        ]
    },
    {
        title: 'Agricultural Engineering Labs',
        image: '/assets/images/College Pics/LAB/Agricultral Lab.jpg',
        alt: 'Agricultural Engineering Lab',
        description: 'Specialized facilities for farm machinery, irrigation systems, and agricultural technology development.',
        features: [
            'Farm machinery testing equipment',
            'Irrigation system design tools',
            'Soil analysis instruments',
            'Agricultural processing equipment'
        ]
    }
];

const GALLERY_ITEMS = [
    {
        id: 'gal-1',
        image: '/assets/images/College Pics/LAB/Computer Lab (2).jpg',
        alt: 'Computer Lab',
        title: 'Advanced Computer Lab',
        description: 'Latest computing facilities for programming and software development'
    },
    {
        id: 'gal-2',
        image: '/assets/images/College Pics/LAB/Electronics Lab (3).jpg',
        alt: 'Electronics Lab',
        title: 'Electronics Laboratory',
        description: 'Digital electronics and communication systems testing'
    },
    {
        id: 'gal-3',
        image: '/assets/images/College Pics/LAB/Civil Lab (2).jpg',
        alt: 'Civil Lab',
        title: 'Civil Engineering Lab',
        description: 'Structural testing and materials analysis'
    },
    {
        id: 'gal-4',
        image: '/assets/images/College Pics/LAB/Electronics Lab (4).jpg',
        alt: 'Electronics Equipment',
        title: 'Advanced Equipment',
        description: 'Precision instruments for research and development'
    },
    {
        id: 'gal-5',
        image: '/assets/images/College Pics/LAB/Library (2).jpg',
        alt: 'Library Reading Hall',
        title: 'Library Reading Hall',
        description: 'Quiet study spaces with extensive resources'
    },
    {
        id: 'gal-6',
        image: '/assets/images/College Pics/LAB/Civil Lab (3).jpg',
        alt: 'Testing Equipment',
        title: 'Testing Facilities',
        description: 'Quality testing and analysis equipment'
    }
];

const CAMPUS_INFRASTRUCTURE = [
    {
        id: 'auditorium',
        image: '/assets/images/College Pics/Auditorium/Auditorium.jpg',
        alt: 'Auditorium',
        title: 'Main Auditorium',
        description: 'A spacious 500-seat auditorium equipped with modern audio-visual systems for seminars, conferences, and cultural events.',
        features: [
            { icon: 'fas fa-users', text: '500 Seating Capacity' },
            { icon: 'fas fa-microphone', text: 'Advanced Sound System' },
            { icon: 'fas fa-video', text: 'HD Projection' }
        ]
    },
    {
        id: 'library',
        image: '/assets/images/College Pics/LAB/Library.jpg',
        alt: 'Library',
        title: 'Library',
        description: 'A comprehensive library with extensive collection of books, journals, digital resources, and comfortable reading spaces.',
        features: [
            { icon: 'fas fa-book', text: '2500+ Books' },
            { icon: 'fas fa-journal-whills', text: '200+ Journals' },
            { icon: 'fas fa-database', text: 'Digital Resources' }
        ]
    },
    {
        id: 'sports',
        image: '/assets/images/College Pics/Sport Area.jpg',
        alt: 'Sports & Recreation',
        title: 'Sports & Recreation',
        description: 'Well-maintained sports facilities including outdoor courts, indoor games, and fitness center for physical wellness.',
        features: [
            { icon: 'fas fa-running', text: 'Outdoor Courts' },
            { icon: 'fas fa-dumbbell', text: 'Fitness Center' },
            { icon: 'fas fa-table-tennis', text: 'Indoor Games' }
        ]
    },
    {
        id: 'hostel',
        image: '/assets/images/College Pics/Hostel/Shaligram Tomar Hostel Side View.jpg',
        alt: 'Hostel Accommodation',
        title: 'Hostel Accommodation',
        description: 'Comfortable and secure hostel facilities for both boys and girls with modern amenities and 24/7 security.',
        features: [
            { icon: 'fas fa-bed', text: 'Furnished Rooms' },
            { icon: 'fas fa-shield-alt', text: '24/7 Security' },
            { icon: 'fas fa-wifi', text: 'Internet Access' }
        ]
    }
];

const SAFETY_DATA = [
    {
        icon: 'fas fa-video',
        title: 'CCTV Surveillance',
        description: 'Comprehensive CCTV coverage across campus for enhanced security monitoring'
    },
    {
        icon: 'fas fa-user-shield',
        title: '24/7 Security',
        description: 'Round-the-clock security personnel ensuring campus safety'
    },
    {
        icon: 'fas fa-fire-extinguisher',
        title: 'Fire Safety',
        description: 'Modern fire detection and suppression systems in all buildings'
    },
    {
        icon: 'fas fa-first-aid',
        title: 'Medical Facility',
        description: 'On-campus medical center with qualified medical staff'
    }
];

const TECH_DATA = [
    {
        icon: 'fas fa-wifi',
        title: 'Campus-wide Wi-Fi',
        description: 'High-speed internet connectivity across the entire campus with 24/7 availability'
    },
    {
        icon: 'fas fa-server',
        title: 'Data Center',
        description: 'Modern server infrastructure supporting all academic and administrative systems'
    },
    {
        icon: 'fas fa-cloud',
        title: 'Cloud Services',
        description: 'Cloud-based learning management system and digital resources access'
    },
    {
        icon: 'fas fa-mobile-alt',
        title: 'Mobile Learning',
        description: 'Mobile applications for course access, assignments, and communication'
    },
    {
        icon: 'fas fa-shield-alt',
        title: 'Network Security',
        description: 'Robust cybersecurity measures protecting all digital assets and data'
    },
    {
        icon: 'fas fa-tools',
        title: 'IT Support',
        description: 'Dedicated IT support team providing 24/7 technical assistance'
    }
];

export default function Facilities() {
    const [activeLightboxItem, setActiveLightboxItem] = useState(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        document.title = "Facilities - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    useEffect(() => {
        if (!activeLightboxItem) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveLightboxItem(null);
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        const timer = setTimeout(() => {
            closeButtonRef.current?.focus();
        }, 50);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timer);
        };
    }, [activeLightboxItem]);

    return (
        <>
            {/* Page Banner */}
            <PageBanner
                title="World-Class Facilities"
                subtitle="State-of-the-art infrastructure for comprehensive learning"
                breadcrumbs={BREADCRUMBS}
            />

            {/* In-page sticky sub-navigation */}
            <SubNav items={SUBNAV_ITEMS} />

            {/* Facilities Overview */}
            <section
                id="facilities-overview"
                aria-labelledby="heading-infrastructure"
                className="facilities-overview-section facilities-section-target"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="OVERVIEW"
                        title="Our Infrastructure"
                        subtitle="Modern facilities designed to enhance learning and research"
                        id="heading-infrastructure"
                    />
                    <StatsStrip
                        items={INFRASTRUCTURE_STATS}
                        variant="tiles"
                        overlap={false}
                        ariaLabel="SoET Key Infrastructure Statistics"
                    />
                </div>
            </section>

            {/* Laboratories Section */}
            <section
                id="laboratories"
                aria-labelledby="heading-laboratories"
                className="facilities-labs-section facilities-section-target"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="DEPARTMENTS & LABS"
                        title="Advanced Laboratories"
                        subtitle="Hands-on learning with cutting-edge equipment"
                        id="heading-laboratories"
                    />
                    <div className="labs-grid" role="list" aria-label="Advanced Laboratories">
                        {LABORATORIES_DATA.map((lab) => (
                            <Card
                                key={lab.title}
                                padding="none"
                                className="lab-card"
                                role="listitem"
                            >
                                <div className="lab-card-image-wrap">
                                    <img
                                        src={lab.image}
                                        alt={lab.alt || lab.title}
                                        loading="lazy"
                                        width="600"
                                        height="375"
                                    />
                                </div>
                                <div className="lab-card-body">
                                    <h3 className="lab-card-title">{lab.title}</h3>
                                    <p className="lab-card-desc">{lab.description}</p>
                                    <ul className="lab-card-features" aria-label={`Key features of ${lab.title}`}>
                                        {lab.features.map((feature, idx) => (
                                            <li key={idx} className="lab-card-feature-item">
                                                <span className="lab-feature-icon-wrap" aria-hidden="true">
                                                    <i className="fas fa-check" />
                                                </span>
                                                <span className="lab-feature-text">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lab Gallery Section */}
            <section
                id="laboratory-gallery"
                aria-labelledby="heading-lab-gallery"
                className="facilities-gallery-section facilities-section-target"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="GALLERY"
                        title="Laboratory Gallery"
                        subtitle="State-of-the-art laboratories equipped with modern technology"
                        id="heading-lab-gallery"
                    />
                    <div className="gallery-grid" role="region" aria-label="Laboratory Photo Gallery">
                        {GALLERY_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className="gallery-card-btn"
                                onClick={() => setActiveLightboxItem(item)}
                                aria-haspopup="dialog"
                                aria-label={`View full photo: ${item.title}`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    loading="lazy"
                                    width="400"
                                    height="300"
                                />
                                <span className="gallery-expand-badge" aria-hidden="true">
                                    <i className="fas fa-search-plus" />
                                </span>
                                <div className="gallery-card-overlay">
                                    <h3 className="gallery-card-title">{item.title}</h3>
                                    <p className="gallery-card-desc">{item.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus Infrastructure Section */}
            <section
                id="campus-infrastructure"
                aria-labelledby="heading-campus-infrastructure"
                className="facilities-campus-section facilities-section-target"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="CAMPUS AMENITIES"
                        title="Campus Infrastructure"
                        subtitle="Modern amenities for a complete educational experience"
                        id="heading-campus-infrastructure"
                    />
                    <div className="campus-infra-grid" role="list" aria-label="Campus Infrastructure Amenities">
                        {CAMPUS_INFRASTRUCTURE.map((item) => (
                            <Card
                                key={item.id}
                                padding="default"
                                className="campus-infra-card"
                                role="listitem"
                            >
                                <div className="infra-image-wrap">
                                    <img
                                        src={item.image}
                                        alt={item.alt}
                                        loading="lazy"
                                        width="400"
                                        height="300"
                                    />
                                </div>
                                <h3 className="campus-infra-title">{item.title}</h3>
                                <p className="campus-infra-desc">{item.description}</p>
                                <div className="campus-infra-chips" aria-label={`Key features of ${item.title}`}>
                                    {item.features.map((feat, fIdx) => (
                                        <span key={fIdx} className="campus-infra-chip">
                                            <i className={feat.icon} aria-hidden="true" />
                                            <span>{feat.text}</span>
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Safety & Security Section */}
            <section
                id="safety-security"
                aria-labelledby="heading-safety-security"
                className="facilities-safety-section facilities-section-target"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="CAMPUS SAFETY"
                        title="Safety & Security"
                        subtitle="Ensuring a safe and secure learning environment"
                        id="heading-safety-security"
                    />
                    <div className="safety-grid" role="list" aria-label="Campus Safety and Security Features">
                        {SAFETY_DATA.map((item) => (
                            <Card
                                key={item.title}
                                padding="default"
                                className="safety-card"
                                role="listitem"
                            >
                                <div className="safety-icon-circle" aria-hidden="true">
                                    <i className={item.icon} />
                                </div>
                                <h3 className="safety-card-title">{item.title}</h3>
                                <p className="safety-card-desc">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Infrastructure Section */}
            <section
                id="technology-infrastructure"
                aria-labelledby="heading-tech-infrastructure"
                className="facilities-tech-section facilities-section-target"
            >
                <div className="container">
                    <SectionHeader
                        eyebrow="DIGITAL CAMPUS"
                        title="Technology Infrastructure"
                        subtitle="Digital backbone supporting modern education"
                        id="heading-tech-infrastructure"
                    />
                    <div className="tech-grid" role="list" aria-label="Campus Technology Infrastructure Features">
                        {TECH_DATA.map((item) => (
                            <Card
                                key={item.title}
                                padding="default"
                                className="tech-card"
                                role="listitem"
                            >
                                <div className="tech-icon-circle" aria-hidden="true">
                                    <i className={item.icon} />
                                </div>
                                <h3 className="tech-card-title">{item.title}</h3>
                                <p className="tech-card-desc">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

    {/* Lightbox Modal */}
    {activeLightboxItem && (
        <div
            className="facilities-lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            aria-describedby="lightbox-desc"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setActiveLightboxItem(null);
                }
            }}
        >
            <div className="facilities-lightbox-dialog">
                <button
                    ref={closeButtonRef}
                    type="button"
                    className="facilities-lightbox-close"
                    onClick={() => setActiveLightboxItem(null)}
                    aria-label="Close photo preview"
                >
                    <i className="fas fa-times" aria-hidden="true" />
                </button>
                <div className="facilities-lightbox-img-wrap">
                    <img
                        src={activeLightboxItem.image}
                        alt={activeLightboxItem.alt}
                        className="facilities-lightbox-img"
                    />
                </div>
                <div className="facilities-lightbox-caption">
                    <h3 id="lightbox-title">{activeLightboxItem.title}</h3>
                    <p id="lightbox-desc">{activeLightboxItem.description}</p>
                </div>
            </div>
        </div>
    )}
        </>
    );
}
