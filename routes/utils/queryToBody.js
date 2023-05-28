/**
 * Adds request query to body object
 */
module.exports = (req, res, next) => {
    const keys = Object.keys(req.query);
    if (keys.length > 0) {
        keys.forEach((key) => {
            req.body[key] = req.query[key];
        });
    } else {
        req.body['empty'] = 'empty';
    }
    next();
};
