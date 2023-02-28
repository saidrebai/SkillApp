const mongoose = require("mongoose");


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
  },
  { timestamps: true }
);


const filesModel = mongoose.model("pdfs", filesSchema);

module.exports = filesModel ;
