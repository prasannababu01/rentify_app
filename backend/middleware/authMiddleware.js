const jwt = require('jsonwebtoken');
const { secret } = require('../config');


let authMiddleware=(req,res,next)=>{
  let token=req.headers.authorization;
  if(!token){
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try{
      jwt.verify(token,secret);
      next()
  }
  catch(err)
  {
    res.status(401).json({ msg: 'Token is not valid' });
  }


};

module.exports = authMiddleware;
