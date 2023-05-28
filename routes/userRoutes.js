const express = require('express');

const router = express.Router();
const user = require('../controllers/userController');
const auth = require('../controllers/authController');
const paramsToBody = require('./utils/paramsToBody');
const queryToBody = require('./utils/queryToBody');

/**
 * @api {post} /api/users/signup
 *  Sign up
 */
router.route('/signup').post(user.create, auth.signup);

/**
 * @api {post} /api/users/activateaccount/:token
 *  Activate account
 */
router.route('/activateaccount/:token').post(paramsToBody, auth.activateAccount);

/**
 * @api {post} /api/users/login
 *  Log in
 */
router.route('/login').post(auth.checkUserPassword, auth.login);

/**
 * @api {post} /api/users/resetpassword/:token
 *  Reset password
 */
router.route('/resetpassword/:token').post(paramsToBody, auth.resetPassword);

/**
 * @api {post} /api/users/forgotpassword
 *  Forgot password
 */
router.route('/forgotpassword/').post(auth.forgotPassword);

/**
 * @api {post} /api/users
 *  Create user
 */
router.route('/').post(user.create);

/**
 * @api {post} /api/users/logout
 *  Log out
 */
router.route('/logout').post(auth.protect, auth.logout);

/**
 * @api {get} /api/users?limit=10&offset=0&pattern=&order=Dział&desc=true
 *  Get all users
 */
router.route('/').get(auth.protect, auth.restrictTo('Administrator'), queryToBody, user.getAll);

/**
 * @api {patch} /api/users/:user_id
 *  Update user
 */
router
    .route('/:user_id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})')
    .patch(auth.protect, paramsToBody, queryToBody, auth.restrictTo('Administrator'), user.update);

/**
 * @api {delete} /api/users/:user_id
 *  Delete user
 */
router.route('/:user_id').delete(auth.protect, auth.restrictTo('Administrator'), paramsToBody, user.delete);

/**
 * @api {get} /api/users/top10?from='YYYY-MM-DD'&to='YYYY-MM-DD'
 *  Get top 10 users statistics by date
 */
router.route('/top10').get(auth.protect, auth.restrictTo('Super użytkownik', 'Administrator'), queryToBody, user.top10);

/**
 * @api {get} /api/users/me
 *  Get loged user info
 */
router.route('/me').get(auth.protect, auth.getMe, user.getAll);

/**
 * @api {patch} /api/users/me
 *  Update loged user
 */
router.route('/me').patch(auth.protect, auth.getMe, user.update);

/**
 * @api {get} /api/users/me/number
 *  Get loged user info - number of user's reports
 */
router.route('/me/number').get(auth.protect, auth.getMe, user.numberOfReports);

module.exports = router;
