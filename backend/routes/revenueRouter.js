const router = require("express").Router();
const revenueController = require("../controlles/revenueController");

router.get("/getrevenue",revenueController.getRevenue);


module.exports = router;