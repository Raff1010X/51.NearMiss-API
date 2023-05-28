const model = require('../models/functionModel');
const worker = require('./utils/worker');

exports.getAll = worker(model.getAll);
exports.create = worker(model.create, 201);
exports.update = worker(model.update);
exports.delete = worker(model.delete);
