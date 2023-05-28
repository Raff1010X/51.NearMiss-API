const catchAsync = require('../../err/catchAsync');

/**
 * Executes a query and attaches the result to the response object
 * @param {function} fn query function from ../models/
 * @param {integer} status from ./status.js
 */
module.exports = (fn, status = 200) =>
    catchAsync(async (req, res, next) => {
        res.data = await fn(req, res, next);
        res.stat = status;
        next();
    });
