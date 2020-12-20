const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type:String,
    required: true
  },
  roll_number:{
    type:String,
    require:true,
    unique:true
  },
  email_address:{
    type:String,
    required:true,
    unique:true
  },
  user_name:{
    type:String,
    unique:true,
    require:true
  },
  Depertment:{
    type: String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

studentSchema.methods.generateToken = async function(req){
  const username = this.user_name
  const token =await jwt.sign({user_name:username}, 'secretKey')
  this.tokens = this.tokens.concat({token})
  req.token = token
  await this.save()
}

const studentModel = mongoose.model('Student-Data', studentSchema)


module.exports = studentModel
