import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import Branch from './src/models/Branch.js';

async function seedTestAccounts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const cseBranch = await Branch.findOne({ code: 'CSE' });
    if (!cseBranch) {
        throw new Error('Run seed.js first to create branches');
    }

    const roles = ['hod', 'teacher', 'student', 'alumni'];
    
    for (const role of roles) {
        const email = `${role}@soet.edu`;
        const existing = await User.findOne({ email });
        if (!existing) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            await User.create({
                name: `Test ${role}`,
                email,
                password: hashedPassword,
                role,
                branch: cseBranch._id,
                status: 'approved' // Auto-approve for testing
            });
            console.log(`Created test account: ${email} / password123`);
        } else {
            console.log(`Test account ${email} already exists`);
        }
    }

    // TPO does not need a branch
    const tpoEmail = `tpo@soet.edu`;
    const existingTpo = await User.findOne({ email: tpoEmail });
    if (!existingTpo) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
            name: `Test TPO`,
            email: tpoEmail,
            password: hashedPassword,
            role: 'tpo',
            status: 'approved'
        });
        console.log(`Created test account: ${tpoEmail} / password123`);
    } else {
        console.log(`Test account ${tpoEmail} already exists`);
    }

    console.log('Test accounts seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedTestAccounts();
