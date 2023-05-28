const express = require('express');
const router = express.Router();
const comment = require('../controllers/commentController');
const paramsToBody = require('./utils/paramsToBody');
const auth = require('../controllers/authController');

/**
 * Protected routes
 */
router.use(auth.protect);

/**
 * Restricted to superuser and admin
 */
router.use(auth.restrictTo('Super użytkownik', 'Administrator'));

/**
 * @api {get} /api/comments
 *  Get all comments
 */
router.route('/').get(comment.getAll);

/**
 * @api {get} /api/comments/:comment_id
 *  Get comment by id
 */
router.route('/:comment_id').get(paramsToBody, comment.getOne);

/**
 * @api {post} /api/comments
 *  Create comment
 */
router.route('/').post(comment.create);

/**
 * @api {patch} /api/comments/:comment_id
 *  Update comment
 */
router.route('/:comment_id').patch(paramsToBody, auth.commentAuthor, comment.update);

/**
 * @api {delete} /api/comments/:comment_id
 * Delete comment
 */
router.route('/:comment_id').delete(paramsToBody, auth.commentAuthor, comment.delete);

/**
 * @api {get} /api/comments/user/:user_email
 *  Get all comments by user email
 */
router.route('/user/:user_email').get(paramsToBody, comment.byUser);

/**
 * @api {get} /api/comments/report/:report_id
 *  Get all comments by report id
 */
router.route('/report/:report_id').get(paramsToBody, comment.toReport);

module.exports = router;
