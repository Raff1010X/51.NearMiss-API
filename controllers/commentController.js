const model = require('../models/commentModel');
const worker = require('./utils/worker');

exports.getAll = worker(model.getAll);
exports.getOne = worker(model.getOne);
exports.create = worker(model.create, 201);
exports.update = worker(model.update);
exports.delete = worker(model.delete);
exports.byUser = worker(model.byUser);
exports.toReport = worker(model.toReport);
