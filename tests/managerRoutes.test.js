/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('MANAGER ROUTES', () => {
    /**
     * @api {get} /api/managers/?department_name='string'
     *  Get managers emails by department name
     */
    test('api/manager/?department_name=string', (done) => {
        request(app)
            .get('/api/managers')
            .query({ department_name: 'formowanie' })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(4);
                done();
            });
    });
    test('api/manager', (done) => {
        request(app)
            .get('/api/managers')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(25);
                done();
            });
    });
});
