const mongoose = require("mongoose");

const singupSchema = new mongoose.Schema({
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
const Signup = mongoose.model("singup",singupSchema);


const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports ={Signup, validate};