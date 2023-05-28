module.exports = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: true,
    signed: true,
    key: 'CSRF-SECRET',
};

module.exports.expiration = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000);
