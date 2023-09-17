var { User,validateLogin,validateSignupData } = require("../model/user");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports.me = async (req,res) => {
    try {
        
        return res.status(200).send(req.user)
    } catch (error) {
        console.error(error);
        return res.status(500).send({message:"Internal Server Error"});
    }
}

module.exports.signup = async (req,res) => {
    

      try {

      const isExistUserName = await User.findOne({username:req.body.username});

      if(isExistUserName){

        return res.status(400).send({error:'user already exists'});

      }else{

          
          /**
           * try to sign up user with encrypted password
           */
         bcrypt.hash(req.body.password,10, async (error,encrypted)=>{
            if(error){
                return res.status(400).send({error:error});
            }
            const user = new User({
                username:req.body.username,
                password:encrypted,
                email:req.body.email
              });
    
             const result = await user.save();           
    
             return res.status(200).send({message:'Sign Up Success',data:{userId:result._id}});
         });
    }

} catch (error) {

    console.error(error);

    return res.send({error:error});
      
}

}

module.exports.signin = async (req,res) => {

    /**
     * try to verify user
     */

    try {

        const user = await User.findOne({username:req.body.username});

        if(!user){
            return res.status(400).send({error: 'User not found'});
        }

        const isValiduser = bcrypt.compareSync( req.body.password,user.password);

        console.log(isValiduser);

        if(!isValiduser){
            return res.status(403).send({error:'Invalid password'});
        }else{

            //sign jsonwebtoken 
            const payload = {
                userId:user._id,
                username:user.username,
                email:user.email
            }
            
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'4H'});

            return res.status(200).send({token:token,type:"Bearer "});

        }
        
    } catch (error) {
        console.error(error);
        return res.status(400).send({error:error});
    }

}