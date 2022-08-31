
const jwt=require('jsonwebtoken')
const authenticate = async function (req, res, next) {
    //check the token in request header
    //validate this token
try{
    let token = req.headers["x-auth-token"]

    if (!token) return res.status(401).send({ status: false, msg: "token must be present in the request header" })

    let verify1 = jwt.verify(token, "functionup-thorium")

    if (!verify1) return res.status(401).send({ msg: "please inter valid token" })

     next()
}

    catch(error){res.status(500).send({msg:error.message})}
}


const authorise = async function (req, res, next) {

    try{
    // comapre the logged in user's id and the id in request
    let userToBeModified = req.params.userId

    let userLoggedIn = decodedToken.userId

    if (userToBeModified != userLoggedIn) return res.status(401).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })

    let user = await userModel.findById(req.params.userId)
    if (!user) return res.status(401).send({ status: false, msg: 'No such user exists' }) 
    next()     }

catch(error){ res.status(500).send({msg:error.message})}
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise