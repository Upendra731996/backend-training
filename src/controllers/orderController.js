const express = require('express');
const userrModel=require('../models/userrModel')
const productModel = require("../models/productModel")
const orderModel = require("../models/orderModel")

const createOrder = async function (req, res) {

    let data = req.body
    let userId = data.userId
    let productId = data.productId
    if (!userId) {
        return res.send({ msg: "user id is mendatory in request " })
    }
    else if (!productId) {
        return res.send({ msg: "product id is mendatory in request" })
    }
    // only user id nikalenge

    let UserId = await userrModel.findById(userId)
    let ProductId = await productModel.findById(productId)
    console.log(ProductId)
    if (!UserId) {
        return res.send({ msg: "user i d is not present in tha user database" })
    }
    else if (!ProductId) {
        res.send({ msg: "product id is not present in product database" })
    }
    else {
        let headerToken = req.headers.isfreeappuser
        console.log(headerToken)
        let value = 0
    
        if (headerToken === "true") {
            data.amount = value
            data.isFreeAppUser = headerToken
            let saveData = await orderModel.create(data)
            res.send({ data: saveData })
        }
        // incase is free app is false then

        else if (UserId.balance < ProductId.price) {
            res.send("user have insufficient balance ")
        }
        else {
            console.log(UserId.balance)
            let balanceupdate = await userrModel.findOneAndUpdate({ _id: userId }, { $set: { balance: UserId.balance - ProductId.price } })
            data["amount"] = ProductId.price
            data["isFreeAppUser"] = req.headers.isfreeappuser
            let savedData = await orderModel.create(data)
            res.send({ data: savedData })
        }
    }


}


module.exports.createOrder = createOrder