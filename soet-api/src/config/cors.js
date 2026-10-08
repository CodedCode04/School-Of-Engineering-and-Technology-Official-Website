import 'dotenv/config';

const allowedOrigins = process.env.CLIENT_ORIGINS 
    ? process.env.CLIENT_ORIGINS.split(',').map(o => o.trim())
    : [];

// Optional: To allow Cloudflare Pages preview environments, you could use a regex or string match:
// const allowPreviewDomains = (origin) => origin.endsWith('.soet-client.pages.dev');
// This is strictly opt-in and off by default.

export const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin ONLY for health checks (handled in app.js if needed)
        // Express cors middleware evaluates origin. We'll strict-check it.
        if (!origin) {
            // We pass it through here, but our custom middleware in app.js will reject it 
            // if it's not the /health route.
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Return a clear 403 error for disallowed origins
        return callback(new Error('CORS_ERROR'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false // We use JWT in Authorization header, no cookies needed
};
