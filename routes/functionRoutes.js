const express = require('express');

const router = express.Router();
const func = require('../controllers/functionController');
const paramsToBody = require('./utils/paramsToBody');
const queryToBody = require('./utils/queryToBody');
const auth = require('../controllers/authController');

/**
 * Protected routes
 */
router.use(auth.protect);

/**
 * Restricted to admin
 */
router.use(auth.restrictTo('Administrator'));

/**
 * @api {get} /api/functions
 *  Get all functions
 */
router.route('/').get(func.getAll);

/**
 * @api {post} /api/functions
 *  Create function
 */
router.route('/').post(func.create);

/**
 * @api {patch} /api/functions/:function_id
 *  update function
 */
router.route('/:function_id').patch(paramsToBody, func.update);

/**
 * @api {delete} /api/functions/:function_id
 *  Delete function by id
 */
router.route('/:function_id').delete(paramsToBody, func.delete);

module.exports = router;
