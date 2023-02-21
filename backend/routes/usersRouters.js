const userControlles = require("../controlles/userControlles");
const router = require("express").Router();

router.post('/signup',userControlles.signup)

module.exports = router;