const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post("/signup", (req, res, next) => {

  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        password: hash
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

})

router.post("/login", (req, res, next) => {
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
            userame: fetchedUser.username,
            userId: fetchedUser._id
          },
            'MySecretKey1234',
            { expiresIn: '1h' })
          res.status(200).json({
            token: token,
            expiresIn: 3600
          })
        }
      )
    }).catch(
      (err)=> {
        return res.status(401).json({message: "Auth failed"})
      }
    )
})



module.exports = router;
