import AuditLog from '../models/AuditLog.js';

export const createAuditLog = async (actorId, action, entity, entityId, beforeSummary, afterSummary) => {
    try {
        await AuditLog.create({
            actor: actorId,
            action,
            entity,
            entityId,
            beforeSummary,
            afterSummary
        });
    } catch (error) {
        console.error('Failed to create audit log:', error);
    }
};
