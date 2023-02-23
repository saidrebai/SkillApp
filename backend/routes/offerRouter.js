const offersControlles = require("../controlles/offersControllers");
const router = require("express").Router();

router.post("/offers", offersControlles.createOffer);

module.exports = router;