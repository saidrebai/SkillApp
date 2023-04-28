const router = require("express").Router();
const adminControlles = require("../controlles/adminControlles");

router.post("/signin", adminControlles.authentification);
router.post("/signup", adminControlles.signup);
router.get("/getinfoAdmin/:id", adminControlles.getinformation);
router.put("/updateinfoAdmin/:id", adminControlles.updateInfoAdmin);
router.get("/getAll", adminControlles.getAll);
router.delete("/deleteadmin/:id", adminControlles.deleteAdmin);
router.post("/resetPassword", adminControlles.ResetPassword);


module.exports = router;
