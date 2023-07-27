const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
// use express.json() to get data into json format
app.use(express.json());
// Port
const PORT = process.env.PORT || 5500;

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
