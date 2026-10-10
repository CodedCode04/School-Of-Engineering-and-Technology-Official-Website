import 'dotenv/config';
import mongoose from 'mongoose';
import Branch from './src/models/Branch.js';
import ChatRoom from './src/models/ChatRoom.js';

async function seedChatRooms() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Global rooms
        const globalRooms = [
            { name: 'Teachers Group', type: 'teachers' },
            { name: 'HOD Group', type: 'hod' },
            { name: 'Administrative Group', type: 'admin' },
            { name: 'Alumni Chat', type: 'alumni' }
        ];

        for (const room of globalRooms) {
            const existing = await ChatRoom.findOne({ name: room.name });
            if (!existing) {
                await ChatRoom.create(room);
                console.log(`Created room: ${room.name}`);
            }
        }

        // Branch rooms
        const branches = await Branch.find();
        for (const branch of branches) {
            const roomName = `${branch.code} Student Room`;
            const existing = await ChatRoom.findOne({ name: roomName });
            if (!existing) {
                await ChatRoom.create({
                    name: roomName,
                    type: 'branch',
                    branch: branch._id
                });
                console.log(`Created room: ${roomName}`);
            }
        }

        console.log('Chat rooms seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedChatRooms();
