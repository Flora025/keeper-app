const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// use express.json() to get data into json format
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Port
const PORT = 3000;

// use cors
app.use(cors());

// import routes
const NoteItemRoute = require('./routes/noteItem');

// connect to mongodb ..
mongoose
  .connect('mongodb://localhost:27017/')
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

app.use('/', NoteItemRoute);

// connect to server
app.listen(PORT, () => console.log('Server connected'));
