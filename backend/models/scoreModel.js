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
  // question: {
  //   type: Number,
  //   required: true,
  // },
  // correct_question: {
  //   type: Number,
  //   required: true,
  // },
  // incorrect_question: {
  //   type: Number,
  //   required: true,
  // },
  result: {
    type: Number,
    required: true,
  },
},
{ timestamps: true }
);

const scoreModel = mongoose.model("scoreModel", scoreSchema);
module.exports = { scoreModel };
