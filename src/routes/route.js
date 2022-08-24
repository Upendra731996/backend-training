const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")

 const publisherController = require("../controllers/publisherController.js")
 const bookController= require("../controllers/bookController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post("/createPublisher" ,publisherController.createPublisher)
router.post("/createBook", bookController.createBook  )
router.get("/getBooksData", bookController.getBooksData)
router.put('/book',bookController.updatebook)

// // router.get("/getAuthorsData", authorController.getAuthorsData)





 



 module.exports = router;