//** Connect to Postgresql with pg
const pg = require('pg');

const customDateParser = (val) => {
    if (val === null) return null;
    const d = new Date(new Date(val).setHours(new Date(val).getHours() + 2));
    const dformat =
        [d.getFullYear(), dN(d.getMonth() + 1), dN(d.getDate())].join('-') +
        ' ' +
        [dN(d.getHours()), dN(d.getMinutes())].join(':');
    // , dN(d.getSeconds())//.substring(0, 16)
    return dformat;
};

const dN = (number) => {
    if (number < 10) return `0${number}`;
    return number;
};

pg.types.setTypeParser(1082, (val) => val);
pg.types.setTypeParser(1114, customDateParser);

const { Pool } = pg;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false,
        // ca: fs.readFileSync('/server-certificates/root.crt').toString(),
        // key: fs.readFileSync('/client-key/postgresql.key').toString(),
        // cert: fs.readFileSync('/client-certificates/postgresql.crt').toString(),
    },
});

module.exports = {
    async query(text, params) {
        let result;
        if (text.includes('($1)') && Object.keys(params).length !== 0) {
            result = await pool.query(text, [params]);
        } else {
            result = await pool.query(text);
        }
        return result;
    },

    async clientQuery(text, params) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            let result;
            if (text.includes('($1)') && Object.keys(params).length !== 0) {
                result = await client.query(text, [params]);
            } else {
                result = await client.query(text);
            }
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    },
};
