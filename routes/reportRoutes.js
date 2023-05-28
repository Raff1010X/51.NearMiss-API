const express = require('express');

const router = express.Router();
const report = require('../controllers/reportController');
const paramsToBody = require('./utils/paramsToBody');
const queryToBody = require('./utils/queryToBody');
const auth = require('../controllers/authController');

/**
 * Protected routes
 */
router.use(auth.protect);

/**
 * @api {post} /api/reports/create
 *  Create a new report
 */
router.post('/', paramsToBody, auth.getMe, report.create);

/**
 * @api {post} /api/reports/:report_id
 *  Update a report - execution time
 */
router.post('/:report_id', paramsToBody, report.executed);

/**
 * @api {patch} /api/reports/:report_id
 *  Update a report
 */
router.patch('/:report_id', paramsToBody, auth.reportAuthor, report.update);

/**
 * @api {delete} /api/reports/:report_id
 *  Delete a report
 */
router.delete('/:report_id', paramsToBody, auth.reportAuthor, report.delete);

const restrictTo = auth.restrictTo('Super użytkownik', 'Administrator');

/**
 * @api {get} /api/reports?zgłaszający=rafal.anonim@acme.pl&dział=formowanie&miejsce=r5&from=2022-01-01&to=2022-01-31&zagrożenie=butle&opis=upadek&skutek=brak&działania=zakup&order=Dział&desc=true&limit=10&offset=0
 *  Get all reports
 */
router.get('/', queryToBody, report.getAll);

/**
 * @api {get} /api/reports/:report_id
 *  Get a report by id
 */
router.get('/:report_id(\\d+)', paramsToBody, report.getAll);

/**
 * @api {get} /api/reports/todepartment?from=2022-01-01&to=2022-01-02
 *  Get reports stats to department
 */
router.get('/todepartment', queryToBody, report.getToDepartment);

// x_reports_by_department
/**
 * @api {get} /api/reports/bydepartment?from=2022-01-01&to=2022-01-02
 * Get reports stats from department
 */
router.get('/bydepartment', queryToBody, report.getByDepartment);

/**
 * @api {get} /api/reports/bydate
 * Get reports monthly stats
 */
router.get('/bydate', report.getByDate);

/**
 * @api {get} /api/reports/done
 * Get reports stats done
 */
router.get('/done', report.getDone);

/**
 * @api {get} /api/reports/post
 * Get reports stats post
 */
router.get('/post', report.getPost);

/**
 * @api {get} /api/reports/stats?from=2022-01-01&to=2022-01-02
 * Get reports stats
 */
router.get('/stats', queryToBody, report.getStats);

/**
 * @api {get} /api/reports/count?zgłaszający=rafal.anonim@acme.pl&dział=formowanie&miejsce=r5&from=2022-01-01&to=2022-01-31&zagrożenie=butle&opis=upadek&skutek=brak&działania=zakup
 *  Get all reports
 */
router.get('/count', queryToBody, report.getCount);

module.exports = router;
