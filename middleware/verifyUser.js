const jwt = require('jsonwebtoken');

exports.verify = async (req,res,next) =>{
    try {
        let token = req.headers.authorization.split()[1];
         jwt.verify(token, process.env.Secret);
         next()
    } catch (error) {
        res.send({responseCode:"409", responseMessage:"Unauthorized User"})
    }
}