const { ApplicationModel } = require("../models/ApplicationModel");

module.exports = {
  addApplication: function (req, res) {
    const score = {
      offer: req.body.id,
      user: req.body.id,
      result: req.body.result,
    };

    console.log("nneww", score);

    ApplicationModel.create(req.body, function (err, score) {
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

  getAllApplication: async function (req, res) {
    try {
      const score = await ApplicationModel.find();
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

  getApplicationByOffer: async function (req, res) {
    try {
      const ids = req.query.q.split(",");
      const scores = await ApplicationModel.find({ offer: { $in: ids } });
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
  getApplicationById: async function (req, res) {
    try {
      const ids = req.query.q.split(",");
      const scores = await ApplicationModel.find({ _id: { $in: ids } });
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
  getApplicationByUser: async function (req, res) {
    try {
      const Candidacy = await ApplicationModel.find({user: req.params.id});
      if (!Candidacy) {
        return res.status(404).json({ message: "Candidacy not found" });
      }
      return res.status(200).json({ message: "Candidacy found", Candidacy });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  acceptApplication: async function (req, res) {
    try {
      const Candidacy = await ApplicationModel.findById({_id: req.params.id});
      if (!Candidacy) {
        return res.status(404).json({ message: "update Candidacy failed" });
      }
      Candidacy.accepted =true;
      await Candidacy.save();
      return res.status(200).json({ message: "Candidacy accepted", Candidacy });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  refuseApplication: async function (req, res) {
    try {
      const Candidacy = await ApplicationModel.findById({_id: req.params.id});
      if (!Candidacy) {
        return res.status(404).json({ message: "update Candidacy failed" });
      }
      Candidacy.refused =true;
      await Candidacy.save();
      return res.status(200).json({ message: "Candidacy refused", Candidacy });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
