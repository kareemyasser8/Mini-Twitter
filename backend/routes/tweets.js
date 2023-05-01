const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth")
const TweetController = require("../controllers/tweet")

router.post("", checkAuth, TweetController.postTweet)

router.patch("/:id", checkAuth, TweetController.editTweet)

router.patch("/:id/like", checkAuth, TweetController.likeTweet);

router.patch("/:id/unlike", checkAuth, TweetController.unLikeTweet);

router.patch("/:id/reply", checkAuth, TweetController.addReply);

router.delete("/:id", checkAuth, TweetController.deleteTweet)

router.get('', TweetController.getAllTweets);

router.get('/:username', TweetController.getUserTweets);

router.get('/:id/details', TweetController.getTweetDetails);

router.get('/:id/replies', TweetController.getTweetReplies);

module.exports = router;
