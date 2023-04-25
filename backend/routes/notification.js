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
    case 'reply':
      return new Notification({
        type: 'reply',
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
      select: '-_id',
      populate: [
        { path: 'senderId', select: '-_id' },
        { path: 'targetId', select: '_id text username author' }
      ]
    })
  res.status(200).send(notifications);
})



//posting a notification to a certain user ---------------------------------

router.post('/:tweetId/like', async (req, res, next) => {
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


router.delete('/:tweetId/like', async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = await Tweet.findById(tweetId).populate('creatorId')
    let notificationId = "";
    if (tweet.creatorId.notifications.length > 0) {
      notificationId = tweet.creatorId.notifications[tweet.creatorId.notifications.length - 1];
    }

    if (!tweet.creatorId.username) {
      return;
    }

    const notification = await Notification.findOne({
      notificationId
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    let result = await User.findOneAndUpdate(
      { username: tweet.creatorId.username },
      { $pull: { notifications: notificationId } },
      { new: true }
    );

    res.status(200).json({
      message: 'Notification removed successfully',
      notification
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

router.post('/:tweetId/reply', async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = await Tweet.findById(tweetId).populate('creatorId');
    if (!tweet.creatorId.username) {
      return;
    }
    const notification = initNotification('reply', req);
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
