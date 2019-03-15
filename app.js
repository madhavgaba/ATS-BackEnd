const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./route/routes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
const PORT = 8082;

const url = 'mongodb://localhost:27017/ats';
const mongoOptions = { useNewUrlParser: true };

mongoose.connect(url, mongoOptions, err => {
  if (err) throw err;
  else console.log('connected to mongo');
});

app.listen(PORT, () => console.log(`ATS backend on ${PORT}`));
