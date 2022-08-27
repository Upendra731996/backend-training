//const { model } = require('mongoose')
const productModel =require('../models/productModel')



const createProduct = async function(req ,res){
    let data=req.body

    let productdata = await productModel.create(data)
    res.send({msg:productdata})
}

module.exports.createProduct=createProduct;