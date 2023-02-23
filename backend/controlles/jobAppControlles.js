const { jobApp, validate } = require("../models/jobAppModel");

module.exports = {
  createJobApp: function (req, res) {
    const newJob = {
      firstName: req.body.firstName,
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
    };
    console.log("nneww", newJob);
    jobApp.create(req.body, function (err, job) {
      if (err)
        res.json({
          message: err,
          statut: 500,
        });
      else
        res.json({
          message: "User created!",
          statut: 200,
          data: job,
        });
    });
  },
};
