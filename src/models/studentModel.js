const mongoose = require('mongoose')
const Objectid = mongoose.Schema.Types.ObjectId

const studentShcema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  subject: {
    type: String,
    require: true
  },
  marks: {
    type: Number,
    require: true
  },
  teacher: {
    type: Objectid,
    ref: 'teacher',
    require: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},{
    timestamps: true
})

module.exports = mongoose.model('student', studentShcema)