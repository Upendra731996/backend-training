const jwt = require('jsonwebtoken')

const auth = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            return res.status(400).send({ status: false, error: "please give a token " })
        }
        try {
            let decodedtoken = jwt.verify(token, "functionup-plutonium")
            req.pass = decodedtoken;
            next()
        } catch (err) {
            return res.status(401).send({ status: false, message: `${err.message} please check your token` })
        }
    } catch (err) {
       return res.status(500).send({status: false, err: err.message})
    }
}

module.exports.auth = auth