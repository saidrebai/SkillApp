const router = require("express").Router();
const scoreController = require("../controlles/scoreController");

router.post("/addscore",scoreController.addScore);

module.exports = router;