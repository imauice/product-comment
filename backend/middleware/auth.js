const jwt = require('jsonwebtoken');

const Auth = (req,res,next) => {

    const autorizeHeader = req.headers['authorization'];

    if(!autorizeHeader){
        return res.status(400).send({message: 'Invalid authorization header'})
    }

    const token = autorizeHeader.replace('Bearer ','');

    jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
        if(error){
            return res.status(403).send({message:'invalid token',error:error.message});
        }else{
            req.user=decoded;
            next();
        }

    })
}

module.exports = Auth