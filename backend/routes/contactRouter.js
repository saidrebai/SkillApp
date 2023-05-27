const router = require("express").Router();
const contactControlles = require("../controlles/contactControlles");


router.post("/sendMessageToAdmin",contactControlles.sendMessageToAdmin);
router.get("/getcontactbyemail",contactControlles.getContactByEmail);

module.exports = router;