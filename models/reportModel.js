const worker = require('./utils/worker');

exports.create = worker('Select * from x_report_create($1)');
exports.update = worker('Select * from x_report_update($1)');
exports.executed = worker('Select * from x_report_executed($1)');

exports.delete = worker('Select * from x_report_delete($1)');
exports.getAll = worker('Select * from x_reports_all($1)');

exports.getToDepartment = worker('Select * from x_reports_to_department($1)');
exports.getByDepartment = worker('Select * from x_reports_by_department($1)');
exports.getByDate = worker('Select * from reports_by_date');
exports.getDone = worker('Select * from reports_by_date_done');
exports.getPost = worker('Select * from reports_by_date_post');
exports.getStats = worker('Select * from x_reports_stats($1)');
exports.getCount = worker('Select * from x_reports_all_count($1)');
