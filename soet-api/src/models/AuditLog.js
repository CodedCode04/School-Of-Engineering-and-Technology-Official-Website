import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ['CREATE', 'UPDATE', 'DELETE']
    },
    entity: {
        type: String,
        required: true,
        enum: ['Syllabus'] // Expandable later for other entities
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    beforeSummary: {
        type: mongoose.Schema.Types.Mixed
    },
    afterSummary: {
        type: mongoose.Schema.Types.Mixed
    }
}, { timestamps: true });

AuditLogSchema.index({ actor: 1 });
AuditLogSchema.index({ action: 1 });
AuditLogSchema.index({ entity: 1, entityId: 1 });
AuditLogSchema.index({ createdAt: -1 });

export default mongoose.model('AuditLog', AuditLogSchema);
