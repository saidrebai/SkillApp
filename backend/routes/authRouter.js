const router = require("express").Router();
const authControlles = require('../controlles/authControlles');

router.post('/auth',authControlles.authentification);

module.exports = router;