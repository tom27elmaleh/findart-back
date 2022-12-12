const mongoose = require('mongoose');

const danceStyleSchema = mongoose.Schema({
    name: String
});

const DanceStyle = mongoose.model('danceStyles', danceStyleSchema);

module.exports = DanceStyle;