// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const models = require('./models');

// Run express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Create middleware for passing along pseudo-DB information
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// Define routes
app.use('/session', routes.session);
app.use('/user', routes.user);
app.use('/message', routes.message);

app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});


// Set up app to listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});