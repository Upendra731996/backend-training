const bookModel=require("../models/bookModel")

const createBookData=async function(req,res){

    let data=req.body
    let savedBookData=await bookModel.create(data)
    res.send({msg:savedBookData})

}

const getBookData= async function(req , res){

    let allBookData =await bookModel.find()
    res.send({msg:allBookData})
}
module.exports.createBookData=createBookData
module.exports.getBooksData=getBookData