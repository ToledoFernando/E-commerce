const { Schema, model } = require('mongoose');

const productScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  productIMG: {
    type: String,
    required: true
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