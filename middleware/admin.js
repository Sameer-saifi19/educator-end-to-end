const jwt = require('jsonwebtoken');
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function adminMiddleware(req, res, next){
    const token = req.headers.token;
    
    try{
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
        
        req.userId = decoded.id;
    }catch(e){
        return res.status(403).json({
            message: "You are not signed in!"
        });
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}