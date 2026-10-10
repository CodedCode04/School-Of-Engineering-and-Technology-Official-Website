import express from 'express';
import { getStudents, getStudentDetails } from '../controllers/tpo.controller.js';
import { authenticate, authorize, requireApproved } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticate, requireApproved, authorize('tpo', 'admin', 'hod')); // allow admin and hod as well for flexibility

router.get('/students', getStudents);
router.get('/students/:userId', getStudentDetails);

export default router;
