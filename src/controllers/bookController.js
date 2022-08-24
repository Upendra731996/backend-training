const authorModel = require("../models/authorModel")
const publisherModel=require('../models/publisherModel')
const bookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let book= req.body 
    //3a 
    if(!book.authorId){
      return  res.send({status: false,msg:"author  id is mandatory field"}) 

    }
    //3b
    let author= await authorModel.findById(book.authorId)
    if(!author){
      return  res.send({status: false,msg:"authorId id is not valid "})
    } 
    //3c
    if(!book.publisherId){
      return res.send({status: false,msg: "publishe id is mandatory"})
    }
    //3d
    let publisher=await publisherModel.findById(book.publisherId)
    if(!publisher){
    
    return res.send({status: false,msg:"invaalid publisher id"});


  }let bookcreated=await bookModel.create(book)
  res.send({status: false,msg:bookcreated})
}
    
   const updatedata = async function(req ,res){
    
   }
  
  
  

const getBooksData= async function ( req, res) {
  let allBooks = await bookModel.find().populate('authorId publisherId')
    res.send({data: allBooks})
  //res.send({msg:allbook})
   
}

const updatebook= async function(req ,res) {


let requirepublisher = await publisherModel.find({$or:[{name:"Penguin"} ,{name: "HarperCollins"}]} ,{_id: 1})

let RpublisherId =[]

for(let i =0; 1<requirepublisher.length; i++){
RpublisherId.push( requirepublisher[i]._id)
}
let updatebooks = await bookModel.updateMany({publisherId : {$in: RpublisherId}}, {isHardCover: true}, {new: true})
res.send({data:updatebooks})
}




module.exports.createBook= createBook
module.exports.getBooksData= getBooksData

module.exports.updatebook = updatebook;