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
  tweet.save().then(
    created => {
      res.status(201).json({
        message: 'Tweet added successfully!!',
        tweetId: created._id
      })
    }
  )

})

app.patch('/api/tweets/:id', (req, res, next) => {
  const update = {
    _id: req.body.id,
    text: req.body.text
  }
  Tweet.updateOne({ _id: req.params.id }, { $set: update }).then(
    (result) => {
      console.log()
      console.log(result)
      res.status(200).json({ message: 'tweet edited successfully' })
    }
  ).catch((err) => { console.log(err); res.status(500).json({ error: err }) })
})

app.delete('/api/tweets/:id', (req, res, next) => {
  Tweet.deleteOne({ _id: req.params.id }).then(
    (result) => {
      res.status(200).json({ message: 'tweet deleted' })
    }
  )

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
