const router = require("express").Router();
const upload = require("../middleware/multer");
const pdfController = require("../controlles/pdfController");

router.post("/upload", upload,pdfController.uploads);
router.get("/pdf/:id",pdfController.getPdfById);


module.exports = router;
