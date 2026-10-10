import Announcement from '../models/Announcement.js';
import sanitizeHtml from 'sanitize-html';
import fs from 'fs';
import path from 'path';

// Sanitize HTML options
const sanitizeOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span']),
    allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'img': ['src', 'alt', 'width', 'height', 'style'],
        'span': ['style']
    }
};

export const getAnnouncements = async (req, res, next) => {
    try {
        const { category, branch, search, page = 1, limit = 10, all = false } = req.query;
        
        let query = {};

        // If not admin/hod asking for 'all', only show published and unexpired
        if (!all) {
            query.status = 'published';
            query.$or = [
                { expiresAt: { $exists: false } },
                { expiresAt: { $eq: null } },
                { expiresAt: { $gt: new Date() } }
            ];
            query.publishAt = { $lte: new Date() };
        }

        if (category) query.category = category;
        if (branch) query.branch = branch;
        
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const announcements = await Announcement.find(query)
            .populate('createdBy', 'name role')
            .sort({ isImportant: -1, publishAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Announcement.countDocuments(query);

        res.json({
            data: announcements,
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

export const getAnnouncementById = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id).populate('createdBy', 'name role');
        if (!announcement) return res.status(404).json({ error: 'Announcement not found' });
        
        res.json(announcement);
    } catch (error) {
        next(error);
    }
};

export const createAnnouncement = async (req, res, next) => {
    try {
        const { title, body, category, branch, isImportant, status, publishAt, expiresAt } = req.body;

        // TPO can only create Placement announcements
        if (req.user.role === 'tpo' && category !== 'Placement') {
            return res.status(403).json({ error: 'TPO can only create Placement announcements' });
        }

        let coverImage = null;
        let attachments = [];

        if (req.files) {
            if (req.files.coverImage && req.files.coverImage[0]) {
                coverImage = '/uploads/' + req.files.coverImage[0].filename;
            }
            if (req.files.attachments) {
                attachments = req.files.attachments.map(file => ({
                    url: '/uploads/' + file.filename,
                    name: file.originalname
                }));
            }
        }

        const sanitizedBody = sanitizeHtml(body, sanitizeOptions);

        const announcement = new Announcement({
            title,
            body: sanitizedBody,
            coverImage,
            attachments,
            category: category || 'General',
            branch: branch || 'All',
            isImportant: isImportant === 'true' || isImportant === true,
            status: status || 'published',
            publishAt: publishAt ? new Date(publishAt) : new Date(),
            expiresAt: expiresAt ? new Date(expiresAt) : null,
            createdBy: req.user._id
        });

        await announcement.save();
        res.status(201).json(announcement);
    } catch (error) {
        next(error);
    }
};

export const updateAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) return res.status(404).json({ error: 'Announcement not found' });

        // Authorization check
        if (req.user.role === 'tpo' && req.body.category && req.body.category !== 'Placement') {
            return res.status(403).json({ error: 'TPO can only manage Placement announcements' });
        }
        if (req.user.role === 'tpo' && announcement.category !== 'Placement') {
            return res.status(403).json({ error: 'TPO cannot edit non-Placement announcements' });
        }
        if (req.user.role === 'hod' && announcement.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
           // Allow HOD to edit their own, or maybe any. Let's say HOD can edit any if they are approved. 
           // But better to restrict to their own branch if we want, but the prompt just says "authorize Admin and approved HOD for write operations".
        }

        const updates = { ...req.body };
        
        if (updates.body) {
            updates.body = sanitizeHtml(updates.body, sanitizeOptions);
        }

        if (req.files) {
            if (req.files.coverImage && req.files.coverImage[0]) {
                updates.coverImage = '/uploads/' + req.files.coverImage[0].filename;
            }
            if (req.files.attachments) {
                // For simplicity, we add new attachments to the existing ones.
                // A full implementation would allow removing specific attachments.
                const newAttachments = req.files.attachments.map(file => ({
                    url: '/uploads/' + file.filename,
                    name: file.originalname
                }));
                updates.attachments = [...(announcement.attachments || []), ...newAttachments];
            }
        }
        
        // Handle removals if sent (e.g. removedAttachments = JSON string array of URLs)
        if (req.body.removedAttachments) {
            try {
                const toRemove = JSON.parse(req.body.removedAttachments);
                updates.attachments = (updates.attachments || announcement.attachments).filter(
                    a => !toRemove.includes(a.url)
                );
            } catch(e) {}
        }

        if (updates.isImportant !== undefined) {
            updates.isImportant = updates.isImportant === 'true' || updates.isImportant === true;
        }

        Object.assign(announcement, updates);
        await announcement.save();
        
        res.json(announcement);
    } catch (error) {
        next(error);
    }
};

export const deleteAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) return res.status(404).json({ error: 'Announcement not found' });

        if (req.user.role === 'tpo' && announcement.category !== 'Placement') {
            return res.status(403).json({ error: 'TPO cannot delete non-Placement announcements' });
        }

        // Ideally delete files from disk here as well
        await announcement.deleteOne();
        res.json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        next(error);
    }
};
