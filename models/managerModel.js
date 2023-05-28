const worker = require('./utils/worker');

exports.get = worker('SELECT * FROM x_managers_emails($1)');
exports.create = worker('SELECT * FROM x_manager_create($1)');
exports.update = worker('SELECT * FROM x_manager_update($1)');
exports.delete = worker('SELECT * FROM x_manager_delete($1)');
