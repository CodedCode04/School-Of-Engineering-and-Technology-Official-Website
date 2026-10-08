import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { email: process.env.ADMIN_EMAIL, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, email });
    } catch (error) {
        next(error);
    }
};
