const multer = require('multer');

const MINE_TYPES = {
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg',
    'image/png' : 'png'

}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MINE_TYPES[file.mimetype];
        if(MINE_TYPES[file.mimetype]){
            callback(null,name + Date.now() + '.' + extension);
        }
        else{
            callback(null,'');
        }
    }
});

module.exports = multer({ storage }).single('image');