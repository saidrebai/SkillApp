const {scoreModel}=require("../models/scoreModel")

module.exports = {
    addScore: function (req, res) {
      const score = {
        offer: req.body.id,
        user: req.body.id,
        // question: req.body.question,
        // correct_question: req.body.correct_question,
        // incorrect_question: req.body.incorrect_question,
        result: req.body.result,
      };
  
      console.log("nneww", score);
  
      scoreModel.create(req.body, function (err, score) {
        if (err)
          res.json({
            message: err,
            statut: 500,
          });
        else
          res.json({
            message: "new score!",
            statut: 200,
            data: score,
            idScore: score._id,
          });
      });
    },
}