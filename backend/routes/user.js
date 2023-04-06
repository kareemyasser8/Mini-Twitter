const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();

const User = require('../models/user')

router.post("/signup", (req,res,next)=>{

  bcrypt.hash(req.body.password,10).then(
    (hash)=>{
      const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        password: hash
      })
      user.save().then(
        (result)=>{
          res.status(201).json({
            message: 'User created successfully!!',
            result: result
          })
        }
      ).catch(
        (err)=>{
          res.status(500).json({
            message: err
          })
        }
      )
    }
  )

})


module.exports = router;
