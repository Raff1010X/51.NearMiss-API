/**
 * Catches errors thrown by async functions and sends them to error handler
 * @param {function} fn
 * @returns
 */
module.exports = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
};
