const { count } = require("console")
const authorModel= require("../models/authorModel");
const bookModel = require("../models/bookModel");


const createAuthor= async function(req ,res){
  let data =req.body
  
    let authorData=await authorModel.create(data);
    res.send({msg:authorData})
}


const getAuthor=async function(req , res){
    
    let allAuthor=await authorModel.findOne({author_name:"Chetan Bhagat"}).select({author_id:1,_id:0})
    console.log(allAuthor)
    let book=await bookModel.find(allAuthor);
    res.send({msg:book})
}

const updated=async function(req ,res){
let updatedook =await bookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true})
let authorId=await bookModel.find(updatedook).select({author_name:1,price:1})
res.send({msg:authorId})
console.log(updatedook)
 }
 const newprice= async function(req ,res){

    let priceUpdate= await bookModel.find( { price : { $gte: 50, $lte: 100} }).select({author_id:1 , _id:0})
    console.log(priceUpdate)
    let idNeed=priceUpdate.map(x=>x.author_id);
    let authorname=await authorModel.find({author_id:{$in:idNeed}}).select({author_name:1,_id:0})

console.log(authorname)
res.send({msg:authorname})
}

module.exports.createAuthor= createAuthor;
module.exports.getAuthor=getAuthor;
module.exports.updated=updated;
module.exports.newprice=newprice