const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const bookModel=require('../models/bookModel')
//const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)
router.post("/createBook", BookController.createBook)
 router.get("/bookList", BookController.bookList)
router.post("/getParticularBook",BookController.getParticularBook)
router.get("/getXINRBooks",BookController.getXINRBooks)
router.get("/getRandomBook",BookController.getRandomBook)
router.post("/getBooksData",BookController.getBooksInYear)
 
 

module.exports = router;