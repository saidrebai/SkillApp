const { Admin } = require("../models/adminModel");
const { vall } = require("../middleware/vall");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const validate = (data) => {
  const schema = Joi.object({
    TypeOfUser: Joi.string().required().label("Type of user"),
    Name: Joi.string().required().label("Name"),
    country: Joi.string().required().label("country"),
    town: Joi.string().required().label("town"),
    adresse: Joi.string().required().label("adresse"),
    Zipcode: Joi.number().required().label("Zipcode"),
    tel: Joi.number().required().label("tel"),
    fiscalCode: Joi.number().required().label("fiscal Code"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = {
  authentification: async function (req, res) {
    try {
      const { error } = vall(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await Admin.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const token = user.generateAuthToken();
      res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  signup: async function (req, res) {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await Admin.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new Admin({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  getinformation: async function (req, res) {
    // console.log("aa=a")
    try {
      const savedUser = await Admin.findOne({ email: req.body.email });

      res.status(201).send({ message: "Admin created successfully", user: savedUser })
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
};
