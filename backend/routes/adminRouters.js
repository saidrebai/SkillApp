const router = require("express").Router();
const adminControlles = require("../controlles/adminControlles");

router.post("/signin", adminControlles.authentification);
router.post("/signup", adminControlles.signup);
router.get("/getinfoAdmin/:id", adminControlles.getinformation);
router.put("/updateinfoAdmin/:id", adminControlles.updateInfoAdmin);
router.get("/getAll",adminControlles.getAll)

module.exports = router;
