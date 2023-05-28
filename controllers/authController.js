const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../err/catchAsync');
const AppError = require('../err/appError');
const sendEmail = require('../utils/email');
const userModel = require('../models/userModel');
const commentModel = require('../models/commentModel');
const reportModel = require('../models/reportModel');
const worker = require('./utils/worker');
const cookie = require('../config/cookie');

/**
 * Create and send JWT token in cookie
 */
const createSendToken = (user, statusCode, req, res) => {
    let expiresIn = process.env.JWT_EXPIRES_IN;
    if (statusCode === 401) expiresIn = 0;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn,
    });
    const cookieOptions = { ...cookie };
    cookieOptions.expires = cookie.expiration;
    if (statusCode === 401) cookieOptions.expires = 0;

    res.cookie('JWT-TOKEN', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user_id: user,
        },
    });
};

/**
 * Generate the random reset token for user and save it to the database
 */
async function saveResetToken(req, res, next) {
    req.body.password_updated = req.body.password;
    delete req.body.password;

    const resetToken = crypto.randomBytes(32).toString('hex');
    req.body.reset_token = crypto.createHash('sha256').update(resetToken).digest('hex');

    if (req.user['ID użytkownika']) req.body.user_id = req.user['ID użytkownika'];
    const result = await userModel.update(req, res, next);
    delete req.body.user_id;

    if (!result[0].x_user_update) return false;

    return resetToken;
}

/**
 *  Check if user exists
 */
async function checkIfUserExists(req, res, next) {
    let currentUser;
    if (req.body.user_id && req.body.email) {
        currentUser = await userModel.userById(req, res, next);
    } else {
        currentUser = await userModel.getAll(req, res, next);
    }
    if (currentUser[0]['data'] === 'NULL') return false;
    req.user = currentUser[0];
    return true;
}

/**
 * Signup a new user
 */
exports.signup = catchAsync(async (req, res, next) => {
    // 1) check if user was created
    const currentUser = await checkIfUserExists(req, res, next);
    if (!currentUser) {
        next(AppError.serverErr500());
        return;
    }

    // 2) Dont allow user to signup if they are active
    if (req.user.Aktywny === 'Tak') {
        next(AppError.resetPassword());
        return;
    }

    // 3) Generate the random reset token for user and save it to the database
    const resetToken = await saveResetToken(req, res, next);
    if (!resetToken) {
        next(AppError.serverErr500());
        return;
    }

    // 4) Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/#/activateaccount/${resetToken}`;
    // const resetURL = `${req.protocol}://127.0.0.1:3001/#/activateaccount/${resetToken}`;
    const message = `<h2>Witamy</h2>
                    <p>Twój link do aktywacji konta:</p>
                    <br><a href="${resetURL}">Kliknij tu, aby aktywować konto</a>
                    <br><p>Jeśli nie Ty wysłałeś wiadomość - zignoruj ją!</p>`;
    try {
        await sendEmail({
            email: req.body['email'],
            subject: 'Twój link aktywujący konto ważny do końca dnia',
            message,
        });
        res.status(200).json({
            message: 'Na podany adres został wysłany mail z linkiem do aktywacji konta!',
        });
    } catch (err) {
        next(AppError.sendMail());
        return;
    }
});

/**
 * Login user
 */
exports.checkUserPassword = worker(userModel.checkUserPassword);

exports.login = catchAsync(async (req, res, next) => {
    const oldUser = res.data[0]['x_check_user_password'];
    if (oldUser != 'false' && oldUser != null) createSendToken(oldUser, 200, req, res);
    else next(AppError.loginError());
});

/**
 * Logout user
 */
exports.logout = catchAsync(async (req, res, next) => {
    createSendToken('expired', 401, req, res);
});

/**
 * Protect routes with JWT
 */
exports.protect = catchAsync(async (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next(); // Bypass if in test environment

    // 1) Getting token and check if it's there
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.signedCookies['JWT-TOKEN'];
    }
    // get token from req.headers.cookie

    if (!token) {
        next(AppError.loginAgain());
        return;
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    req.body.user_id = decoded.user;
    const currentUser = await checkIfUserExists(req, res, next);
    if (!currentUser) {
        next(AppError.userNotFound());
        return;
    }
    delete req.body.user_id;

    // 4) Check if user changed password after the token was issued
    if (new Date(req.user['Data aktualizacji']) > new Date(decoded.iat * 1000)) {
        // different server timezones possible errors
        next(AppError.loginAgain());
        return;
    }

    // Check if expiration date has passed
    if (new Date(decoded.exp * 1000) < new Date()) {
        next(AppError.tokenExpired());
        return;
    }

    // 5) Grant access to protected route
    next();
});

/**
 * Get user id for logged in user
 */
exports.getMe = catchAsync(async (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next(); // Bypass if in test environment

    req.body.user_id = req.user['ID użytkownika'];
    if (req.body['Zgłaszający']) req.body['Zgłaszający'] = req.user['Adres email'];
    delete req.body.role;
    next();
});

/**
 * Allow to report author only
 */
exports.reportAuthor = catchAsync(async (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next(); // Bypass if in test environment
    const report = await reportModel.getAll(req, res, next);
    if (req.user['Adres email'] !== report[0]['Zgłaszający']) {
        next(AppError.notToChange());
        return;
    }
    next();
});

/**
 * Allow to comment author only
 */
exports.commentAuthor = catchAsync(async (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next(); // Bypass if in test environment
    const comment = await commentModel.getOne(req, res, next);
    if (req.user['Adres email'] !== comment[0]['Autor']) {
        next(AppError.notToChange());
        return;
    }
    next();
});

/**
 * @param  {string} roles roles that are allowed to access the route
 * Restrict access to certain roles
 */
exports.restrictTo =
    (...roles) =>
    (req, res, next) => {
        if (process.env.NODE_ENV === 'test') return next(); // Bypass if in test environment

        if (!roles.includes(req.user['Rola użytkownika'])) {
            next(AppError.notAutorized());
            return;
        }
        next();
    };

/**
 * Send reset password email
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) check if active user exists
    const currentUser = await checkIfUserExists(req, res, next);

    if (!currentUser) {
        next(AppError.loginError());
        return;
    }

    if (req.user['Aktywny'] === 'Nie') {
        next(AppError.userNotActive());
        return;
    }

    // 2) Generate the random reset token for user and save it to the database
    const resetToken = await saveResetToken(req, res, next);
    if (!resetToken) {
        next(AppError.serverErr500());
        return;
    }

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/#/resetpassword/${resetToken}`;
    // const resetURL = `${req.protocol}://127.0.0.1:3001/#/resetpassword/${resetToken}`;
    const message = `<h2>Twój link do resetowania hasła</h2>
                    <p>Zapomniałeś hasło? Twój link do zresetowania hasła:</p>
                    <br><a href="${resetURL}">Kliknij tu, aby zresetować hasło</a>
                    <br><p>Jeśli nie Ty wysłałeś wiadomość - zignoruj ją!</p>`;
    try {
        await sendEmail({
            email: req.user['Adres email'],
            subject: 'Twój link do zmiany hasła ważny do końca dnia',
            message,
        });
        res.status(200).json({
            message: 'Na podany adres został wysłany mail z linkiem do aktywacji nowego hasła!',
        });
    } catch (err) {
        next(AppError.sendMail());
        return;
    }
});

/**
 * Update user's password by email link with reset token
 */
const updateUserPasswordByToken = catchAsync(async (req, res, next) => {
    // 1) Get user by reset_token form req.body.token
    req.body.reset_token = crypto.createHash('sha256').update(req.body.token).digest('hex');
    const user = await checkIfUserExists(req, res, next);
    if (!user) {
        next(AppError.tokenNotFound());
        return;
    }

    // 2) Check if reset_token is expired or not
    if (new Date(req.user['Data aktualizacji']) < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
        next(AppError.linkExpired());
        return;
    }

    // 3) Update user's password
    const updatedUser = await userModel.updateUserPasswordByToken(req, res, next);
    if (!updatedUser) {
        next(AppError.serverErr500());
        return;
    }

    // 5) login user
    createSendToken(req.user['ID użytkownika'], 200, req, res);
});

exports.activateAccount = updateUserPasswordByToken;

exports.resetPassword = updateUserPasswordByToken;
