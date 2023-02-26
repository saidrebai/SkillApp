const jobAppControlles = require("../controlles/jobAppControlles");
const router = require("express").Router();
const uploadFile = require("../middleware/multer")
//const multer = require("multer");

router.post("/jobApp",jobAppControlles.createJobApp);
//router.post([uploadFile.single([{ name: "images" }])]);
//router.post("/upload", upload.single("file"), products.uploadfile);

module.exports = router;
