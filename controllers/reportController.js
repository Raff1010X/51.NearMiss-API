const model = require('../models/reportModel');
const worker = require('./utils/worker');

exports.create = worker(model.create, 201);
exports.update = worker(model.update);
exports.executed = worker(model.executed);
exports.delete = worker(model.delete);
exports.getAll = worker(model.getAll);
exports.getToDepartment = worker(model.getToDepartment);
exports.getByDepartment = worker(model.getByDepartment);
exports.getByDate = worker(model.getByDate);
exports.getDone = worker(model.getDone);
exports.getPost = worker(model.getPost);
exports.getStats = worker(model.getStats);
exports.getCount = worker(model.getCount);
