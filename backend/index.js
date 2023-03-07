require('dotenv').config();
const express = require ("express");
const app=express();
const cors=require('cors');
const connection = require('./db');
const AdminRoutes = require("./routes/adminRouters");
const CandidatRoutes = require("./routes/candidatRouters");
const jobAppRoutes = require("./routes/jobAppRouter");
const internAppRouter = require("./routes/internAppRouter");
const offerRouter = require("./routes/offerRouter");
const morgan = require('morgan');


//database connection
connection();
//middelwares
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
//routes
app.use("/api/adminRouters", AdminRoutes);
app.use("/api/candidatRouters", CandidatRoutes);
app.use("/api/jobAppRouters", jobAppRoutes);
app.use("/api/internAppRouter", internAppRouter);
app.use("/api/offerRouter", offerRouter);




const port = process.env.PORT||8080;
app.listen(port,()=> console.log(`server running on  ${port}..`));
