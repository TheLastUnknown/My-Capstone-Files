var mongoose = require("mongoose");

var CreatedLevel = new mongoose.Schema({
    levelPattern: String,
    username: String
});

module.exports = mongoose.model('CreatedLevel', CreatedLevel);