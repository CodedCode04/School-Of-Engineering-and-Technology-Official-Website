import mongoose from 'mongoose';

const alumniProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    enrollmentNo: { type: String, required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    passingYear: { type: Number, required: true },
    company: { type: String },
    role: { type: String },
    location: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    linkedin: { type: String },
    photo: { type: String }
}, { timestamps: true });

export default mongoose.model('AlumniProfile', alumniProfileSchema);
