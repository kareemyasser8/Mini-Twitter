const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}


const tweetsRoutes = require("./routes/tweets")

const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS")
  next()
})

mongoose.connect("mongodb+srv://Kareem:tPn4h5kOmHfIM58U@cluster0.scdmnkw.mongodb.net/miniTwitterDataBase")
  .then(() => {
    console.log("Connected to database..")
  })
  .catch(() => {
    console.log('Connection failed')
  })

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api/tweets", tweetsRoutes)

//DHVCkhocJ7C6XdWe


module.exports = app;
