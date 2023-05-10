const router = require("express").Router();
const scoreController = require("../controlles/scoreController");

router.post("/addscore",scoreController.addScore);
router.get("/getscore",scoreController.getScore);
router.get("/getscorebyid",scoreController.getScoreById);

module.exports = router;