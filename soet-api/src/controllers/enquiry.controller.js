import Enquiry from '../models/Enquiry.js';
import crypto from 'crypto';

export const createEnquiry = async (req, res, next) => {
    try {
        // TURNSTILE HOOK: Validation will be added here in Stage 4

        // Generate IP hash for simple rate limiting / tracking
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const ipHash = crypto.createHash('sha256').update(ip || 'unknown').digest('hex');

        const enquiry = new Enquiry({ ...req.body, ipHash });
        await enquiry.save();
        
        res.status(201).json({ message: 'Enquiry submitted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getEnquiries = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        
        const query = {};
        if (status) query.status = status;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const enquiries = await Enquiry.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Enquiry.countDocuments(query);

        res.json({
            data: enquiries,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};
