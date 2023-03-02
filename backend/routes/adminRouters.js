const router = require("express").Router();
const adminControlles = require("../controlles/adminControlles");

router.post("/signin", adminControlles.authentification);
router.post("/signup", adminControlles.signup);
router.get("/getinfo", adminControlles.getinformation);

module.exports = router;
