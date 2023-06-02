const router = require("express").Router();
const applicationController = require("../controlles/applicationController");

router.post("/addscore",applicationController.addApplication);
router.get("/getscore",applicationController.getAllApplication);
router.get("/getscorebyid",applicationController.getApplicationByOffer);
router.get("/getscoresbyid",applicationController.getApplicationById);
router.get("/getappbyuser/:id",applicationController.getApplicationByUser);
router.put("/updateUser/:id",applicationController.acceptApplication);
router.put("/refuseUser/:id",applicationController.refuseApplication);
router.get("/getaccappsbyoffers",applicationController.getAcceptedApplicationByOffers);
router.get("/getrefappsbyoffers",applicationController.getRefusedApplicationByOffers);

module.exports = router;