const offersControlles = require("../controlles/offersControllers");
const router = require("express").Router();

router.post("/offers", offersControlles.createOffer);
router.get("/getoffer", offersControlles.getoffer);
router.put("/updateoffer/:id", offersControlles.updateoffer);
router.delete("/deleteOfferr/:id", offersControlles. deleteOffer);

module.exports = router;