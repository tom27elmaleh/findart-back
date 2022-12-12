const mongoose = require('mongoose');

const musicStyleSchema = mongoose.Schema({
    name: String
});

const MusicStyle = mongoose.model('musicStyles', musicStyleSchema);

module.exports = MusicStyle;