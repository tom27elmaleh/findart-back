var express = require('express');
var router = express.Router();
require('../models/connection');
const Event = require('../models/events');

// add events
router.post('/add', function(req, res) {
  const newEvent = new Event({
    name: req.body.name,
    image: req.body.image,
  })
  newEvent.save()
  .then(
    res.json({result: true, message: 'event add'})
  )
});

module.exports = router;
