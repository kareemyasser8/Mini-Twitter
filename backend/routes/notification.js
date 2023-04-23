const express = require("express")

const router = express.Router();
const Notification = require("../models/notification");
const User = require("../models/user");
const Tweet = require("../models/tweet");
const checkAuth = require("../middleware/check-auth")
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');


function initNotification(type, req) {
  const commonProps = {
    timestamp: new Date(),
    read: false,
    senderId: req.body.senderId,
    targetId: req.body.targetId
  }

  switch (type) {
    case 'like':
      return new Notification({
        type: 'like',
        message: 'liked your tweet',
        ...commonProps
      });
    case 'comment':
      return new Notification({
        type: 'comment',
        message: 'commented on your tweet',
        ...commonProps
      });
    default:
      throw new Error(`Invalid notification type: ${type}`);
  }

}


//For getting all Notifications of a certain user ----------------------------------------------------
router.get('/:username', async (req, res, next) => {
  const notifications = await User.findOne({ username: req.params.username })
    .select('notifications -_id')
    .populate({
      path: 'notifications',
      select: '-_id -senderId',
      populate: {
        path: 'targetId',
        select: '-_id text username author'
      }
    })
  res.status(200).send(notifications);
})



//posting a notification to a certain user ---------------------------------

router.post('/:tweetId', async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = await Tweet.findById(tweetId).populate('creatorId');
    if (!tweet.creatorId.username) {
      return;
    }
    const notification = initNotification('like', req);
    let savedNotification = await notification.save();
    await User.findOneAndUpdate(
      { username: tweet.creatorId.username },
      { $push: { notifications: notification._id } },
      { new: true }
    );

    res.status(200).json({
      message: 'notification saved',
      notification: savedNotification
    })
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});





module.exports = router;
