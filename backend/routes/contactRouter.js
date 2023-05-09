const router = require("express").Router();
const contactControlles = require("../controlles/contactControlles");


router.post("/sendMessageToAdmin",contactControlles.sendMessageToAdmin);

module.exports = router;