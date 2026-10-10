import mongoose from 'mongoose';

const jobReferralSchema = new mongoose.Schema({
    alumni: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('JobReferral', jobReferralSchema);
