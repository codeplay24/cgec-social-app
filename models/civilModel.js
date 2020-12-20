const mongoose = require('mongoose')

const civilSchema = new mongoose.Schema({
  semester:{
    type: String,
    required: true
  },
  subjects:{
    type:String,
    required: true
  }
})

const civilModel = mongoose.model('civilModel', civilSchema)

module.exports = civilModel
