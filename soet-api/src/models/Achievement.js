import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['academic', 'sports', 'cultural', 'technical', 'hackathon', 'internship', 'certification'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    certificateFile: {
        type: String
    }
}, { timestamps: true });

AchievementSchema.index({ student: 1, category: 1 });

export default mongoose.model('Achievement', AchievementSchema);
