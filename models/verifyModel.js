const mongoose = require('mongoose')

const verifySchema = new mongoose.Schema({
  v_id:{
    type:String
  },
  user_name:{
    type:String
  }
})

const verifyModel = mongoose.model('verifyModel', verifySchema)

module.exports = verifyModel
