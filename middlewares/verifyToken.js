import jwt from 'jsonwebtoken'

export const verifyToken = (res,req,next) => {
    // Access Authorization from req header
    const Authorization = req.header('authorization')
    if(!Authorization) {
        //  Err : UnAuthorized
    }
    // Get token
    const token = Authorization.replace('Bearer','')
    
    // Verify token
    const {userId} = jwt.verify(token,process.env.APP_SECRET)

    // Assign req
    req.user = {userId};
    next()
}