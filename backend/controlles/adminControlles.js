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
      res.status(200).send({
        data: token,
        _id: decoded._id,
        Name: admin.Name,
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
      Name: req.body.Name,
      country: req.body.country,
      town: req.body.town,
      adresse: req.body.adresse,
      Zipcode: req.body.Zipcode,
      tel: req.body.tel,
      fiscalCode: req.body.fiscalCode,
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
  deleteAdmin: function (req, res) {
    Admin.findByIdAndRemove({ _id: req.params.id }, (err, Admin) => {
      if (err) {
        res.status(500),
          json({
            msg: "erreur",
            status: 500,
            data: null,
          });
      } else {
        res.status(200).json({
          msg: "Admin deleted!",
          status: 200,
          data: Admin,
        });
      }
    });
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
          "Bonjour " +
          adminFinded.Name +
          ",<br><br>Vous avez demandé la réinitialisation de votre mot de passe <br><br>" +
          password +
          "<br><br>Cordialement,<br>Le service clientèle de SkillApp";
        const mailOptions = {
          from: "Openjavascript <test@openjavascript.info>",
          to: adminFinded.email,
          subject: "Réinitialisation de votre mot de passe SkillApp",
          html: email_content,
        };
        adminFinded
          .save()
          .then(async (savedAdmin) => {
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                res
                  .status(500)
                  .json({ message: "Problème lors de l'envoi de l'e-mail" });
              } else {
                console.log("Email sent: " + info.response);
                res.json(savedAdmin.toJSON());
              }
            });
          })
          .catch((e) =>
            checkDuplicateEmail(e, (result) => {
              if (result) {
                res.status(400).json({ message: "Adresse e-mail en double" });
              } else {
                next(e);
              }
            })
          );
      } else {
        res
          .status(404)
          .json({ message: "Aucun administrateur trouvé avec l'ID fourni" });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
