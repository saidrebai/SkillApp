const router = require("express").Router();
const candidatControlles = require("../controlles/candidatControlles");

router.post("/signin", candidatControlles.authentification);
router.post("/signup", candidatControlles.signup);
router.get("/getinfo", candidatControlles.getinfoCondidat);

module.exports = router;
