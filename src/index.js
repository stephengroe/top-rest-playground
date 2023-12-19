// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const uuidv4 = require('uuid').v4;

let users = require('./sample-data').users;
let messages = require('./sample-data').messages;

// Run express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Create middleware for identifying user
app.use((req, res, next) => {
  req.me = users[1];
  next();
});

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

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  messages[id] = message;

  return res.send(message);
});

app.get('/messages/:id', (req, res) => {
  res.statusCode = 200;
  return res.send(messages[req.params.id]);
});

app.delete('/messages/:id', (req, res) => {
  const {
    [req.params.id]: message,
    ...otherMessages
  } = messages;
  messages = otherMessages;
  
  return res.send(message);
});

app.put('/messages/:id', (req, res) => {
  messages[req.params.id].text = req.body.text;

  return res.send(messages[req.params.id]);
});

// Set up app to listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});