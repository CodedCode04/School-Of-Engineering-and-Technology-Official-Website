import StudentProfile from '../models/StudentProfile.js';
import Notification from '../models/Notification.js';
import { getIO } from '../socket.js';

const sendNotification = async (userId, senderId, message) => {
    try {
        const notif = await Notification.create({
            title: 'Profile Verification Update',
            message,
            type: 'personal',
            sender: senderId,
            target: { scope: 'user', user: userId },
            readBy: []
        });
        const io = getIO();
        const notificationData = await notif.populate('sender', 'name role');
        io.to(userId.toString()).emit('new_notification', notificationData);
    } catch (err) {
        console.error('Notification error:', err);
    }
};

export const getPendingStudents = async (req, res, next) => {
    try {
        const query = { verificationStatus: 'pending' };
        
        // HOD sees only their own branch
        if (req.user.role === 'hod') {
            query.branch = req.user.branch;
        }

        const students = await StudentProfile.find(query).populate('branch');
        res.json(students);
    } catch (error) {
        next(error);
    }
};

export const getVerifiedStudents = async (req, res, next) => {
    try {
        const query = { verificationStatus: 'verified' };
        
        // HOD sees only their own branch
        if (req.user.role === 'hod') {
            query.branch = req.user.branch;
        }

        const students = await StudentProfile.find(query).populate('branch');
        res.json(students);
    } catch (error) {
        next(error);
    }
};

export const verifyStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;

        if (!['verified', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        if (status === 'rejected' && !reason) {
            return res.status(400).json({ error: 'Rejection reason is required' });
        }

        const profile = await StudentProfile.findById(id);
        
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        if (req.user.role === 'hod' && profile.branch.toString() !== req.user.branch.toString()) {
            return res.status(403).json({ error: 'You can only verify students from your branch' });
        }

        profile.verificationStatus = status;
        if (status === 'rejected') {
            profile.rejectionReason = reason;
        } else {
            profile.rejectionReason = undefined;
            profile.verifiedBy = req.user._id;
            profile.verifiedAt = new Date();
        }

        await profile.save();

        // Notification Hook
        await sendNotification(profile.user, req.user._id, `Your profile verification has been ${status}.`);

        res.json({ message: `Student profile ${status} successfully`, profile });
    } catch (error) {
        next(error);
    }
};

export const bulkVerifyStudents = async (req, res, next) => {
    try {
        const { studentIds } = req.body; // array of profile IDs

        if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).json({ error: 'studentIds array is required' });
        }

        const query = { _id: { $in: studentIds } };

        if (req.user.role === 'hod') {
            query.branch = req.user.branch;
        }

        const profiles = await StudentProfile.find(query);

        const updatePromises = profiles.map(async (profile) => {
            profile.verificationStatus = 'verified';
            profile.rejectionReason = undefined;
            profile.verifiedBy = req.user._id;
            profile.verifiedAt = new Date();
            await profile.save();
            await sendNotification(profile.user, req.user._id, `Your profile verification has been verified.`);
        });

        await Promise.all(updatePromises);

        res.json({ message: `${profiles.length} student profiles verified successfully` });
    } catch (error) {
        next(error);
    }
};
