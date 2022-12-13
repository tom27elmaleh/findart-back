const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  token: String,
  email: String,
  username: String,
  password: String,
  availabilities: [Date],
  photo: String, 
  description: String,
  insta: String,
  address: {
    city: String,
    postalCode: String,
    street: String,
  },
  rates: {
    hourly: Number,
    packages: [Number],
  },
  type: String,
  instrument: [String],
  formatPhoto: String,
  camera: String,
  links: [String],
  styles: [String],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
});

const Artist = mongoose.model('artists', artistSchema);

module.exports = Artist;