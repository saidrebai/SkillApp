const router = require("express").Router();
const candidatControlles = require("../controlles/candidatControlles");

router.post("/signin", candidatControlles.authentification);
router.post("/signup", candidatControlles.signup);
router.get("/getinfo/:id", candidatControlles.getinfoCondidat);
router.put("/Updateinfo/:id", candidatControlles.updateInfo);
router.get("/getAll", candidatControlles.getAll)
router.delete("/deleteuser/:id", candidatControlles.deleteUser);
router.put("/updateuserwithcv/:id",candidatControlles.addCvIdToUser);
router.get("/searchuser", candidatControlles.searchItems);

module.exports = router;
