const jobAppControlles = require("../controlles/jobAppControlles");
const router = require("express").Router();

router.post("/jobApp", jobAppControlles.createCondidat);

module.exports = router;
