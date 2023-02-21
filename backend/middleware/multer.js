var mime = require("mime-types");
const multer = require("multer");

destination: (req, file, cb) => {
  if (file.mimetype === "file/pdf") {
    cb(null, "files");
  } else {
    console.log(file.mimetype);
    cb({ error: "Mime type not supported" });
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;
