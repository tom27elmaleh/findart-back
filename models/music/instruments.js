const mongoose = require('mongoose');

const instrumentSchema = mongoose.Schema({
    name: String,
});

const Instrument = mongoose.model('instruments', instrumentSchema);

module.exports = Instrument;