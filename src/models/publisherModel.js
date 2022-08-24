const mongoose = require('mongoose')

const publisherSchema=new mongoose.Schema({
   name: String,
  headQuarter: String,
        
},{timeStamps:true})




module.exports=mongoose.model('NewPublisher',publisherSchema )