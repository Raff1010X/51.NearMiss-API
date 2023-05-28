const pool = require('../../db');

/**
 * Gests data from the database
 * @param {string} text query string to be executed
 * @returns data from the database
 */
module.exports = (text) => async (req, res, next) => {
    // const result = await pool.query(text, req.body); // alternative
    const result = await pool.clientQuery(text, req.body);
    if (result.rows.length > 0) return result.rows;
    return [{ data: 'NULL' }];
};
