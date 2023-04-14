const express = require('express');

const router = express.Router();
const Tweet = require("../models/tweet")
const checkAuth = require("../middleware/check-auth")


//for posting a new Tweet ---------------------------------------------------

router.post("", checkAuth, (req, res, next) => {
  const tweet = new Tweet({
    text: req.body.text,
    creatorId: req.userData.userId,
    username: req.userData.username,
    author: req.userData.userFullName,
    date: req.body.date,
    likes: req.body.likes,
    comments: req.body.comments,
    replies: req.body.replies
  })
  tweet.save().then(
    created => {
      res.status(201).json({
        message: 'Tweet added successfully!!',
        tweetId: created._id
      })
    }
  )

})

//for updating a Tweet ---------------------------------------------------

router.patch("/:id", checkAuth, (req, res, next) => {
  const update = {
    _id: req.body.id,
    text: req.body.text
  }
  Tweet.updateOne({ _id: req.params.id, creatorId: req.userData.userId }, { $set: update }).then(
    (result) => {
      if(result.modifiedCount > 0){
        res.status(200).json({ message: 'tweet edited successfully' })
      }else{
        res.status(401).json({message: 'Not authorized!'})
      }

    }
  ).catch((err) => { console.log(err); res.status(500).json({ error: err }) })
})


//for Liking Tweet ---------------------------------------------------
router.patch("/:id/like", checkAuth, (req, res, next) => {
  const tweetId = req.params.id;
  const username = req.userData.username;

  Tweet.findById(tweetId)
    .then((tweet) => {
      if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
      }
      if (tweet.likedBy.includes(username)) {
        return res
          .status(400)
          .json({ message: "Tweet already liked by user" });
      }
      tweet.likedBy.push(username);
      tweet.likes++;
      return tweet.save();
    })
    .then((updatedTweet) => {
      res.status(200).json({
        message: "Tweet liked successfully",
        tweet: {
          ...updatedTweet._doc,
          id: updatedTweet._id,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Failed to like tweet" });
    });
});


//For deleting a tweet ----------------------------------------------------------------------
router.delete("/:id", checkAuth, (req, res, next) => {
  Tweet.deleteOne({ _id: req.params.id, creatorId: req.userData.userId}).then(
    (result) => {
      console.log(result)
      if(result.deletedCount > 0){
        res.status(200).json({ message: 'tweet deleted' })
      }else{
        res.status(401).json({message: 'Not authorized!'})
      }

    }
  ).catch(
    (err) => console.log(err)
  )

})


//For getting all Tweets ----------------------------------------------------------------------
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


//For getting all Tweets of a certain user ----------------------------------------------------
router.get('/:username', (req, res, next) => {
  Tweet.find({
    username: req.params.username
  }).then(
    documents => {
      res.status(200).json({
        message: 'Tweets fetched successfully!',
        tweets: documents
      })
    }
  ).catch(
    (err)=> res.status(404).json({message: err})
  )
})


// router.get('/:id', (req, res, next) => {
//   Tweet.findById(req.params.id).then(
//     document => {
//       res.status(200).json({
//         message: 'Tweets fetched successfully!',
//         tweets: document
//       })
//     }
//   )
// })


module.exports = router;
