const offersControlles = require("../controlles/offersControllers");
const router = require("express").Router();

router.post("/offers", offersControlles.createOffer);
router.get("/getoffer", offersControlles.getoffer);
router.put("/updateoffer/:id", offersControlles.updateoffer);
router.delete("/deleteOfferr/:id", offersControlles.deleteOffer);
router.get("/getofferbyid/:id", offersControlles.getOfferById);

module.exports = router;
