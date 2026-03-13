const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    try{
        const authHead = req.headers.authorization

    if(!authHead || !authHead.startsWith('Bearer ')){
        return res.status(400).json({message: 'Access token Denied'})
    }

    const token = authHead.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded

    next();
    }catch(err){
        return  res.status(401).json({message: 'invalid Token'})
    }

}

module.exports = protect