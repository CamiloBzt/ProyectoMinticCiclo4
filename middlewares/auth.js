const jwt = require('jsonwebtoken');

const verifyUsuario = (req,res,next) =>{
    try {
        // console.log(req.headers.authorization.split(' ')[1]);
        const token = req.headers.token//split(' ')[1]
        const decode = jwt.verify(token, 'secretValue')
        console.log(decode);
        req.user = decode;
        
        next()
    } catch (error) {
        res.json({
            message: 'Auth Failed'
        })
    }
}

module.exports = verifyUsuario;