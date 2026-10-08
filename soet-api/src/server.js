import app from './app.js';
import { connectDB } from './config/db.js';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;

// Connect to Database
await connectDB();

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
const shutdown = () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);