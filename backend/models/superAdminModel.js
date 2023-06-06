const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const superAdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});
superAdminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: 60,
  });
  return token;
};

const superAdmin = mongoose.model("Superadmin", superAdminSchema);

module.exports = { superAdmin };
