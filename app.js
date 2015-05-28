var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("./db");
var passport = require('passport');
var express = require('express');
var bCrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

var LocalStrategy = require("passport-local").Strategy;
var expressSession = require('express-session');

var User = require('./models/user');
var CreatedLevel = require('./models/createdLevel');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.session());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

User.find({}).lean().exec(function(err, docs)
{
    console.log(docs.length);
    app.locals.users = docs;
});


CreatedLevel.find({}).lean().exec(function(err, docs)
{
    console.log(docs.length);
    app.locals.levels = docs;
});


app.locals.test = "test";

passport.serializeUser(function(user,done)
{
    done(null,user._id);
});
                       
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

//passport login
passport.use('login', new LocalStrategy({
    passReqToCallback : true
    },
    function(req,username,password,done){
        User.findOne({'username' : username},
            function(err,user)
            {
                if(err)
                {
                    return done(err);
                }
            
                if(!user)
                {
                    console.log('User not found with username ' + username);
                    return done(null, false);
                }
                
                if(!isValidPassword(user,password))
                {
                    console.log('invalid Password');
                    return done(null,false);
                }
                
                return done(null, user);
            });
    }));

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

var createHash = function(password){
 return bCrypt.hashSync(password,bCrypt.genSaltSync(10),null);   
}

passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
    function(req, username, password, done) 
    {
        findOrCreateUser = function()
        {
            // find a user in Mongo with provided username
            mongoose.model("User").findOne({'username':username},function(err, user) 
            {
                // In case of any error return
                if (err)
                {
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) 
                {
                    console.log('User already exists');
                    return done(null, false);
                } 
                else 
                {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);

                    // save the user
                    newUser.save(function(err) 
                    {
                        if (err)
                        {
                        console.log('Error in Saving user: '+err);  
                        throw err;  
                        }
                        
                        console.log('User Registration succesful');    
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

app.use(function(req,res,next){
    res.locals.login = req.isAuthenticated();
    next();
});



module.exports = app;
