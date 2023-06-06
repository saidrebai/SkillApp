const { ContactModel } = require("../models/contactModel");
const nodemailer = require("nodemailer");

module.exports = {
  // Envoie un message à l'admin
  sendMessageToAdmin: async function (req, res) {
    console.log(req.body, "req body ====>");

    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAIL_USERNAME, // generated ethereal user
          pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
      });
      const contactForm = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        message: req.body.message,
        date: Date.now(),
        emailSuper: process.env.MAIL_USERNAME,
      };

      const email_content =
        "Hello this contact form is according to the site ," +
        " with email : " +
        contactForm.email +
        ",<br> name : " +
        contactForm.name +
        ",<br> phone Number : " +
        contactForm.phoneNumber +
        ",<br> message : " +
        contactForm.message ;

      const mailOptions = {
        //   from: "Openjavascript <test@openjavascript.info>",
        to: process.env.MAIL_USERNAME,
        subject: "Message SkillApp",
        html: email_content,
      };
      const contact = await ContactModel.create(contactForm).then(
        async (savedForm) => {
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Problem sending e-mail" });
            } else {
              console.log("Email sent: " + info.response);
              res.json(savedForm.toJSON());
            }
          });
        }
      );

      res.status(201).send({ message: "contact Created", contact });
      console.log("contact", contact);
    } catch (err) {
      res.status(400).send({ message: "An error occured" });
    }
  },

  getContactBySuperAdmin: async function (req, res) {
    try {
      const contact = await ContactModel.find({
        emailSuper: process.env.MAIL_USERNAME,
      });
      if (!contact) {
        return res.status(404).json({ message: "contact not found" });
      }
      return res.status(200).json({ message: "contact found", contact });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getContactByEmail: async function (req, res) {
    try {
      const emails = req.query.q.split(",");
      const contact = await ContactModel.find({ email: { $in: emails } });
      if (!contact) {
        return res.status(404).json({ message: "contact not found" });
      }
      return res.status(200).json({ message: "contact found", contact });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getContactByCandidat: async function (req, res) {
    try {
      const contact = await ContactModel.find({ user: req.params.id });
      if (!contact) {
        return res.status(404).json({ message: "contact not found" });
      }
      return res
        .status(200)
        .json({
          message: "contact found",
          contact,
          nbreContact: contact.length,
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  accepterCandidatPR: async (req, res) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const acceptationForm = new ContactModel({
        email: req.body.email,
        score: req.body.score,
        offer: req.body.offer,
        adminEmail: req.body.adminEmail,
        date: req.body.date,
        user: req.body.user,
        link: "",
      });

      console.log(acceptationForm);
      // console.log(req.body.adminEmail);

      const emailContent =
        "Congratulations " +
        "! Welcome to your new position. " +
        acceptationForm.offer +
        " , " +
        " With a score of : " +
        acceptationForm.score +
        " , " +
        " by this company  : " +
        acceptationForm.adminEmail +
        " , " +
        "At this date : " +
        acceptationForm.date +
        " we have an appointment to discuss it " +
        ".";

      const mailOptions = {
        to: acceptationForm.email,
        subject: "Congratulations !",
        html: emailContent,
      };

      acceptationForm
        .save()
        .then(() => {
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Problem sending e-mail" });
            } else {
              console.log("Email sent: " + info.response);
              acceptationForm.link = emailContent;
              acceptationForm.save();
              res.json(acceptationForm.toJSON());
            }
          });
        })
        .catch((e) => {
          // Votre logique de gestion des doublons d'adresses e-mail ici
          console.log(e);
          res.status(400).json({ message: "Duplicate e-mail address" });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Problem sending e-mail",
      });
    }
  },

  refuserCandidatPR: async (req, res) => {
    console.log(req.body, "req body ====>");
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAIL_USERNAME, // Votre nom d'utilisateur Gmail
          pass: process.env.MAIL_PASSWORD, // Votre mot de passe Gmail
        },
      });

      const RefuserForm = new ContactModel({
        email: req.body.email,
        score: req.body.score,
        offer: req.body.offer,
        adminEmail: req.body.adminEmail,
        user: req.body.user,
        link: "",
      });

      const email_content =
        "Sorry, " +
        "! Your application has not been selected for this offer : " +
        RefuserForm.offer +
        " , " +
        "With a score of : " +
        RefuserForm.score +
        " , " +
        " by this administrateur : " +
        RefuserForm.adminEmail +
        ". Thank you for your interest.";

      const mailOptions = {
        to: RefuserForm.email,
        subject: "Sorry !",
        html: email_content,
      };

      RefuserForm.save()
        .then(() => {
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Problem sending e-mail" });
            } else {
              console.log("Email sent: " + info.response);
              RefuserForm.link = email_content;
              RefuserForm.save();
              res.json(RefuserForm.toJSON());
            }
          });
        })
        .catch((e) => {
          // Votre logique de gestion des doublons d'adresses e-mail ici
          console.log(e);
          res.status(400).json({ message: "Duplicate e-mail address" });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Problem sending e-mail",
      });
    }
  },
};
