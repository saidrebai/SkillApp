const router = require("express").Router();
const cadidacyController = require("../controlles/candidacyController")

router.post("/addCondidact", cadidacyController.createCandidacy);
// router.get("/getCondidact/:id", cadidacyController.getCandidacyByUser);
router.get("/getCandidacy/:id", cadidacyController.getCandidacy);
router.put("/updateCandidacy/:id", cadidacyController.updateCandidacy);

module.exports = router;