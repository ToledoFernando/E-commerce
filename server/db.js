require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
  console.log("DB is connected")
})