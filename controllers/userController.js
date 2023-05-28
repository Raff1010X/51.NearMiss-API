const model = require('../models/userModel');
const worker = require('./utils/worker');

exports.getAll = worker(model.getAll);
exports.create = worker(model.create, 201);
exports.update = worker(model.update);
exports.delete = worker(model.delete);
exports.top10 = worker(model.top10);
exports.numberOfReports = worker(model.numberOfReports);
