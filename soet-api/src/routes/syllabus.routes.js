import express from 'express';
import { getSyllabi, createSyllabus, updateSyllabus, deleteSyllabus } from '../controllers/syllabus.controller.js';
import { authenticate } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const pdfFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || path.extname(file.originalname).toLowerCase() === '.pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed for syllabus uploads'), false);
    }
};
const upload = multer({ dest: 'uploads/syllabus/', fileFilter: pdfFilter, limits: { fileSize: 20 * 1024 * 1024 } });

const router = express.Router();

router.use(authenticate);

// Student/Teacher can read (filtered to their branch in controller). Admin/HOD can read all.
router.get('/', getSyllabi);

// Admin / HOD write operations
router.post('/', upload.single('file'), createSyllabus);
router.put('/:id', upload.single('file'), updateSyllabus);
router.delete('/:id', deleteSyllabus);

export default router;
