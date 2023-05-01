const Tweet = require("../models/tweet")

function tweetInit(req) {
  return new Tweet({
    text: req.body.text,
    creatorId: req.userData.userId,
    username: req.userData.username,
    author: req.userData.userFullName,
    date: req.body.date,
    likes: req.body.likes,
    comments: req.body.comments,
    replies: [],
    parentId: req.params.id
  })
}

exports.postTweet = (req, res, next) => {
  const tweet = tweetInit(req);
  tweet.save().then(
    created => {
      res.status(201).json({
        message: 'Tweet added successfully!!',
        tweetId: created._id
      })
    }
  )
}

exports.editTweet = (req, res, next) => {
  const update = {
    _id: req.body.id,
    text: req.body.text
  }
  Tweet.updateOne({ _id: req.params.id, creatorId: req.userData.userId }, { $set: update }).then(
    (result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'tweet edited successfully' })
      } else {
        res.status(401).json({ message: 'Not authorized!' })
      }

    }
  ).catch((err) => { console.log(err); res.status(500).json({ error: err }) })
}

exports.likeTweet = (req, res, next) => {
  const tweetId = req.params.id;
  const username = req.userData.username;

  Tweet.findById(tweetId)
    .then((tweet) => {
      if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
      }
      if (!tweet.likedBy.includes(username)) {
        tweet.likedBy.push(username);
        tweet.likes++;
        return tweet.save();
      }
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
}

exports.unLikeTweet = (req, res, next) => {
  const tweetId = req.params.id;
  const username = req.userData.username;

  Tweet.findById(tweetId)
    .then((tweet) => {
      if (!tweet) {
        return res.status(404).json({ message: "Tweet not found" });
      }
      if (tweet.likedBy.includes(username)) {
        const indexToRemove = tweet.likedBy.indexOf(username);

        if (indexToRemove !== -1) {
          tweet.likedBy.splice(indexToRemove, 1); // remove 1 element at the index
        }
        tweet.likes--;
        return tweet.save();
      }

    })
    .then((updatedTweet) => {
      res.status(200).json({
        message: "Tweet unliked successfully",
        tweet: {
          ...updatedTweet._doc,
          id: updatedTweet._id,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Failed to unlike tweet" });
    });
}

exports.addReply = (req, res, next) => {
  const tweetId = req.params.id;
  const username = req.userData.username;
  const reply = tweetInit(req);

  reply.save().then((newReply) => {
    Tweet.findById(tweetId).then((tweet) => {
      if (!tweet) {
        res.status(404).json({ message: 'Tweet not found' })
      }

      if (!tweet.commentedBy.includes(username)) {
        tweet.commentedBy.push(username);
      }

      tweet.replies.push(newReply.id);

      return tweet.save()
    }).then(
      (updatedTweet) => {
        updatedTweet.comments = updatedTweet.replies.length;
        return updatedTweet.save();
      }).then((updatedTweet) => {
        res.status(201).json({
          message: "Reply added successfully",
          tweet: updatedTweet
        })
      })
      .catch((error) => {
        res.status(500).json({ message: "Server error", error: error });
      })
  })

}

exports.deleteTweet = (req, res, next) => {

  Tweet.findById({ _id: req.params.id }).then(
    tweet => {

      if (!tweet) res.status(404).send({ message: 'tweet not found' })
      if (!tweet.parentId && tweet.replies) {
        deleteTweetReplies(tweet.replies);
        return deleteTweet(tweet.id, res)
      }
      if (tweet.parentId && tweet.replies) {
        removeReplyTweet(tweet)
        deleteTweetReplies(tweet.replies);
        return deleteTweet(tweet.id, res)
      }
      if (tweet.parentId && !tweet.replies) {
        removeReplyTweet(tweet)
        return deleteTweet(tweet.id, res)
      }

      else {
        res.status(401).json({ message: 'Not authorized!' })
      }
    }
  )
}

exports.getAllTweets = (req, res, next) => {
  Tweet.find({ parentId: null }).then(
    documents => {
      res.status(200).json({
        message: 'Tweets fetched successfully!',
        tweets: documents
      })
    }
  )
}

exports.getUserTweets = (req, res, next) => {
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
    (err) => res.status(404).json({ message: err })
  )
}

exports.getTweetDetails = (req, res, next) => {
  Tweet.find({ _id: req.params.id }).then(
    document => {
      res.status(200).json({
        message: 'Tweet is fetched successfully!',
        tweet: document
      })
    }
  ).catch(
    (err) => res.status(500).json({ message: 'Error' })
  )
}

exports.getTweetReplies = (req, res, next) => {
  Tweet.find({ parentId: req.params.id }).then(
    documents => {
      res.status(200).json({
        message: 'Replies are fetched successfully!',
        replies: documents
      })
    }
  ).catch(
    (err) => res.status(500).json({ message: 'Error' })
  )
}

function removeReplyTweet(tweet) {
  Tweet.findById(tweet.parentId).then(
    (parent) => {
      if (!parent) {
        console.log('Tweet not found');
        return;
      }

      const index = parent.replies.indexOf(tweet.id);
      if (index !== -1) {
        parent.replies.splice(index, 1);
      }
      parent.comments -= 1;
      return parent.save()
    }
  ).catch((error) => console.log('Error deleting tweet:', error))
}

function deleteTweet(id, res) {
  Tweet.findByIdAndDelete(id).then(
    (tweet) => {
      if (!tweet) {
        console.log('Tweet not found');
        return;
      }
      res.status(200).send({
        message: 'Tweet deleted successfully',
        tweet: tweet
      })
    }
  ).catch((error) => {
    console.log('Error deleting tweet:', error);
    res.status(500).send({
      message: 'Problem happened',
    })
  });
}

function deleteTweetReplies(replies) {
  replies.forEach(replyTweetId => {
    console.log(replyTweetId);
    Tweet.findByIdAndDelete(replyTweetId).then(
      (tweet) => {
        if (!tweet) {
          console.log('Tweet not found');
          return;
        }
        console.log('Tweet deleted successfully');
      }
    ).catch((error) => {
      console.log('Error deleting tweet:', error);
    });
  });
}
