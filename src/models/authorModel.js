const mongoose=require('mongoose')

const authorSchema= new mongoose.Schema({
    
        author_id:{
            type:Number,
            required:true},
           
        author_name:String,
        age:Number,
        address:String



},{timeStamps:true})



module.exports = mongoose.model('Author', authorSchema) 
