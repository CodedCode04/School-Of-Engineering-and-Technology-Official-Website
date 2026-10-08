import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { corsOptions } from './config/cors.js';
import routes from './routes/index.js';

const app = express();

// Trust proxy required for Render deployments
app.set('trust proxy', 1);

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(cors(corsOptions));

// HTTP Logging
app.use(morgan('combined'));

// Body parser with 1mb limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Global Rate Limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});
app.use(globalLimiter);

// Stricter Rate Limiter for POST routes (Forms/Login)
const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many submission attempts, please try again later.' }
});
app.use('/api', (req, res, next) => {
    if (req.method === 'POST') {
        return postLimiter(req, res, next);
    }
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

// API Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
    console.error(`[Error] ${err.message}`, err.stack);
    
    // Distinguish between handled validation errors, CORS errors, and internal crashes
    if (err.message === 'CORS_ERROR') {
        return res.status(403).json({ error: 'Forbidden: CORS origin not allowed' });
    }

    const statusCode = err.statusCode || 500;
    const response = {
        error: statusCode === 500 ? 'Internal Server Error' : err.message
    };
    
    // Avoid leaking stack traces in production
    if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
        response.details = err.stack;
    }

    res.status(statusCode).json(response);
});

export default app;
