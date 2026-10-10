import express from 'express';
import {
    getProfile, submitProfile, getDirectory,
    getJobReferrals, createJobReferral,
    createMentorshipRequest, getMentorshipRequests, updateMentorshipRequest,
    getSuccessStories, createSuccessStory, updateSuccessStoryStatus
} from '../controllers/alumni.controller.js';
import { authenticate, authorize, requireApproved } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/alumni';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Profile
router.get('/profile', authenticate, getProfile);
router.post('/profile', authenticate, upload.single('photo'), submitProfile);
router.put('/profile', authenticate, upload.single('photo'), submitProfile);

// Directory
router.get('/directory', authenticate, getDirectory);

// Job Referrals
router.get('/jobs', authenticate, getJobReferrals);
router.post('/jobs', authenticate, authorize('alumni'), requireApproved, createJobReferral);

// Mentorship
router.get('/mentorship', authenticate, requireApproved, getMentorshipRequests);
router.post('/mentorship', authenticate, authorize('student'), requireApproved, createMentorshipRequest);
router.put('/mentorship/:id', authenticate, authorize('alumni'), requireApproved, updateMentorshipRequest);

// Success Stories
router.get('/stories', getSuccessStories);                                              // public: shows published only
router.post('/stories', authenticate, authorize('alumni'), requireApproved, createSuccessStory);
router.put('/stories/:id/status', authenticate, authorize('admin'), updateSuccessStoryStatus);

export default router;
