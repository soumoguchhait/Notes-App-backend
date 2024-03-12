const jwt=require("jsonwebtoken");
 require("dotenv").config();
Secret_key=process.env.Secret_key;
const userModel=require("../Models/usermodel")
const checkAuth=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        jwt.verify(token,Secret_key);
        next();
    }
    catch{
        return res.status(403).json({
            message:"unauthorized by me"
        });
    }
};
const isAdmin=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const key=jwt.verify(token,Secret_key);
       const user=await userModel.findOne({
        email:key.email
       }) 
     
       if(user.Role==="admin"){
        next()
       }
      
        
    }
    catch{
        return res.status(500).json({
            message:"unauthorized"
        });
    }
}
module.exports={checkAuth,
                isAdmin
            };