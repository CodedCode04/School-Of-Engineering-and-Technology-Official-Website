import express from 'express';
import { getAnnouncements, getAnnouncementById, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcement.controller.js';
import { authenticate, authorize, requireApproved } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Setup Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/uploads/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const uploadFields = upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'attachments', maxCount: 10 }
]);

// Public routes
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);

// Protected routes (Admin, HOD, TPO)
router.use(authenticate, requireApproved, authorize('admin', 'hod', 'tpo'));

router.post('/', uploadFields, createAnnouncement);
router.put('/:id', uploadFields, updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;
