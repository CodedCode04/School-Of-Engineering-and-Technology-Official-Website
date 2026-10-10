import Branch from '../models/Branch.js';

export const getBranches = async (req, res, next) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (error) {
        next(error);
    }
};

export const createBranch = async (req, res, next) => {
    try {
        const { name, code } = req.body;
        const branch = await Branch.create({ name, code });
        
        // Auto-create chat room for branch
        const ChatRoom = (await import('../models/ChatRoom.js')).default;
        await ChatRoom.create({
            name: `${code} Student Room`,
            type: 'branch',
            branch: branch._id
        });

        res.status(201).json(branch);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Branch name or code already exists' });
        }
        next(error);
    }
};

export const updateBranch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, code } = req.body;
        const branch = await Branch.findByIdAndUpdate(id, { name, code }, { new: true, runValidators: true });
        
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        
        res.json(branch);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Branch name or code already exists' });
        }
        next(error);
    }
};

export const deleteBranch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const branch = await Branch.findByIdAndDelete(id);
        
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        
        res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
        next(error);
    }
};
