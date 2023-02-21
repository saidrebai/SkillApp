const router = require("express").Router();
const candidatControlles = require('../controlles/candidatControlles');

router.post('/auth',candidatControlles.authentification);
router.post('/signup',candidatControlles.signup)

module.exports = router;