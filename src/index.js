// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const users = require('./sample-data').users;
const messages = require('./sample-data').messages;

// Run express
const app = express();
app.use(cors());

//// HOME ROUTES ////
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

//// USER ROUTES ////
app.get('/users', (req, res) => {
  return res.send(Object.values(users));
});

app.get('/users/:id', (req, res) => {
  return res.send(users[req.params.id]);
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

//// MESSAGE ROUTES ////
app.get('/messages', (req, res) => {
  res.send(Object.entries(messages));
});

app.get('/messages/:id', (req, res) => {
  res.send(messages[req.params.id]);
});

// Set up app to listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});