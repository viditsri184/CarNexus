// middleware/upload.js
const multer = require('multer');
const cloudinary = require('../config/cloudinary.config');
const { v4:uuidv4 }=require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './utils')
    },
    filename: function (req, file, cb) {
        const random = uuidv4()
        cb(null, random + "" + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage ,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit per image
});

module.exports = upload;
