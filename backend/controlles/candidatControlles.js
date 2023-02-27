const { User} = require("../models/user");
const { vall } = require("../middleware/vall");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const { privateKey } = crypto.generateKeyPairSync('rsa', {
	modulusLength: 4096,
	privateKeyEncoding: {
	  type: 'pkcs8',
	  format: 'pem'
	}
  });

console.log(privateKey); // prints the private key to the console

const validate = (data) => {
	const schema = Joi.object({
	  firstName: Joi.string().required().label("firstName"),
	  lastName: Joi.string().required().label("lastName"),
	  adresse: Joi.string().required().label("adresse"),
	  tel: Joi.number().required().label("tel"),
	  email: Joi.string().email().required().label("Email"),
	  password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
  };


module.exports={
	authentification :async function(req, res) {
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
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
},


signup : async function(req, res){
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res.status(409).send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}
};