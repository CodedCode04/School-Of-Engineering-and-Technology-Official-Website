import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
});

export const presignSchema = z.object({
    body: z.object({
        fileName: z.string().min(1),
        contentType: z.string().min(1),
        fileSize: z.number().positive(),
        folder: z.enum(['syllabus', 'notices', 'general']).default('general')
    })
});

export const noticeSchema = z.object({
    body: z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        category: z.enum(['General', 'Exam', 'Event', 'Academic', 'Placement']).optional(),
        expiresAt: z.string().datetime().optional(),
        isPinned: z.boolean().optional(),
        isActive: z.boolean().optional(),
        attachmentKey: z.string().nullable().optional(),
        attachmentName: z.string().nullable().optional()
    })
});

export const syllabusSchema = z.object({
    body: z.object({
        course: z.string().min(1),
        branch: z.string().min(1),
        semester: z.number().int().positive(),
        academicYear: z.string().min(1),
        title: z.string().min(1),
        fileKey: z.string().min(1),
        fileName: z.string().min(1),
        mimeType: z.string().min(1),
        fileSize: z.number().positive(),
        isActive: z.boolean().optional()
    })
});

export const enquirySchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        subject: z.string().min(2),
        message: z.string().min(10)
    })
});
