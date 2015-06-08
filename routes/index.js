var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('../db');

var User = require('../models/user');
var CreatedLevel = require('../models/createdLevel');
var LevelTimes = require("../models/levelTimes");

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.user)
    {
        res.render('index', { title: 'Home', user: req.user });
    }
    else
    {
        res.render('index', { title: 'Home', user: null });
    }
  
});

/* GET login page. */
router.get('/login', function(req, res, next) {
// Display the Login page with any flash message, if any
    if(req.user)
    {
        res.redirect('/');
    }
    else
    {
        res.render('login', { title: 'Login', user: null });
    }
});
 

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

/* GET Registration Page */
router.get('/signup', function(req, res, next) {
// Display the Login page with any flash message, if any
res.render('register', { title: 'Register', user: null });
  });

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }));

router.get('/homePage', function(req, res, next) 
{
    if(req.user)
    {
        res.render('homePage', { username:req.user.username, password: req.user.password });
    }
    else
    {
        res.redirect('/login');
    }

});

router.get('/levelCreator', function(req, res, next) {
    if(req.user)
    {
        res.render('levelCreator', { title: 'LevelCreator', user: req.user, username:req.user.username });
    }
    else
    {
        res.render('levelCreator', { title: 'LevelCreator', user: null, username:null });
    }
  
});

router.post('/levelCreator', function(req, res, next) {
    var newLevel = new CreatedLevel();
    if(req.user)
    {
        newLevel.levelPattern = req.body.levelPattern;
        newLevel.username = req.body.username;
        
        newLevel.save(function(err)
        {
            if(err)
            {
                console.log("Error saving level: " + err);
                throw err;
            }
            else
            {
                console.log("Level Saved");
            }
        });
        res.send("Level Posting Recieved");
    }
    else
    {
        console.log("There is no user logged in");
    }
  
});

router.get('/printUsers', function(req, res, next) {
    res.render('printUsers', { title: 'printUsers', user: null});
});

router.get('/testTitle', function(req,res,next){
    console.log("blar");
    res.render('testTitle', { newTitle : 'testTitle'});
});
    
router.get('/printLevels', function(req, res, next){
    
    var levelArray = [];
    
    CreatedLevel.find({}).lean().exec(function(err, docs)
    {
        //console.log(docs.length);
        levelArray = docs;
        
        res.render('printUsers', { title: 'printUsers', levels: levelArray });
        
    });
    
    
});

router.get('/game', function(req, res, next) {
    if(req.user)
    {
        res.render('gamePage', { title: 'Game', user: req.user  });
    }
    else
    {
        res.render('gamePage', { title: 'Game', user: req.user  });
    }
});

router.post('/game', function(req, res, next) {
    var newLevelTime = new LevelTimes();
    if(req.user)
    {
        newLevelTime.levelTime = req.body.levelTime;
        newLevelTime.level = req.body.levelNumber;
        newLevelTime.username = req.body.username;
        
        newLevel.save(function(err)
        {
            if(err)
            {
                console.log("Error saving time: " + err);
                throw err;
            }
            else
            {
                console.log("Time Saved");
            }
        });
        res.send("Time Posting Recieved");
    }
    else
    {
        console.log("There is no user logged in");
    }
  
});

router.get('/signout', function(req,res){
   req.logout();
    res.redirect('/');
});

module.exports = router;
