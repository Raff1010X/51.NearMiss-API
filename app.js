const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const compression = require('compression');

//** Initialize express app
const app = express();

//** Set compression
app.use(compression());

//** Set security HTTP headers
app.use(helmet());

//** Enable CORS
app.use(require('./config/cors'));

//** logging middleware and test query
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//** Rate limiting
app.use('/api', rateLimit(require('./config/rateLimit')));

//** for parsing application/json
app.use(express.json({ limit: '500kb' }));

//** for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, parameterLimit: 100000, limit: '500kb' }));

//** Data sanitization against XSS
app.use(xss());

//** Prevent parameter pollution
app.use(hpp(require('./config/hppWhiteList')));

//** Static files
const options = {
    // dotfiles: 'ignore',
    etag: true,
    // extensions: ['htm', 'html'],
    // index: false,
    maxAge: '365d',
    redirect: true,
    setHeaders: function (res, path, stat) {
        res.set({ 'x-timestamp': Date.now(), test: 'test' });
    },
};
app.use(express.static(`${__dirname}/public/build/`, options));

//** Set signed cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

//** Enable CSRF protection
if (process.env.NODE_ENV !== 'test') {
    const cookie = require('./config/cookie');
    const value = (req) => req.signedCookies['XSRF-TOKEN'];
    const sendXSRF = (req, res) => res.cookie('XSRF-TOKEN', req.csrfToken(), cookie).send({ status: 'success' });
    app.use(csurf({ cookie, value }));
    app.get('/api/getCSRFToken', sendXSRF);
}

//** Validate body of incoming requests
app.use(require('./utils/validate'));
app.use('/api/test', async (req, res, next) => {
    res.status(200).json({ status: 'ok' });
});

//** Routes middlewares
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/managers', require('./routes/managerRoutes'));
app.use('/api/functions', require('./routes/functionRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/other', require('./routes/otherRoutes'));
app.use('/api/file', require('./routes/fileRoutes'));
//** Server status
app.get('/status',(req, res)=> res.status(200).send())

//** Send response middleware
app.use(require('./utils/sendResponse'));

// //** Route not found middleware
app.all('*', require('./routes/notFound'));

//** Error handling middleware
app.use(require('./err/errorController')); // last middleware

module.exports = app;
