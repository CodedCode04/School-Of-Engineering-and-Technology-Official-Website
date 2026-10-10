import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'hod', 'teacher', 'student', 'tpo', 'alumni'],
    required: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: function() {
      // Branch is required for everyone except admin and tpo
      return !['admin', 'tpo'].includes(this.role);
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'blocked'],
    default: 'pending'
  },
  chatBlock: {
    blocked: { type: Boolean, default: false },
    until: { type: Date },
    reason: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
