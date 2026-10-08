import SyllabusUpload from '../models/SyllabusUpload.js';
import { deleteObject, getPublicUrl } from '../services/r2.service.js';

export const getSyllabus = async (req, res, next) => {
    try {
        const { course, branch, semester, academicYear } = req.query;
        
        const query = { isActive: true };
        if (course) query.course = course;
        if (branch) query.branch = branch;
        if (semester) query.semester = parseInt(semester);
        if (academicYear) query.academicYear = academicYear;

        const syllabi = await SyllabusUpload.find(query).sort({ createdAt: -1 });
        
        // Map public URL if needed, or frontend can construct it. We'll construct it here.
        const data = syllabi.map(item => ({
            ...item.toObject(),
            url: getPublicUrl(item.fileKey)
        }));

        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const createSyllabus = async (req, res, next) => {
    try {
        const syllabus = new SyllabusUpload(req.body);
        await syllabus.save();
        res.status(201).json(syllabus);
    } catch (error) {
        next(error);
    }
};

export const updateSyllabus = async (req, res, next) => {
    try {
        const syllabus = await SyllabusUpload.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!syllabus) return res.status(404).json({ error: 'Syllabus not found' });
        res.json(syllabus);
    } catch (error) {
        next(error);
    }
};

export const deleteSyllabus = async (req, res, next) => {
    try {
        const syllabus = await SyllabusUpload.findById(req.params.id);
        if (!syllabus) return res.status(404).json({ error: 'Syllabus not found' });

        if (syllabus.fileKey) {
            await deleteObject(syllabus.fileKey).catch(err => console.error('R2 Delete Error:', err));
        }

        await syllabus.deleteOne();
        res.json({ message: 'Syllabus deleted successfully' });
    } catch (error) {
        next(error);
    }
};
