var mongoose = require("mongoose");

var LevelTimes = new mongoose.Schema({
    level: Number,
    levelTime: {
        minutes: Number,
        seconds: Number
    }
});