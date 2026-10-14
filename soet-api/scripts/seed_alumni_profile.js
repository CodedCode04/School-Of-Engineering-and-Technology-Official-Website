import mongoose from 'mongoose';
import 'dotenv/config';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/soet');
  const user = await mongoose.connection.collection('users').findOne({ email: 'alumni@soet.edu' });
  const branch = await mongoose.connection.collection('branches').findOne({ code: 'CSE' });
  if (user && branch) {
    await mongoose.connection.collection('alumniprofiles').updateOne(
      { user: user._id },
      {
        $set: {
          user: user._id,
          enrollmentNo: 'AL2021001',
          branch: branch._id,
          passingYear: 2021,
          company: 'Google',
          role: 'Senior Software Engineer',
          location: 'Bangalore, India',
          email: 'alumni@soet.edu',
          phone: '+91 9876543210',
          linkedin: 'https://linkedin.com'
        }
      },
      { upsert: true }
    );
    console.log('Alumni test profile seeded successfully');
  }
  process.exit(0);
}
run();
