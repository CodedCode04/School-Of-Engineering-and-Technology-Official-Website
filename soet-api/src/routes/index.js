import express from 'express';
import { getNotices, getNoticeById, createNotice, updateNotice, deleteNotice } from '../controllers/notice.controller.js';
import { getSyllabus, createSyllabus, updateSyllabus, deleteSyllabus } from '../controllers/syllabus.controller.js';
import { createEnquiry, getEnquiries } from '../controllers/enquiry.controller.js';
import { login } from '../controllers/auth.controller.js';
import { presignUpload } from '../controllers/upload.controller.js';
import { verifyAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, noticeSchema, syllabusSchema, enquirySchema, presignSchema } from '../utils/validators.js';

import { verifyTurnstile } from '../middleware/turnstile.js';

const router = express.Router();

// Public read-only routes
router.get('/notices', getNotices);
router.get('/notices/:id', getNoticeById);
router.get('/syllabus', getSyllabus);

// Public form submissions with Turnstile protection
router.post('/enquiries', verifyTurnstile, validate(enquirySchema), createEnquiry);
// Add newsletter placeholder route since it's in frontend but missing here
router.post('/newsletter', verifyTurnstile, (req, res) => res.json({ success: true, message: 'Subscribed' }));

// Admin Auth
router.post('/admin/login', verifyTurnstile, validate(loginSchema), login);

// Admin protected routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);

adminRouter.post('/uploads/presign', validate(presignSchema), presignUpload);

adminRouter.post('/notices', validate(noticeSchema), createNotice);
adminRouter.put('/notices/:id', validate(noticeSchema), updateNotice);
adminRouter.delete('/notices/:id', deleteNotice);

adminRouter.post('/syllabus', validate(syllabusSchema), createSyllabus);
adminRouter.put('/syllabus/:id', validate(syllabusSchema), updateSyllabus);
adminRouter.delete('/syllabus/:id', deleteSyllabus);

adminRouter.get('/enquiries', getEnquiries);

router.use('/admin', adminRouter);

export default router;
