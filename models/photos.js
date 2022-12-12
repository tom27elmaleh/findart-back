const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  id_art: Number,
  links: [String],
  camera: String,
  format: String,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'artists' },
});

const Photo = mongoose.model('photos', photoSchema);

module.exports = Photo;