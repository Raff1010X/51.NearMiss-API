const AppError = require('../err/appError');
const other = require('../models/otherModel');
const department = require('../models/departmentModel');

/**
 * validate request
 */
function integers(param) {
    return typeof param === 'number';
}
function integer_10(param) {
    return integers(param) && param === 10;
}
function boolean_true(param) {
    return typeof param === 'boolean' && param === true;
}
function date(param) {
    const date = new Date(param);
    return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
}
function hour(param) {
    return String(param)
        .toLowerCase()
        .match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/);
}
function string_255(param) {
    return typeof param === 'string' && param.length <= 255;
}
function email(param) {
    return String(param)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
function email_255(param) {
    return string_255(param) && email(param);
}

function strings(param) {
    return typeof param === 'string';
}
function string_50(param) {
    return strings(param) && param.length <= 50;
}
function string_8_1024(param) {
    return strings(param) && param.length >= 8 && param.length <= 1024;
}
function string_8_50(param) {
    return strings(param) && param.length >= 8 && param.length <= 50;
}
function UUID(param) {
    return String(param)
        .toLowerCase()
        .match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
}

async function listaDział(param) {
    const list = await department.getAll('');
    return list.some((el) => el['department'] === param);
}

async function listZagrozenie(param) {
    const list = await other.getThreats('');
    return list.some((el) => el['threat'] === param);
}

async function listKonsekwencje(param) {
    const list = await other.getConsequences('');
    return list.some((el) => el['consequence'] === param);
}

function listStatus(param) {
    const list = ['Wykonane', 'Niewykonane'];
    const ret = list.includes(param);
    return ret;
}

const validateBody = [
    { name: 'email', func: (p) => email_255(p), message: 'Nieprawidłowy adres email.' },
    {
        name: 'password',
        func: (p) => string_8_50(p),
        message: 'Nieprawidłowa długość hasła. Minimalna długość hasła-8 znaków, maksymalna-50.',
    },
    {
        name: 'password_updated',
        func: (p) => string_8_50(p),
        message: 'Nieprawidłowa długość hasła. Minimalna długość hasła-8 znaków, maksymalna-50.',
    },
    { name: 'Adres email', func: (p) => email_255(p), message: 'Nieprawidłowy adres email.' },
    { name: 'Numer zgloszenia', func: (p) => integers(p), message: 'Numer zgłoszenia powinien być liczbą.' },
    { name: 'Zgłaszający', func: (p) => email_255(p), message: 'Nieprawidłowy adres email.' },
    {
        name: 'Miejsce',
        func: (p) => string_8_1024(p),
        message: 'Nieprawidłowa długość opisu miejsca. Minimalna długość-8 znaków, maksymalna-1024.',
    },
    { name: 'Data zdarzenia', func: (p) => date(p), message: 'Nieprawidłowy format daty' },
    { name: 'Godzina zdarzenia', func: (p) => hour(p), message: 'Nieprawidłowy format godziny' },
    {
        name: 'Opis Zagrożenia',
        func: (p) => string_8_1024(p),
        message: 'Nieprawidłowa długość opisu miejsca. Minimalna długość-8 znaków, maksymalna-1024.',
    },
    {
        name: 'Skutek',
        func: (p) => string_8_1024(p),
        message: 'Nieprawidłowa długość opisu skutków. Minimalna długość hasła-8 znaków, maksymalna-1024.',
    },
    {
        name: 'Działania do wykonania',
        func: (p) => string_8_1024(p),
        message: 'Nieprawidłowa długość opisu działań do wykonania. Minimalna długość-8 znaków, maksymalna-1024.',
    },
    {
        name: 'Zdjęcie',
        func: (p) => string_255(p),
        message: 'Nieprawidłowa długość nazwy zdjęcia. Maksymalna długość-255.',
    },
    {
        name: 'Komentarz',
        func: (p) => string_255(p),
        message: 'Nieprawidłowa długość komentarza. Maksymalna długość-255.',
    },
];

const validateLists = [
    { name: 'Dział', func: async (p) => listaDział(p), message: 'Nieprawidłowa nazwa działu.' },
    { name: 'Zagrożenie', func: async (p) => listZagrozenie(p), message: 'Nieprawidłowa nazwa zagrożenia.' },
    { name: 'Konsekwencje', func: async (p) => listKonsekwencje(p), message: 'Nieprawidłowa nazwa konsekwencji.' },
];

const validateQuery = [
    { name: 'zgłaszający', func: (p) => email_255(p) },
    { name: 'dział', func: (p) => listaDział(p) },
    { name: 'miejsce', func: (p) => string_8_1024(p) },
    { name: 'zagrożenie', func: (p) => listZagrozenie(p) },
    { name: 'opis', func: (p) => string_8_1024(p) },
    { name: 'konsekwencje', func: (p) => listKonsekwencje(p) },
    { name: 'skutek', func: (p) => string_8_1024(p) },
    { name: 'działania', func: (p) => string_8_1024(p) },
    { name: 'status', func: (p) => listStatus(p) },
    { name: 'from', func: (p) => date(p) },
    { name: 'to', func: (p) => date(p) },
    { name: 'order', func: (p) => string_50(p) },
    { name: 'offset', func: (p) => integers(parseInt(p)) },
    { name: 'limit', func: (p) => integer_10(parseInt(p)) },
    { name: 'desc', func: (p) => boolean_true(Boolean(p)) },
];

const apiRequires = [
    {
        uri: '/api/users',
        method: 'POST',
        require: ['email', 'password'],
    },
    {
        uri: '/api/reports',
        method: 'POST',
        require: [
            'Zgłaszający',
            'Dział',
            'Miejsce',
            'Data zdarzenia',
            'Godzina zdarzenia',
            'Zagrożenie',
            'Opis Zagrożenia',
            'Skutek',
            'Konsekwencje',
            'Działania do wykonania',
            'Zdjęcie',
        ],
    },
    // TODO - validate other post uri
];

module.exports = async (req, res, next) => {
    if (req.originalUrl.includes('/logout')) return next(); // Bypass if user logouts

    if (Object.keys(req.body).length) {
        validateBody.forEach((el) => {
            if (req.body[el.name]) {
                if (!el.func(req.body[el.name])) return next(new AppError(el.message), 400);
            }
        });

        const vl = validateLists;
        for (let i = 0; i < vl.length; i++) {
            if (req.body[vl[i].name]) {
                const resp = await vl[i].func(req.body[vl[i].name]);
                if (!resp) return next(new AppError(vl[i].message), 400);
            }
        }

        const keyList = Object.keys(req.body);
        apiRequires.forEach((el) => {
            if (req.originalUrl.includes(el.uri) && req.method === el.method) {
                el.require.forEach((rq) => {
                    if (!keyList.includes(rq)) return next(new AppError(`Brak wymaganych danych: ${rq}`), 400);
                });
            }
        });
    }

    if (Object.keys(req.query).length) {
        validateQuery.forEach((el) => {
            if (req.query[el.name]) {
                if (!el.func(req.query[el.name]))
                    return next(new AppError(`Nieprawidłowe parametry zapytania: ${el.name}`), 400);
            }
        });
    }

    next();
};

//TODO - write middleware to validate params 
// const validateParams = [
//     { name: 'comment_id', func: (p) => integers(p) },
//     { name: 'department_id', func: (p) => integers(p) },
//     { name: 'manager_id', func: (p) => integers(p) },
//     { name: 'function_id', func: (p) => integers(p) },
//     { name: 'report_id', func: (p) => integers(p) },
//     { name: 'user_id', func: (p) => UUID(p) },
//     { name: 'function', func: (p) => string_50(p) },
//     { name: 'department', func: (p) => string_50(p) },
//     { name: 'department_name', func: (p) => string_50(p) },
//     { name: 'user_email', func: (p) => email_255(p) },
// ];
