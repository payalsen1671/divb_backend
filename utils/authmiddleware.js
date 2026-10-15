import jwt from ".../jsonwebtoken";
import secretKey from "../jwtconfig";
function AuthanticateToken(req,res,next){
    const authToken=req.header("Authorization")
    if (!authToken){
        return res.status(401).json({"message":"Authorization missing"})
    }
    const[bearer,token]=authToken.split(" ")
    if(bearer!="Bearer" || !token){
        return res.status(401).json({"message":"Auth formate is not valid"})
    }
    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            return res.status(401).json({"message":"invalid token"})
        }
        req.user=user
        next()
    })
}