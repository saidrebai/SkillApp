const offersControlles = require("../controlles/offersControllers");
const router = require("express").Router();

router.post("/offers", offersControlles.createOffer);
router.get("/getoffer", offersControlles.getoffer);

module.exports = router;