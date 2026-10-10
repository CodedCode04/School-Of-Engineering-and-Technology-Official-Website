import Syllabus from '../models/Syllabus.js';
import { createAuditLog } from '../utils/audit.js';

// GET: Students/Teachers (own branch), Admin/HOD (all or specific)
export const getSyllabi = async (req, res, next) => {
    try {
        const { branch, semester, subjectCode } = req.query;
        let query = {};

        if (req.user.role === 'student' || req.user.role === 'teacher') {
            if (!req.user.branch) {
                return res.status(403).json({ error: 'User does not have a branch assigned' });
            }
            query.branch = req.user.branch; // Force filter to own branch
            if (semester) query.semester = semester;
            if (subjectCode) query.subjectCode = subjectCode;
        } else {
            // Admin, HOD, TPO, Alumni
            if (branch) query.branch = branch;
            if (semester) query.semester = semester;
            if (subjectCode) query.subjectCode = subjectCode;
        }

        const syllabi = await Syllabus.find(query).populate('branch', 'name code').populate('uploadedBy', 'name role');
        res.json(syllabi);
    } catch (error) {
        next(error);
    }
};

export const createSyllabus = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin' && !(req.user.role === 'hod' && req.user.status === 'approved')) {
            return res.status(403).json({ error: 'Not authorized to add syllabus' });
        }

        const { branch, semester, subjectName, subjectCode, content } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ error: 'Syllabus PDF file is required' });
        }

        const syllabus = new Syllabus({
            branch,
            semester,
            subjectName,
            subjectCode,
            content,
            file: '/uploads/' + req.file.filename,
            uploadedBy: req.user._id
        });

        await syllabus.save();

        await createAuditLog(
            req.user._id,
            'CREATE',
            'Syllabus',
            syllabus._id,
            null,
            { branch, semester, subjectCode, subjectName }
        );

        res.status(201).json(syllabus);
    } catch (error) {
        next(error);
    }
};

export const updateSyllabus = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin' && !(req.user.role === 'hod' && req.user.status === 'approved')) {
            return res.status(403).json({ error: 'Not authorized to update syllabus' });
        }

        const syllabus = await Syllabus.findById(req.params.id);
        if (!syllabus) return res.status(404).json({ error: 'Syllabus not found' });

        const beforeSummary = {
            branch: syllabus.branch,
            semester: syllabus.semester,
            subjectCode: syllabus.subjectCode,
            subjectName: syllabus.subjectName,
            file: syllabus.file
        };

        const updates = { ...req.body };
        if (req.file) {
            updates.file = '/uploads/' + req.file.filename;
        }

        Object.assign(syllabus, updates);
        await syllabus.save();

        const afterSummary = {
            branch: syllabus.branch,
            semester: syllabus.semester,
            subjectCode: syllabus.subjectCode,
            subjectName: syllabus.subjectName,
            file: syllabus.file
        };

        await createAuditLog(
            req.user._id,
            'UPDATE',
            'Syllabus',
            syllabus._id,
            beforeSummary,
            afterSummary
        );

        res.json(syllabus);
    } catch (error) {
        next(error);
    }
};

export const deleteSyllabus = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin' && !(req.user.role === 'hod' && req.user.status === 'approved')) {
            return res.status(403).json({ error: 'Not authorized to delete syllabus' });
        }

        const syllabus = await Syllabus.findById(req.params.id);
        if (!syllabus) return res.status(404).json({ error: 'Syllabus not found' });

        const beforeSummary = {
            branch: syllabus.branch,
            semester: syllabus.semester,
            subjectCode: syllabus.subjectCode,
            subjectName: syllabus.subjectName
        };

        await syllabus.deleteOne();

        await createAuditLog(
            req.user._id,
            'DELETE',
            'Syllabus',
            syllabus._id,
            beforeSummary,
            null
        );

        res.json({ message: 'Syllabus deleted successfully' });
    } catch (error) {
        next(error);
    }
};
