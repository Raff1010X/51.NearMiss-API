const worker = require('./utils/worker');

exports.getAll = worker('Select * from x_users_all($1)');
exports.create = worker('Select * from x_user_create($1)');
exports.update = worker('Select * from x_user_update($1)');
exports.delete = worker('Select * from x_user_delete($1)');
exports.top10 = worker('Select * from x_users_top_10($1)');
exports.userById = worker('Select * from x_user_by_uuid($1)');
exports.numberOfReports = worker('Select * from x_user_number_of_reports($1)');

exports.checkUserPassword = worker('Select * from x_check_user_password($1)');
exports.updateUserPasswordByToken = worker('Select * from x_update_user_password_by_token($1)');
