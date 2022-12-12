const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: String,
  image: String,
});

const Event = mongoose.model('events', eventSchema);

module.exports = Event;