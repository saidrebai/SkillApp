const express = require("express");
const router = express.Router();
const multer = require("multer");
const products = require("../controllers/files.controlles");
const upload = require("../Middleware/multer");


router.post("/upload", upload.single("file"), products.uploadfile);

module.exports = router;
