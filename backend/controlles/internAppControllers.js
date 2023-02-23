const {internModel, validate} = require("../models/internAppModel")

module.exports = {
    createInternApp: function (req, res) {
		const newIntern = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
            gender: req.body.gender,
            level: req.body.level,
            degree: req.body.degree,
            birthDate: req.body.birthDate,
            country: req.body.country,
            Establishment: req.body.Establishment,
            town: req.body.town,
            Zipcode: req.body.Zipcode,
			adresse: req.body.adresse,
			motivation: req.body.motivation,
			tel: req.body.tel,
		};
		console.log('nneww', newIntern);
		internModel.create(req.body, function (err, intern) {
			if (err)
				res.json({
					message: err,
					statut: 500,
				});
			else if(validate)
				res.json({
					message: 'intern created!',
					statut: 200,
					data: intern,
				});
		});
	},
};
