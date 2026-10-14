import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';
import StudentProfile from '../models/StudentProfile.js';

export const canAccessRoom = async (user, room) => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admin can access everything
    
    // General campus rooms are open to all authenticated users
    if (room.type === 'general' || !room.type) {
        return true;
    }

    if (room.type === 'branch') {
        if (user.role === 'hod' || user.role === 'tpo') return true; // HODs and TPO can access all branch rooms
        if (user.role === 'teacher') {
            if (!room.branch) return true;
            return user.branch?.toString() === room.branch?._id?.toString() || user.branch?.toString() === room.branch?.toString();
        }
        if (user.role === 'student') {
            // If room branch matches user's branch
            const userBranchStr = user.branch?._id?.toString() || user.branch?.toString();
            const roomBranchStr = room.branch?._id?.toString() || room.branch?.toString();
            if (userBranchStr && roomBranchStr && userBranchStr === roomBranchStr) {
                return true;
            }
            // Check student profile verification
            const profile = await StudentProfile.findOne({ user: user._id });
            if (profile && profile.verificationStatus === 'verified') {
                const profBranchStr = profile.branch?._id?.toString() || profile.branch?.toString();
                if (!room.branch || (profBranchStr && profBranchStr === roomBranchStr)) {
                    return true;
                }
            }
            // If user is approved student, allow access
            if (user.status === 'approved' && (!room.branch || userBranchStr === roomBranchStr)) {
                return true;
            }
            return false;
        }
        if (user.role === 'alumni') {
            const userBranchStr = user.branch?._id?.toString() || user.branch?.toString();
            const roomBranchStr = room.branch?._id?.toString() || room.branch?.toString();
            return !room.branch || (userBranchStr && userBranchStr === roomBranchStr);
        }
        return false;
    }
    
    if (room.type === 'teachers') {
        return ['teacher', 'hod', 'admin', 'tpo'].includes(user.role);
    }
    
    if (room.type === 'hod') {
        return ['hod', 'admin'].includes(user.role);
    }
    
    if (room.type === 'admin') {
        return ['admin', 'hod', 'tpo'].includes(user.role);
    }
    
    if (room.type === 'alumni') {
        return ['alumni', 'hod', 'admin', 'tpo', 'student', 'teacher'].includes(user.role);
    }
    
    return false;
};

export const getRooms = async (req, res, next) => {
    try {
        let rooms = await ChatRoom.find().populate('branch', 'name code');

        // If no rooms exist in database, create the core default rooms
        if (rooms.length === 0) {
            const defaults = [
                { name: 'Campus Common Room', type: 'general' },
                { name: 'Teachers Group', type: 'teachers' },
                { name: 'HOD Group', type: 'hod' },
                { name: 'Administrative Group', type: 'admin' },
                { name: 'Alumni & Student Network', type: 'alumni' }
            ];
            for (const item of defaults) {
                await ChatRoom.create(item);
            }
            rooms = await ChatRoom.find().populate('branch', 'name code');
        }

        const accessibleRooms = [];
        for (const room of rooms) {
            if (await canAccessRoom(req.user, room)) {
                accessibleRooms.push(room);
            }
        }
        res.json(accessibleRooms);
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const { roomId } = req.params;
        const { page = 1, limit = 50 } = req.query;
        
        const room = await ChatRoom.findById(roomId);
        if (!room) return res.status(404).json({ error: 'Room not found' });
        
        if (!(await canAccessRoom(req.user, room))) {
            return res.status(403).json({ error: 'Access denied to this room' });
        }
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const messages = await Message.find({ room: roomId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('sender', 'name role');
            
        res.json(messages.reverse());
    } catch (error) {
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const { roomId } = req.params;
        const { text, attachment } = req.body;

        const room = await ChatRoom.findById(roomId);
        if (!room) return res.status(404).json({ error: 'Room not found' });

        if (!(await canAccessRoom(req.user, room))) {
            return res.status(403).json({ error: 'Access denied to this room' });
        }

        if (req.user.chatBlock?.blocked) {
            if (!req.user.chatBlock.until || new Date(req.user.chatBlock.until) > new Date()) {
                return res.status(403).json({ error: 'You are blocked from sending messages', reason: req.user.chatBlock.reason });
            }
        }

        if (!text && !attachment) {
            return res.status(400).json({ error: 'Message content is required' });
        }

        const message = await Message.create({
            room: roomId,
            sender: req.user._id,
            text,
            attachment
        });

        const populated = await Message.findById(message._id).populate('sender', 'name role');

        try {
            const socketModule = await import('../socket.js');
            if (socketModule && socketModule.getIO) {
                const ioInstance = socketModule.getIO();
                if (ioInstance) {
                    ioInstance.to(roomId).emit('new_message', populated);
                }
            }
        } catch (e) {
            console.error('Socket emit error:', e.message);
        }

        res.status(201).json(populated);
    } catch (error) {
        next(error);
    }
};

export const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message) return res.status(404).json({ error: 'Not found' });
        
        if (message.sender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
        
        message.deleted = true;
        await message.save();
        
        res.json({ message: 'Deleted' });
    } catch (error) {
        next(error);
    }
};
