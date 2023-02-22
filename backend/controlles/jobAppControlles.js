const {jobApp, validate} = require("../models/jobAppModel")

module.exports = {
  createJobApp: async function (req, res) {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await jobApp.findOne({ firstName: req.body.firstName });
      if (user)
        return res
          .status(409)
          .send({ message: "User with given name already Exist!" });

      

      await new jobApp({ ...req.body,firstName}).save();
      res.status(201).send({ message: "Job application created successfully" });
    } 
    catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
