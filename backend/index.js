require('dotenv').config();
const express = require ("express");
const app=express();
const cors=require('cors');
const connection = require('./db');
const AdminRoutes = require("./routes/adminRouters");
const CandidatRoutes = require("./routes/candidatRouters");


//database connection
connection();
//middelwares
app.use(express.json());
app.use(cors());
//routes
app.use("/api/adminRouters", AdminRoutes);
app.use("/api/canidatRouters", CandidatRoutes);


const port = process.env.PORT||8080;
app.listen(port,()=> console.log(`server running on  ${port}..`));
