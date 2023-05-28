/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('department CREATE, UPDATE, DELETE', () => {
    let department_id;
    /**
     * @api {post} /api/departments
     *  Create department
     */
    test('/api/departments', (done) => {
        request(app)
            .post('/api/departments')
            .send({
                department: 'Nowy dział',
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);
                expect(response.body).toHaveProperty('data');
                department_id = response.body.data[0]['x_department_create'];
                done();
            });
    });

    /**
     * @api {patch} /api/departments/:department_id
     *  Update department by id
     */
    test('/api/departments/:department_id', (done) => {
        request(app)
            .patch(`/api/departments/${department_id}`)
            .send({
                department: 'Nowy dział',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_department_update']).toBe(true);
                done();
            });
    });

    /**
     * @api {delete} /api/departments/:department_id
     *  Delete department by id
     */
    test('/api/departments/:department_id', (done) => {
        request(app)
            .delete(`/api/departments/${department_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_department_delete']).toBe(true);
                done();
            });
    });
    test('/api/departments/:department_id', (done) => {
        request(app)
            .delete(`/api/departments/${department_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_department_delete']).toBeFalsy();
                done();
            });
    });
});
