import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getRooms, getMessages, deleteMessage } from '../controllers/chat.controller.js';

const router = express.Router();

router.use(authenticate);

router.get('/rooms', getRooms);
router.get('/rooms/:roomId/messages', getMessages);
router.delete('/messages/:messageId', deleteMessage);

import multer from 'multer';
import path from 'path';

const ALLOWED_CHAT_MIME = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const chatFileFilter = (req, file, cb) => {
    if (ALLOWED_CHAT_MIME.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Allowed: images, PDF, Word documents.'), false);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/chat/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`)
});
const upload = multer({ 
    storage, 
    fileFilter: chatFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post('/upload', upload.single('attachment'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;
