const quizController = require("../controlles/quizController");
const router = require("express").Router();

router.get("/getquiz", quizController.getquiz);
module.exports = router;