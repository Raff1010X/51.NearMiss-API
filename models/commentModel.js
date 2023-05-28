const worker = require('./utils/worker');

exports.getAll = worker('Select * from comments_all');
exports.getOne = worker('Select * from x_comment($1)');
exports.create = worker('Select * from x_comment_create($1)');
exports.update = worker('Select * from x_comment_update($1)');
exports.delete = worker('Select * from x_comment_delete($1)');
exports.byUser = worker('Select * from x_comments_by_user($1)');
exports.toReport = worker('Select * from x_comments_to_report($1)');
