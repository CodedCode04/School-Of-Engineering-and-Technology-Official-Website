import axios from 'axios';

export const verifyTurnstile = async (req, res, next) => {
    const token = req.body.turnstileToken;
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!token) {
        return res.status(400).json({ error: 'Missing CAPTCHA token' });
    }

    if (!secret) {
        console.error('[Turnstile] TURNSTILE_SECRET_KEY is not configured.');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const formData = new URLSearchParams();
        formData.append('secret', secret);
        formData.append('response', token);
        formData.append('remoteip', req.ip);

        const result = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = result.data;

        if (data.success) {
            // Strip token from body
            delete req.body.turnstileToken;
            next();
        } else {
            console.error('[Turnstile] Verification failed with codes:', data['error-codes']);
            return res.status(403).json({ error: 'CAPTCHA verification failed' });
        }
    } catch (error) {
        console.error('[Turnstile] Upstream error:', error.message);
        return res.status(500).json({ error: 'CAPTCHA verification service unavailable' });
    }
};
