const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const vald = (Newdata) => {
	const Schema = Joi.object({
		userName: Joi.string().required().label("user Name"),
		password: passwordComplexity().required().label("Password"),
	});
	return Schema.validate(Newdata);
};

module.exports ={vald};