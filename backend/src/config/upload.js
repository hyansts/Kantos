//biblioteca para lidar com multipart form, enviar e ler os dados, fotos, etc.
const multer = require('multer');

//biblioteca do node para lidar com pathing
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    })
};