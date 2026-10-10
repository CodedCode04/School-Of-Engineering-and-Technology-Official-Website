import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get users based on role and status
export const getUsers = async (req, res, next) => {
    try {
        const { role, status } = req.query;
        let query = {};
        
        if (role) query.role = role;
        if (status) query.status = status;
        
        const users = await User.find(query).select('-password').populate('branch');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// Update user status (approve, reject, block, unblock)
export const updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!['pending', 'approved', 'rejected', 'blocked'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (user.role === 'admin') {
            return res.status(403).json({ error: 'Cannot change admin status' });
        }
        
        user.status = status;
        await user.save();
        
        res.json({ message: `User status updated to ${status}`, user });
    } catch (error) {
        next(error);
    }
};

// Create TPO (Only Admin can do this)
export const createTPO = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'tpo',
            status: 'approved' // Created by admin, so approved
        });
        
        res.status(201).json({ message: 'TPO created successfully', user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        next(error);
    }
};

// Delete User
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (user.role === 'admin') {
            return res.status(403).json({ error: 'Cannot delete admin' });
        }
        
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const updateChatBlock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { blocked, until, reason } = req.body;
        
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        user.chatBlock = { blocked, until, reason };
        await user.save();
        
        res.json({ message: 'Chat block status updated', chatBlock: user.chatBlock });
    } catch (error) {
        next(error);
    }
};
