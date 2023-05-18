const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidacySchema = new mongoose.Schema({
  offer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "offerModel",
  },
  score: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "score",
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
},
{ timestamps: true }
);

const CandidacyModel = mongoose.model("candidacySchema", candidacySchema);
module.exports = { CandidacyModel };
