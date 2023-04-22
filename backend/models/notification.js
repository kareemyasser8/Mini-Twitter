const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator')

const notificationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
    required: true
  }
});

// notificationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Notification', notificationSchema);
