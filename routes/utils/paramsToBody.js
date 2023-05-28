/**
 * Adds request params to body object
 */
module.exports = (req, res, next) => {
    const keys = Object.keys(req.params);
    keys.forEach((key) => {
        req.body[key] = req.params[key];
    });
    next();
};
