const mongoose = require('mongoose')

const compSciSchema = new mongoose.Schema({
  semester:{
    type: String,
    required: true
  },
  subjects:{
    type:String,
    required: true
  }
})

const compSciModel = mongoose.model('compSciModel', compSciSchema)

module.exports = compSciModel
