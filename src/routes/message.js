// Imports
const uuidv4 = require('uuid').v4;
const Router = require('express').Router;
const router = Router();

// Routes
router.get('/', (req, res) => {
  res.send(Object.entries(req.context.models.messages));
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.get('/:id', (req, res) => {
  return res.send(req.context.models.messages[req.params.id]);
});

router.delete('/:id', (req, res) => {
  const {
    [req.params.id]: message,
    ...otherMessages
  } = req.context.models.messages;
  req.context.models.messages = otherMessages;
  
  return res.send(message);
});

router.put('/:id', (req, res) => {
  req.context.models.messages[req.params.id].text = req.body.text;

  return res.send(req.context.models.messages[req.params.id]);
});

module.exports = router;