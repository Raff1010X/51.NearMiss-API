/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('FUNCTION ROUTES', () => {
    /**
     * @api {get} /api/functions
     *  Get all functions
     */
    test('/api/functions', (done) => {
        request(app)
            .get('/api/functions')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(15);
                done();
            });
    });
});
