const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});





router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})
router.get('/movie',function(req ,res){

    let movie=['rajababu','koyla,nayak','krish', 'zurm']
    res.send(movie)
})




router.get('/movie/:indexNuber',function(req,res){
    


    let movie=['rajababu','koyla','nayak','krish', 'zurm']


let requestParams=req.params.indexNuber

if(requestParams<movie.length){

console.log("movie name is ",movie[requestParams])
}
else{
console.log("invalid input hai")
    res.send("invalid input")
    
}
res.send("movie is available go and watch")

})

router.get('/films',function(req,res){
    let films=

    [ {
    "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       
res.send(films)

console.log(films)

})

router.get('/films/:filmId', function(req,res){

    let id=req.params.filmId




    let films=

    [ {
    "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       
       for(let i=0;i <films.length;i++){

        if(id==i+1){

            console.log(films[i])
        
        }
        

        
     }
       
    }


)






router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+JSON.stringify (requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})

module.exports = router;