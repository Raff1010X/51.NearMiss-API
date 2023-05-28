const express = require('express');

const router = express.Router();
const paramsToBody = require('./utils/paramsToBody');
const auth = require('../controllers/authController');
const file = require('../controllers/fileController');

/**
 * Protected routes
 */
// router.use(auth.protect);

/**
 * @api {post} /api/file
 *  Post image file
 */
// router.route('/').post(paramsToBody, auth.getMe, file.create);
router.route('/').post(file.create);

module.exports = router;
