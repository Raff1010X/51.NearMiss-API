const worker = require('./utils/worker');

exports.getAll = worker('SELECT * FROM functions');
exports.create = worker('SELECT * FROM x_function_create($1)');
exports.update = worker('SELECT * FROM x_function_update($1)');
exports.delete = worker('SELECT * FROM x_function_delete($1)');
