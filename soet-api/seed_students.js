import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import User from './src/models/User.js';
import StudentProfile from './src/models/StudentProfile.js';
import Branch from './src/models/Branch.js';
import AcademicRecord from './src/models/AcademicRecord.js';
import Achievement from './src/models/Achievement.js';

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const branches = await Branch.find();
        if (branches.length === 0) {
            console.log('No branches found. Please create branches first.');
            process.exit(1);
        }

        const admin = await User.findOne({ role: 'admin' });
        const adminId = admin ? admin._id : null;

        const hashed = await bcrypt.hash('password123', 10);
        
        console.log('Seeding 30 students...');

        const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Rian', 'Kabir', 'Rudra', 'Aryan', 'Dhruv', 'Ananya', 'Diya', 'Avni', 'Myra', 'Kavya', 'Sia', 'Priya', 'Riya', 'Sara', 'Neha', 'Aisha'];
        const lastNames = ['Patel', 'Sharma', 'Singh', 'Kumar', 'Das', 'Gupta', 'Verma', 'Mishra', 'Pandey', 'Reddy'];
        const categories = ['academic', 'sports', 'cultural', 'technical', 'hackathon', 'internship', 'certification'];
        const statuses = ['Unplaced', 'Placed', 'Not Interested'];

        for (let i = 0; i < 30; i++) {
            const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
            const name = `${fname} ${lname}`;
            const email = `student${i + 100}@soet.edu`;
            const branch = branches[Math.floor(Math.random() * branches.length)];
            
            // Create user
            const user = new User({
                name,
                email,
                password: hashed,
                role: 'student',
                branch: branch._id,
                status: 'approved'
            });
            await user.save();

            // Create profile
            const currentYear = ['1', '2', '3', '4'][Math.floor(Math.random() * 4)];
            const semester = String(parseInt(currentYear) * 2 - Math.floor(Math.random() * 2)); // roughly maps year to semester
            
            const baseCgpa = 6 + Math.random() * 4; // 6 to 10
            
            const profile = new StudentProfile({
                user: user._id,
                enrollmentNo: `EN${2023000 + i}`,
                name,
                fatherName: `${lname} Sr.`,
                course: 'B.Tech',
                department: branch.name,
                sessionBatch: '2022-2026',
                phone: `98765${Math.floor(10000 + Math.random() * 90000)}`,
                validUntil: new Date('2026-06-30'),
                photo: '/uploads/default_photo.jpg',
                email,
                currentYear,
                semester,
                branch: branch._id,
                verificationStatus: 'verified',
                verifiedBy: adminId,
                verifiedAt: new Date(),
                skills: ['JavaScript', 'Python', 'React', 'Node.js', 'C++', 'Java'].sort(() => 0.5 - Math.random()).slice(0, 3),
                placementStatus: statuses[Math.floor(Math.random() * statuses.length)],
                currentCgpa: baseCgpa
            });
            
            if (Math.random() > 0.5) {
                profile.internships.push({
                    company: 'Tech Corp',
                    role: 'SDE Intern',
                    duration: '2 months',
                    description: 'Worked on backend APIs'
                });
            }

            await profile.save();

            // Create Academic Records
            const semestersPassed = parseInt(semester);
            for (let sem = 1; sem <= semestersPassed; sem++) {
                const sgpa = Math.min(10, Math.max(5, baseCgpa + (Math.random() * 2 - 1))); // fluctuate around cgpa
                await AcademicRecord.create({
                    student: user._id,
                    semester: sem,
                    sgpa: sgpa.toFixed(2),
                    cgpa: sem === semestersPassed ? baseCgpa.toFixed(2) : ((baseCgpa + sgpa) / 2).toFixed(2),
                    backlogs: Math.random() > 0.8 ? 1 : 0
                });
            }

            // Create Achievements
            if (Math.random() > 0.3) {
                await Achievement.create({
                    student: user._id,
                    title: 'Participated in CodeFest',
                    category: categories[Math.floor(Math.random() * categories.length)],
                    date: new Date(new Date().getTime() - Math.random() * 10000000000),
                    description: 'Won 2nd prize in competitive programming.'
                });
            }
        }

        console.log('Successfully seeded 30 students.');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seed();
