import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: null
    },
    attachments: [{
        url: String,
        name: String
    }],
    category: {
        type: String,
        enum: ['General', 'Exam', 'Event', 'Academic', 'Placement', 'News'],
        default: 'General'
    },
    branch: {
        type: String,
        default: 'All'
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published'
    },
    publishAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

AnnouncementSchema.index({ status: 1, isImportant: -1, publishAt: -1 });
AnnouncementSchema.index({ category: 1 });
AnnouncementSchema.index({ branch: 1 });

export default mongoose.model('Announcement', AnnouncementSchema);
