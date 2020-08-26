const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //get the token
    const token = req.header('x-auth-token');

    //check if token does not exist
    if(!token){
        res.status(401).json({ msg: 'No token found. Authorization denied.' })
    }

    //verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({ msg: 'Token is not valid'});
    }
};