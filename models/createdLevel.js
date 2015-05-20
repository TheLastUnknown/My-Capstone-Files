var mongoose = require("mongoose");

var CreatedLevel = new mongoose.Schema({
    levelPattern: String,
    levelTime: {
        minutes: Number,  
        seconds: Number
    }
});
