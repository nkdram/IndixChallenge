
/**
 * Module dependencies
 */
var express = require('express');
var favicon = require('serve-favicon'),
     logger = require('morgan'),
     methodOverride = require('method-override'),
     session = require('express-session'),
     bodyParser = require('body-parser'),
     multer = require('multer'),
     errorHandler = require('errorhandler'),
	 path = require('path'),
     config = require('./config/config');
     routes = require('./routes/products');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
 app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(session({ resave: true, saveUninitialized: true, 
                      secret: 'uwotm8' }));

    // parse application/json
    app.use(bodyParser.json());                        

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // parse multipart/form-data
    app.use(multer());
    app.use(routes);

    app.use(express.static(path.join(__dirname, 'public')));
	

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  //app.use(express.errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

config.getGlobbedFiles('../policies/**/*.js').forEach(function(policyPath) {
    require(path.resolve(policyPath)).invokeRolesPolicies();
});

// Globbing routing files
config.getGlobbedFiles('../../routes/*.js').forEach(function(routePath) {
    console.log("route paths", routePath);
    require(path.resolve(routePath))(app);
});
// serve index and view partials


/**
 * Start Server
 */
app.listen(app.get('port'), function(){
       console.log('Express server on port ' + app.get('port'));
    });
