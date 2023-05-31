const { quizModel} = require("../models/quizModel");
module.exports = {

   getquiz : async function (req,res) {
    try{
      const tag = req.query.tags;
      const questions = await quizModel.aggregate([
        {$match :{"tags.name" : tag}},
        {$sample:{size:20}}
      ]);
      if(!questions || questions.length === 0){
        return res.status(404).json({message:"Questions not found" });
      }
      return res.status(200).json([...questions] )
    }catch(error){
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    
   }
    }