import StudentProfile from '../models/StudentProfile.js';
import AcademicRecord from '../models/AcademicRecord.js';
import Achievement from '../models/Achievement.js';
import mongoose from 'mongoose';

export const getStudents = async (req, res, next) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            sort = 'name', 
            order = 'asc',
            search,
            branch,
            currentYear,
            semester,
            sessionBatch,
            minCgpa,
            maxCgpa,
            placementStatus,
            hasInternship,
            achievementCategory
        } = req.query;

        let query = { verificationStatus: 'verified' };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { enrollmentNo: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { skills: { $regex: search, $options: 'i' } }
            ];
        }

        if (branch) query.branch = branch;
        if (currentYear) query.currentYear = currentYear;
        if (semester) query.semester = semester;
        if (sessionBatch) query.sessionBatch = sessionBatch;
        if (placementStatus) query.placementStatus = placementStatus;
        
        if (minCgpa || maxCgpa) {
            query.currentCgpa = {};
            if (minCgpa) query.currentCgpa.$gte = parseFloat(minCgpa);
            if (maxCgpa) query.currentCgpa.$lte = parseFloat(maxCgpa);
        }

        if (hasInternship === 'true') {
            query['internships.0'] = { $exists: true };
        } else if (hasInternship === 'false') {
            query['internships'] = { $size: 0 };
        }

        // If filtering by achievement category, we first need to find students who have it
        if (achievementCategory) {
            const achs = await Achievement.find({ category: achievementCategory }).select('student');
            const studentIds = achs.map(a => a.student);
            
            if (query.user) {
                query.user.$in = query.user.$in ? query.user.$in.filter(id => studentIds.some(sid => sid.equals(id))) : studentIds;
            } else {
                query.user = { $in: studentIds };
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortObj = { [sort]: order === 'desc' ? -1 : 1 };

        const students = await StudentProfile.find(query)
            .populate('branch', 'name code')
            .populate('user', 'email')
            .sort(sortObj)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await StudentProfile.countDocuments(query);

        res.json({
            data: students,
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

export const getStudentDetails = async (req, res, next) => {
    try {
        const studentId = req.params.userId; // user _id
        
        const profile = await StudentProfile.findOne({ user: studentId, verificationStatus: 'verified' }).populate('branch');
        if (!profile) return res.status(404).json({ error: 'Student not found or not verified' });

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
