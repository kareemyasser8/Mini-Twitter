const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.createUser = (req, res, next) => {

  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        password: hash,
        notifications: []
      })
      user.save().then(
        (result) => {
          res.status(201).json({
            message: 'User created successfully!!',
            result: result
          })
        }
      ).catch(
        (err) => {
          res.status(500).json({
            message: err
          })
        }
      )
    }
  )

}

exports.getUser = (req, res, next) => {
  User.findOne({ username: req.params.username }).then(
    (profile) => {
      res.status(200).json({
        profile: profile
      })
    }
  ).catch(
    (err) => {
      res.status(404).send("User is not found");
    }
  )
}

exports.getAllUsers = (req, res, next) => {
  User.find().then(
    users => {
      res.status(200).json({
        message: 'Users are fetched successfully',
        users: users,
      })
    }
  ).catch(
    (err) => {
      res.status(404).json({
        message: "Couldn't fetch the users"
      })
    }
  )
}

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'username is not found' })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password).then(
        (result) => {
          if (!result) {
            return res.status(401).json({ message: "Auth Failed" })
          }
          const token = jwt.sign({
            username: fetchedUser.username,
            userFullName: fetchedUser.fname + ' ' + fetchedUser.lname,
            userId: fetchedUser._id
          },
            process.env.JWT_KEY,
            { expiresIn: '1h' })
          res.status(200).json({
            token: token,
            expiresIn: 3600
          })
        }
      )
    }).catch(
      (err) => {
        return res.status(401).json({ message: "Auth failed" })
      }
    )
}
