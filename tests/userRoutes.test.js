/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('USER ROUTES', () => {
    /**
     * @api {get} /api/users?limit=10&offset=0&pattern=&order=Dział&desc=true
     *  Get all users
     */
    test('/api/users', (done) => {
        request(app)
            .get('/api/users')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(70);
                done();
            });
    });
    test('/api/users', (done) => {
        request(app)
            .get('/api/users')
            .query({ limit: 10, offset: 0, email: '', order: 'Dział', desc: true })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(10);
                done();
            });
    });
    test('/api/users', (done) => {
        request(app)
            .get('/api/users')
            .query({
                // limit: 10,
                // offset: 0,
                email: 'rafal',
                order: 'Dział',
                desc: true,
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(4);
                done();
            });
    });
    /**
     * @api {get} /api/users/top10?from='YYYY-MM-DD'&to='YYYY-MM-DD'
     *  Get top 10 users statistics by date
     */
    test('/api/users/top10', (done) => {
        request(app)
            .get('/api/users/top10')
            .query({ from: '2021-01-01', to: '2021-01-31' })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(7);
                expect(response.body.data[0]).toHaveProperty('email');
                expect(response.body.data[0]['email']).toBe('robert.gadzikowska@acme.pl');
                expect(response.body.data[0]).toHaveProperty('Liczba zgłoszeń');
                expect(response.body.data[0]['Liczba zgłoszeń']).toBe(3);
                done();
            });
    });
});
