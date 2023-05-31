const router = require("express").Router();
const contactControlles = require("../controlles/contactControlles");


router.post("/sendMessageToAdmin",contactControlles.sendMessageToAdmin);
router.get("/getcontactbyemail",contactControlles.getContactByEmail);
router.post("/accepterCandidatPR", contactControlles.accepterCandidatPR);
router.post("/refuserCandidatPR", contactControlles.refuserCandidatPR);
module.exports = router;