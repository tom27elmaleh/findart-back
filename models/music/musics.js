const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
  id_art: Number,
  links: [String],
  styles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'musicStyles' }],
  instruments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'instruments' }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'artists' },
});

const Music = mongoose.model('musics', musicSchema);

module.exports = Music;