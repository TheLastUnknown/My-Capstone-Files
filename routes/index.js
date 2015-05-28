var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('../db');

var User = require('../models/user');
var CreatedLevel = require('../models/createdLevel');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.user)
    {
        res.render('index', { title: 'Express', username: req.user.username });
    }
    else
    {
        res.render('index', { title: 'Express', username: null });
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
        res.render('login', { title: 'Login' });
    }
});
 

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
    successRedirect: '/homePage',
    failureRedirect: '/login'
}));
 
  /* GET Registration Page */
router.get('/signup', function(req, res, next) {
// Display the Login page with any flash message, if any
res.render('register', { title: 'Register' });
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
        res.render('levelCreator', { title: 'Express', username: req.user.username });
    }
    else
    {
        res.render('levelCreator', { title: 'Express', username: null });
    }
  
});


router.post('/levelCreator', function(req, res, next) {
    var newLevel = new CreatedLevel();
    console.log("1");
    if(req.user)
    {
        console.log("2");
        newLevel.levelPattern = req.body.levelPattern;
        console.log("3");
        newLevel.username = req.body.username;
        
        console.log("4");
        
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
    }
    else
    {
        console.log("There is no user logged in");
    }
  
});


router.get('/printUsers', function(req, res, next) {
    res.render('printUsers', { title: 'printUsers'});
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



router.get('/signout', function(req,res){
   req.logout();
    res.redirect('/');
});

module.exports = router;
