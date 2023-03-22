const internAppControlles = require("../controlles/internAppControllers");
const router = require("express").Router();
const upload = require("../middleware/multer")
const PDF = require('../models/filesModels');

router.post("/internApp", internAppControlles.createInternApp);
router.post("/upload", upload,async(req,res)=>{
    try {
        // Check if a file was uploaded
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        // Create a new PDF document with the file data
        const pdf = new PDF({
          name: req.file.originalname,
          contentType: req.file.mimetype,
          data: req.file.buffer,
          user : req.file.user
        });
    
        // Save the PDF document to the database
        await pdf.save();

        // Return a success response
        res.status(200).json({ message: 'File uploaded successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
});

module.exports = router;
