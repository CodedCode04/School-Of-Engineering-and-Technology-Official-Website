import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import FeatureCard from '../components/FeatureCard';

const BREADCRUMBS = [
    { label: 'Home', to: '/' },
    { label: 'Activities' },
];

const TABS = [
    { id: 'academic', label: 'Academic Activities', icon: 'fas fa-graduation-cap' },
    { id: 'cultural', label: 'Cultural Events', icon: 'fas fa-theater-masks' },
    { id: 'social', label: 'Social Initiatives', icon: 'fas fa-hands-helping' },
    { id: 'sports', label: 'Sports & Recreation', icon: 'fas fa-trophy' },
];

function SubgroupHeader({ icon, title }) {
    return (
        <div className="activities-subgroup-header">
            <div className="subgroup-icon-circle" aria-hidden="true">
                <i className={icon} />
            </div>
            <h3 className="subgroup-title">{title}</h3>
        </div>
    );
}

function EventCard({ image, badge, title, description, details }) {
    const [imgError, setImgError] = useState(false);

    return (
        <Card padding="none" className="event-card-root">
            <div className="event-card-media-wrap">
                {imgError ? (
                    <div className="event-card-fallback" role="img" aria-label={title}>
                        <div className="event-fallback-icon" aria-hidden="true">
                            <i className="fas fa-certificate" />
                        </div>
                        <span className="event-fallback-title">{title}</span>
                    </div>
                ) : (
                    <img
                        src={image}
                        alt={title}
                        onError={() => setImgError(true)}
                        loading="lazy"
                        className="event-card-img"
                    />
                )}
                {badge && (
                    <span className="event-card-badge">{badge}</span>
                )}
            </div>
            <div className="event-card-body">
                <h4 className="event-card-title">{title}</h4>
                <p className="event-card-desc">{description}</p>
                {details && details.length > 0 && (
                    <div className="event-card-chips">
                        {details.map((item, idx) => (
                            <span key={idx} className="event-chip">
                                {item.icon && <i className={`${item.icon} event-chip-icon`} aria-hidden="true" />}
                                <span>{item.text}</span>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}

function ActivityInfoCard({ icon, title, description, tags, stats, features }) {
    return (
        <Card className="activity-info-card-root">
            <div className="activity-info-header">
                {icon && (
                    <div className="activity-info-icon-circle" aria-hidden="true">
                        <i className={icon} />
                    </div>
                )}
                <h4 className="activity-info-title">{title}</h4>
            </div>
            {description && (
                <p className="activity-info-desc">{description}</p>
            )}
            {stats && (
                <div className="activity-info-stats">
                    <span className="activity-stat-pill">
                        <i className="fas fa-users activity-stat-icon" aria-hidden="true" />
                        <span>{stats}</span>
                    </span>
                </div>
            )}
            {tags && tags.length > 0 && (
                <div className="activity-info-tags">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="activity-tag-pill">{tag}</span>
                    ))}
                </div>
            )}
            {features && features.length > 0 && (
                <ul className="activity-info-feature-list">
                    {features.map((f, idx) => (
                        <li key={idx}>
                            <i className="fas fa-check activity-feature-check" aria-hidden="true" />
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}

export default function Activities() {
    const [activeTab, setActiveTab] = useState('academic');

    useEffect(() => {
        document.title = "Activities - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    const handleTabKeyDown = (e, index) => {
        let newIndex = null;
        if (e.key === 'ArrowRight') {
            newIndex = (index + 1) % TABS.length;
        } else if (e.key === 'ArrowLeft') {
            newIndex = (index - 1 + TABS.length) % TABS.length;
        } else if (e.key === 'Home') {
            newIndex = 0;
        } else if (e.key === 'End') {
            newIndex = TABS.length - 1;
        }

        if (newIndex !== null) {
            e.preventDefault();
            const targetTab = TABS[newIndex];
            setActiveTab(targetTab.id);
            const buttonEl = document.getElementById(`tab-${targetTab.id}`);
            if (buttonEl) buttonEl.focus();
        }
    };

    return (
        <>
            {/* Page Header */}
            <PageBanner
                title="Student Activities"
                subtitle="Holistic Development Beyond Academics"
                breadcrumbs={BREADCRUMBS}
            />

            {/* Activities Overview */}
            <section className="activities-overview-section" aria-labelledby="overview-heading">
                <div className="container">
                    <div className="activities-overview-grid">
                        <div className="overview-text-col">
                            <SectionHeader
                                eyebrow="STUDENT LIFE & EXPERIENCES"
                                title="Beyond the Classroom"
                                subtitle="Comprehensive development through diverse activities and experiences"
                                id="overview-heading"
                            />
                            <p className="activities-intro-lead">
                                At SoET, we believe in the holistic development of our students. Our diverse range of activities ensures that students develop not only technical skills but also leadership qualities, creativity, and social responsibility.
                            </p>
                        </div>
                        <div className="overview-image-col">
                            <div className="overview-frame-wrap">
                                <div className="overview-frame-offset" aria-hidden="true" />
                                <div className="overview-frame-media">
                                    <img
                                        src="/assets/images/College Pics/College/IMG-20241226-WA0012.jpg"
                                        alt="Students engaged in activities at SoET campus"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activities Tabs */}
            <section className="activities-tabs-section" aria-label="Activities by Category">
                <div className="container">
                    <div className="activities-tablist-wrap">
                        <div
                            role="tablist"
                            aria-label="Activity Categories"
                            className="activities-tablist"
                        >
                            {TABS.map((tab, idx) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        role="tab"
                                        id={`tab-${tab.id}`}
                                        aria-controls={`panel-${tab.id}`}
                                        aria-selected={isActive}
                                        tabIndex={isActive ? 0 : -1}
                                        className={`activities-tab-pill-btn ${isActive ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        onKeyDown={(e) => handleTabKeyDown(e, idx)}
                                    >
                                        <i className={`${tab.icon} activities-tab-icon`} aria-hidden="true" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="activities-tab-content">
                        {/* Academic Activities Tab */}
                        <div
                            role="tabpanel"
                            id="panel-academic"
                            aria-labelledby="tab-academic"
                            className={`activities-tab-pane ${activeTab === 'academic' ? 'active' : ''}`}
                            hidden={activeTab !== 'academic'}
                        >
                            <SectionHeader
                                eyebrow="TECHNICAL EXCELLENCE"
                                title="Academic Activities"
                                subtitle="Technical workshops, competitions, and skill development programs"
                            />

                            {/* Featured Academic Events */}
                            <SubgroupHeader icon="fas fa-star" title="Featured Academic Events" />
                            <div className="activities-grid-3">
                                <EventCard
                                    image="/assets/images/Academics Activities/EAP 27-8-24.jpeg"
                                    badge="Featured"
                                    title="Entrepreneurship Awareness Program"
                                    description="Programs to foster innovation and startup culture among engineering students, encouraging entrepreneurial mindset."
                                    details={[
                                        { icon: 'fas fa-calendar', text: 'August 2024' },
                                        { icon: 'fas fa-users', text: '350+ Participants' },
                                        { icon: 'fas fa-lightbulb', text: 'Innovation Focus' },
                                    ]}
                                />
                                <EventCard
                                    image="/assets/images/Academics Activities/Viksit Bharat 02.jpeg"
                                    badge="National Initiative"
                                    title="Viksit Bharat@2047: Voice of Youth"
                                    description="National program focusing on youth perspectives for developed India by 2047, promoting sustainable development."
                                    details={[
                                        { icon: 'fas fa-calendar', text: 'December 2023' },
                                        { icon: 'fas fa-users', text: '350 Participants' },
                                        { icon: 'fas fa-flag', text: 'National Program' },
                                    ]}
                                />
                                <EventCard
                                    image="/assets/images/Academics Activities/Young Thinker Conclave.jpeg"
                                    badge="Innovation"
                                    title="Young Thinker Conclave"
                                    description="Platform for students to present innovative ideas and research projects, fostering creativity and innovation among young minds."
                                    details={[
                                        { icon: 'fas fa-lightbulb', text: 'Innovation' },
                                        { icon: 'fas fa-presentation', text: 'Presentations' },
                                        { icon: 'fas fa-trophy', text: 'Awards' },
                                    ]}
                                />
                            </div>

                            {/* Technical Workshops */}
                            <SubgroupHeader icon="fas fa-tools" title="Technical Workshops & Training" />
                            <div className="activities-grid-3">
                                <EventCard
                                    image="/assets/images/Academics Activities/1 Week C AutoCAd Workshop.jpeg"
                                    title="AutoCAD Software Training"
                                    description="One-week intensive AutoCAD workshop for engineering design and drafting skills development."
                                    details={[
                                        { icon: 'fas fa-tools', text: 'CAD Training' },
                                        { icon: 'fas fa-clock', text: '1 Week Duration' },
                                    ]}
                                />
                                <EventCard
                                    image="/assets/images/Academics Activities/Automation Workshop 01.jpeg"
                                    title="Industrial Automation Workshop"
                                    description="Hands-on training in automation technologies and control systems for industrial applications."
                                    details={[
                                        { icon: 'fas fa-robot', text: 'Automation' },
                                        { icon: 'fas fa-cogs', text: 'Industrial Focus' },
                                    ]}
                                />
                                <EventCard
                                    image="/assets/images/Academics Activities/Expert lect. 6-12-24.jpeg"
                                    title="Expert Lecture Series"
                                    description="Regular lectures by industry experts and academicians on latest technologies and trends."
                                    details={[
                                        { icon: 'fas fa-chalkboard-teacher', text: 'Expert Sessions' },
                                        { icon: 'fas fa-calendar-alt', text: 'Regular Program' },
                                    ]}
                                />
                            </div>

                            {/* Code Society & Certifications */}
                            <SubgroupHeader icon="fas fa-code" title="Coding Society & Certifications" />
                            <div className="activities-grid-2">
                                <EventCard
                                    image="/assets/images/Academics Activities/Code_d_Code Coding Society Poster - Made with PosterMyWall.jpg"
                                    title="Code_d_Code Society Activities"
                                    description="Active coding community organizing programming competitions, hackathons, and coding workshops."
                                    details={[
                                        { icon: 'fas fa-code', text: 'Programming' },
                                        { icon: 'fas fa-users', text: '100+ Members' },
                                        { icon: 'fas fa-trophy', text: 'Competitions' },
                                    ]}
                                />
                                <EventCard
                                    image="/assets/images/Academics Activities/Amit 01-IIRS Cert.pdf"
                                    title="IIRS Remote Sensing Certification"
                                    description="Students participating in Indian Institute of Remote Sensing certification programs."
                                    details={[
                                        { icon: 'fas fa-satellite', text: 'Remote Sensing' },
                                        { icon: 'fas fa-certificate', text: 'ISRO Certification' },
                                    ]}
                                />
                            </div>

                            {/* Placement & Career Development */}
                            <div className="placement-hero-panel">
                                <div className="placement-panel-pattern" aria-hidden="true" />
                                <div className="placement-panel-header">
                                    <div className="placement-panel-icon-circle" aria-hidden="true">
                                        <i className="fas fa-briefcase" />
                                    </div>
                                    <div className="placement-panel-titles">
                                        <h3 className="placement-panel-title">Placement & Career Development</h3>
                                        <p className="placement-panel-subtitle">Dedicated career guidance, recruitments, and corporate industry sessions</p>
                                    </div>
                                </div>
                                <div className="placement-glass-grid">
                                    <div className="placement-glass-card" data-card="">
                                        <div className="placement-card-top">
                                            <div className="placement-icon-container" aria-hidden="true">
                                                <i className="fas fa-briefcase" />
                                            </div>
                                            <h4 className="placement-card-title">Three Days Job Fair 2023</h4>
                                        </div>
                                        <p className="placement-card-desc">Major recruitment drive with multiple companies</p>
                                        <div className="placement-card-stats">
                                            <span className="placement-chip"><i className="fas fa-users" aria-hidden="true" /> 750 Participants</span>
                                            <span className="placement-chip"><i className="fas fa-calendar-alt" aria-hidden="true" /> May 29-31, 2023</span>
                                        </div>
                                    </div>

                                    <div className="placement-glass-card" data-card="">
                                        <div className="placement-card-top">
                                            <div className="placement-icon-container" aria-hidden="true">
                                                <i className="fas fa-handshake" />
                                            </div>
                                            <h4 className="placement-card-title">TCS Company Webinar</h4>
                                        </div>
                                        <p className="placement-card-desc">Industry insights and career guidance session</p>
                                        <div className="placement-card-stats">
                                            <span className="placement-chip"><i className="fas fa-users" aria-hidden="true" /> 150 Participants</span>
                                            <span className="placement-chip"><i className="fas fa-calendar-alt" aria-hidden="true" /> July 2022</span>
                                        </div>
                                    </div>

                                    <div className="placement-glass-card" data-card="">
                                        <div className="placement-card-top">
                                            <div className="placement-icon-container" aria-hidden="true">
                                                <i className="fas fa-laptop-code" />
                                            </div>
                                            <h4 className="placement-card-title">TCS Skill Development Seminar</h4>
                                        </div>
                                        <p className="placement-card-desc">Professional skill enhancement program</p>
                                        <div className="placement-card-stats">
                                            <span className="placement-chip"><i className="fas fa-users" aria-hidden="true" /> 100 Participants</span>
                                            <span className="placement-chip"><i className="fas fa-calendar-alt" aria-hidden="true" /> May 2023</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* Cultural Events Tab */}
                    <div
                        role="tabpanel"
                        id="panel-cultural"
                        aria-labelledby="tab-cultural"
                        className={`activities-tab-pane ${activeTab === 'cultural' ? 'active' : ''}`}
                        hidden={activeTab !== 'cultural'}
                    >
                        <SectionHeader
                            eyebrow="CREATIVITY & TRADITION"
                            title="Cultural Events"
                            subtitle="Celebrating diversity and creativity through various cultural programs"
                        />

                        {/* Major Cultural Celebrations */}
                        <SubgroupHeader icon="fas fa-calendar-alt" title="Major Cultural Celebrations" />
                        <div className="activities-grid-3">
                            <EventCard
                                image="/assets/images/Cultural Activities/Engineers Day News 01.jpeg"
                                badge="Annual Event"
                                title="Engineers Day Celebration"
                                description="Annual celebration honoring the engineering profession with technical exhibitions and cultural programs."
                                details={[
                                    { icon: 'fas fa-calendar', text: 'September 15' },
                                    { icon: 'fas fa-award', text: 'Awards Ceremony' },
                                    { icon: 'fas fa-display', text: 'Tech Exhibition' },
                                ]}
                            />
                            <EventCard
                                image="/assets/images/Cultural Activities/Viswakarma Diwas 17-9-24.jpeg"
                                badge="Traditional"
                                title="Vishwakarma Day"
                                description="Traditional celebration honoring the divine architect and patron of all craftsmen and engineers."
                                details={[
                                    { icon: 'fas fa-calendar', text: 'September 17' },
                                    { icon: 'fas fa-pray', text: 'Traditional Rituals' },
                                    { icon: 'fas fa-tools', text: 'Craftsmanship' },
                                ]}
                            />
                            <EventCard
                                image="/assets/images/Cultural Activities/Bhasha Utsav 01.jpeg"
                                badge="Cultural Heritage"
                                title="Bhasha Utsav"
                                description="Celebration of Indian languages and literature promoting cultural diversity and linguistic heritage."
                                details={[
                                    { icon: 'fas fa-book', text: 'Literature' },
                                    { icon: 'fas fa-microphone', text: 'Competitions' },
                                    { icon: 'fas fa-globe', text: 'Diversity' },
                                ]}
                            />
                        </div>

                        {/* Sports & Competitions */}
                        <SubgroupHeader icon="fas fa-trophy" title="Sports & Competitions" />
                        <div className="activities-grid-2">
                            <EventCard
                                image="/assets/images/Cultural Activities/Cricket Tounament.jpeg"
                                title="Annual Sports Tournament"
                                description="Inter-departmental sports competitions including cricket, football, and indoor games fostering team spirit."
                                details={[
                                    { icon: 'fas fa-users', text: 'All Departments' },
                                    { icon: 'fas fa-medal', text: 'Prizes' },
                                    { icon: 'fas fa-heart', text: 'Team Spirit' },
                                ]}
                            />
                            <EventCard
                                image="/assets/images/Academics Activities/Chess Comp 01.jpeg"
                                title="Chess Competition"
                                description="Strategic thinking development through inter-college chess championships promoting mental agility."
                                details={[
                                    { icon: 'fas fa-chess', text: 'Strategy' },
                                    { icon: 'fas fa-brain', text: 'Mental Skills' },
                                    { icon: 'fas fa-trophy', text: 'Championship' },
                                ]}
                            />
                        </div>

                        {/* Cultural Performance Activities */}
                        <SubgroupHeader icon="fas fa-music" title="Cultural Performance Activities" />
                        <div className="activities-grid-4">
                            <ActivityInfoCard
                                icon="fas fa-microphone"
                                title="Music & Dance Competitions"
                                description="Showcasing talent in classical and contemporary music and dance forms"
                            />
                            <ActivityInfoCard
                                icon="fas fa-theater-masks"
                                title="Drama & Theatre"
                                description="Student productions and theatrical performances promoting artistic expression"
                            />
                            <ActivityInfoCard
                                icon="fas fa-paint-brush"
                                title="Art & Craft Exhibitions"
                                description="Displaying creative works and handicrafts by talented students"
                            />
                            <ActivityInfoCard
                                icon="fas fa-book-open"
                                title="Literary Events"
                                description="Poetry recitations, essay competitions, and creative writing workshops"
                            />
                        </div>
                    </div>

                    {/* Social Initiatives Tab */}
                    <div
                        role="tabpanel"
                        id="panel-social"
                        aria-labelledby="tab-social"
                        className={`activities-tab-pane ${activeTab === 'social' ? 'active' : ''}`}
                        hidden={activeTab !== 'social'}
                    >
                        <SectionHeader
                            eyebrow="COMMUNITY OUTREACH"
                            title="Social Initiatives"
                            subtitle="Community service and environmental conservation programs"
                        />

                        {/* Environmental Conservation */}
                        <SubgroupHeader icon="fas fa-leaf" title="Environmental Conservation" />
                        <div className="activities-grid-2">
                            <EventCard
                                image="/assets/images/Social Activities/Plantation 01 - 0410-24.jpeg"
                                badge="Green Initiative"
                                title="Plantation Drive"
                                description="Environmental conservation initiative focusing on increasing green cover and creating environmental awareness among students and community."
                                details={[
                                    { icon: 'fas fa-tree', text: '500+ Trees Planted' },
                                    { icon: 'fas fa-leaf', text: 'Eco-Friendly' },
                                    { icon: 'fas fa-hands-helping', text: 'Community Participation' },
                                ]}
                            />
                            <EventCard
                                image="/assets/images/Academics Activities/Groundwater 01.jpeg"
                                badge="Water Conservation"
                                title="Groundwater Conservation Workshop"
                                description="Awareness programs on water conservation and sustainable water management practices for future generations."
                                details={[
                                    { icon: 'fas fa-tint', text: 'Water Conservation' },
                                    { icon: 'fas fa-recycle', text: 'Sustainability' },
                                    { icon: 'fas fa-earth-americas', text: 'Environment Protection' },
                                ]}
                            />
                        </div>

                        {/* Community Health & Sanitation */}
                        <SubgroupHeader icon="fas fa-heart" title="Community Health & Sanitation" />
                        <div className="activities-grid-2">
                            <EventCard
                                image="/assets/images/Social Activities/Swachta Abhiyan 01.jpeg"
                                badge="Health Initiative"
                                title="Swachta Abhiyan"
                                description="Community cleanliness and sanitation awareness programs promoting hygiene and public health in surrounding areas."
                                details={[
                                    { icon: 'fas fa-broom', text: 'Cleanliness Drive' },
                                    { icon: 'fas fa-heart', text: 'Public Health' },
                                    { icon: 'fas fa-users', text: 'Community Outreach' },
                                ]}
                            />
                            <EventCard
                                image="/assets/images/Social Activities/Swachta 02.jpeg"
                                title="Sanitation Awareness Campaign"
                                description="Educational programs about proper waste management and hygiene practices for community welfare."
                                details={[
                                    { icon: 'fas fa-graduation-cap', text: 'Education' },
                                    { icon: 'fas fa-recycle', text: 'Waste Management' },
                                    { icon: 'fas fa-shield-alt', text: 'Health Protection' },
                                ]}
                            />
                        </div>

                        {/* Social Impact Programs */}
                        <SubgroupHeader icon="fas fa-hands-helping" title="Social Impact Programs" />
                        <div className="activities-grid-4">
                            <ActivityInfoCard
                                icon="fas fa-graduation-cap"
                                title="Digital Literacy Programs"
                                description="Teaching basic computer skills to underprivileged communities"
                                stats="200+ Beneficiaries"
                            />
                            <ActivityInfoCard
                                icon="fas fa-book"
                                title="Educational Support"
                                description="Providing free tutoring and educational resources to local schools"
                                stats="10+ Schools Supported"
                            />
                            <ActivityInfoCard
                                icon="fas fa-medkit"
                                title="Health Awareness Camps"
                                description="Organizing medical check-ups and health awareness sessions"
                                stats="500+ People Reached"
                            />
                            <ActivityInfoCard
                                icon="fas fa-gift"
                                title="Community Welfare"
                                description="Supporting local communities through various welfare programs"
                                stats="Year-round Activities"
                            />
                        </div>
                    </div>

                    {/* Sports & Recreation Tab */}
                    <div
                        role="tabpanel"
                        id="panel-sports"
                        aria-labelledby="tab-sports"
                        className={`activities-tab-pane ${activeTab === 'sports' ? 'active' : ''}`}
                        hidden={activeTab !== 'sports'}
                    >
                        <SectionHeader
                            eyebrow="ATHLETICS & VITALITY"
                            title="Sports & Recreation"
                            subtitle="Physical fitness and recreational activities for overall development"
                        />

                        {/* Outdoor Sports */}
                        <SubgroupHeader icon="fas fa-sun" title="Outdoor Sports" />
                        <div className="activities-grid-3">
                            <ActivityInfoCard
                                icon="fas fa-futbol"
                                title="Football"
                                description="Inter-departmental tournaments and regular practice sessions with professional coaching"
                                tags={['Championships', 'Coaching', 'Team Building']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-baseball-ball"
                                title="Cricket"
                                description="Department-wise cricket tournaments fostering team spirit and sportsmanship"
                                tags={['Tournaments', 'Team Spirit', 'Regular Matches']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-basketball-ball"
                                title="Basketball"
                                description="Professional courts with coaching and competitive matches for skill development"
                                tags={['Professional Courts', 'Training', 'Competition']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-running"
                                title="Athletics"
                                description="Track and field events with proper training facilities for various athletic disciplines"
                                tags={['Track & Field', 'Training', 'Individual Sports']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-volleyball-ball"
                                title="Volleyball"
                                description="Team sport fostering coordination, teamwork, and strategic thinking"
                                tags={['Teamwork', 'Coordination', 'Strategy']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-dumbbell"
                                title="Fitness Training"
                                description="Outdoor fitness activities and calisthenics for physical conditioning"
                                tags={['Fitness', 'Strength', 'Conditioning']}
                            />
                        </div>

                        {/* Indoor Sports */}
                        <SubgroupHeader icon="fas fa-home" title="Indoor Sports & Recreation" />
                        <div className="activities-grid-4">
                            <ActivityInfoCard
                                icon="fas fa-table-tennis"
                                title="Table Tennis"
                                description="Multiple tables with regular tournaments and coaching for skill improvement"
                                tags={['Multiple Tables', 'Tournaments', 'Coaching']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-chess"
                                title="Chess"
                                description="Strategic thinking development through chess competitions and tournaments"
                                tags={['Strategy', 'Mental Skills', 'Competitions']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-circle"
                                title="Carrom"
                                description="Traditional indoor game promoting precision, concentration, and hand-eye coordination"
                                tags={['Precision', 'Concentration', 'Traditional']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-gamepad"
                                title="Indoor Games"
                                description="Various recreational indoor activities for relaxation and entertainment"
                                tags={['Recreation', 'Entertainment', 'Relaxation']}
                            />
                        </div>

                        {/* Fitness & Wellness */}
                        <SubgroupHeader icon="fas fa-heartbeat" title="Fitness & Wellness" />
                        <div className="activities-grid-3">
                            <ActivityInfoCard
                                icon="fas fa-dumbbell"
                                title="Fitness Center"
                                description="Modern gym equipment for physical fitness and strength training"
                                features={['Modern Equipment', 'Strength Training', 'Cardio Machines', 'Personal Training']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-leaf"
                                title="Yoga & Meditation"
                                description="Stress relief and mental wellness through yoga and meditation sessions"
                                features={['Stress Relief', 'Mental Wellness', 'Flexibility', 'Mindfulness']}
                            />
                            <ActivityInfoCard
                                icon="fas fa-trophy"
                                title="Sports Competitions"
                                description="Regular inter-department and inter-college sports competitions"
                                features={['Inter-Department', 'Inter-College', 'Annual Events', 'Awards & Prizes']}
                            />
                        </div>
                    </div>
                </div>
            </div>
    </section>

    {/* Skill Development Programs */}
    <section className="activities-skills-section">
        <div className="container">
            <SectionHeader
                eyebrow="NATIONAL INITIATIVES & CERTIFICATIONS"
                title="Skill Development & Capability Enhancement"
                subtitle="Industry-relevant certifications and professional development programs"
            />
            
            <div className="skills-programs-container">
                {/* Top Row: 2 Major Cards */}
                <div className="skills-two-cards-grid">
                    <Card className="skill-major-card">
                        <div className="skill-major-header">
                            <div className="skill-major-icon-circle" aria-hidden="true">
                                <i className="fas fa-satellite" />
                            </div>
                            <h3 className="skill-major-title">IIRS - ISRO Program</h3>
                        </div>
                        <p className="skill-major-desc">
                            Collaboration with Indian Institute of Remote Sensing (ISRO) for advanced geospatial technology training.
                        </p>
                        <div className="skill-major-chips">
                            <span className="skill-chip">
                                <i className="fas fa-calendar" /> 2021
                            </span>
                            <span className="skill-chip">
                                <i className="fas fa-users" /> 100 Students
                            </span>
                            <span className="skill-chip">
                                <i className="fas fa-certificate" /> ISRO Certification
                            </span>
                        </div>
                    </Card>

                    <Card className="skill-major-card">
                        <div className="skill-major-header">
                            <div className="skill-major-icon-circle" aria-hidden="true">
                                <i className="fas fa-graduation-cap" />
                            </div>
                            <h3 className="skill-major-title">SWAYAM - NPTEL - MOOCS</h3>
                        </div>
                        <p className="skill-major-desc">
                            Online certification courses through National Programme on Technology Enhanced Learning platform.
                        </p>
                        <div className="skill-major-chips">
                            <span className="skill-chip">
                                <i className="fas fa-calendar" /> 2024
                            </span>
                            <span className="skill-chip">
                                <i className="fas fa-users" /> 500 Students
                            </span>
                            <span className="skill-chip">
                                <i className="fas fa-globe" /> Online Learning
                            </span>
                        </div>
                    </Card>
                </div>

                {/* Bottom Row: Full-width Featured Card */}
                <Card className="spoken-tutorial-card">
                    <div className="spoken-tutorial-pattern" aria-hidden="true" />
                    <div className="spoken-tutorial-grid">
                        <div className="spoken-tutorial-main">
                            <div className="spoken-tutorial-header">
                                <div className="spoken-tutorial-icon-circle" aria-hidden="true">
                                    <i className="fas fa-laptop-code" />
                                </div>
                                <div className="spoken-tutorial-title-wrap">
                                    <span className="spoken-eyebrow-badge">PREMIER IIT PARTNERSHIP</span>
                                    <h3 className="spoken-tutorial-title">Spoken Tutorial - IIT Bombay</h3>
                                </div>
                            </div>
                            <p className="spoken-tutorial-desc">
                                Comprehensive IT skills development program in collaboration with IIT Bombay covering programming languages and software tools.
                            </p>
                            <div className="spoken-tutorial-chips">
                                <span className="spoken-chip">
                                    <i className="fas fa-calendar" /> July 2020 - December 2024
                                </span>
                                <span className="spoken-chip">
                                    <i className="fas fa-users" /> 5000+ Students
                                </span>
                                <span className="spoken-chip">
                                    <i className="fas fa-award" /> IIT Bombay Certified
                                </span>
                            </div>
                        </div>

                        <div className="spoken-tutorial-features">
                            <h4 className="spoken-features-title">Key Features:</h4>
                            <ul className="spoken-features-list">
                                <li>
                                    <i className="fas fa-check-circle" />
                                    <span>Programming Languages (C, C++, Java, Python)</span>
                                </li>
                                <li>
                                    <i className="fas fa-check-circle" />
                                    <span>Web Development Technologies</span>
                                </li>
                                <li>
                                    <i className="fas fa-check-circle" />
                                    <span>Database Management Systems</span>
                                </li>
                                <li>
                                    <i className="fas fa-check-circle" />
                                    <span>Office Productivity Tools</span>
                                </li>
                                <li>
                                    <i className="fas fa-check-circle" />
                                    <span>Open Source Software Training</span>
                                </li>
                                <li>
                                    <i className="fas fa-check-circle" />
                                    <span>Self-paced Online Learning</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </section>

    {/* Benefits of Student Activities */}
    <section className="activities-benefits-section">
        <div className="container">
            <SectionHeader
                eyebrow="STUDENT ADVANTAGES"
                title="Benefits of Our Skill Development Programs"
                subtitle="Empowering engineering graduates with hands-on technical proficiency and career readiness"
            />
            <div className="activities-benefits-grid">
                <FeatureCard
                    icon="fas fa-certificate"
                    title="Industry-Recognized Certifications"
                    description="Certificates from prestigious institutions like ISRO, IIT Bombay, and NPTEL."
                />
                <FeatureCard
                    icon="fas fa-chart-line"
                    title="Enhanced Employability"
                    description="Improved job prospects with additional technical and soft skills."
                />
                <FeatureCard
                    icon="fas fa-users"
                    title="Peer Learning"
                    description="Collaborative learning environment with fellow students and mentors."
                />
                <FeatureCard
                    icon="fas fa-clock"
                    title="Flexible Learning"
                    description="Online and offline modes to accommodate academic schedules."
                />
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
                <div data-card="" className="dark-panel left-panel">
                    <div className="panel-header">
                        <div className="panel-icon" aria-hidden="true">
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
                                <div className="code-controls" aria-hidden="true">
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
                <div data-card="" className="dark-panel right-panel">
                    <div className="panel-header">
                        <div className="panel-icon" aria-hidden="true">
                            <i className="fas fa-images"></i>
                        </div>
                        <h3>Gallery.exe</h3>
                        <div className="loading-bar" aria-hidden="true">
                            <div className="loading-progress"></div>
                        </div>
                    </div>
                    
                    <div className="dark-gallery">
                        <div className="gallery-grid">
                            <div className="dark-gallery-item featured">
                                <img src="/assets/images/College Pics/Code_d_Code/Executive Team Code_d_Code Front.jpg" alt="Code_d_Code Executive Team" loading="lazy" />
                                <div className="dark-overlay">
                                    <div className="overlay-content">
                                        <h4>Executive.core</h4>
                                        <p>System administrators of innovation</p>
                                        <div className="scan-line" aria-hidden="true"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="dark-gallery-item">
                                <img src="/assets/images/College Pics/Code_d_Code/Code-d-Code Offline meet.jpg" alt="Offline Meetup" loading="lazy" />
                                <div className="dark-overlay">
                                    <div className="overlay-content">
                                        <h4>Offline.sync</h4>
                                        <p>Real-world connections</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="dark-gallery-item">
                                <img src="/assets/images/College Pics/Code_d_Code/Code_d_Code online meet.png" alt="Online Sessions" loading="lazy" />
                                <div className="dark-overlay">
                                    <div className="overlay-content">
                                        <h4>Virtual.matrix</h4>
                                        <p>Digital collaboration space</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="dark-gallery-item">
                                <img src="/assets/images/College Pics/Code_d_Code/Society Heads.png" alt="Society Heads" loading="lazy" />
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
                    <div className="divider-line" aria-hidden="true"></div>
                    <span className="divider-text">ACTIVITIES.LOG</span>
                    <div className="divider-line" aria-hidden="true"></div>
                </div>
                
                <div className="dark-activities-grid">
                    <div data-card="" className="dark-activity-card">
                        <div className="card-header">
                            <div className="activity-icon" aria-hidden="true">
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

                    <div data-card="" className="dark-activity-card">
                        <div className="card-header">
                            <div className="activity-icon" aria-hidden="true">
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

                    <div data-card="" className="dark-activity-card">
                        <div className="card-header">
                            <div className="activity-icon" aria-hidden="true">
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

                    <div data-card="" className="dark-activity-card">
                        <div className="card-header">
                            <div className="activity-icon" aria-hidden="true">
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
                        <a href="https://www.codedcode.tech" target="_blank" rel="noopener noreferrer" className="dark-btn primary">
                            <span>Visit Our Universe</span>
                            <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                        </a>
                        <Link to="/contact" className="dark-btn secondary">
                            <span>Connect.now()</span>
                            <i className="fas fa-arrow-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Student Clubs */}
    <section className="activities-clubs-section">
        <div className="container">
            <SectionHeader
                eyebrow="CAMPUS COMMUNITIES"
                title="Student Clubs & Societies"
                subtitle="Join communities that match your interests and passions"
            />
            <div className="activities-clubs-grid">
                <Card className="activity-club-card">
                    <div className="club-card-header">
                        <div className="club-icon-circle" aria-hidden="true">
                            <i className="fas fa-code"></i>
                        </div>
                        <h3 className="club-card-title">Code Society</h3>
                    </div>
                    <p className="club-card-desc">
                        Programming enthusiasts working on software development, competitive coding, and hackathons.
                    </p>
                    <div className="club-card-stats">
                        <span className="club-stat-chip">
                            <i className="fas fa-users" aria-hidden="true"></i> 100+ Members
                        </span>
                        <span className="club-stat-chip">
                            <i className="fas fa-calendar-check" aria-hidden="true"></i> Weekly Meetups
                        </span>
                    </div>
                </Card>

                <Card className="activity-club-card">
                    <div className="club-card-header">
                        <div className="club-icon-circle" aria-hidden="true">
                            <i className="fas fa-robot"></i>
                        </div>
                        <h3 className="club-card-title">Robotics Club</h3>
                    </div>
                    <p className="club-card-desc">
                        Designing and building robots for competitions and practical applications in automation.
                    </p>
                    <div className="club-card-stats">
                        <span className="club-stat-chip">
                            <i className="fas fa-users" aria-hidden="true"></i> 50+ Members
                        </span>
                        <span className="club-stat-chip">
                            <i className="fas fa-calendar-check" aria-hidden="true"></i> Monthly Projects
                        </span>
                    </div>
                </Card>

                <Card className="activity-club-card">
                    <div className="club-card-header">
                        <div className="club-icon-circle" aria-hidden="true">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <h3 className="club-card-title">Innovation Club</h3>
                    </div>
                    <p className="club-card-desc">
                        Fostering creativity and entrepreneurship through innovative projects and startup initiatives.
                    </p>
                    <div className="club-card-stats">
                        <span className="club-stat-chip">
                            <i className="fas fa-users" aria-hidden="true"></i> 75+ Members
                        </span>
                        <span className="club-stat-chip">
                            <i className="fas fa-calendar-check" aria-hidden="true"></i> Idea Incubation
                        </span>
                    </div>
                </Card>

                <Card className="activity-club-card">
                    <div className="club-card-header">
                        <div className="club-icon-circle" aria-hidden="true">
                            <i className="fas fa-leaf"></i>
                        </div>
                        <h3 className="club-card-title">Environmental Club</h3>
                    </div>
                    <p className="club-card-desc">
                        Promoting environmental awareness and sustainability through various green initiatives.
                    </p>
                    <div className="club-card-stats">
                        <span className="club-stat-chip">
                            <i className="fas fa-users" aria-hidden="true"></i> 80+ Members
                        </span>
                        <span className="club-stat-chip">
                            <i className="fas fa-calendar-check" aria-hidden="true"></i> Eco Projects
                        </span>
                    </div>
                </Card>

                <Card className="activity-club-card">
                    <div className="club-card-header">
                        <div className="club-icon-circle" aria-hidden="true">
                            <i className="fas fa-camera"></i>
                        </div>
                        <h3 className="club-card-title">Photography Club</h3>
                    </div>
                    <p className="club-card-desc">
                        Capturing moments and developing artistic skills through photography workshops and exhibitions.
                    </p>
                    <div className="club-card-stats">
                        <span className="club-stat-chip">
                            <i className="fas fa-users" aria-hidden="true"></i> 40+ Members
                        </span>
                        <span className="club-stat-chip">
                            <i className="fas fa-calendar-check" aria-hidden="true"></i> Photo Walks
                        </span>
                    </div>
                </Card>

                <Card className="activity-club-card">
                    <div className="club-card-header">
                        <div className="club-icon-circle" aria-hidden="true">
                            <i className="fas fa-music"></i>
                        </div>
                        <h3 className="club-card-title">Cultural Society</h3>
                    </div>
                    <p className="club-card-desc">
                        Organizing cultural events, music performances, and artistic celebrations throughout the year.
                    </p>
                    <div className="club-card-stats">
                        <span className="club-stat-chip">
                            <i className="fas fa-users" aria-hidden="true"></i> 60+ Members
                        </span>
                        <span className="club-stat-chip">
                            <i className="fas fa-calendar-check" aria-hidden="true"></i> Annual Events
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    </section>

    {/* Footer */}
    
        </>
    );
}
