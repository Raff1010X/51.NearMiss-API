/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('MANAGER CREATE, UPDATE, DELETE', () => {
    let manager_id;
    /**
     * @api {post} /api/managers
     *  Create manager
     */
    test('/api/managers', (done) => {
        request(app)
            .post('/api/managers')
            .send({
                function: 'Kierownik techniki',
                email: 'rafal.anonim@acme.pl',
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);
                expect(response.body).toHaveProperty('data');
                expect(response.body).toHaveProperty('data');
                manager_id = response.body.data[0]['x_manager_create'];
                done();
            });
    });

    /**
     * @api {patch} /api/managers/:manager_id
     *  Update manager by id
     */
    test('/api/managers/:manager_id', (done) => {
        request(app)
            .patch(`/api/managers/${manager_id}`)
            .send({
                function: 'Kierownik utrzymania ruchu',
                email: 'rafal.anonim@acme.pl',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_manager_update']).toBe(true);
                done();
            });
    });

    /**
     * @api {delete} /api/managers/:manager_id
     *  Delete manager by id
     */
    test('/api/managers/:manager_id', (done) => {
        request(app)
            .delete(`/api/managers/${manager_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_manager_delete']).toBe(true);
                done();
            });
    });
    test('/api/managers/:manager_id', (done) => {
        request(app)
            .delete(`/api/managers/${manager_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_manager_delete']).toBeFalsy();
                done();
            });
    });
});
