const mongoose = require('mongoose');

const designStyleSchema = mongoose.Schema({
    name: String
});

const DesignStyle = mongoose.model('designStyles', designStyleSchema);

module.exports = DesignStyle;