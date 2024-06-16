const jwt = require('jsonwebtoken');
const User = require('../model/Usermodel'); 

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded token:', decoded); 
    next();
  } catch (error) {
    console.log('Invalid token:', error.message);
    return res.status(400).json({ msg: 'Invalid token.' });
  }
};

module.exports = auth;
