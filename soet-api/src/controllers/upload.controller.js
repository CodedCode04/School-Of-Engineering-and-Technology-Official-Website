import { createUploadUrl } from '../services/r2.service.js';
import crypto from 'crypto';

export const presignUpload = async (req, res, next) => {
    try {
        const { fileName, contentType, fileSize, folder } = req.body;
        
        // Generate a safe unique key
        const uniqueId = crypto.randomUUID();
        const extension = fileName.split('.').pop().toLowerCase();
        
        // e.g. syllabus/2026/1234-abcd.pdf
        const year = new Date().getFullYear();
        const key = `${folder}/${year}/${uniqueId}.${extension}`;

        const { uploadUrl, key: finalKey } = await createUploadUrl({
            key,
            contentType,
            maxBytes: fileSize
        });

        res.json({ uploadUrl, key: finalKey });
    } catch (error) {
        next(error);
    }
};
