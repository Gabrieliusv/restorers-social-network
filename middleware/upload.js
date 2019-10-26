const multer = require('multer');
const crypto = require('crypto');
var path = require('path');
const fileFilter = (req, file, cb) => {
  //reject a file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    req.fileValidationError = 'Picture format must be jpeg, jpg or png';
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination:
    process.env.NODE_ENV === 'production'
      ? './client/build/uploads'
      : './client/public/uploads',
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

module.exports = function(req, res, next) {
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 400
    },
    fileFilter: fileFilter
  }).single('profileImg');

  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ errors: [{ msg: err.message }] });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ errors: [{ msg: err }] });
    }
    // Everything went fine.
    next();
  });
};
