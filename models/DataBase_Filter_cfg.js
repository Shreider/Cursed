const mongoose = require('mongoose');

const WorldFilterSchema = new mongoose.Schema({
    word: String,
    wariations: Array
});

module.exports = mongoose.model('WorldFilter', WorldFilterSchema);