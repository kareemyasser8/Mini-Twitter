const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  likedBy: [{
    type: String
  }],

  commentedBy: [{
    type: String
  }],

  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  // replies: {
  //   type: [this],
  //   default: []
  // },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet"
  }],

  parentId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Tweet"
  }

})

module.exports = mongoose.model('Tweet', tweetSchema);
