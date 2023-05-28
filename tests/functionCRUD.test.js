/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('FUNCTION CREATE, UPDATE, DELETE', () => {
    let function_id;
    /**
     * @api {post} /api/functions
     *  Create function
     */
    test('/api/functions', (done) => {
        request(app)
            .post('/api/functions')
            .send({
                function: 'Nowa funkcja kierownicza',
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);
                expect(response.body).toHaveProperty('data');
                function_id = response.body.data[0]['x_function_create'];
                done();
            });
    });

    /**
     * @api {patch} /api/functions/:function_id
     *  update function
     */
    test('/api/functions/:function_id', (done) => {
        request(app)
            .patch(`/api/functions/${function_id}`)
            .send({
                function: 'Nowa funkcja kierownicza',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_function_update']).toBe(true);
                done();
            });
    });

    /**
     * @api {delete} /api/functions/:function_id
     *  Delete function by id
     */
    test('/api/functions/:function_id', (done) => {
        request(app)
            .delete(`/api/functions/${function_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_function_delete']).toBe(true);
                done();
            });
    });
    test('/api/functions/:function_id', (done) => {
        request(app)
            .delete(`/api/functions/${function_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_function_delete']).toBeFalsy();
                done();
            });
    });
});
