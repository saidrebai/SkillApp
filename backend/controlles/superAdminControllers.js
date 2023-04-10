const { superAdmin } = require("../models/superAdminModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

const validate = (Newdata) => {
  const Schema = Joi.object({
    userName: Joi.string().required().label("userName"),
    password: passwordComplexity().required().label("Password"),
  });
  return Schema.validate(Newdata);
};

module.exports = {
  Authentification: async function (req, res) {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const { userName, password } = req.body;
      if (!userName || !password)
        return res
          .status(401)
          .send({ message: "Please provide both username and password" });

      const SuperAdmin = await superAdmin.findOne({ userName: userName });
      if (!SuperAdmin)
        return res
          .status(401)
          .send({ message: "Invalid username and password" });

      const validePassword = await bcrypt.compare(
        req.body.password,
        SuperAdmin.password
      );

      const token = SuperAdmin.generateAuthToken();
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      res.status(200).send({
        Newdata: token,
        _id: decoded._id,
        userName: SuperAdmin.userName,
        message: "logged in successfully",
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
