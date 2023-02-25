const jobAppControlles = require("../controlles/jobAppControlles");
const router = require("express").Router();
const uploadFile = require("../middleware/multer")
router.post("/jobApp", [uploadFile.single([{ name: "images" }])], jobAppControlles.createJobApp);

module.exports = router;
