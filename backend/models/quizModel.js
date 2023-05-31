const mongoose = require("mongoose");


const quizSchema = new mongoose.Schema({
   id:{
    type : Number,
   },
   question:{
    type : String,
   },
   description:{
    type : String,
   },
   answers:{
    type : Object,
   },
   multiple_correct_answers :{
    type : String,
   },
   correct_answers : {
    type : Object,
   },
   correct_answer:{
    type : String,
   },
   explanation :{
    type : String,
   },
   tip:{
    type : String,
   },
   tags : [{
    type : Object,
   }],
   category:{
    type : String,
   },
   difficulty : {
    type : String,
   }
},
{ timestamps: true }
);



const quizModel = mongoose.model("quizModel", quizSchema);



module.exports = { quizModel };



/*axios */