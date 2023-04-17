const { offerModel, validate } = require("../models/offersModel");
// const mongoose = require("mongoose");

module.exports = {
  createOffer: function (req, res) {
    const newoffer = {
      Name: req.body.Name,
      type: req.body.type,
      time: req.body.time,
      description: req.body.description,
      skills: req.body.skills,
      adresse: req.body.adresse,
      company_name: req.body.company_name,
      admin: req.body.id,
      user: req.body.id,
    };

    console.log("nneww", newoffer);

    offerModel.create(req.body, function (err, offer) {
      if (err)
        res.json({
          message: err,
          statut: 500,
        });
      else if (validate)
        res.json({
          message: "offer created!",
          statut: 200,
          data: offer,
          idOffer: offer._id,
        });
    });
  },

  getoffer: async function (req, res) {
    try {
      const offer = await offerModel.find();
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }
      return res.status(200).json({ message: "Offer found", offer });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateoffer: function (req, res) {
    offerModel
      .findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        type: req.body.type,
        time: req.body.time,
        description: req.body.description,
        skills: req.body.skills,
        adresse: req.body.adresse,
        company_name: req.body.company_name,
        user: req.body.id,
      })
      .exec(function (err, offer) {
        if (err) {
          res.json({
            msg: "erreur" + err,
            status: 500,
            data: null,
          });
        } else {
          res.status(200).json({
            msg: "offer updated!",
            status: 200,
            data: offer,
          });
        }
      });
  },
  deleteOffer: function (req, res) {
    offerModel.findByIdAndRemove({ _id: req.params.id }, (err, offerr) => {
      if (err) {
        res.status(500),
          json({
            msg: "erreur",
            status: 500,
            data: null,
          });
      } else {
        res.status(200).json({
          msg: "offerr deleted!",
          status: 200,
          data: offerr,
        });
      }
    });
  },
  getOfferById: async function (req, res) {
    try {
      const offer = await offerModel.find({ admin: req.params.id });
      if (!offer) {
        return res.status(404).json({ message: "Offers not found" });
      }
      return res
        .status(200)
        .json({ message: "Offers found", offer, offerCount: offer.length });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  addUserIdToOffer : async function (req, res) {
    try {
      const updatedOffer = await offerModel.findByIdAndUpdate(
        req.params.id,
        { $push: { user: req.body.user } },
        { new: true }
      );

      res.status(200).json({msg : "offer updated",status : 200, updatedOffer}); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding user to offer');
    }
  },
};
