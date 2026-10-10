import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['official', 'branch', 'personal'],
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        scope: {
            type: String,
            enum: ['all', 'role', 'branch', 'user'],
            required: true
        },
        role: {
            type: String,
            enum: ['student', 'teacher', 'hod', 'tpo', 'alumni']
        },
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    attachments: [{
        name: String,
        url: String
    }],
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
