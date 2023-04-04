const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Tweet = require("./models/tweet")

const app = express()

mongoose.connect("mongodb+srv://Kareem:tPn4h5kOmHfIM58U@cluster0.scdmnkw.mongodb.net/miniTwitterDataBase")
  .then(() => {
    console.log("Connected to database..")
  })
  .catch(() => {
    console.log('Connection failed')
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//DHVCkhocJ7C6XdWe

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requsted-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS")
  next()
})

app.post("/api/tweets", (req, res, next) => {
  const tweet = new Tweet({
    text: req.body.text,
    author: req.body.author,
    date: req.body.date,
    likes: req.body.likes,
    comments: req.body.comments,
    replies: req.body.replies
  })

  console.log(tweet);
  tweet.save();
  res.status(201).json({ message: 'Tweet added successfully!!' })
})

app.get('/api/tweets', (req, res, next) => {
  Tweet.find().then(
    documents => {
      res.status(200).json({
        message: 'Tweets fetched successfully!',
        tweets: documents
      })
    }
  )
})


module.exports = app;
