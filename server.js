///////////////////////////////////////////////////////////////////
// CONSTANTS
///////////////////////////////////////////////////////////////////

require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;
const PORT = process.env.PORT || 3001;
const cors = require('cors');

///////////////////////////////////////////////////////////////////
// MIDDLEWARE
///////////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cors());

///////////////////////////////////////////////////////////////////
// MONGO CONNECTION
///////////////////////////////////////////////////////////////////

mongoose.connect(mongoURI,
  {useNewUrlParser: true, useUnifiedTopology: true
});

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on('open', () => {
  console.log('connection made!');
})

///////////////////////////////////////////////////////////////////
// THE MEAT OF IT
///////////////////////////////////////////////////////////////////

const bugController = require('./controllers/bugs.js')

app.use('/bugs', bugController);

const featureController = require('./controllers/featureRequests.js');

app.use('/features', featureController);

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});