var mongoose = require("mongoose");
var CreatedLevel = require("./createdLevel.js");
var LevelTimes = require("./levelTimes.js");

var User = new mongoose.Schema({
    username: String,
    password: String
});


//ADDING
//Get model
//var loggedUser = mongoose.model('User',User);
//Create new User
//var newUser = new loggedUser();
//Create new LevelTime
//newUser.levelTimes.push({});
//Create new CreatedLevel
//newUser.createdLevels.push({})

/*newUser.save(function(err){
    if(!err) console.log('Success!');
});*/



/*
//REMOVING
//Remove level time
loggedUser.findById(myId, function(err, post){
    if(!err)
    {
        newUser.levelTimes[0].remove();
        newUser.save(function(err) {
            if(!err)
            {
                console.log('Level time removed');
            }
        });
    }
});

//Remove createdLevel
loggedUser.findById(myId, function(err,post){
    if(!err)
    {
        newUser.createdLevels[0].remove();
        newUser.save(function(err) {
            if(!err)
            {
                console.log('Created level removed');
            }
        });
    }
});


*/

module.exports = mongoose.model('User', User);
