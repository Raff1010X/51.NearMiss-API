const express = require('express');

const router = express.Router();
const department = require('../controllers/departmentController');
const paramsToBody = require('./utils/paramsToBody');
const queryToBody = require('./utils/queryToBody');
const auth = require('../controllers/authController');

/**
 * @api {get} /department
 *  Get all departments
 */
router.route('/').get(department.getAll);

/**
 * @api {post} /api/departments
 *  Create department
 */
router.route('/').post(auth.protect, auth.restrictTo('Administrator'), department.create);

/**
 * @api {patch} /api/departments/:department_id
 *  Update department by id
 */
router.route('/:department_id').patch(auth.protect, auth.restrictTo('Administrator'), paramsToBody, department.update);

/**
 * @api {delete} /api/departments/:department_id
 *  Delete department by id
 */
router.route('/:department_id').delete(auth.protect, auth.restrictTo('Administrator'), paramsToBody, department.delete);

module.exports = router;
