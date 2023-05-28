const model = require('../models/managerModel');
const worker = require('./utils/worker');

exports.get = worker(model.get);
exports.create = worker(model.create, 201);
exports.update = worker(model.update);
exports.delete = worker(model.delete);
