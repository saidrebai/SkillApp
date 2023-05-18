const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema({
  offer: {
    type: Schema.Types.ObjectId,
    ref: "offerModel",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  result: {
    type: Number,
    required: true,
  },
},
{ timestamps: true }
);

const scoreModel = mongoose.model("scoreModel", scoreSchema);
module.exports = { scoreModel };
