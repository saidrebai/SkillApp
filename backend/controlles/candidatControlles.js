const { User } = require("../models/user");
const { vall } = require("../middleware/vall");
const randomString = require("../utils/utils");
const checkDuplicateEmail = require("../utils/utils");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("firstName"),
    lastName: Joi.string().required().label("lastName"),
    tel: Joi.number().required().label("tel"),
    adresse: Joi.string().required().label("adresse"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    town: Joi.string().required().label("Town"),
    birthDate: Joi.string().required().label("birthDate"),
    country: Joi.string().required().label("country"),
    gender: Joi.string().required().label("gender"),
    zipCode: Joi.number().required().label("zipCode"),
    Establishment: Joi.string().required().label("Establishment"),
    // cv: Joi.ref().label("cv"),
  });
  return schema.validate(data);
};

module.exports = {
  authentification: async function (req, res) {
    try {
      const { error } = vall(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const token = user.generateAuthToken();

      res.status(200).send({
        data: token,
        userId: user._id,
        firstName: user.firstName,
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

      const user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getinfoCondidat: function (req, res) {
    User.findById({ _id: req.params.id }).exec(function (err, candid) {
      if (err) {
        res.status(500).json({
          msg: "erreur",
          status: 500,
          data: null,
        });
      } else {
        res.status(200).json({
          msg: "Get candid",
          status: 200,
          data: candid,
        });
      }
    });
  },
  
  updateInfo: function (req, res) {
    User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      adresse: req.body.adresse,
      birthDate: req.body.birthDate,
      town: req.body.town,
      country: req.body.country,
      gender: req.body.gender,
      zipCode: req.body.zipCode,
      Establishment: req.body.Establishment,
      cv: req.body.id,
      status: req.body.status,

    }).exec(function (err, candid) {
      if (err) {
        res.json({
          msg: "erreur" + err,
          status: 500,
          data: null,
        });
      } else {
        res.status(200).json({
          msg: "candid updated!",
          status: 200,
          data: candid,
        });
      }
    });
  },
  getAll: async function (req, res) {
  	try {
  		const users = await User.find();
  		if (!users) {
  			return res.status(404).json({ message: "users not found" });
  		}
  		return res.status(200).json({ message: "users found", users });
  	} catch (error) {
  		console.error(error);
  		return res.status(500).json({ message: "Internal Server Error" });
  	}
  },
  deleteUser: function (req, res) {
    User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.status(500),
          json({
            msg: "erreur",
            status: 500,
            data: null,
          });
      } else {
        res.status(200).json({
          msg: "user deleted!",
          status: 200,
          data: user,
        });
      }
    });
  },
  addCvIdToUser: async function (req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { cv: req.body.cv } },
        { new: true }
      );

      res.status(200).json({msg : "user updated",status : 200, updatedUser}); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding cv to user');
    }
  },
  searchItems : async function (req, res) {
    try {
      const ids = req.query.q.split(","); // Convert comma-separated string of ids into an array
      const filteredItems = await User.find({ _id: { $in: ids } });
      res.status(200).json({ msg: "Items found", status: 200, data: filteredItems, usercount:filteredItems.length});
    } catch (error) {
      console.error(error);
      res.status(500).send("Error searching for items in database");
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const password = randomString(
        10,
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};':\"\\|,.<>/?"
      );
      console.log(password);
      let email = {};
      email["email"] = req.body.email;
      let UserFinded = await User.findOne(email);
      console.log("userfind===>", UserFinded);
      if (UserFinded !== null) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        UserFinded.password = hashedPassword;
        const token = jwt.sign(
          { _id: UserFinded._id },
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
          UserFinded.firstName +
          ",<br><br>Vous avez demandé la réinitialisation de votre mot de passe <br><br>" +
          password +
          "<br><br>Cordialement,<br>Le service clientèle de SkillApp";
        const mailOptions = {
          from: "Openjavascript <test@openjavascript.info>",
          to: UserFinded.email,
          subject: "Réinitialisation de votre mot de passe SkillApp",
          html: email_content,
        };
        UserFinded
          .save()
          .then(async (savedUser) => {
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                res
                  .status(500)
                  .json({ message: "Problème lors de l'envoi de l'e-mail" });
              } else {
                console.log("Email sent: " + info.response);
                res.json(savedUser.toJSON());
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
          .json({ message: "Aucun utilisateur trouvé avec l'ID fourni" });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
