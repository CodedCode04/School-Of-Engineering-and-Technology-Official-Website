import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
    createNotification,
    getNotifications,
    markRead,
    markAllRead,
    getSentNotifications,
    editNotification,
    deleteNotification
} from '../controllers/notification.controller.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createNotification);
router.get('/', getNotifications);
router.get('/sent', getSentNotifications);
router.put('/read-all', markAllRead);
router.put('/:id/read', markRead);
router.put('/:id', editNotification);
router.delete('/:id', deleteNotification);

export default router;
