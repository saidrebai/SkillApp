const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const adminSchema = new mongoose.Schema({
    TypeOfUser: { 
        type: String,
        required: true 
    }, 
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
        type: Number,
        required: true 
    },
    tel: { 
        type: Number,
        required: true 
    },
    fiscalCode: { 
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



module.exports ={Admin};