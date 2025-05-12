

 const jwt = require('jsonwebtoken')
const privatekey="j#n2005@l"

const userToken = async (req,res,next) => {

    const token = req.headers.authorization

    await jwt.verify(token,privatekey,(err)=>{
        if(err){
            res.send("user Unauthorization")
        }
        else
        {
            next();
        }
    })
    
}


module.exports={userToken}

