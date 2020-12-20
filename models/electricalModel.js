const mongoose = require('mongoose')

const electricalSchema = new mongoose.Schema({
  semester:{
    type: String,
    required: true
  },
  subjects:{
    type:String,
    required: true
  }
})

const electricalModel = mongoose.model('electricalModel', electricalSchema)

module.exports = electricalModel
