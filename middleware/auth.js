const {secretKey} = require('../controller/auth')
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err){
            console.log(err)
            return res.status(403).json({ error : 'Invalid token' });
        }
        req.user = user;
        next();
    })
}

module.exports = { authenticate }
