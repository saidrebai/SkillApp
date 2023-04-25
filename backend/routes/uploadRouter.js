// const internAppControlles = require("../controlles/internAppControllers");
const router = require("express").Router();
const upload = require("../middleware/multer");
const PDF = require("../models/filesModels");
const express = require("express");

// router.post("/internApp", internAppControlles.createInternApp);
router.post("/upload", upload, async (req, res) => {
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

    // Return a success response
    res
      .status(200)
      .json({
        message: "File uploaded successfully",
        pdf,
        idpdf: pdf._id,
        filename: pdf.filename,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/pdf/:id", (req, res) => {
  const pdfId = req.params.id;
  PDF.findById(pdfId, (err, pdf) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!pdf) {
      return res.status(404).send("PDF not found");
    }
    return res
        .status(200)
        .json({ message: "pdf found", pdf});
  });
});

module.exports = router;
