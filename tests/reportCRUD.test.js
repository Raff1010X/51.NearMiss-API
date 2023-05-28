/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('REPORT CREATE, UPDATE, DELETE', () => {
    let report_id;
    /**
     * @api {post} /api/reports
     *  Create a new report
     */
    test('POST /api/reports', (done) => {
        request(app)
            .post('/api/reports')
            .send({
                Zgłaszający: 'rafal.anonim@acme.pl',
                Dział: 'Formowanie',
                Miejsce: 'Moje miejsce',
                'Data zdarzenia': '2022-06-22',
                'Godzina zdarzenia': '12:00:00',
                Zagrożenie: 'Budynki',
                'Opis Zagrożenia': 'Moje zagrożenie',
                Skutek: 'Mój skutek vel consequence',
                Konsekwencje: 'Duże',
                'Działania do wykonania': 'Moje działania do wykonania',
                Zdjęcie: 'Moje_zdjęcie.jpg',
            })
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                report_id = response.body.data[0]['x_report_create'];
                done();
            });
    });
    test('/api/reports/:report_id', (done) => {
        request(app)
            .get(`/api/reports/${report_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(1);
                expect(response.body.data[0]).toHaveProperty('Numer zgłoszenia');
                expect(response.body.data[0]['Numer zgłoszenia']).toBe(report_id);
                expect(response.body.data[0]['Zgłaszający']).toBe('rafal.anonim@acme.pl');
                expect(response.body.data[0]['Dział']).toBe('Formowanie');
                expect(response.body.data[0]['Miejsce']).toBe('Moje miejsce');
                expect(response.body.data[0]['Data zdarzenia']).toBe('2022-06-22');
                expect(response.body.data[0]['Godzina zdarzenia']).toBe('12:00:00');
                expect(response.body.data[0]['Zagrożenie']).toBe('Budynki');
                expect(response.body.data[0]['Opis Zagrożenia']).toBe('Moje zagrożenie');
                expect(response.body.data[0]['Skutek']).toBe('Mój skutek vel consequence');
                expect(response.body.data[0]['Konsekwencje']).toBe('Duże');
                expect(response.body.data[0]['Działania do wykonania']).toBe('Moje działania do wykonania');
                expect(response.body.data[0]['Zdjęcie']).toBe('Moje_zdjęcie.jpg');
                done();
            });
    });
    /**
     * @api {patch} /api/reports/:report_id
     *  Update a report
     */
    test('PATCH /api/reports/:report_id', (done) => {
        request(app)
            .patch(`/api/reports/${report_id}`)
            .send({
                Dział: 'Sortownia',
                Miejsce: 'Moje miejsce 2',
                'Data zdarzenia': '2022-07-26',
                'Godzina zdarzenia': '13:00:00',
                Zagrożenie: 'Budynki',
                'Opis Zagrożenia': 'Moje zagrożenie 2',
                Skutek: 'Mój skutek vel consequence 2',
                Konsekwencje: 'Małe',
                'Działania do wykonania': 'Moje działania do wykonania 2',
                Zdjęcie: 'Moje_zdjęcie2.jpg',
            })
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_report_update']).toBe(true);
                done();
            });
    });
    test('/api/reports/:report_id', (done) => {
        request(app)
            .get(`/api/reports/${report_id}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(1);
                expect(response.body.data[0]).toHaveProperty('Numer zgłoszenia');
                expect(response.body.data[0]['Numer zgłoszenia']).toBe(report_id);
                expect(response.body.data[0]['Zgłaszający']).toBe('rafal.anonim@acme.pl');
                expect(response.body.data[0]['Dział']).toBe('Sortownia');
                expect(response.body.data[0]['Miejsce']).toBe('Moje miejsce 2');
                expect(response.body.data[0]['Data zdarzenia']).toBe('2022-07-26');
                expect(response.body.data[0]['Godzina zdarzenia']).toBe('13:00:00');
                expect(response.body.data[0]['Zagrożenie']).toBe('Budynki');
                expect(response.body.data[0]['Opis Zagrożenia']).toBe('Moje zagrożenie 2');
                expect(response.body.data[0]['Skutek']).toBe('Mój skutek vel consequence 2');
                expect(response.body.data[0]['Konsekwencje']).toBe('Małe');
                expect(response.body.data[0]['Działania do wykonania']).toBe('Moje działania do wykonania 2');
                expect(response.body.data[0]['Zdjęcie']).toBe('Moje_zdjęcie2.jpg');
                done();
            });
    });
    /**
     * @api {delete} /api/reports/:report_id
     *  Delete a report
     */
    test('DELETE /api/reports/:report_id', (done) => {
        request(app)
            .delete(`/api/reports/${report_id}`)
            .send({})
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_report_delete']).toBe(true);
                done();
            });
    });
    test('DELETE /api/reports/:report_id', (done) => {
        request(app)
            .delete(`/api/reports/${report_id}`)
            .send({})
            .then((response) => {
                expect(response.body).toHaveProperty('data');
                expect(response.body.data[0]['x_report_delete']).toBeFalsy();
                done();
            });
    });
});
