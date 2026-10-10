import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';
import StudentProfile from '../models/StudentProfile.js';

export const canAccessRoom = async (user, room) => {
    if (user.role === 'admin') return true; // Admin can access everything
    
    if (room.type === 'branch') {
        if (user.role === 'hod') return true; // HODs can open EVERY branch room
        if (user.role === 'teacher') return user.branch?.toString() === room.branch?.toString(); // Teachers only their own branch
        if (user.role === 'student') {
            // Must be verified
            if (user.branch?.toString() !== room.branch?.toString()) return false;
            const profile = await StudentProfile.findOne({ user: user._id });
            return profile && profile.verificationStatus === 'verified';
        }
        return false;
    }
    
    if (room.type === 'teachers') {
        return ['teacher', 'hod', 'admin'].includes(user.role);
    }
    
    if (room.type === 'hod') {
        return ['hod', 'admin'].includes(user.role);
    }
    
    if (room.type === 'admin') {
        return ['admin', 'hod'].includes(user.role);
    }
    
    if (room.type === 'alumni') {
        return ['alumni', 'hod', 'admin'].includes(user.role);
    }
    
    return false;
};

export const getRooms = async (req, res, next) => {
    try {
        const rooms = await ChatRoom.find().populate('branch', 'name code');
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

export const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message) return res.status(404).json({ error: 'Not found' });
        
        if (message.sender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
        
        message.deleted = true;
        await message.save();
        
        // Let Socket.IO know (will handle in socket.js if needed, or emit directly)
        // Actually, better to emit delete via socket.js REST API
        
        res.json({ message: 'Deleted' });
    } catch (error) {
        next(error);
    }
};
