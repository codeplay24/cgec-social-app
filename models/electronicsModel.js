const mongoose = require('mongoose')

const electronicsSchema = new mongoose.Schema({
  semester:{
    type: String,
    required: true
  },
  subjects:{
    type:String,
    required: true
  }
})

const electronicsModel = mongoose.model('electronicsModel', electronicsSchema)

module.exports = electronicsModel
