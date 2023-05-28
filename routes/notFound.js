const AppError = require('../err/appError');

//** 404 error handler
module.exports = (req, res, next) => {
    next(AppError.urlNotFound(req));
};
