const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    fname: {
      type:String,
      required: true
    },
    lname: {
      type:String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    notifications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification"
    }]
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema)
