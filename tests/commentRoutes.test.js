/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('COMMENTS ROUTES', () => {
    /**
     * @api {get} /api/comments
     *  Get all comments
     */
    test('/api/comments', (done) => {
        request(app)
            .get('/api/comments')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                done();
            });
    });

    /**
     * @api {get} /api/comments/:comment_id
     *  Get comment by id
     */
    test('/api/comments/:comment_id', (done) => {
        request(app)
            .get('/api/comments/6')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['Numer komentarza']).toBe(6);
                done();
            });
    });

    /**
     * @api {get} /api/comments/user/:user_email
     *  Get all comments by user email
     */
    test('/api/comments/user/:user_email', (done) => {
        request(app)
            .get('/api/comments/user/rafal.anonim@acme.pl')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                response.body.data.forEach((item) => {
                    expect(item['Autor']).toBe('rafal.anonim@acme.pl');
                });
                done();
            });
    });

    /**
     * @api {get} /api/comments/report/:report_id
     *  Get all comments by report id
     */
    test('/api/comments/report/:report_id', (done) => {
        request(app)
            .get('/api/comments/report/5')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                response.body.data.forEach((item) => {
                    expect(item['ID raportu']).toBe(5);
                });
                done();
            });
    });
});
