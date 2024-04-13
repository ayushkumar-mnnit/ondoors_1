
const jwt=require('jsonwebtoken');
const User = require('../models/user');

// here we are verifying if user have a valid jwt token. so this middleware will be used everywhere we need authentication.


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ msg: 'Token not provided' });
        const jwtToken = token.replace('Bearer', '').trim();
        const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
        const data = await User.findOne({ email: isVerified.email }).select({ password: 0 });
        console.log('User Data:', data);
        if (!data) return res.status(401).json({ msg: 'User not found' });

        req.user = data;
        req.token = token;
        req.Id = data._id;
        next();
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        return res.status(401).json({ msg: 'Unauthorized user: invalid token' });
    }
};

module.exports=authMiddleware