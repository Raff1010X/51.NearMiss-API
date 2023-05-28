/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('COMMENT CREATE, UPDATE, DELETE', () => {
    let comment_id;
    /**
     * @api {post} /api/comments
     *  Create comment
     */
    test('POST /api/comments', (done) => {
        request(app)
            .post('/api/comments')
            .send({
                'Numer zgloszenia': '6',
                'Adres email': 'rafal.anonim@acme.pl',
                Komentarz: 'Komentarz',
            })
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                comment_id = response.body.data[0]['x_comment_create'];
                done();
            });
    });
    test('/api/comments/:comment_id', (done) => {
        request(app)
            .get(`/api/comments/${comment_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['Numer komentarza']).toBe(comment_id);
                expect(response.body.data[0]['Wpis']).toBe('Komentarz');
                expect(response.body.data[0]['Autor']).toBe('rafal.anonim@acme.pl');
                expect(response.body.data[0]['ID raportu']).toBe(6);
                done();
            });
    });
    /**
     * @api {patch} /api/comments/:comment_id
     *  Update comment
     */
    test('PATCH /api/comments/:comment_id', (done) => {
        request(app)
            .patch(`/api/comments/${comment_id}`)
            .send({
                Komentarz: 'Komentarz poprawiony',
            })
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_comment_update']).toBe(true);
                done();
            });
    });
    test('/api/comments/:comment_id', (done) => {
        request(app)
            .get(`/api/comments/${comment_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['Numer komentarza']).toBe(comment_id);
                expect(response.body.data[0]['Wpis']).toBe('Komentarz poprawiony');
                expect(response.body.data[0]['Autor']).toBe('rafal.anonim@acme.pl');
                expect(response.body.data[0]['ID raportu']).toBe(6);
                done();
            });
    });
    /**
     * @api {delete} /api/comments/:comment_id
     *  Delete comment
     */
    test('DELETE /api/comments/:comment_id', (done) => {
        request(app)
            .delete(`/api/comments/${comment_id}`)
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_comment_delete']).toBe(true);
                done();
            });
    });
});
