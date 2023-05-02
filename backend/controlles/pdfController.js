const PDF = require("../models/filesModels");


module.exports={
uploads: async function (req, res) {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // Create a new PDF document with the file data
      const pdf = new PDF({
        name: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
        user: req.body.id,
        filename: req.file.filename,
      });
  
      // Save the PDF document to the database
      await pdf.save();
  
      res.status(201).json({
        message: "File uploaded successfully",
        pdf,
        idpdf: pdf._id,
        filename: pdf.filename,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPdfById : async (req, res) => {
    try {
      const pdfId = req.params.id;
      const pdf = await PDF.findById(pdfId);
      if (!pdf) {
        return res.status(404).send("PDF not found");
      }
      return res.status(200).json({ message: "PDF found", pdf, pdfCount : pdf.length});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}