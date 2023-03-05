const {offerModel,validate} = require("../models/offersModel")

module.exports = {
    createOffer: function (req, res) {
		const newoffer = {
			Name: req.body.Name,
            type: req.body.type,
            term: req.body.term,
            description: req.body.description,
            skills: req.body.skills,
            adresse: req.body.adresse,
            company_name: req.body.company_name,
		};

		console.log('nneww', newoffer);
        
		offerModel.create(req.body, function (err, offer) {
			if (err)
				res.json({
					message: err,
					statut: 500,
				});
			else if(validate)
				res.json({
					message: 'offer created!',
					statut: 200,
					data: offer,
				});
		});
	},

	getoffer: async function (req, res) {
		try {
		  const offer = await offerModel.findOne({ Name: req.body.Name});
		  res.status(201).send({ message: "offer Model exists", user:offer })
		} catch (error) {
		  res.status(500).send({ message: "Internal Server Error" });
		}
	  }
};

