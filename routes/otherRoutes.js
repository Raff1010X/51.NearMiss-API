const express = require('express');
const other = require('../controllers/otherController');
const router = express.Router();
const auth = require('../controllers/authController');

/**
 * Protected routes
 */
router.use(auth.protect);

/**
 * @route   GET /api/other/threats
 * other get threats
 */
router.route('/threats').get(other.getThreats);
/**
 * @route   GET /api/other/consequences
 * other get consequences
 */
router.route('/consequences').get(other.getConsequences);

module.exports = router;
