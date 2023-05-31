const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ApplicationModel} = require("./ApplicationModel");

const quizSchema = new mongoose.Schema({
    quizDetails: {
        type: JSON,
      }
},
{ timestamps: true }
);



const quizModel = mongoose.model("quizModel", quizSchema);



module.exports = { quizModel };



/*axios */