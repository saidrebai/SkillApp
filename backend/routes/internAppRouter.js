const internAppControlles = require("../controlles/internAppControllers");
const router = require("express").Router();

router.post("/internApp", internAppControlles.createInternApp);

module.exports = router;
