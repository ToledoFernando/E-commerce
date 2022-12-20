const { model, Schema } = require('mongoose');

const UsersScheme = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  profileIMG: {
    type: String,
    default: 'none'
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
  connection: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: 'Enabled'
  }
})

module.exports = model('users', UsersScheme)