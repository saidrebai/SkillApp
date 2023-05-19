const { CandidacyModel } = require("../models/candidacyModel");

module.exports = {
  createCandidacy: function (req, res) {
    const candidacy = {
      offer: req.body.offer,
      score: req.body.score,
    };

    console.log("nneww", candidacy);

    CandidacyModel.create(req.body, function (err, candidacy) {
      if (err)
        res.json({
          message: err,
          statut: 500,
        });
      else 
        res.json({
          message: "candidacy created!",
          statut: 200,
          data: candidacy,
        });
    });
  },

  getCandidacyByUser: async function (req, res) {
    try {
      const Candidacy = await CandidacyModel.findOne({user: req.params.id});
      if (!Candidacy) {
        return res.status(404).json({ message: "Candidacy not found" });
      }
      return res.status(200).json({ message: "Candidacy found", Candidacy });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getCandidacy: async function (req, res) {
    try {
      const Candidacy = await CandidacyModel.find({user: req.params.id});
      if (!Candidacy) {
        return res.status(404).json({ message: "Candidacy not found" });
      }
      return res.status(200).json({ message: "Candidacy found", Candidacy });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
