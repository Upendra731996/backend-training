const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")

const middController=require('../middleware/auth')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/userss/:userId/", userController.getUserData)
router.get("/users/:userId",middController.authenticate, middController.authenticate,userController.postMessage)

router.put("/users/:userId",middController.authenticate, middController.authenticate, userController.updateUser)
router.delete('/users/:userId',middController.authenticate , userController.isdelete)
//middController.authenticate,
module.exports = router;