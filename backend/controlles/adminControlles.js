const randomString = require("../utils/utils");
const checkDuplicateEmail = require("../utils/utils");
const { Admin } = require("../models/adminModel");
const { vall } = require("../middleware/vall");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const validate = (data) => {
  const schema = Joi.object({
    typeOfUser: Joi.string().required().label("type of user"),
    name: Joi.string().required().label("name"),
    country: Joi.string().required().label("country"),
    town: Joi.string().required().label("town"),
    address: Joi.string().required().label("address"),
    zipcode: Joi.number().required().label("zipcode"),
    phone: Joi.number().required().label("phone"),
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

      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        admin.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const token = admin.generateAuthToken();
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
     const expiresIn = 60; // Expiration time in seconds
      res.status(200).send({
        data: token,
        _id: decoded._id,
        name: admin.name,
        expiresIn: expiresIn,
        message: "logged in successfully",
      });
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

  getinformation: function (req, res) {
    Admin.findById({ _id: req.params.id }).exec(function (err, admin) {
      if (err) {
        res.status(500).json({
          msg: "erreur",
          status: 500,
          data: null,
        });
      } else {
        res.status(200).json({
          msg: "Get admin",
          status: 200,
          data: admin,
        });
      }
    });
  },
  updateInfoAdmin: function (req, res) {
    Admin.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      country: req.body.country,
      town: req.body.town,
      address: req.body.address,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
    }).exec(function (err, admin) {
      if (err) {
        res.json({
          msg: "erreur" + err,
          status: 500,
          data: null,
        });
      } else {
        res.status(200).json({
          msg: "admin updated!",
          status: 200,
          data: admin,
        });
      }
    });
  },
  getAll: async function (req, res) {
    try {
      const admins = await Admin.find();
      if (!admins) {
        return res.status(404).json({ message: "admins not found" });
      }
      return res.status(200).json({ message: "admins found", admins });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteAdmin: async function (req, res) {
    try {
      const idAdmin = req.params.id;
      // Find the admin document
      const admin = await Admin.findById(idAdmin);
      if (!admin) {
        return res.status(404).json({
          msg: "Admin not found",
          status: 404,
          data: null,
        });
      }
      // Delete the admin document (triggers the middleware)
      await admin.remove();
      return res.status(200).json({
        msg: "Admin deleted!",
        status: 200,
        data: admin,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Internal server error",
        status: 500,
        data: null,
      });
    }
  },

  ResetPassword: async (req, res, next) => {
    try {
      const password = randomString(
        10,
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};':\"\\|,.<>/?"
      );
      console.log(password);
      let email = {};
      email["email"] = req.body.email;
      let adminFinded = await Admin.findOne(email);
      console.log("adminfind===>", adminFinded);
      if (adminFinded !== null) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        adminFinded.password = hashedPassword;
        const token = jwt.sign(
          { _id: adminFinded._id },
          process.env.RESET_PASSWORD_KEY,
          { expiresIn: "20m" }
        );
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.MAIL_USERNAME, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
          },
        });
        const email_content =
          "Hello " +
          adminFinded.name +
          ",<br><br>You have requested to reset your password<br><br>" +
          password +
          "<br><br>Sincerely,<br>The customer service department of SkillApp";
        const mailOptions = {
          from: "Openjavascript <test@openjavascript.info>",
          to: adminFinded.email,
          subject: "Reset your password SkillApp",
          html: email_content,
        };
        adminFinded
          .save()
          .then(async (savedAdmin) => {
            console.log(
              "🚀 ~ file: adminControlles.js:223 ~ .then ~ savedAdmin:",
              savedAdmin
            );
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                res.status(500).json({ message: "Problem sending e-mail" });
              } else {
                console.log("Email sent: " + info.response);
                res.json(savedAdmin.toJSON());
              }
            });
          })
          .catch((e) =>
            checkDuplicateEmail(e, (result) => {
              if (result) {
                res.status(400).json({ message: "Duplicate e-mail address" });
              } else {
                next(e);
              }
            })
          );
      } else {
        res
          .status(404)
          .json({ message: "No administrator found with ID supplied" });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
