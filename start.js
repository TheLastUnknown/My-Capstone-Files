/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('Capstone:server');
var http = require('http');
var passport = require('passport');
var express = require('express');
var mongoose = require("mongoose");
var bCrypt = require('bcrypt-nodejs');

var User = require('./models/user');

//var User = mongoose.model(userModel, userModel.User);

var LocalStrategy = require("passport-local").Strategy;
var expressSession = require('express-session');
app.use(express.static('public'));
//app.use(express.cookieParser());
//app.use(express.bodyParser());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



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
                    newUser.email = req.param('email');
                    newUser.firstName = req.param('firstName');
                    newUser.lastName = req.param('lastName');

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
