// backend/config/multerConfig.js

// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads')); // Destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
