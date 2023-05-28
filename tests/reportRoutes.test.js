/* eslint-disable */

const request = require('supertest');
const app = 'localhost:3000';

describe('REPORTS ROUTES', () => {
    /**
     * @api {get} /api/reports?zgłaszający=rafal.anonim@acme.pl&dział=formowanie&miejsce=r5&from=2022-01-01&to=2022-01-31&zagrożenie=butle&opis=upadek&skutek=brak&działania=zakup&order=Dział&desc=true&limit=10&offset=0
     *  Get all reports
     */
    test('/api/reports (dział miejsce order desc limit offset)', (done) => {
        request(app)
            .get('/api/reports')
            .query({
                // zgłaszający: 'rafal.anonim@acme.pl',
                dział: 'formowanie',
                miejsce: 'R1',
                // from: '2022-01-01',
                // to: '2022-01-31',
                // zagrożenie: 'butle',
                // opis: 'upadek',
                // skutek: 'brak',
                // działania: 'zakup',
                order: 'Data zdarzenia',
                desc: true,
                limit: '10',
                offset: '0',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(10);
                response.body.data.forEach((item) => {
                    expect(item).toHaveProperty('Dział');
                    expect(item).toHaveProperty('Miejsce');
                    expect(item).toHaveProperty('Data zdarzenia');
                    expect(item.Dział.toString()).toBe('Formowanie');
                    expect(item.Miejsce.toString().includes('R1')).toBe(true);
                });
                for (let i = 1; i < 10; i++) {
                    expect(
                        new Date(response.body.data[i]['Data zdarzenia']) <=
                            new Date(response.body.data[i - 1]['Data zdarzenia'])
                    ).toBe(true);
                }
                done();
            });
    });
    test('/api/reports (from to)', (done) => {
        request(app)
            .get('/api/reports')
            .query({
                // zgłaszający: 'rafal.anonim@acme.pl',
                // dział: 'formowanie',
                // miejsce: 'R1',
                from: '2022-01-01',
                to: '2022-01-31',
                // zagrożenie: 'butle',
                // opis: 'upadek',
                // skutek: 'brak',
                // działania: 'zakup',
                // order: 'Data zdarzenia',
                // desc: true,
                // limit: '10',
                // offset: '0',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(15);
                response.body.data.forEach((item) => {
                    expect(item).toHaveProperty('Dział');
                    expect(item).toHaveProperty('Miejsce');
                    expect(item).toHaveProperty('Data zdarzenia');
                });
                for (let i = 1; i < 10; i++) {
                    expect(
                        new Date(response.body.data[i]['Data zdarzenia']) <= new Date('2022-01-31') &&
                            new Date(response.body.data[i]['Data zdarzenia']) >= new Date('2022-01-01')
                    ).toBe(true);
                }
                done();
            });
    });
    test('/api/reports (from to)', (done) => {
        request(app)
            .get('/api/reports')
            .query({
                // zgłaszający: 'rafal.anonim@acme.pl',
                // dział: 'formowanie',
                // miejsce: 'R1',
                // from: '2022-01-01',
                // to: '2022-01-31',
                // zagrożenie: 'butle',
                // opis: 'upadek',
                // skutek: 'brak',
                // działania: 'zakup',
                order: 'Data zdarzenia',
                desc: true,
                // limit: '10',
                // offset: '0',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(500);
                response.body.data.forEach((item) => {
                    expect(item).toHaveProperty('Dział');
                    expect(item).toHaveProperty('Miejsce');
                    expect(item).toHaveProperty('Data zdarzenia');
                });
                for (let i = 1; i < 500; i++) {
                    expect(
                        new Date(response.body.data[i]['Data zdarzenia']) <=
                            new Date(response.body.data[i - 1]['Data zdarzenia'])
                    ).toBe(true);
                }
                done();
            });
    });
    test('/api/reports (zgłaszający)', (done) => {
        request(app)
            .get('/api/reports')
            .query({
                zgłaszający: 'rafal.anonim@acme.pl',
                // dział: 'formowanie',
                // miejsce: 'R1',
                // from: '2022-01-01',
                // to: '2022-01-31',
                // zagrożenie: 'butle',
                // opis: 'upadek',
                // skutek: 'brak',
                // działania: 'zakup',
                // order: 'Data zdarzenia',
                // desc: true,
                // limit: '10',
                // offset: '0',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(69);
                response.body.data.forEach((item) => {
                    expect(item).toHaveProperty('Dział');
                    expect(item).toHaveProperty('Miejsce');
                    expect(item).toHaveProperty('Data zdarzenia');
                    expect(item.Zgłaszający).toBe('rafal.anonim@acme.pl');
                });
                done();
            });
    });
    test('/api/reports (zagrożenie opis)', (done) => {
        request(app)
            .get('/api/reports')
            .query({
                //zgłaszający: 'rafal.anonim@acme.pl',
                // dział: 'formowanie',
                // miejsce: 'R1',
                // from: '2022-01-01',
                // to: '2022-01-31',
                zagrożenie: 'butle',
                opis: 'upadek',
                // skutek: 'brak',
                // działania: 'zakup',
                // order: 'Data zdarzenia',
                // desc: true,
                // limit: '10',
                // offset: '0',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(2);
                response.body.data.forEach((item) => {
                    expect(item).toHaveProperty('Dział');
                    expect(item).toHaveProperty('Miejsce');
                    expect(item).toHaveProperty('Data zdarzenia');
                    expect(/butle/i.test(item['Zagrożenie'])).toBe(true);
                    expect(/upadek/i.test(item['Opis Zagrożenia'])).toBe(true);
                });
                done();
            });
    });
    test('/api/reports (działania)', (done) => {
        request(app)
            .get('/api/reports')
            .query({
                //zgłaszający: 'rafal.anonim@acme.pl',
                // dział: 'formowanie',
                // miejsce: 'R1',
                // from: '2022-01-01',
                // to: '2022-01-31',
                // zagrożenie: 'butle',
                // opis: 'upadek',
                // skutek: 'brak',
                działania: 'zakup',
                // order: 'Data zdarzenia',
                // desc: true,
                // limit: '10',
                // offset: '0',
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(5);
                response.body.data.forEach((item) => {
                    expect(item).toHaveProperty('Dział');
                    expect(item).toHaveProperty('Miejsce');
                    expect(item).toHaveProperty('Data zdarzenia');
                    expect(/zakup/i.test(item['Działania do wykonania'])).toBe(true);
                });
                done();
            });
    });
    /**
     * @api {get} /api/reports/:report_id
     *  Get a report by id
     */
    test('/api/reports/50', (done) => {
        request(app)
            .get('/api/reports/50')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(1);
                expect(response.body.data[0]).toHaveProperty('Numer zgłoszenia');
                expect(response.body.data[0]['Numer zgłoszenia']).toBe(50);
                done();
            });
    });
    /**
     * @api {get} /api/reports/todepartment?from=2022-01-01&to=2022-01-02
     *  Get reports stats to department
     */
    test('/api/reports/todepartment?from=2022-01-01&to=2022-01-31', (done) => {
        request(app)
            .get('/api/reports/todepartment?from=2022-01-01&to=2022-01-31')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(7);
                expect(response.body.data[0]).toHaveProperty('Dział');
                expect(response.body.data[0]).toHaveProperty('Liczba zgłoszeń');
                expect(response.body.data[0]).toHaveProperty('Liczba zgłoszeń wykonanych');
                expect(response.body.data[0]).toHaveProperty('Procent zgłoszeń wykonanych');
                done();
            });
    });
    /**
     * @api {get} /api/reports/bydepartment?from=2022-01-01&to=2022-01-02
     * Get reports stats from department
     */
    test('/api/reports/bydepartment?from=2022-01-01&to=2022-01-31', (done) => {
        request(app)
            .get('/api/reports/bydepartment?from=2022-01-01&to=2022-01-31')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(4);
                expect(response.body.data[0]).toHaveProperty('Dział');
                expect(response.body.data[0]).toHaveProperty('Liczba zgłoszeń przez dział');
                done();
            });
    });

    /**
     * @api {get} /api/reports/bydate
     * Get reports monthly stats
     */
    test('/api/reports/bydate', (done) => {
        request(app)
            .get('/api/reports/bydate')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(141);
                expect(response.body.data[0]).toHaveProperty('mon');
                expect(response.body.data[0]).toHaveProperty('yyyy');
                expect(response.body.data[0]).toHaveProperty('Cel 5 zgłoszeń');
                done();
            });
    });

    /**
     * @api {get} /api/reports/done
     * Get reports stats done
     */
    test('/api/reports/done', (done) => {
        request(app)
            .get('/api/reports/done')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(28);
                expect(response.body.data[0]).toHaveProperty('mon');
                expect(response.body.data[0]).toHaveProperty('yyyy');
                expect(response.body.data[0]).toHaveProperty('Liczba zgłoszeń wykonanych');
                done();
            });
    });

    /**
     * @api {get} /api/reports/post
     * Get reports stats post
     */
    test('/api/reports/post', (done) => {
        request(app)
            .get('/api/reports/post')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(35);
                expect(response.body.data[0]).toHaveProperty('mon');
                expect(response.body.data[0]).toHaveProperty('yyyy');
                expect(response.body.data[0]).toHaveProperty('Liczba zgłoszeń');
                done();
            });
    });

    /**
     * @api {get} /api/reports/stats?from=2022-01-01&to=2022-01-02
     * Get reports stats
     */
    test('/api/reports/stats?from=2022-01-01&to=2022-01-31', (done) => {
        request(app)
            .get('/api/reports/stats?from=2022-01-01&to=2022-01-31')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveLength(1);
                expect(response.body.data[0]).toHaveProperty('Liczba zgłoszeń');
                expect(response.body.data[0]).toHaveProperty('Liczba zgłoszeń wykonanych');
                expect(response.body.data[0]).toHaveProperty('Procent zgłoszeń wykonanych');
                done();
            });
    });
});
