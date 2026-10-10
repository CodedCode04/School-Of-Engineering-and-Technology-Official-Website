import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    try {
        let token;
        
        // Check Authorization header for Bearer token
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Missing token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({ error: 'Forbidden: User is blocked' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Token expired or invalid' });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

export const requireApproved = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    
    if (!req.user || req.user.status !== 'approved') {
        return res.status(403).json({ error: 'Forbidden: Account pending approval or rejected' });
    }
    next();
};

export const verifyAdmin = [authenticate, authorize('admin')];
