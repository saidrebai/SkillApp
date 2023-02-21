const router = require("express").Router();
const adminControlles = require('../controlles/adminControlles');

router.post('/auth',adminControlles.authentification);
router.post('/signup',adminControlles.signup)

module.exports = router;