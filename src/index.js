// Imports
require('dotenv').config();
const express = require('express');

// Run express
const app = express();

// Basic routes
app.get('/', (req, res, next) => {
  res.send('This is the home page');
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});