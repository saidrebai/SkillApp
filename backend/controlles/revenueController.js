const {Revenue} = require("../models/revenueModel")
module.exports = {
    getRevenue: async function (req, res) {
        try {
            const revenue = await Revenue.find();
            if (!revenue) {
                return res.status(404).json({ message: "revenue not found" });
            }
            return res.status(200).json({ message: "revenue found", data :revenue});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
}