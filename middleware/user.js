const jwt = require('jsonwebtoken');
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

function userMiddleware(req, res, next){
    const token = req.headers.token;
    
    try{
        const decoded = jwt.verify(token, JWT_USER_SECRET);
        
        req.userId = decoded.id;
    }catch(e){
        return res.status(403).json({
            message: "You are not signed in!"
        });
    }
}

module.exports = {
    userMiddleware: userMiddleware
}