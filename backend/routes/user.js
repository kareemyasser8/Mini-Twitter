const express = require('express')
const router = express.Router();
const UserController = require('../controllers/user')

router.get("/:username", UserController.getUser);

router.post("/signup", UserController.createUser);

router.get('', UserController.getAllUsers);

router.post("/login", UserController.login);

module.exports = router;
