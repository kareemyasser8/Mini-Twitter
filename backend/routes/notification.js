const express = require("express")
const router = express.Router();
const NotificationController = require("../controllers/notification");

router.get('/:username', NotificationController.getNotificationsOfUser)

router.post('/:tweetId/like', NotificationController.notifyLikeToUser);

router.delete('/:tweetId/like/:senderId', NotificationController.removeLikeNotificationToUser);

router.post('/:tweetId/reply', NotificationController.notifyReplyToUser);

router.put('/readAll', NotificationController.readAllNotifications);


module.exports = router;
