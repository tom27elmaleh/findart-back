const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  text: String,
  user: {
    email: String,
    firstname: String,
    lastname: String,
  },
  address: {
    postalCode: String,
    city: String,
    street: String,
  },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'artists' },
});

const Request = mongoose.model('requests', requestSchema);

module.exports = Request;