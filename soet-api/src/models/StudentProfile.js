import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  enrollmentNo: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  sessionBatch: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  photo: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currentYear: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  verificationStatus: {
    type: String,
    enum: ['not_submitted', 'pending', 'verified', 'rejected'],
    default: 'not_submitted'
  },
  rejectionReason: {
    type: String
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },

  // Extras for Academic & Achievements
  skills: [{ type: String }],
  projects: [{
      title: String,
      description: String,
      link: String
  }],
  internships: [{
      company: String,
      role: String,
      duration: String,
      description: String
  }],
  placementStatus: {
      type: String,
      enum: ['Unplaced', 'Placed', 'Not Interested'],
      default: 'Unplaced'
  },
  resumeFile: { type: String },
  linkedin: { type: String },
  github: { type: String },
  currentCgpa: { type: Number, default: 0 }
}, { timestamps: true });

// Requested Indexes for TPO search & filter
studentProfileSchema.index({ branch: 1 });
studentProfileSchema.index({ currentYear: 1 });
studentProfileSchema.index({ semester: 1 });
studentProfileSchema.index({ currentCgpa: -1 });
studentProfileSchema.index({ placementStatus: 1 });

export default mongoose.model('StudentProfile', studentProfileSchema);
