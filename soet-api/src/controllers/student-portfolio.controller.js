import StudentProfile from '../models/StudentProfile.js';
import AcademicRecord from '../models/AcademicRecord.js';
import Achievement from '../models/Achievement.js';

export const getPortfolio = async (req, res, next) => {
    try {
        const studentId = req.user._id;
        const profile = await StudentProfile.findOne({ user: studentId });
        const academics = await AcademicRecord.find({ student: studentId }).sort({ semester: 1 });
        const achievements = await Achievement.find({ student: studentId }).sort({ date: -1 });
        
        res.json({
            profile,
            academics,
            achievements
        });
    } catch (error) {
        next(error);
    }
};

export const updateProfileExtras = async (req, res, next) => {
    try {
        const { skills, projects, internships, placementStatus, linkedin, github } = req.body;
        
        const updates = {};
        if (skills) updates.skills = typeof skills === 'string' ? JSON.parse(skills) : skills;
        if (projects) updates.projects = typeof projects === 'string' ? JSON.parse(projects) : projects;
        if (internships) updates.internships = typeof internships === 'string' ? JSON.parse(internships) : internships;
        if (placementStatus) updates.placementStatus = placementStatus;
        if (linkedin !== undefined) updates.linkedin = linkedin;
        if (github !== undefined) updates.github = github;

        if (req.file) {
            updates.resumeFile = '/uploads/' + req.file.filename;
        }

        const profile = await StudentProfile.findOneAndUpdate(
            { user: req.user._id },
            { $set: updates },
            { new: true }
        );

        res.json(profile);
    } catch (error) {
        next(error);
    }
};

// Academic Records
export const addAcademicRecord = async (req, res, next) => {
    try {
        const { semester, sgpa, cgpa, backlogs } = req.body;
        const record = new AcademicRecord({
            student: req.user._id,
            semester,
            sgpa,
            cgpa,
            backlogs
        });
        await record.save();

        // Update currentCgpa in profile if it's the latest semester
        await updateProfileCurrentCgpa(req.user._id);

        res.status(201).json(record);
    } catch (error) {
        next(error);
    }
};

export const updateAcademicRecord = async (req, res, next) => {
    try {
        const record = await AcademicRecord.findOneAndUpdate(
            { _id: req.params.id, student: req.user._id },
            req.body,
            { new: true }
        );
        if (!record) return res.status(404).json({ error: 'Record not found' });
        
        await updateProfileCurrentCgpa(req.user._id);
        res.json(record);
    } catch (error) {
        next(error);
    }
};

export const deleteAcademicRecord = async (req, res, next) => {
    try {
        const record = await AcademicRecord.findOneAndDelete({ _id: req.params.id, student: req.user._id });
        if (!record) return res.status(404).json({ error: 'Record not found' });
        
        await updateProfileCurrentCgpa(req.user._id);
        res.json({ message: 'Record deleted' });
    } catch (error) {
        next(error);
    }
};

const updateProfileCurrentCgpa = async (studentId) => {
    const records = await AcademicRecord.find({ student: studentId }).sort({ semester: -1 }).limit(1);
    const currentCgpa = records.length > 0 ? records[0].cgpa : 0;
    await StudentProfile.findOneAndUpdate({ user: studentId }, { currentCgpa });
};

// Achievements
export const addAchievement = async (req, res, next) => {
    try {
        const { title, category, date, description } = req.body;
        let certificateFile = null;
        if (req.file) {
            certificateFile = '/uploads/' + req.file.filename;
        }

        const achievement = new Achievement({
            student: req.user._id,
            title,
            category,
            date,
            description,
            certificateFile
        });
        await achievement.save();
        res.status(201).json(achievement);
    } catch (error) {
        next(error);
    }
};

export const updateAchievement = async (req, res, next) => {
    try {
        const updates = { ...req.body };
        if (req.file) {
            updates.certificateFile = '/uploads/' + req.file.filename;
        }
        
        const achievement = await Achievement.findOneAndUpdate(
            { _id: req.params.id, student: req.user._id },
            updates,
            { new: true }
        );
        if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
        res.json(achievement);
    } catch (error) {
        next(error);
    }
};

export const deleteAchievement = async (req, res, next) => {
    try {
        const achievement = await Achievement.findOneAndDelete({ _id: req.params.id, student: req.user._id });
        if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
        res.json({ message: 'Achievement deleted' });
    } catch (error) {
        next(error);
    }
};
