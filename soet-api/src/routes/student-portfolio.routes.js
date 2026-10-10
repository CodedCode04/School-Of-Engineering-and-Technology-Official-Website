import express from 'express';
import { getPortfolio, updateProfileExtras, addAcademicRecord, updateAcademicRecord, deleteAcademicRecord, addAchievement, updateAchievement, deleteAchievement } from '../controllers/student-portfolio.controller.js';
import { authenticate, authorize, requireApproved } from '../middleware/auth.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // need to make sure this works for resume/certificate

const router = express.Router();
router.use(authenticate, requireApproved, authorize('student'));

router.get('/', getPortfolio);
router.put('/extras', upload.single('resumeFile'), updateProfileExtras);

router.post('/academics', addAcademicRecord);
router.put('/academics/:id', updateAcademicRecord);
router.delete('/academics/:id', deleteAcademicRecord);

router.post('/achievements', upload.single('certificateFile'), addAchievement);
router.put('/achievements/:id', upload.single('certificateFile'), updateAchievement);
router.delete('/achievements/:id', deleteAchievement);

export default router;
