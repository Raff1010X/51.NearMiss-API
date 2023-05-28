/**
 * Test base64 image and save data to file
 */
const AppError = require('../err/appError');

const fs = require('fs');

function getBa64Img(data_url) {
    return data_url.split(';base64,').pop();
}

const writeImage = function (file_path, data_url, callback) {
    fs.writeFile(file_path, getBa64Img(data_url), { encoding: 'base64' }, callback);
};

exports.create = async (req, res, next) => {
    const base64String = req.body.data;
    const fileName = req.body.name;
    const rg = new RegExp(
        '^data:image/(?:gif|png|jpeg|bmp|webp|svg+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}'
    );

    if (rg.test(base64String)) {
        try {
            writeImage(`${__dirname}/../public/build/upload/images/${fileName}`, base64String, function (err) {
                if (err) {
                    new AppError(err, 400);
                    return;
                } else {
                    res.status(201).json({ status: 'success', meessage: 'Plik zapisany na serwerze' });
                }
            });
        } catch (err) {
            next(AppError.writeError());
            return;
        }
    } else next(AppError.notBase64());
};
