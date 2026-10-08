import Notice from '../models/Notice.js';
import { deleteObject } from '../services/r2.service.js';

export const getNotices = async (req, res, next) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;
        
        const query = { isActive: true };
        
        // Hide expired notices
        query.$or = [
            { expiresAt: { $exists: false } },
            { expiresAt: { $gt: new Date() } }
        ];

        if (category) {
            query.category = category;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const notices = await Notice.find(query)
            .sort({ isPinned: -1, publishedAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Notice.countDocuments(query);

        res.json({
            data: notices,
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

export const getNoticeById = async (req, res, next) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice || (!notice.isActive && !req.admin)) {
            return res.status(404).json({ error: 'Notice not found' });
        }
        res.json(notice);
    } catch (error) {
        next(error);
    }
};

export const createNotice = async (req, res, next) => {
    try {
        const notice = new Notice(req.body);
        await notice.save();
        res.status(201).json(notice);
    } catch (error) {
        next(error);
    }
};

export const updateNotice = async (req, res, next) => {
    try {
        const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notice) return res.status(404).json({ error: 'Notice not found' });
        res.json(notice);
    } catch (error) {
        next(error);
    }
};

export const deleteNotice = async (req, res, next) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) return res.status(404).json({ error: 'Notice not found' });

        if (notice.attachmentKey) {
            await deleteObject(notice.attachmentKey).catch(err => console.error('R2 Delete Error:', err));
        }

        await notice.deleteOne();
        res.json({ message: 'Notice deleted successfully' });
    } catch (error) {
        next(error);
    }
};
