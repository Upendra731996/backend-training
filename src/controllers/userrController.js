const userrModel =require('../models/userrModel')



const createUserr = async function(req ,res , ){
   let data = req.body
   

    let productdata = await userrModel.create(data);
    res.send({msg:productdata })
}

module.exports.createUserr=createUserr;