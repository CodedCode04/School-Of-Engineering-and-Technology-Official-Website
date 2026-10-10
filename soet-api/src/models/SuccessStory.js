import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema({
    alumni: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, enum: ['pending', 'published'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('SuccessStory', successStorySchema);
