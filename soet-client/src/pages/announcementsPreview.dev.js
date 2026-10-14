/**
 * Dev-only preview data for Announcements page redesign.
 * Loaded ONLY in development when import.meta.env.DEV is true via /announcements?preview=data.
 * This file can be safely removed or excluded from production.
 */
export const SAMPLE_ANNOUNCEMENTS = [
    {
        _id: 'sample-notice-1',
        title: 'SAMPLE - End Semester Examination Schedule & General Guidelines for Winter 2026',
        body: '<p>All B.Tech and M.Tech students are hereby informed that the End Semester Examinations will commence from November 15, 2026. Students must download their admit cards from the student portal and bring institutional ID cards to the exam halls. Detailed schedules and seating arrangements have been uploaded.</p>',
        category: 'Academic',
        branch: 'All',
        isImportant: true,
        status: 'published',
        publishAt: '2026-10-10T10:00:00.000Z',
        attachments: [
            {
                name: 'Exam_Schedule_Winter_2026.pdf',
                url: '#'
            }
        ],
        createdBy: {
            name: 'Academic Dean Office',
            role: 'Dean'
        }
    },
    {
        _id: 'sample-notice-2',
        title: 'SAMPLE - B.Tech Spot Round Admissions & Institutional Vacancy Counselling',
        body: '<p>Eligible candidates seeking admission to vacant seats in CSE, ECE, ME, and EE branches are invited to attend the on-campus spot counselling session. Please bring all original verification documents, rank letters, and demand draft as specified in the guidelines.</p>',
        category: 'Admissions',
        branch: 'All',
        isImportant: false,
        status: 'published',
        publishAt: '2026-10-08T09:30:00.000Z',
        attachments: [
            {
                name: 'Admissions_Guidelines_2026.pdf',
                url: '#'
            },
            {
                name: 'Seat_Matrix_CategoryWise.pdf',
                url: '#'
            }
        ],
        createdBy: {
            name: 'Admission Committee',
            role: 'Chairperson'
        }
    },
    {
        _id: 'sample-notice-3',
        title: "SAMPLE - Annual National Technical Symposium 'TechKriti 2026' Call for Papers and Project Registration",
        body: '<p>SoET is pleased to announce TechKriti 2026, our flagship national technical festival featuring 25+ cutting-edge competitions including autonomous robotics challenges, AI system hackathons, circuit debugging, paper presentations, and venture pitch decks. Teams from engineering institutions across India are invited to participate. Early bird registrations close next week. Attractive cash prizes worth over ₹2,50,000 will be awarded to winners across categories along with direct internship interview opportunities from our partner tech firms. Detailed problem statements and rubric guidelines are accessible via the festival portal.</p>',
        category: 'Events',
        branch: 'All',
        isImportant: false,
        status: 'published',
        publishAt: '2026-10-05T14:15:00.000Z',
        attachments: [],
        createdBy: {
            name: 'Student Technical Society',
            role: 'Coordinator'
        }
    },
    {
        _id: 'sample-notice-4',
        title: 'SAMPLE - Declaration of Re-evaluation Results for B.Tech IV Semester Examinations',
        body: '<p>The re-evaluation results for B.Tech IV Semester examinations held in June 2026 have been officially declared. Students can access their updated grade cards through their individual student dashboards.</p>',
        category: 'Results',
        branch: 'All',
        isImportant: false,
        status: 'published',
        publishAt: '2026-09-28T11:00:00.000Z',
        attachments: [],
        createdBy: {
            name: 'Controller of Examinations',
            role: 'CoE'
        }
    },
    {
        _id: 'sample-notice-5',
        title: 'SAMPLE - Campus Placement Drive Registration by Infosys & Tata Consultancy Services for 2027 Batch',
        body: '<p>The Training & Placement Cell is organizing a joint recruitment drive for final year engineering students. Eligible candidates must complete their portal registration and resume upload before October 15, 2026.</p>',
        category: 'Placement',
        branch: 'CSE, ECE',
        isImportant: false,
        status: 'published',
        publishAt: '2026-09-20T16:00:00.000Z',
        attachments: [
            {
                name: 'Placement_Eligibility_Criteria.pdf',
                url: '#'
            }
        ],
        createdBy: {
            name: 'Training & Placement Officer',
            role: 'TPO'
        }
    },
    {
        _id: 'sample-notice-6',
        title: 'SAMPLE - Standing Institutional Directives on Laboratory Safety Protocols and Equipment Usage',
        body: '<p>All students and faculty members utilizing engineering laboratories must adhere strictly to institution safety directives, wear protective lab coats and safety footwear, and register equipment log hours with laboratory technicians prior to commencement of practical sessions.</p>',
        category: 'General',
        branch: 'All',
        isImportant: false,
        status: 'published',
        publishAt: null,
        attachments: [],
        createdBy: {
            name: 'Safety & Infrastructure Cell',
            role: 'Superintendent'
        }
    }
];
