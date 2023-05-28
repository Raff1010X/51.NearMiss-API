/**
 * sends response to client with status and data in json format if res.data is not empty
 */
module.exports = (req, res, next) => {
    if (res.data) {
        res.status(res.stat).json({
            status: 'success',
            lenght: res.data.length,
            data: res.data,
        });
    } else {
        next();
    }
};
