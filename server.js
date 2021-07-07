///////////////////////////////////////////////////////////////////
// CONSTANTS
///////////////////////////////////////////////////////////////////

require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const apiURL = process.env.API_URL;
const jwtSecret = process.env.JWT_SECRET;

const db = mongoose.connection;
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const axios = require('axios');
const jwt = require('jwt-simple');

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

const bugController = require('./controllers/bugs.js');

app.use('/bugs', bugController);

const featureController = require('./controllers/featureRequests.js');

app.use('/features', featureController);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const response = await axios.post(apiURL + '/login', {
      username: username,
      password: password,
      version: "staging"
    });
    console.log(response.data);
    if (response.data.token) {
      let payload = ({
        token: response.data.token,
        username: response.data.username,
        iat: Date.now()
      })
      console.log(payload);
      let token = jwt.encode(payload, jwtSecret);
      res.send({
        token: token
      });
    } else {
      res.send({
        error: 'Authentication Failed'
      });
    };
  } catch (error) {
    res.send({
      error: 'Authentication Failed'
    })
  }
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});