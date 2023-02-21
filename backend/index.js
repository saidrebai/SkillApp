require('dotenv').config();
const express = require ("express");
const app=express();
const cors=require('cors');
const connection = require('./db');
const userRoutes = require("./routes/usersRouters");
const authRoutes = require("./routes/authRouter");

//database connection
connection();
//middelwares
app.use(express.json());
app.use(cors());
//routes
app.use("/api/usersRouters", userRoutes);
app.use("/api/authRouters", authRoutes);

const port = process.env.PORT||8080;
app.listen(port,()=> console.log(`server running on  ${port}..`));
