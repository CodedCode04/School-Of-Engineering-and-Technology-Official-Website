import AlumniProfile from '../models/AlumniProfile.js';
import JobReferral from '../models/JobReferral.js';
import MentorshipRequest from '../models/MentorshipRequest.js';
import SuccessStory from '../models/SuccessStory.js';
import Notification from '../models/Notification.js';

// ---- Alumni Profile ----
export const getProfile = async (req, res, next) => {
    try {
        const profile = await AlumniProfile.findOne({ user: req.user._id }).populate('branch');
        if (!profile) return res.status(404).json({ error: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        next(error);
    }
};

export const submitProfile = async (req, res, next) => {
    try {
        const { enrollmentNo, branch, passingYear, company, role, location, email, phone, linkedin } = req.body;

        let photoPath = '';
        if (req.file) {
            photoPath = '/' + req.file.path.replace(/\\/g, '/');
        }

        const existingProfile = await AlumniProfile.findOne({ user: req.user._id });

        if (existingProfile) {
            existingProfile.enrollmentNo = enrollmentNo;
            existingProfile.branch = branch;
            existingProfile.passingYear = passingYear;
            existingProfile.company = company;
            existingProfile.role = role;
            existingProfile.location = location;
            existingProfile.email = email;
            existingProfile.phone = phone;
            existingProfile.linkedin = linkedin;
            if (photoPath) existingProfile.photo = photoPath;
            await existingProfile.save();
            return res.json({ message: 'Profile updated successfully', profile: existingProfile });
        }

        const newProfile = await AlumniProfile.create({
            user: req.user._id,
            enrollmentNo, branch, passingYear, company, role, location, email, phone, linkedin,
            photo: photoPath
        });
        res.status(201).json({ message: 'Profile submitted successfully', profile: newProfile });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Enrollment No or User profile already exists' });
        }
        next(error);
    }
};

// Directory – approved alumni only
export const getDirectory = async (req, res, next) => {
    try {
        const { branch, passingYear, company, location } = req.query;
        let query = {};
        if (branch) query.branch = branch;
        if (passingYear) query.passingYear = passingYear;
        if (company) query.company = { $regex: company, $options: 'i' };
        if (location) query.location = { $regex: location, $options: 'i' };

        const alumni = await AlumniProfile.find(query).populate('user', 'name status').populate('branch');
        const verifiedAlumni = alumni.filter(a => a.user && a.user.status === 'approved');
        res.json(verifiedAlumni);
    } catch (error) {
        next(error);
    }
};

// ---- Job Referrals ----
export const getJobReferrals = async (req, res, next) => {
    try {
        const referrals = await JobReferral.find({ expiresAt: { $gt: new Date() } })
            .populate('alumni', 'name')
            .populate('branch');
        res.json(referrals);
    } catch (error) {
        next(error);
    }
};

export const createJobReferral = async (req, res, next) => {
    try {
        const { title, company, description, link, branch, expiresAt } = req.body;
        const referral = await JobReferral.create({
            alumni: req.user._id,
            title, company, description, link, branch, expiresAt
        });
        res.status(201).json({ message: 'Job referral created', referral });
    } catch (error) {
        next(error);
    }
};

// ---- Mentorship ----
export const createMentorshipRequest = async (req, res, next) => {
    try {
        const { alumniId, message } = req.body;
        const request = await MentorshipRequest.create({
            student: req.user._id,
            alumni: alumniId,
            message
        });

        await Notification.create({
            title: 'New Mentorship Request',
            message: 'You have a new mentorship request from a student.',
            type: 'personal',
            sender: req.user._id,
            target: { scope: 'user', user: alumniId }
        });

        res.status(201).json({ message: 'Request sent successfully', request });
    } catch (error) {
        next(error);
    }
};

export const getMentorshipRequests = async (req, res, next) => {
    try {
        let query = {};
        if (req.user.role === 'student') query.student = req.user._id;
        if (req.user.role === 'alumni') query.alumni = req.user._id;

        const requests = await MentorshipRequest.find(query)
            .populate('student', 'name')
            .populate('alumni', 'name');
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

export const updateMentorshipRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // accepted | declined
        const request = await MentorshipRequest.findOne({ _id: id, alumni: req.user._id });
        if (!request) return res.status(404).json({ error: 'Request not found' });

        request.status = status;
        await request.save();

        await Notification.create({
            title: `Mentorship Request ${status === 'accepted' ? 'Accepted' : 'Declined'}`,
            message: `Your mentorship request has been ${status} by the alumni.`,
            type: 'personal',
            sender: req.user._id,
            target: { scope: 'user', user: request.student }
        });

        res.json({ message: `Request ${status}`, request });
    } catch (error) {
        next(error);
    }
};

// ---- Success Stories ----
export const getSuccessStories = async (req, res, next) => {
    try {
        // Admin sees all (pending + published). Others see published only.
        const isAdmin = req.user && req.user.role === 'admin';
        const query = isAdmin ? {} : { status: 'published' };
        const stories = await SuccessStory.find(query).populate('alumni', 'name').sort({ createdAt: -1 });
        res.json(stories);
    } catch (error) {
        next(error);
    }
};

export const createSuccessStory = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        const story = await SuccessStory.create({
            alumni: req.user._id,
            title, body,
            status: 'pending'
        });
        res.status(201).json({ message: 'Success story submitted for approval', story });
    } catch (error) {
        next(error);
    }
};

export const updateSuccessStoryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // published | rejected
        const story = await SuccessStory.findById(id);
        if (!story) return res.status(404).json({ error: 'Story not found' });

        story.status = status;
        await story.save();
        res.json({ message: `Story ${status}`, story });
    } catch (error) {
        next(error);
    }
};
