import mongoose from 'mongoose';

const SyllabusSchema = new mongoose.Schema({
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    subjectCode: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

SyllabusSchema.index({ branch: 1, semester: 1 });
SyllabusSchema.index({ subjectCode: 1 });

export default mongoose.model('Syllabus', SyllabusSchema);
