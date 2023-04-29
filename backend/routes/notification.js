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
    .select('notifications')
    .populate({
      path: 'notifications',
      populate: [
        { path: 'senderId', select: '-_id' },
        { path: 'targetId', select: '_id text username author' }
      ]
    }).lean(); // add this to enable array manipulations

  notifications.notifications = notifications.notifications.filter(notification => {
    return notification.targetId !== null;
  })

  res.status(200).send(notifications);
})


//posting a notification to a certain user ---------------------------------

router.post('/:tweetId/like', async (req, res, next) => {
  const tweetId = req.params.tweetId;
  const senderId = req.body.senderId;

  try {
    const tweet = await Tweet.findById(tweetId).populate('creatorId');
    if (senderId == tweet.creatorId._id) {
      return;
    }

    if (!tweet.creatorId.username) {
      return;
    }
    const notification = initNotification('like', req);
    let savedNotification = await notification.save();

    await User.findOneAndUpdate(
      { username: tweet.creatorId.username },
      { $push: { notifications: notification._id } },
      { new: true }
    )

    let tweetDetails = await Notification.findOne({ targetId: tweetId }).populate('targetId');

    res.status(200).json({
      message: 'notification saved',
      notification: savedNotification,
      tweetDetails: tweetDetails
    })
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});


router.delete('/:tweetId/like/:senderId', async (req, res, next) => {
  const senderId = req.params.senderId;
  const tweetId = req.params.tweetId;
  try {
    const tweet = await Tweet.findById(tweetId).populate('creatorId')

    if(tweet.creatorId._id == senderId){
        return
    }

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

    await User.findOneAndUpdate(
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


router.delete('/:tweetId/like/:senderId', async (req, res, next) => {
  const senderId = req.params.senderId;
  const tweetId = req.params.tweetId;
  try {
    const tweet = await Tweet.findById(tweetId).populate('creatorId')

    if(tweet.creatorId._id == senderId){
        return
    }

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

    await User.findOneAndUpdate(
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
  const senderId = req.body.senderId;
  try {
    const tweet = await Tweet.findById(tweetId).populate('creatorId');
    if (senderId == tweet.creatorId._id) {
      return;
    }
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

router.put('/readAll', async (req, res, next) => {
  try {
    const notifications = req.body.notifications;
    if (!notifications) {
      throw new Error('Missing notifications array in request body');
    }
    const ids = notifications.map(notification => notification._id);
    // console.log(ids);
    const result = await Notification.updateMany(
      { _id: { $in: ids } },
      { $set: { read: true } }
    );

    const updatedNotifications = await Notification.find({ _id: { $in: ids } })
      .populate([
        { path: 'senderId', select: '-_id' },
        { path: 'targetId', select: '_id text username author' }
      ])
    res.status(200).send(updatedNotifications);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating notifications');
  }
});


module.exports = router;
