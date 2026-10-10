import Notification from '../models/Notification.js';
import { getIO } from '../socket.js';

export const createNotification = async (req, res, next) => {
    try {
        const { title, message, type, target, attachments } = req.body;

        // Permissions check: HOD/Admin/TPO
        const role = req.user.role;
        if (!['admin', 'hod', 'tpo'].includes(role)) {
            return res.status(403).json({ error: 'You are not authorized to send notifications' });
        }

        // Additional validation
        if (role === 'hod' && target.scope === 'branch' && target.branch !== req.user.branch?.toString()) {
            return res.status(403).json({ error: 'HOD can only target their own branch' });
        }
        if (role === 'tpo' && !['all', 'branch', 'role', 'user'].includes(target.scope)) {
            // TPO can target students usually, but we allow them depending on the UI
        }

        const notification = await Notification.create({
            title,
            message,
            type,
            target,
            attachments: attachments || [],
            sender: req.user._id,
            readBy: []
        });

        const io = getIO();
        const notificationData = await notification.populate('sender', 'name role');

        // Emit to appropriate rooms
        if (target.scope === 'all') {
            io.emit('new_notification', notificationData);
        } else if (target.scope === 'role') {
            io.to(`role:${target.role}`).emit('new_notification', notificationData);
        } else if (target.scope === 'branch') {
            io.to(`branch:${target.branch}`).emit('new_notification', notificationData);
        } else if (target.scope === 'user') {
            io.to(target.user.toString()).emit('new_notification', notificationData);
        }

        res.status(201).json(notification);
    } catch (error) {
        next(error);
    }
};

export const getNotifications = async (req, res, next) => {
    try {
        const { unread, page = 1, limit = 20 } = req.query;

        const query = {
            $or: [
                { 'target.scope': 'all' },
                { 'target.scope': 'role', 'target.role': req.user.role },
                { 'target.scope': 'user', 'target.user': req.user._id }
            ]
        };

        if (req.user.branch) {
            query.$or.push({ 'target.scope': 'branch', 'target.branch': req.user.branch });
        }

        if (unread === 'true') {
            query.readBy = { $ne: req.user._id };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('sender', 'name role');

        const total = await Notification.countDocuments(query);

        res.json({
            notifications,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        next(error);
    }
};

export const markRead = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });

        if (!notification.readBy.includes(req.user._id)) {
            notification.readBy.push(req.user._id);
            await notification.save();
        }

        res.json({ message: 'Marked as read' });
    } catch (error) {
        next(error);
    }
};

export const markAllRead = async (req, res, next) => {
    try {
        const query = {
            $or: [
                { 'target.scope': 'all' },
                { 'target.scope': 'role', 'target.role': req.user.role },
                { 'target.scope': 'user', 'target.user': req.user._id }
            ],
            readBy: { $ne: req.user._id }
        };

        if (req.user.branch) {
            query.$or.push({ 'target.scope': 'branch', 'target.branch': req.user.branch });
        }

        await Notification.updateMany(query, { $push: { readBy: req.user._id } });

        res.json({ message: 'All marked as read' });
    } catch (error) {
        next(error);
    }
};

export const getSentNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ sender: req.user._id })
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        next(error);
    }
};

export const editNotification = async (req, res, next) => {
    try {
        const { title, message } = req.body;
        const notification = await Notification.findById(req.params.id);

        if (!notification) return res.status(404).json({ error: 'Not found' });

        if (notification.sender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        notification.title = title || notification.title;
        notification.message = message || notification.message;
        await notification.save();

        const io = getIO();
        const notificationData = await notification.populate('sender', 'name role');
        
        // Broadcast update
        if (notification.target.scope === 'all') io.emit('update_notification', notificationData);
        else if (notification.target.scope === 'role') io.to(`role:${notification.target.role}`).emit('update_notification', notificationData);
        else if (notification.target.scope === 'branch') io.to(`branch:${notification.target.branch}`).emit('update_notification', notificationData);
        else if (notification.target.scope === 'user') io.to(notification.target.user.toString()).emit('update_notification', notificationData);

        res.json(notification);
    } catch (error) {
        next(error);
    }
};

export const deleteNotification = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ error: 'Not found' });

        if (notification.sender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await notification.deleteOne();

        const io = getIO();
        
        // Broadcast delete
        if (notification.target.scope === 'all') io.emit('delete_notification', req.params.id);
        else if (notification.target.scope === 'role') io.to(`role:${notification.target.role}`).emit('delete_notification', req.params.id);
        else if (notification.target.scope === 'branch') io.to(`branch:${notification.target.branch}`).emit('delete_notification', req.params.id);
        else if (notification.target.scope === 'user') io.to(notification.target.user.toString()).emit('delete_notification', req.params.id);

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};
