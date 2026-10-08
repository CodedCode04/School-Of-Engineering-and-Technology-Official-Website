import mongoose from 'mongoose';

const SyllabusUploadSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        required: true,
        trim: true
    },
    semester: {
        type: Number,
        required: true
    },
    academicYear: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    fileKey: {
        type: String,
        required: true // R2 Object Key
    },
    fileName: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Index for filtering by course, branch, and semester efficiently
SyllabusUploadSchema.index({ isActive: 1, course: 1, branch: 1, semester: 1 });

export default mongoose.model('SyllabusUpload', SyllabusUploadSchema);
