module.exports = (req, res, next) => {
    // CORS
    res.header('Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }

    // Other headers
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    // res.header('Cache-Control', 'public, max-age=31536000');
    res.setHeader('Last-Modified', new Date().toUTCString());

    next();
};
