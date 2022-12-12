const mongoose = require('mongoose');

const danceSchema = mongoose.Schema({
  id_art: Number,
  links: [String],
  styles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'danceStyles' }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'artists' },
});

const Dance = mongoose.model('dances', danceSchema);

module.exports = Dance;