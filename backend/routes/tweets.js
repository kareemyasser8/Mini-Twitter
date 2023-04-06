const express = require('express');

const router = express.Router();
const Tweet = require("../models/tweet")


router.post("", (req, res, next) => {
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

router.patch("/:id", (req, res, next) => {
  const update = {
    _id: req.body.id,
    text: req.body.text
  }
  Tweet.updateOne({ _id: req.params.id }, { $set: update }).then(
    (result) => {
      res.status(200).json({ message: 'tweet edited successfully' })
    }
  ).catch((err) => { console.log(err); res.status(500).json({ error: err }) })
})

router.delete("/:id", (req, res, next) => {
  Tweet.deleteOne({ _id: req.params.id }).then(
    (result) => {
      res.status(200).json({ message: 'tweet deleted' })
    }
  ).catch(
    (err)=> console.log(err)
  )

})

router.get('', (req, res, next) => {
  Tweet.find().then(
    documents => {
      res.status(200).json({
        message: 'Tweets fetched successfully!',
        tweets: documents
      })
    }
  )
})

router.get('/:id', (req, res, next) => {
  Tweet.findById(req.params.id).then(
    document => {
      res.status(200).json({
        message: 'Tweets fetched successfully!',
        tweets: document
      })
    }
  )
})


module.exports = router;
