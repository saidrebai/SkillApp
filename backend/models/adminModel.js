const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const adminSchema = new mongoose.Schema({
	Name: { 
        type: String,
        required: true 
    }, 
    country: { 
        type: String,
        required: true 
    },
    town: { 
        type: String,
        required: true 
    },
    adresse: { 
        type: String,
        required: true 
    },
    Zipcode: { 
        type: String,
        required: true 
    },
    tel: { 
        type: Number,
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
	password: { 
        type: String, 
        required: true, 
        min:8 },

});

adminSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Admin= mongoose.model("admin",adminSchema);


const validate = (data) => {
	const schema = Joi.object({
        Name: Joi.string().required().label("Name"),
        country: Joi.string().required().label("country"),
		town: Joi.string().required().label("town"),
		adresse: Joi.string().required().label("adresse"),
		Zipcode: Joi.string().required().label("Zipcode"),
		tel: Joi.number().required().label("tel"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports ={Admin, validate};