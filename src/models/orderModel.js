const { default: mongoose } = require('mongoose')
const mongooge = require('mongoose')
const objId=mongooge.Schema.Types.ObjectId

const orderSchema=new mongoose.Schema({

    userId: {
        type:objId,
        ref:"userr"
    }
    ,
	productId:{
        type:objId,
        ref:"product"

    }
    ,
	amount: Number,
	isFreeAppUser: Boolean, 
	date:String

}, { timestamps: true })
module.exports= mongooge.model('order' , orderSchema)