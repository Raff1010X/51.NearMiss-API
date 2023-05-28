// + Uncaught exception handler
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

//** Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config({ path: `./config/config.${process.env.NODE_ENV}.env` });

//** Start server
const app = require('./app');
const port = process.env.PORT || 3000;
const mode = app.get('env').toUpperCase();
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${mode} mode`);
});

//** Log environment variables
if (process.env.NODE_ENV === 'development') console.log(process.env);

//** Unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
