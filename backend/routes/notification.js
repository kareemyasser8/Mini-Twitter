const express = require("express")

const router = express.Router();
const Notification = require("../models/notification");
const User = require("../models/user");
const checkAuth = require("../middleware/check-auth")
const { ObjectId } = require('mongodb');


//For getting all Notifications of a certain user ----------------------------------------------------
router.get('/:username', (req, res, next) => {
  Notification.find({
    username: req.params.username
  }).then(
    notifications => {
      res.status(200).json({
        message: 'notifications fetched successfully!',
        notifications: notifications
      })
    }
  ).catch(
    (err) => res.status(404).json({ message: err })
  )
})

//posting a notification to a certain user ---------------------------------

router.post("/like", checkAuth, (req, res, next) => {
  const notification = new Notification({
    id: new ObjectId(),
    type: 'like',
    message: req.body.message,
    timestamp: new Date(),
    read: false,
    senderId: req.userData.userId,
    senderName: req.userData.userFullName,
    targetId: req.body.tweetId,
    targetedUserId: req.body.targetedUserId
  });

  notification.save().then(
    (result) => {
      console.log(result)
      console.log("notification saved")
      User.findById(req.body.targetedUserId).then(
        result => {
          console.log(result)
        }).catch(
          err => console.log(err)
        )
    }
  ).catch((err) => console.log(err));



});


module.exports = router;
