/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('OTHER ROUTES', () => {
    /**
     * @route   GET /api/other/threats
     * other get threats
     */
    test('/api/other/consequences', (done) => {
        request(app)
            .get('/api/other/consequences')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(5);
                expect(response.body.data[0]).toHaveProperty('consequence');
                done();
            });
    });
    /**
     * @route   GET /api/other/consequences
     * other get consequences
     */
    test('/api/other/threats', (done) => {
        request(app)
            .get('/api/other/threats')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]).toHaveProperty('threat');
                done();
            });
    });
});
