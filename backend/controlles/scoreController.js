const { scoreModel } = require("../models/scoreModel");

module.exports = {
  addScore: function (req, res) {
    const score = {
      offer: req.body.id,
      user: req.body.id,
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

  getScore: async function (req, res) {
    try {
      const score = await scoreModel.find();
      if (!score) {
        return res.status(404).json({ message: "score not found" });
      }
      return res
        .status(200)
        .json({ message: "score found", score, scoreCount: score.length });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getScoreById: async function (req, res) {
    try {
      const ids = req.query.q.split(",");
      const scores = await scoreModel.find({ offer: { $in: ids } });
      if (!scores) {
        return res.status(404).json({ message: "Scores not found" });
      }
      return res
        .status(200)
        .json({ message: "score found", scores, scoreCount: scores.length });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
