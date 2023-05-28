const express = require('express');

const router = express.Router();
const manager = require('../controllers/managerController');
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
 * @api {post} /api/managers
 *  Create manager
 */
router.post('/', manager.create);

/**
 * @api {patch} /api/managers/:manager_id
 *  Update manager by id
 */
router.patch('/:manager_id', paramsToBody, manager.update);

/**
 * @api {get} /api/managers/?department_name='string'
 *  Get managers emails by department name
 */
router.get('/', queryToBody, manager.get);

/**
 * @api {delete} /api/managers/:manager_id
 *  Delete manager by id
 */
router.delete('/:manager_id', paramsToBody, manager.delete);

module.exports = router;
