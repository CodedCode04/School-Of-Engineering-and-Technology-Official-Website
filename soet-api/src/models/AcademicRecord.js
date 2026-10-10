import mongoose from 'mongoose';

const AcademicRecordSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    sgpa: {
        type: Number,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    backlogs: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// A student can have only one record per semester
AcademicRecordSchema.index({ student: 1, semester: 1 }, { unique: true });

export default mongoose.model('AcademicRecord', AcademicRecordSchema);
