const AppError = require('./appError');

//** Error response in development
const sendErrorDev = (err, req, res) => {
    console.log(
        {
            status: 'error',
            message: err.message,
            // stack: err.stack,
            err,
        }
    )
    res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        stack: err.stack,
        err,
    });
};

//** Error response in production
const sendErrorProd = (err, req, res) => {
    res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
    });
};

//** Error handling main function
module.exports = (err, req, res, next) => {
    // JWT errors
    if (err.name === 'JsonWebTokenError') err = AppError.handleJsonWebTokenError();
    else if (err.name === 'TokenExpiredError') err = AppError.handleTokenExpiredError();
    // CSRF errors
    else if (err.code === 'EBADCSRFTOKEN') err = AppError.handleBadCSRFtokenError();
    else if (err.message === 'misconfigured csrf') err = AppError.handleBadCSRFtokenError();
    // Database errors
    else if (err.code === '23505') err = AppError.handleDuplicateData();
    //TODO: add more database error handling
    // Other errors
    else if (!err.isOperational && process.env.NODE_ENV === 'production') err = AppError.handleErrors();

    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else {
        sendErrorProd(err, req, res);
    }
};
