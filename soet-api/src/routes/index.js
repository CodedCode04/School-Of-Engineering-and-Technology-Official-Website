import express from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiry.controller.js';
import { login, register, logout, me } from '../controllers/auth.controller.js';
import { presignUpload } from '../controllers/upload.controller.js';
import { authenticate, authorize, requireApproved } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { syllabusSchema, enquirySchema, presignSchema } from '../utils/validators.js';

import { verifyTurnstile } from '../middleware/turnstile.js';

import { getUsers, updateUserStatus, createTPO, deleteUser, updateChatBlock } from '../controllers/admin.controller.js';
import { getBranches, createBranch, updateBranch, deleteBranch } from '../controllers/branch.controller.js';
import announcementRoutes from './announcement.routes.js';
import syllabusRoutes from './syllabus.routes.js';
import auditRoutes from './audit.routes.js';
import studentPortfolioRoutes from './student-portfolio.routes.js';
import tpoRoutes from './tpo.routes.js';

const router = express.Router();

router.use('/announcements', announcementRoutes);
router.use('/syllabus', syllabusRoutes);
router.use('/audit-logs', auditRoutes);

// Public read-only routes
router.get('/branches', getBranches);

// Public form submissions with Turnstile protection
router.post('/enquiries', verifyTurnstile, validate(enquirySchema), createEnquiry);
router.post('/newsletter', verifyTurnstile, (req, res) => res.json({ success: true, message: 'Subscribed' }));

// Auth Routes (Turnstile removed temporarily for local testing, can be added back if needed)
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/me', authenticate, me);

import { getProfile, submitProfile } from '../controllers/student.controller.js';
import { getPendingStudents, getVerifiedStudents, verifyStudent, bulkVerifyStudents } from '../controllers/staff.controller.js';
import { uploadProfilePhoto } from '../middleware/upload.js';

// Student Routes
const studentRouter = express.Router();
studentRouter.use(authenticate, requireApproved, authorize('student'));
studentRouter.get('/profile', getProfile);
studentRouter.post('/profile', uploadProfilePhoto.single('photo'), submitProfile);
router.use('/student', studentRouter);
router.use('/student/portfolio', studentPortfolioRoutes);

// Staff Routes (Admin & HOD)
const staffRouter = express.Router();
staffRouter.use(authenticate, requireApproved, authorize('admin', 'hod'));
staffRouter.get('/students/pending', getPendingStudents);
staffRouter.get('/students/verified', getVerifiedStudents);
staffRouter.put('/students/bulk-verify', bulkVerifyStudents);
staffRouter.put('/students/:id/verify', verifyStudent);
router.use('/staff', staffRouter);

// Admin protected routes
const adminRouter = express.Router();
adminRouter.use(authenticate, authorize('admin'));

adminRouter.post('/uploads/presign', validate(presignSchema), presignUpload);


adminRouter.get('/enquiries', getEnquiries);

// User management by admin
adminRouter.get('/users', getUsers);
adminRouter.put('/users/:id/status', updateUserStatus);
adminRouter.put('/users/:id/chat-block', updateChatBlock);
adminRouter.delete('/users/:id', deleteUser);
adminRouter.post('/users/tpo', createTPO);

// Branch management by admin
adminRouter.post('/branches', createBranch);
adminRouter.put('/branches/:id', updateBranch);
adminRouter.delete('/branches/:id', deleteBranch);

router.use('/admin', adminRouter);
router.use('/tpo', tpoRoutes);

import notificationRoutes from './notification.routes.js';
router.use('/notifications', notificationRoutes);

import chatRoutes from './chat.routes.js';
router.use('/chat', chatRoutes);

import alumniRoutes from './alumni.routes.js';
router.use('/alumni', alumniRoutes);

export default router;
