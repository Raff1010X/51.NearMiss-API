/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('USER CREATE, UPDATE, DELETE', () => {
    /**
     * @api {post} /api/users
     *  Create user
     */
    let user_id;

    test('POST /api/users', (done) => {
        request(app)
            .post('/api/users')
            .send({
                email: 'r@r.pl',
                password: 'test1234',
            })
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                user_id = response.body.data[0]['x_user_create'];
                done();
            });
    });
    test('/api/users', (done) => {
        request(app)
            .get('/api/users')
            .query({
                email: 'r@r.pl',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(1);
                expect(response.body.data[0]['Adres email']).toBe('r@r.pl');
                expect(response.body.data[0]['Rola użytkownika']).toBe('Użytkownik');
                expect(response.body.data[0]['Dział']).toBe('Biuro');
                done();
            });
    });
    /**
     * @api {patch} /api/users/:user_id
     *  Update user
     */
    test('PATCH /api/users/:user_id', (done) => {
        request(app)
            .patch(`/api/users/${user_id}`)
            .send({
                email: 'rs@r.pl',
                password: 'test12345',
                role: 'superuser',
                department: 'Sortownia',
            })
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_user_update']).toBe(true);
                done();
            });
    });
    test('/api/users', (done) => {
        request(app)
            .get('/api/users')
            .query({
                email: 'r@r.pl',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['data']).toBe('NULL');
                done();
            });
    });
    test('/api/users', (done) => {
        request(app)
            .get('/api/users')
            .query({
                email: 'rs@r.pl',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(1);
                expect(response.body.data[0]['Adres email']).toBe('rs@r.pl');
                expect(response.body.data[0]['Rola użytkownika']).toBe('Super użytkownik');
                expect(response.body.data[0]['Dział']).toBe('Sortownia');
                done();
            });
    });
    /**
     * @api {delete} /api/users/:user_id
     *  Delete user
     */
    test('DELETE /api/users/:user_id', (done) => {
        request(app)
            .delete(`/api/users/${user_id}`)
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_user_delete']).toBe(true);
                done();
            });
    });
    test('/api/users', (done) => {
        request(app)
            .get('/api/users')
            .query({
                email: 'rs@r.pl',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['data']).toBe('NULL');
                done();
            });
    });
});
