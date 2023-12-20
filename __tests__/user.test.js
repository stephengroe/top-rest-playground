// Imports
const user = require('../src/index.js');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/user', user);

// Run tests
test('User GET works', done => {
  request(app)
    .get('/user')
    .expect('Content-Type', /html/)
    .expect({ name: 'Alice' })
    .expect(200, done);
});