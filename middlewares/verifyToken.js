import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const verifyToken = (req,res,next) => {
    const Authorization = req.header('authorization')
    if(!Authorization) {
        return res.status(403).send("Chưa có token bạn êi !!!!");
    }
    // Get token
    const token = Authorization.replace("Bearer ","");
    // console.log(token)
    // Verify token
    const {userId} = jwt.verify(token,process.env.APP_SECRET)
    // Assign req
    req.user = {userId};
    next()
}