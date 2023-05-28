const worker = require('./utils/worker');

exports.getConsequences = worker('SELECT * FROM consequences');
exports.getThreats = worker('SELECT * FROM threats');
