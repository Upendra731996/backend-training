const mongoose = require('mongoose');

const bookSchema=new mongoose.Schema({
bookName: {
    type:String,
    require:true},
price:{
    indianPrice:String,
    europeanPrice:String
   
},
year:{
    type:Number,
    default:2021
},
tag:[String,String],

authorName:String,
totalPage:Number,
stokeAvailable:Boolean

},{timestamps:true});


module.exports=mongoose.model('Book', bookSchema);













// const bookSchema = new mongoose.Schema( {
//     bookName: String, 
//     authorName: String, 
//     tags: [String],
    
//     isPublished: Boolean,
//     prices: {
//         indianPrice: String,
//         europePrice: String,
//     },
//     sales: {type: Number, default: 10}
// }, { timestamps: true });


// module.exports = mongoose.model('Book', bookSchema) //users

// //Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
