import StudentProfile from '../models/StudentProfile.js';

export const getProfile = async (req, res, next) => {
    try {
        const profile = await StudentProfile.findOne({ user: req.user._id }).populate('branch');
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        next(error);
    }
};

export const submitProfile = async (req, res, next) => {
    try {
        const existingProfile = await StudentProfile.findOne({ user: req.user._id });
        
        if (existingProfile && existingProfile.verificationStatus !== 'rejected') {
            return res.status(400).json({ error: 'Profile already submitted' });
        }

        const {
            enrollmentNo, name, fatherName, course, department,
            sessionBatch, phone, validUntil, email, currentYear, semester, branch
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Photo is required' });
        }

        const photoPath = '/' + req.file.path.replace(/\\/g, '/'); // normalize slashes

        if (existingProfile) {
            // Update existing profile
            existingProfile.enrollmentNo = enrollmentNo;
            existingProfile.name = name;
            existingProfile.fatherName = fatherName;
            existingProfile.course = course;
            existingProfile.department = department;
            existingProfile.sessionBatch = sessionBatch;
            existingProfile.phone = phone;
            existingProfile.validUntil = validUntil;
            existingProfile.photo = photoPath;
            existingProfile.email = email;
            existingProfile.currentYear = currentYear;
            existingProfile.semester = semester;
            existingProfile.branch = branch;
            existingProfile.verificationStatus = 'pending';
            
            await existingProfile.save();
            return res.json({ message: 'Profile resubmitted successfully', profile: existingProfile });
        }

        const newProfile = await StudentProfile.create({
            user: req.user._id,
            enrollmentNo,
            name,
            fatherName,
            course,
            department,
            sessionBatch,
            phone,
            validUntil,
            photo: photoPath,
            email,
            currentYear,
            semester,
            branch,
            verificationStatus: 'pending'
        });

        res.status(201).json({ message: 'Profile submitted successfully', profile: newProfile });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Enrollment No or User profile already exists' });
        }
        next(error);
    }
};
