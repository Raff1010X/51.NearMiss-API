const worker = require('./utils/worker');

exports.getAll = worker('SELECT * FROM departments ORDER BY department');
exports.create = worker('SELECT * FROM x_department_create($1)');
exports.update = worker('SELECT * FROM x_department_update($1)');
exports.delete = worker('SELECT * FROM x_department_delete($1)');
