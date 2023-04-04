const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  text: {
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
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  replies: {
    type: [this],
    default: []
  }

})

module.exports = mongoose.model('Tweet',tweetSchema);