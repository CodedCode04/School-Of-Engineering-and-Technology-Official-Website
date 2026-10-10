import AuditLog from '../models/AuditLog.js';

export const getAuditLogs = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can view audit logs' });
        }

        const { actor, action, startDate, endDate, entity } = req.query;
        let query = {};

        if (actor) query.actor = actor;
        if (action) query.action = action;
        if (entity) query.entity = entity;
        
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const logs = await AuditLog.find(query)
            .populate('actor', 'name role email')
            .sort({ createdAt: -1 });
            
        res.json(logs);
    } catch (error) {
        next(error);
    }
};
