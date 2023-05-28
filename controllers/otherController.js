const model = require('../models/otherModel');
const worker = require('./utils/worker');

exports.getConsequences = worker(model.getConsequences);
exports.getThreats = worker(model.getThreats);
