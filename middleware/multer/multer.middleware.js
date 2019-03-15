let multer = require('multer');
let path = require('path');
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../../assets/`);
  },
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname)
      ? `${path.extname(file.originalname)}`
      : ``;
    callback(null, `${Date.now()}${ext}`);
  }
});
let upload = multer({
  storage: storage
});
module.exports = {
  candidateUploads: upload.fields([
    {
      name: 'resume',
      maxCount: 1
    },
    {
      name: 'video',
      maxCount: 1
    }
  ])
};
