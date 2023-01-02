const { Schema, model } = require('mongoose');

const productScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  productIMG: {
    type: String,
    required: true
  },
  imgid: {
    type: String
  },
  category: {
    type: Array
  },
  oferta: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: new Date()
  },
  status: {
    type: Boolean,
    default: true
  }
})

module.exports = model('Products', productScheme);