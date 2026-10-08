import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['General', 'Exam', 'Event', 'Academic', 'Placement'], // Based on typical college sites
        default: 'General'
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    attachmentKey: {
        type: String, // R2 Object Key
        default: null
    },
    attachmentName: {
        type: String,
        default: null
    }
}, { timestamps: true });

// Index for typical query patterns: Active notices, ordered by pinned status and publish date
NoticeSchema.index({ isActive: 1, isPinned: -1, publishedAt: -1 });
NoticeSchema.index({ category: 1 });

export default mongoose.model('Notice', NoticeSchema);
