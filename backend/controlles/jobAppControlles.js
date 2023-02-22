const jobAppModel = require("../models/jobAppModel");

module.exports = {
  createCondidat: function (req, res) {
    const newCondidat = {
      username: req.body.username,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      country: req.body.country,
      adresse: req.body.adresse,
      jobPosition: req.body.jobPosition,
      town: req.body.town,
      zipCode: req.body.zipCode,
      yearsExperience: req.body.yearsExperience,
      yourMotivations: req.body.yourMotivations,
      //resume: req.body.resume,
    };
    jobAppModel.create(newCondidat, function (err, condidat) {
      if (err)
        res.json({
          message: err,
          statut: 500,
        });
      else
        res.json({
          message: "condidat created!",
          statut: 200,
          data: condidat,
        });
    });
  },
};
