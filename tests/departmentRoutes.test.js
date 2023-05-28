/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('DEPARTMENT ROUTES', () => {
    /**
     * @api {get} /api/departments
     *  Get all departments
     */
    test('/api/departments', (done) => {
        request(app)
            .get('/api/departments')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(17);
                done();
            });
    });
});
