const mongoose = require('mongoose')

const mechanicalSchema = new mongoose.Schema( {
  semester:{
    type: String,
    required: true
  },
  subjects:{
    type:String,
    required: true
  }
})

const mechanicalModel = mongoose.model('mechanicalModel', mechanicalSchema)

module.exports = mechanicalModel
