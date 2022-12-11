const mongoose = require('mongoose')

const teacherShcema = new mongoose.Schema({
  name : String,
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},{
    timestamps: true
})

module.exports = mongoose.model('teacher', teacherShcema)