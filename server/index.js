const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./db')
const app = express();

app.use(express.json())
app.use(cors());
app.use(morgan('dev'));
app.use(require('./routes/routes'))

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server on Port ${process.env.PORT || 4000}`)
})