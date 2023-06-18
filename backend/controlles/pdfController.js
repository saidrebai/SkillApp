const PDF = require("../models/filesModels");
const ocrSpace = require("../middleware/OCRSpace");
const getCVData = require("../middleware/getCVData");

const parseFile = async (req, res, filePath) => {
  try {
  
    const isCreateSearchablePdf = false;
    const isSearchablePdfHideTextLayer = false;
    const isTable = true;
    const language = req.body.language;
    if (!filePath) {
      const FilePath = String(filePath);
      var result = await ocrSpace(FilePath, {
        language,
        isCreateSearchablePdf,
        isSearchablePdfHideTextLayer,
        isTable,
      });
    } else
      var result = await ocrSpace(filePath.path, {
        language,
        isCreateSearchablePdf,
        isSearchablePdfHideTextLayer,
        isTable,
      });
    return result;
  } catch (err) {
    console.log("you have an error " + err);
    return err;
  }
};

const factureParser = async (req, res) => {
  try {
    var filePath = req.file;
    const result = await parseFile(req, res, filePath);
    console.log(result.ParsedResults[0].TextOverlay);
    const DATA = await getCVData(result.ParsedResults[0].TextOverlay);
    console.log(DATA);
    res.json(DATA);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  uploads: async function (req, res) {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
    // Check if the uploaded file is not a PDF
    if (req.file.mimetype !== "application/pdf") {
      throw new Error("PDF file only");
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
      if (error.message === "PDF file only") {
        res.status(415).json({ message: "PDF file only" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
  
    }
  },

  getPdfById: async (req, res) => {
    try {
      const pdfId = req.params.id;
      const pdf = await PDF.findById(pdfId);
      if (!pdf) {
        return res.status(404).send("PDF not found");
      }
      return res
        .status(200)
        .json({ message: "PDF found", pdf, pdfCount: pdf.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPdfByUser: async function (req, res) {
    try {
      const ids = req.query.q.split(","); // Convert comma-separated string of ids into an array
      const batchSize = 10; // Define the number of IDs to include in each batch
      const batchCount = Math.ceil(ids.length / batchSize);
      const filteredItems = [];

      for (let i = 0; i < batchCount; i++) {
        const start = i * batchSize;
        const end = start + batchSize;
        const batchIds = ids.slice(start, end);
        console.log("=====",batchIds);
        const batchItems = await PDF.find({ user: { $in: batchIds } });
        filteredItems.push(...batchItems);
      }

      const pdfCount = filteredItems?.length;

      res.status(200).json({
        message: "Items found",
        status: 200,
        data: filteredItems,
        pdfCount: pdfCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error searching for items in database");
    }
  },


  factureParser,
};
