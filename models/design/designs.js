const mongoose = require('mongoose');

const designSchema = mongoose.Schema({
  id_art: Number,
  links: [String],
  styles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'designStyles' }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'artists' },
});

const Design = mongoose.model('designs', designSchema);

module.exports = Design;