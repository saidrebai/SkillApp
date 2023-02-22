const jobAppControlles = require("../controlles/jobAppControlles");
const router = require("express").Router();

router.post("/jobApp", jobAppControlles.createJobApp);

module.exports = router;
