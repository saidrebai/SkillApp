const { jobApp, validate } = require("../models/jobAppModel");
const filesModel = require("../models/filesModels")

module.exports = {
  createJobApp: async function (req, res) {
    try {
      const fileArray = req?.files?.images;
      let arrayOfFilesIds = [];
      if (fileArray) {
        for (let i = 0; i < fileArray.length; i++) {
          const fileInfo = await filesModel.create(fileArray[i]);
          arrayOfFilesIds.push(fileInfo?._id);
        }
      }
      let inputJobApp = {
        ...req.body,
        image: arrayOfFilesIds,
      };
      const jobApplications = await jobApp.create(inputJobApp);
      res.status(200).send({ message: "jobApplications created", jobApplications: jobApplications });
    } catch (err) {
      res.status(400).send({ message: "An error occured", err });
    }
  }

   
};

