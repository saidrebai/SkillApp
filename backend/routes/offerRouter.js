const offersControlles = require("../controlles/offersControllers");
const router = require("express").Router();

router.post("/offers", offersControlles.createOffer);
router.get("/getoffer", offersControlles.getoffer);
router.get("/getoffebyid/:id", offersControlles.getoffeById);
router.put("/updateoffer/:id", offersControlles.updateoffer);
router.delete("/deleteOffer/:id", offersControlles.deleteOffer);
router.get("/getofferbyid/:id", offersControlles.getOfferById);
router.put("/updateofferwithid/:id",offersControlles.addUserIdToOffer);
router.get("/countuserbyofferid/:id", offersControlles.getOfferUsersCount);
router.get("/getofferbyids", offersControlles.getOffByIds);

module.exports = router;
