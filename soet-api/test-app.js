import app from './src/app.js';
const PORT = 5005;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Test server running on port ${PORT}`);
});
