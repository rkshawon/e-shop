const jwt =  require('jsonwebtoken')

module.exports = (req, res, next)=>{
    const authHeader =  req.header("authToken")
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
            if(err){
                return res.status(404).json("token is not valid")
            }
            req.user = user.user
            next()
        })
    }else{
        res.status(401).send('you are not authenticated')
    }
}