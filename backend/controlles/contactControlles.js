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
        Name: req.body.Name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        message: req.body.message,
      };
      
      const email_content =
        "Bonjour cette contact form est d'apres le site ," +
        " Avec email : "+
        contactForm.email +
        ",<br> name : " +
        contactForm.Name +
        ",<br> phoneNumber : " +
        contactForm.phoneNumber +
        ",<br> message : " +
        contactForm.message;
       
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
              res
                .status(500)
                .json({ message: "Problème lors de l'envoi de l'e-mail" });
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

  getContactByEmail: async function (req, res) {
  	try {
      const emails = req.query.q.split(",");
  		const contact = await ContactModel.find({email:{$in : emails}});
  		if (!contact) {
  			return res.status(404).json({ message: "contact not found" });
  		}
  		return res.status(200).json({ message: "contact found", contact });
  	} catch (error) {
  		console.error(error);
  		return res.status(500).json({ message: "Internal Server Error" });
  	}
  },
};
