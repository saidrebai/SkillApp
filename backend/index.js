require('dotenv').config();
const express = require ("express");
const app=express();
const cors=require('cors');
const connection = require('./db');
const AdminRoutes = require("./routes/adminRouters");
const CandidatRoutes = require("./routes/candidatRouters");
const uploadRouter = require("./routes/uploadRouter");
const offerRouter = require("./routes/offerRouter");
const superAdminRoutes = require("./routes/superAdminRouters");
const applicationRouter = require("./routes/ApplicationRouter");
const contactRouter = require("./routes/contactRouter");
const quizRouter = require("./routes/quizRouter");
// const CandidacyRoutes =require("./routes/candidacyRouter");
const morgan = require('morgan');
const path = require("path");
const fs = require('fs');


//database connection
connection();
//middelwares
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
//routes
app.use("/api/adminRouters", AdminRoutes);
app.use("/api/candidatRouters", CandidatRoutes);
app.use("/api/uploadRouter", uploadRouter);
app.use("/api/offerRouter", offerRouter);
app.use("/api/superAdminRouters", superAdminRoutes);
app.use("/api/ApplicationRouter", applicationRouter);
app.use("/api/contactRouter", contactRouter);
app.use("/api/quizRouter", quizRouter);
app.use("/uploads",express.static(path.join("uploads")))


app.get('/api', function(req, res) {
    if (req.url === '/favicon.ico') {
      res.end();
    } 
  
    const json = fs.readFileSync('count.json', 'utf-8');
    const obj = JSON.parse(json);
  
    if (req.query.type === 'pageview') {
      obj.pageviews = obj.pageviews+1;
    }
  
    if (req.query.type === 'visit-pageview') {
      obj.visits = obj.visits+1;
      obj.pageviews = obj.pageviews+1;
    }
  
    const newJSON = JSON.stringify(obj);
  
    fs.writeFileSync('count.json', newJSON);
    res.send(newJSON);
  });
  



const port = process.env.PORT||8080;
app.listen(port,()=> console.log(`server running on  ${port}..`));
