const { model, Schema } = require('mongoose');

const UsersScheme = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  profileIMG: {
    type: Number,
    default: 0
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  verify: {
    type: Boolean,
    default: false
  },
  rol: {
    type: Array,
    default: ['user']
  },
  status: {
    type: Boolean,
    default: true
  }
})

module.exports = model('users', UsersScheme)