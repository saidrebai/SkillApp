const PDF = require("../models/filesModels");
const ocrSpace = require("../middleware/OCRSpace");
const getCVData = require("../middleware/getCVData");
// const mindee = require("mindee");

// const getSkills = async(req,res)=>{
// const mindeeClient = new mindee.Client({
//   apiKey: "195eb6430f65eb1f4e6ceb761d5d27fc",
// }).addEndpoint({
//   accountName: "alamakh",
//   endpointName: "resume",
// });

// const apiResponse = mindeeClient
//   .docFromPath(req.body.file)
//   .parse(mindee.CustomV1, { endpointName: "resume" });

// apiResponse.then((resp) => {
//   if (resp.document === undefined) return;

//   console.log(resp.document);

//   console.log(resp.document.toString());
// });
// }
const parseFile = async (req, res, filePath) => {
  try {
    // const isCreateSearchablePdf = req.body.isCreateSearchablePdf;
    // const isSearchablePdfHideTextLayer = req.body.isSearchablePdfHideTextLayer;
    // const isTable = req.body.isTable;
    // const language = req.body.language;
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
    // console.log(result.ParsedResults[0].TextOverlay);
    // console.log(result.SearchablePDFURL);
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
      const ids = req.query.q.split(",");
      const pdf = await PDF.find({ user: { $in: ids } });
      if (!pdf) {
        return res.status(404).json({ message: "pdf not found" });
      }
      return res
        .status(200)
        .json({ message: "pdf found", pdf, pdfcount: pdf.length });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  factureParser,
  // getSkills
};
