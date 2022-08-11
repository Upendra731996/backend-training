const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})

//you will be given an array of persons (1.e an array of objects)..each person will have a 
//(name: String, age: Number, yatingStatus: true/false(Boolean)} take input in query param as votingAge..
//and for all the people above that age, change votingStatus as true also return an array consisting of only
// the person that can vote

// WRITE A POST API TO THE ABOVE

// take this as sample for array of persons: 
let persons = [

    {
        nane: "PK",

        age: 10, votingStatus: false
    },

    {
        nane: "SK",

        age: 20,

        votingStatus: false
    },

    {
        nane: "AA", age: 70,

        votingStatus: false
    },

    {
        nane: "SC",

        age: 5, votingStatus: false
    },

    {
        name: "HO",

        age: 40,

        votingStatus: false
    }
]

router.post( '/personage' , function(req , res){

let newage=req.query.age;



for(let i=0;i<persons.length; i++){

    if (persons[i].age>newage){
persons[i].votingStatus=true

    }
}
res.send(persons)

})



module.exports = router;