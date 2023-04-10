const router = require("express").Router();
const superAdminControlles = require("../controlles/superAdminControllers");

router.post("/signIn", superAdminControlles.Authentification);

module.exports = router;
