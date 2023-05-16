const router = require("express").Router();
const upload = require("../middleware/multer");
const pdfController = require("../controlles/pdfController");

router.post("/upload", upload,pdfController.uploads);
router.get("/pdf/:id",pdfController.getPdfById);
router.get("/pdfs",pdfController.getPdfByUser);
router.post("/cvParser", upload,pdfController.factureParser);


module.exports = router;
