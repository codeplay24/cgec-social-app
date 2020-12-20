const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const studentModel = require('../models/studentModel.js')

const verify = async(req,res,next)=>{

  try{
    const token = req.cookies.jwt
    const tokenData = await jwt.verify(token, 'secretKey')

    const user_name = tokenData.user_name
    const user = await studentModel.findOne({user_name:user_name})
    const tokens = user.tokens

    var flag = 0
    tokens.forEach((item, i) => {
      if(item.token===token){
        flag = 1;
      }
    });
    if(flag==1){
      req.user_name = user_name
      next()
    }else{
      return res.redirect('/login')
    }
  }catch(e){
    next()
  }
}

module.exports = verify
