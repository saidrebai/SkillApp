const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const revenueSchema = new mongoose.Schema({
  company_id: {
    type: String,
  },
  company_name: {
    type: String,
  },
  expenses: {
    type: Number,
  },
  date: {
    type: String,
  },
  year: {
    type: Number,
  },
  country: {
    type: String,
  },
  month: {
    type: String,
  },
});

const Revenue = mongoose.model("revenueModel", revenueSchema);
module.exports = { Revenue };
