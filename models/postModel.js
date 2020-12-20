const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  user_name:{
    type:String,
    required:true,
  },
  depertment:{
    type:String,
    required:true
  },
  semester:{
    type: String,
    required:true
  },
  subject:{
    type: String,
    required:true
  }
})

const postModel = mongoose.model('postModel', postSchema)

module.exports = postModel
