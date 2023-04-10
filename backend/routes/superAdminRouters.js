const router = require("express").Router();
const superAdminControlles = require("../controlles/superAdminControllers");

router.post("/signInSuperAdmin", superAdminControlles.Authentification);

module.exports = router;
