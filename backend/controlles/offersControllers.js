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

	getoffer :async function (req, res) {
		try {
		  // Connect to MongoDB
		  const offer = await offerModel.connect(process.env.DB);
		  const db = offer.db('test');
	  
		  // Retrieve the Name from the request body
		  const { Name } = req.body;
	  
		  // Find the document with the matching Name
		  const result = await db.collection('offermodels').findOne({ Name });
	  
		  if (result) {
			// Send a response with the retrieved information
			res.status(200).json(result);
		  } else {
			// Send a response indicating that the Name was not found
			res.status(404).json({ message: 'offer not found' });
		  }
	  
		  // Close the database connection
		  offer.close();
		} catch (error) {
		  // Handle any errors that occur during the database connection or query
		  console.error(error);
		  res.status(500).json({ message: 'An error occurred' });
		}},
};

