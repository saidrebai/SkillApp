const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new mongoose.Schema({
  offer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "offerModel",
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  result: {
    type: Number,
    required: true,
  },
  accepted:{
    type: Boolean,
    default: false
  }
},
{ timestamps: true }
);

const ApplicationModel = mongoose.model("application", ApplicationSchema);
module.exports = { ApplicationModel };
