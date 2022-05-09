
export const verifyTokenRegister = (req,res,next) => {
   const getToken = req.body.token
   if(!getToken) {
    const err  = new Error ('Không tìm thấy token')
    err.statusCode = 401
    return next(err)
    }
    next()
}