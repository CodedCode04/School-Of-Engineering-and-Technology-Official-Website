import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import Branch from './src/models/Branch.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Branches
    const branches = [
      { name: 'Computer Science and Engineering', code: 'CSE' },
      { name: 'Information Technology', code: 'IT' },
      { name: 'Electronics and Communication Engineering', code: 'ECE' },
      { name: 'Mechanical Engineering', code: 'Mech' },
      { name: 'Civil Engineering', code: 'Civil' }
    ];

    for (const branchData of branches) {
      const existingBranch = await Branch.findOne({ code: branchData.code });
      if (!existingBranch) {
        await Branch.create(branchData);
        console.log(`Created branch: ${branchData.code}`);
      } else {
        console.log(`Branch already exists: ${branchData.code}`);
      }
    }

    // Create Admin
    const adminEmail = 'admin@soet.edu';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'approved' // Admins are automatically approved
      });
      console.log('Created admin user: admin@soet.edu / admin123');
    } else {
      console.log('Admin user already exists.');
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
