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
			const offer = await offerModel.findOne({ Name: req.body.Name });
			if (!offer) {
				return res.status(404).json({ message: "Offer not found" });
			}
			return res.status(200).json({ message: "Offer found", offer });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Internal Server Error" });
		}
	}
};

