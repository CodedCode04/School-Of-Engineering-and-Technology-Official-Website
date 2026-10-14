import React, { useState } from 'react';
import {
    Button,
    Card,
    Field,
    Input,
    Select,
    Textarea,
    DateInput,
    FileUpload,
    StatusBadge,
    Alert,
    StateCard,
    StatCard,
    PageHeader,
    DataTable,
    Dialog,
    Tabs,
    Avatar,
    DashboardLayout
} from '../components/shared';
import '../components/shared/shared.css';

export default function UiKitPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [demoActiveNav, setDemoActiveNav] = useState('overview');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [dialogLoading, setDialogLoading] = useState(false);

    const sampleTableColumns = [
        { key: 'enrollmentNo', header: 'Enrollment No', width: '160px' },
        { key: 'name', header: 'Student Name' },
        { key: 'branch', header: 'Branch' },
        { key: 'cgpa', header: 'CGPA', numeric: true },
        {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
                <div className="soet-table-actions">
                    <button
                        type="button"
                        className="soet-table-action-btn"
                        title="View Details"
                        aria-label={`View ${row.name}`}
                    >
                        <i className="fas fa-eye" aria-hidden="true"></i>
                    </button>
                    <button
                        type="button"
                        className="soet-table-action-btn"
                        title="Edit Record"
                        aria-label={`Edit ${row.name}`}
                    >
                        <i className="fas fa-edit" aria-hidden="true"></i>
                    </button>
                    <button
                        type="button"
                        className="soet-table-action-btn is-danger"
                        title="Remove Record"
                        aria-label={`Delete ${row.name}`}
                    >
                        <i className="fas fa-trash-alt" aria-hidden="true"></i>
                    </button>
                </div>
            )
        }
    ];

    const sampleTableData = [
        { _id: '1', enrollmentNo: 'SOET/2023/CS01', name: 'Aarav Sharma', branch: 'Computer Science', cgpa: '8.92', status: 'verified' },
        { _id: '2', enrollmentNo: 'SOET/2023/EC14', name: 'Priya Patel', branch: 'Electronics & Comm.', cgpa: '9.15', status: 'approved' },
        { _id: '3', enrollmentNo: 'SOET/2023/ME08', name: 'Rohan Verma', branch: 'Mechanical Eng.', cgpa: '7.80', status: 'pending' },
        { _id: '4', enrollmentNo: 'SOET/2023/CE03', name: 'Sneha Joshi', branch: 'Civil Engineering', cgpa: '6.95', status: 'rejected' },
        { _id: '5', enrollmentNo: 'SOET/2023/AI22', name: 'Vikram Singh', branch: 'AI & Data Science', cgpa: '8.45', status: 'active' }
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--cream-50, #FFFAF3)', padding: '40px 24px', fontFamily: 'var(--font-body, Inter, sans-serif)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <PageHeader
                    title="SoET Design System & Component Library (DEV ONLY)"
                    description="Institutional Engineering Portal design tokens, states, accessibility rings, and responsive components."
                    actions={
                        <>
                            <Button variant="secondary" onClick={() => window.history.back()} icon="fas fa-arrow-left">
                                Back
                            </Button>
                            <Button variant="primary" icon="fas fa-download">
                                Export Tokens
                            </Button>
                        </>
                    }
                />

                <div style={{ marginBottom: '32px' }}>
                    <Tabs
                        activeTab={activeTab}
                        onChange={setActiveTab}
                        tabs={[
                            { key: 'overview', label: 'Tokens & Typography', icon: 'fas fa-palette' },
                            { key: 'buttons', label: 'Buttons & Badges', icon: 'fas fa-mouse-pointer' },
                            { key: 'forms', label: 'Form Controls', icon: 'fas fa-edit' },
                            { key: 'feedback', label: 'Alerts & States', icon: 'fas fa-bell' },
                            { key: 'datatable', label: 'Data Table & Cards', icon: 'fas fa-table' },
                            { key: 'layout', label: 'Dashboard Shell', icon: 'fas fa-columns' }
                        ]}
                    />
                </div>

                {/* TAB 1: OVERVIEW & TOKENS */}
                {activeTab === 'overview' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <Card>
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indigo-900, #1E1760)', margin: '0 0 16px 0' }}>
                                Core Palette Swatches
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                                {[
                                    { name: 'Indigo 950', hex: '#14103A', desc: 'Top bars, Dark Shell' },
                                    { name: 'Indigo 900', hex: '#1E1760', desc: 'Headings, Gradients' },
                                    { name: 'Indigo 800', hex: '#2B2185', desc: 'Outlines, Text Links' },
                                    { name: 'Indigo 600', hex: '#4A3FC0', desc: 'Focus Rings, Accents' },
                                    { name: 'Indigo 100', hex: '#E8E6FA', desc: 'Icon circles, Badges' },
                                    { name: 'Maroon 900', hex: '#5E0F26', desc: 'Button Hover Dark' },
                                    { name: 'Maroon 700', hex: '#8B1A3D', desc: 'Primary CTAs, Danger' },
                                    { name: 'Maroon 600', hex: '#A3234B', desc: 'Required *, Errors' },
                                    { name: 'Maroon 100', hex: '#F9E3E9', desc: 'Error Alerts, Rejected' },
                                    { name: 'Cream 50', hex: '#FFFAF3', desc: 'Main Page Canvas' },
                                    { name: 'Cream 100', hex: '#FFF1DC', desc: 'Subtle Tint' },
                                    { name: 'Cream 200', hex: '#FDE3BC', desc: 'Pending Badges, Sub' },
                                    { name: 'Cream 300', hex: '#F9D29A', desc: 'Gold Accent / Glow' }
                                ].map(c => (
                                    <div key={c.hex} style={{ borderRadius: '12px', border: '1px solid rgba(30,23,96,0.1)', overflow: 'hidden' }}>
                                        <div style={{ height: '64px', backgroundColor: c.hex }}></div>
                                        <div style={{ padding: '12px', background: '#fff' }}>
                                            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--indigo-900, #1E1760)' }}>{c.name}</div>
                                            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', color: '#6B6787' }}>{c.hex}</div>
                                            <div style={{ fontSize: '11px', color: '#6B6787', marginTop: '4px' }}>{c.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                            <StatCard
                                icon="fas fa-user-graduate"
                                value="1,248"
                                label="Enrolled Students"
                                trend="+12% this academic session"
                            />
                            <StatCard
                                icon="fas fa-chalkboard-teacher"
                                value="74"
                                label="Faculty Members"
                            />
                            <StatCard
                                icon="fas fa-briefcase"
                                value="86.4%"
                                label="Placement Clearance"
                                trend="Highest in Vikram University"
                            />
                            <StatCard
                                icon="fas fa-id-card"
                                value="18"
                                label="Pending Verifications"
                            />
                        </div>
                    </div>
                )}

                {/* TAB 2: BUTTONS & BADGES */}
                {activeTab === 'buttons' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <Card>
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indigo-900, #1E1760)', margin: '0 0 16px 0' }}>
                                Button Variants &amp; Sizes
                            </h2>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
                                <Button variant="primary" icon="fas fa-arrow-right" iconPosition="right">
                                    Primary Maroon-700
                                </Button>
                                <Button variant="secondary" icon="fas fa-folder-open">
                                    Secondary Outline
                                </Button>
                                <Button variant="ghost" icon="fas fa-share-alt">
                                    Ghost Indigo
                                </Button>
                                <Button variant="danger" icon="fas fa-trash-alt">
                                    Danger Action
                                </Button>
                            </div>

                            <div style={{ background: 'var(--indigo-950, #14103A)', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
                                <span style={{ color: '#fff', fontSize: '13px', display: 'block', marginBottom: '12px' }}>On Dark Background:</span>
                                <Button variant="ghost-light" icon="fas fa-sign-out-alt">
                                    Ghost-Light Button
                                </Button>
                            </div>

                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--indigo-900, #1E1760)', margin: '0 0 12px 0' }}>
                                Button States
                            </h3>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                                <Button variant="primary" size="sm">Small (40px)</Button>
                                <Button variant="primary">Default (44px)</Button>
                                <Button variant="primary" loading>Loading State</Button>
                                <Button variant="primary" disabled>Disabled Button</Button>
                                <Button variant="secondary" icon="fas fa-bell" iconOnly aria-label="Notification"></Button>
                            </div>
                        </Card>

                        <Card>
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indigo-900, #1E1760)', margin: '0 0 16px 0' }}>
                                StatusBadge (Always Icon + Text)
                            </h2>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                                <StatusBadge status="approved" />
                                <StatusBadge status="verified" />
                                <StatusBadge status="active" />
                                <StatusBadge status="pending" />
                                <StatusBadge status="rejected" />
                                <StatusBadge status="blocked" />
                                <StatusBadge status="failed" />
                                <StatusBadge status="draft" />
                                <StatusBadge status="inactive" />
                            </div>
                        </Card>

                        <Card>
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indigo-900, #1E1760)', margin: '0 0 16px 0' }}>
                                Avatar Component
                            </h2>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Avatar name="Rahul Sharma" size="sm" />
                                <Avatar name="Rahul Sharma" size="md" />
                                <Avatar name="Rahul Sharma" size="lg" />
                                <Avatar name="Rahul Sharma" size="xl" />
                                <Avatar src="/assets/images/Vikram-university_Logo.png" name="University Logo" size="lg" />
                            </div>
                        </Card>
                    </div>
                )}

                {/* TAB 3: FORM CONTROLS */}
                {activeTab === 'forms' && (
                    <Card padding="form">
                        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indigo-900, #1E1760)', margin: '0 0 24px 0' }}>
                            Standardized Form Controls (48px, 12px Radius, 16px Inter Font)
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                            <Field id="sample-text" label="Full Name" required helper="Institutional student full legal name">
                                <Input placeholder="e.g. Rahul Sharma" />
                            </Field>

                            <Field id="sample-email-error" label="Email Address" required error="Please enter a valid university email address (@soet.edu)">
                                <Input type="email" defaultValue="invalid-email@" />
                            </Field>

                            <Field id="sample-select" label="Department Branch" required helper="Select branch of engineering">
                                <Select placeholder="Choose Department Branch">
                                    <option value="cs">Computer Science &amp; Engineering</option>
                                    <option value="ec">Electronics &amp; Communication</option>
                                    <option value="me">Mechanical Engineering</option>
                                    <option value="ce">Civil Engineering</option>
                                    <option value="ai">AI &amp; Data Science</option>
                                </Select>
                            </Field>

                            <Field id="sample-date" label="Valid Until Date" required helper="Card validity expiration">
                                <DateInput />
                            </Field>

                            <Field id="sample-disabled" label="Enrolment Number (Read Only)">
                                <Input defaultValue="SOET/2023/CS104" disabled />
                            </Field>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <Field id="sample-textarea" label="Address / Remarks" helper="Optional residential address for student verification">
                                    <Textarea placeholder="Enter complete residential address..." />
                                </Field>
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <Field id="sample-file" label="ID Card Photo Upload" required helper="(JPG/PNG/GIF, max 5MB)">
                                    <FileUpload helperText="Institutional background preferred, max file size 5MB." />
                                </Field>
                            </div>
                        </div>
                    </Card>
                )}

                {/* TAB 4: FEEDBACK & STATES */}
                {activeTab === 'feedback' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <Card>
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indigo-900, #1E1760)', margin: '0 0 16px 0' }}>
                                Alert Variants
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Alert variant="info" title="Institutional Notice">
                                    Mid-term examinations commence on November 10th. Verification forms must be completed beforehand.
                                </Alert>
                                <Alert variant="success" title="Profile Verified">
                                    Your student identity and credentials have been verified by the Department Coordinator.
                                </Alert>
                                <Alert variant="error" title="Submission Error">
                                    Your profile photo exceeds the 5MB upload constraint. Please choose an optimized image.
                                </Alert>
                            </div>
                        </Card>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                            <StateCard
                                variant="empty"
                                title="No Announcements"
                                description="There are currently no active announcements published for your branch."
                                actionText="Refresh Feed"
                                onAction={() => alert('Refreshed')}
                            />

                            <StateCard
                                variant="error"
                                title="Connection Timeout"
                                description="Failed to retrieve live verification queue from departmental API."
                                actionText="Retry Connection"
                                onAction={() => alert('Retrying')}
                            />

                            <StateCard variant="loading" />
                        </div>
                    </div>
                )}

                {/* TAB 5: DATA TABLE & MODALS */}
                {activeTab === 'datatable' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <DataTable
                            columns={sampleTableColumns}
                            data={sampleTableData.filter(d => !searchVal || d.name.toLowerCase().includes(searchVal.toLowerCase()))}
                            searchValue={searchVal}
                            onSearchChange={(e) => setSearchVal(e.target.value)}
                            searchPlaceholder="Search by student name..."
                            filters={
                                <Select placeholder="All Branches" style={{ width: '180px' }}>
                                    <option value="cs">Computer Science</option>
                                    <option value="ec">Electronics</option>
                                </Select>
                            }
                            actions={
                                <>
                                    <Button variant="secondary" size="sm" icon="fas fa-file-excel">
                                        Export
                                    </Button>
                                    <Button variant="primary" size="sm" icon="fas fa-plus" onClick={() => setIsFormOpen(true)}>
                                        Add Student
                                    </Button>
                                </>
                            }
                            pagination={{
                                page: 1,
                                totalPages: 5,
                                from: 1,
                                to: 5,
                                total: 24,
                                onPrev: () => {},
                                onNext: () => {}
                            }}
                        />

                        <Card>
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indigo-900, #1E1760)', margin: '0 0 16px 0' }}>
                                Accessible Dialogs &amp; Modals
                            </h2>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <Button variant="danger" icon="fas fa-exclamation-triangle" onClick={() => setIsConfirmOpen(true)}>
                                    Open Destructive Dialog
                                </Button>
                                <Button variant="primary" icon="fas fa-edit" onClick={() => setIsFormOpen(true)}>
                                    Open Form Modal
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}

                {/* TAB 6: DASHBOARD SHELL PREVIEW */}
                {activeTab === 'layout' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Card>
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indigo-900, #1E1760)', margin: '0 0 8px 0' }}>
                                Interactive Dashboard Shell
                            </h2>
                            <p style={{ color: 'var(--text-muted, #6B6787)', fontSize: '14.5px', margin: '0 0 20px 0' }}>
                                Below is a fully interactive instance of <code>DashboardLayout</code> featuring the 264px persistent Indigo-950 sidebar, active route indicators, mobile off-canvas drawer, 64px topbar, user profile card, and notification bell.
                            </p>

                            <div style={{
                                border: '1px solid var(--border-default, rgba(30, 23, 96, 0.12))',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                minHeight: '620px',
                                background: 'var(--cream-50, #FFFAF3)'
                            }}>
                                <DashboardLayout
                                    title="Department Administration Console"
                                    subtitle="School of Engineering & Technology • Vikram University Ujjain"
                                    activeKey={demoActiveNav}
                                    navItems={[
                                        { key: 'overview', label: 'Dashboard Overview', icon: 'fas fa-home', onClick: () => setDemoActiveNav('overview') },
                                        { key: 'verify', label: 'Verify Student Profiles', icon: 'fas fa-user-graduate', badge: '12 New', onClick: () => setDemoActiveNav('verify') },
                                        { key: 'alumni', label: 'Alumni Directory', icon: 'fas fa-university', onClick: () => setDemoActiveNav('alumni') },
                                        { key: 'announcements', label: 'Announcements', icon: 'fas fa-bullhorn', onClick: () => setDemoActiveNav('announcements') },
                                        { key: 'syllabus', label: 'Branch Syllabus', icon: 'fas fa-book-open', onClick: () => setDemoActiveNav('syllabus') },
                                        { key: 'chat', label: 'Chat Rooms', icon: 'fas fa-comments', badge: '3 Unread', onClick: () => setDemoActiveNav('chat') }
                                    ]}
                                    headerActions={
                                        <>
                                            <Button variant="secondary" size="sm" icon="fas fa-paper-plane">
                                                Send Notice
                                            </Button>
                                            <Button variant="primary" size="sm" icon="fas fa-comments">
                                                Chat Rooms
                                            </Button>
                                        </>
                                    }
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                            gap: '16px'
                                        }}>
                                            <StatCard
                                                title="Total Students"
                                                value="1,420"
                                                delta="+8% from last sem"
                                                deltaType="positive"
                                                icon="fas fa-users"
                                            />
                                            <StatCard
                                                title="Verified Profiles"
                                                value="1,280"
                                                delta="90.1% clearance"
                                                deltaType="positive"
                                                icon="fas fa-user-check"
                                            />
                                            <StatCard
                                                title="Pending Approval"
                                                value="140"
                                                delta="Requires HOD Action"
                                                deltaType="neutral"
                                                icon="fas fa-clock"
                                            />
                                            <StatCard
                                                title="Placement Rate"
                                                value="84.5%"
                                                delta="+12% YoY"
                                                deltaType="positive"
                                                icon="fas fa-briefcase"
                                            />
                                        </div>

                                        <Card>
                                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--indigo-900)', margin: '0 0 16px 0' }}>
                                                Active Console: {demoActiveNav.toUpperCase()}
                                            </h3>
                                            <p style={{ margin: '0 0 16px 0', color: 'var(--text-body)' }}>
                                                This live shell demonstrates that switching sidebar navigation items updates active states with the 3px Cream-300 indicator bar, white text, and subtle gradient highlight.
                                            </p>
                                            <Alert variant="info">
                                                <i className="fas fa-info-circle" aria-hidden="true" style={{ marginRight: '8px' }}></i>
                                                On screen widths below 1024px, the sidebar automatically collapses into an off-canvas drawer with an accessible hamburger toggle, backdrop blur, and body scroll lock.
                                            </Alert>
                                        </Card>
                                    </div>
                                </DashboardLayout>
                            </div>
                        </Card>
                    </div>
                )}


                {/* DESTRUCTIVE CONFIRMATION DIALOG */}
                <Dialog
                    isOpen={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    title="Reject Student Profile?"
                    confirmText="Reject & Block"
                    cancelText="Keep Reviewing"
                    isDestructive={true}
                    loading={dialogLoading}
                    onConfirm={() => {
                        setDialogLoading(true);
                        setTimeout(() => {
                            setDialogLoading(false);
                            setIsConfirmOpen(false);
                        }, 800);
                    }}
                >
                    <p style={{ margin: 0 }}>
                        Are you sure you want to reject this profile? The student will be notified to correct and resubmit their documents.
                    </p>
                </Dialog>

                {/* FORM MODAL */}
                <Dialog
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    title="Add Student Record"
                    confirmText="Save Student"
                    cancelText="Cancel"
                    isForm={true}
                    onConfirm={() => setIsFormOpen(false)}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Field id="dlg-name" label="Student Name" required>
                            <Input placeholder="Enter student full name" />
                        </Field>
                        <Field id="dlg-en" label="Enrollment Number" required>
                            <Input placeholder="e.g. SOET/2024/CS05" />
                        </Field>
                        <Field id="dlg-branch" label="Branch" required>
                            <Select placeholder="Select Engineering Branch">
                                <option value="cs">Computer Science &amp; Engineering</option>
                                <option value="ec">Electronics &amp; Communication</option>
                            </Select>
                        </Field>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
