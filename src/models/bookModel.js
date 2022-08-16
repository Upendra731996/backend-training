const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({

    bookName:{
        type:String,
        require:true
    },
    authoreName:{
        type:String,
        require:true
    },
    year:{
        type:Number,
        require :true
    }
},{timestaps : true})

module.exports = mongoose.model('book', bookSchema) //books

