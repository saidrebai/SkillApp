const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filesSchema = new mongoose.Schema(
  {
    fieldname: {
      type: String,
    },
    originalname: {
      type: String,
    },
    encoding: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    destination: {
      type: String,
    },
    filename: {
      type: String,
    },
    path: {
      type: String,
    },
    size: {
      type: Number,
    },
    user : {
      type: Schema.Types.ObjectId,
			ref: 'user',
    }
  },
  { timestamps: true }
);


const filesModel = mongoose.model("pdfs", filesSchema);

module.exports = filesModel ;
