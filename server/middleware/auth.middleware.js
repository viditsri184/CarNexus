const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/jwt.config");

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({message : "Not allowed"});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);
        req.userId = decodedValue.id;
        next();
    } catch (error) {
        return res.status(403).json({message: error});
    }
};

module.exports = authMiddleware;