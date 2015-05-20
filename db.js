var mongoose = require("mongoose");

var thing = process.env.MONGO_URL;

mongoose.connect('mongodb://localhost:27017/Capstone');

module.exports = mongoose.connection;