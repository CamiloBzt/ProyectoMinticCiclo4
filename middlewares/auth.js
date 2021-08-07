const jwt = require('jsonwebtoken');

const verifyUsuario = (req,res,next) =>{
    try {
        console.log('prueba')
        // console.log(req.headers.authorization.split(' ')[1]);
        const token = req.headers.token//split(' ')[1]
        // console.log(token)
        const decode = jwt.verify(token, 'secretValue')
        req.user = decode
        next()
    } catch (error) {
        res.json({
            message: 'Auth Failed'
        })
    }
}

module.exports = verifyUsuario;