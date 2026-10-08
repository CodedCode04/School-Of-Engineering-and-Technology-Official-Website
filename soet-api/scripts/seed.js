import mongoose from 'mongoose';
import Notice from '../src/models/Notice.js';
import 'dotenv/config';
import { connectDB } from '../src/config/db.js';

const seedNotices = [
    {
        title: 'Welcome to the new SoET Portal',
        description: 'The new unified portal for School of Engineering and Technology is now live.',
        category: 'General',
        isPinned: true
    },
    {
        title: 'B.Tech Admissions Open for 2024-25',
        description: 'Admissions for various B.Tech branches are now open. Visit the admissions block for more details.',
        category: 'Academic',
        isPinned: true
    },
    {
        title: 'Mid-Semester Examination Schedule',
        description: 'The schedule for the upcoming mid-semester examinations has been finalized and will be distributed shortly.',
        category: 'Exam',
        isPinned: false
    }
];

const runSeed = async () => {
    try {
        await connectDB();
        
        const count = await Notice.countDocuments();
        if (count === 0) {
            console.log('Seeding initial notices...');
            await Notice.insertMany(seedNotices);
            console.log('Notices seeded successfully.');
        } else {
            console.log('Notices collection is not empty. Skipping seed.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Seed Error:', error);
        process.exit(1);
    }
};

runSeed();
