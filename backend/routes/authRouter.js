const router = require("express").Router();
const { authentification } = require("../controlles/authControlles");
const auth = require('../controlles/authControlles');

router.post('/auth',auth.authentification);





module.exports = router;