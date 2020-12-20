const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  postId:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  commentText:{
    type:String,
    required:true
  }
})

const commentModel = mongoose.model('commentModel', commentSchema)

module.exports = commentModel
