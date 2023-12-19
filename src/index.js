// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Run express
const app = express();
app.use(cors());

// Basic routes
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.get('/users', (req, res) => {
  return res.send('Received a GET HTTP method on user resource!');
});

app.post('/users', (req, res) => {
  return res.send('Received a POST HTTP method on user resource!');
});

app.put('/users/:id', (req, res) => {
  return res.send(
    `Received a PUT HTTP method on user resource! ID: ${req.params.id}`
    );
});

app.delete('/users/:id', (req, res) => {
  return res.send(
    `Received a DELETE HTTP method on user resource! ID: ${req.params.id}`
    );
});

// Set up app to listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});